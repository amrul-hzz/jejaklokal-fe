/* eslint-disable react-hooks/exhaustive-deps */
// // components/EmptyNotificationPage.tsx
// import Image from "next/image";
// import { useEffect, useState } from "react";

// export default function EmptyNotificationPage() {
//   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
//     null
//   );
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     if (!navigator.geolocation) {
//       setError("Geolocation tidak didukung di browser ini.");
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         const { latitude, longitude } = position.coords;
//         setLocation({ lat: latitude, lng: longitude });
//         console.log("Lokasi didapat:", latitude, longitude);
//       },
//       (err) => {
//         if (err.code === 1) {
//           setError("Akses lokasi ditolak oleh pengguna.");
//         } else {
//           setError("Gagal mendapatkan lokasi.");
//         }
//         console.error("Error geolocation:", err);
//       }
//     );
//   }, []);

//   const email = localStorage.getItem("userEmail");

//   if (!email) {
//     console.warn("Email tidak ditemukan di localStorage");
//     return;
//   }

//   const post_new_area = async (location: {
//     lat: number;
//     lng: number;
//   }) => {
//     try {
//       console.log(location, "loc");
//       const res = await fetch(
//         "https://jejaklokal-601258514414.europe-west1.run.app/get-content",
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({
//             email: email,
//             lat: location.lat,
//             long: location.lng,
//           }),
//         }
//       );
//       console.log(res.json());
//     } catch (err) {
//       console.error("Gagal fetch notifikasi:", err);
//     }
//   };

//   if (location && error) {
//     return null;
//   }
//   return (
//     <div className="w-full min-h-screen flex items-center justify-center bg-black">
//       <div className="w-full max-w-sm h-[95vh] bg-sand flex flex-col rounded-xl shadow-xl">
//         <div className="px-6 pt-12 pb-6 flex items-center gap-3">
//           <h1 className="text-2xl font-semibold text-coffee">Notifikasi</h1>
//         </div>

//         <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 text-center">
//           <div className="w-[400px] h-[400px] relative flex items-center justify-center">
//             <div className="absolute w-[300px] h-[300px] bg-white rounded-full z-0" />
//             <Image
//               src="/assets/empty-notif.png"
//               alt="Ilustrasi notifikasi kosong"
//               fill
//               className="object-contain z-10"
//             />
//           </div>

//           <div className="max-w-sm text-stone">
//             <h2 className="text-xl font-semibold mb-4">
//               Belum ada cerita nih!
//             </h2>
//             <p className="text-sm leading-relaxed">
//               Jalan-jalan dulu yuk – nanti kalau kamu diam sebentar di suatu
//               tempat, kami bisikin kisah serunya.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

export default function EmptyNotificationPage() {
  const router = useRouter();
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [entryPoint, setEntryPoint] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const withinRadiusStartTime = useRef<number | null>(null);

  const email =
    typeof window !== "undefined" ? localStorage.getItem("userEmail") : null;

  const getDistanceFromLatLonInMeters = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ) => {
    const deg2rad = (deg: number) => deg * (Math.PI / 180);
    const R = 6371000; // Radius Bumi dalam meter
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const postNewArea = async (loc: { lat: number; lng: number }) => {
    if (!email) return;
    try {
      const res = await fetch(
        "https://jejaklokal-601258514414.europe-west1.run.app/get-content",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email,
            lat: loc.lat,
            long: loc.lng,
          }),
        }
      );
      const data = await res.json();
      //   console.log("Notif data:", data);

      if (data) {
        router.push("/notifications/list");
      }
    } catch (err) {
      console.error("failed fetch:", err);
    }
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation not supported");
      return;
    }

    const watchInterval = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const currentLoc = { lat: latitude, lng: longitude };
          setLocation(currentLoc);

          if (!entryPoint) {
            console.log("Set entry point:", currentLoc);
            setEntryPoint(currentLoc);
            withinRadiusStartTime.current = Date.now();
            return;
          }

          const distance = getDistanceFromLatLonInMeters(
            entryPoint.lat,
            entryPoint.lng,
            currentLoc.lat,
            currentLoc.lng
          );

          console.log("Jarak dari entry point:", distance, "meter");

          if (distance <= 100) {
            const now = Date.now();
            if (
              withinRadiusStartTime.current &&
              now - withinRadiusStartTime.current >= 10 * 1000
            ) {
              console.log(
                "Masih dalam radius selama 5 menit, fetch notifikasi"
              );
              postNewArea(currentLoc);
              withinRadiusStartTime.current = now; // reset waktu setelah sukses hit
            }
          } else {
            console.log("Keluar dari radius, reset entry point");
            setEntryPoint(currentLoc);
            withinRadiusStartTime.current = Date.now();
          }
        },
        (err) => {
          if (err.code === 1) {
            setError("Akses lokasi ditolak oleh pengguna.");
          } else {
            setError("Gagal mendapatkan lokasi.");
          }
          console.error("Error geolocation:", err);
        }
      );
    }, 3000); // setiap 3 detik

    return () => clearInterval(watchInterval);
  }, [entryPoint, email]);

  if (!email) {
    console.warn("Email tidak ditemukan di localStorage");
    return null;
  }

  if (!error && location && timerRef) {
    return null;
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm h-[95vh] bg-sand flex flex-col rounded-xl shadow-xl">
        <div className="flex flex-row justify-between relative px-6 pt-6 pb-8">
          <div className="absolute top-6 right-6 flex flex-col items-center">
            <Image
              src="/assets/logo.svg"
              alt="Logo Jejak Lokal"
              width={32}
              height={32}
              className="mb-1 w-14"
            />
          </div>
          <h1 className="text-2xl font-semibold mt-4 text-coffee">
            Notifikasi
          </h1>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20 text-center">
          <div className="w-[270px] h-[270px] relative flex items-center justify-center">
            <Image
              src="/assets/image.svg"
              alt="Ilustrasi notifikasi kosong"
              fill
              className="object-contain z-10"
            />
          </div>

          <div className="max-w-sm text-stone mt-8">
            <h2 className="text-xl font-semibold mb-4">
              Belum ada cerita nih!
            </h2>
            <p className="text-sm leading-relaxed">
              Jalan-jalan dulu yuk – nanti kalau kamu diam sebentar di suatu
              tempat, kami bisikin kisah serunya.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
