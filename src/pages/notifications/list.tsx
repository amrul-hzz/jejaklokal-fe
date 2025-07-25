// import { BiSolidBellRing } from "react-icons/bi";

// export default function NotificationPage() {
//   const notifications = [
//     {
//       id: 1,
//       type: "warning",
//       title: "Langkahmu diawasi!",
//       message:
//         "Hati-hati ya, di ${placeName}, ada kebiasaan lokal yang wajib dihormati.",
//       time: "11:00",
//       read: false,
//     },
//     {
//       id: 2,
//       type: "info",
//       title: "Waktu pernah berhenti di sini!",
//       message:
//         "Setiap tempat punya suara, dan ${placeName} lagi bisikin sesuatu ke kamu.",
//       time: "11:00",
//       read: false,
//     },
//     {
//       id: 3,
//       type: "info",
//       title: "Waktu pernah berhenti di sini!",
//       message:
//         "Setiap tempat punya suara, dan ${placeName} lagi bisikin sesuatu ke kamu.",
//       time: "11:00",
//       read: true,
//     },
//     {
//       id: 4,
//       type: "info",
//       title: "Waktu pernah berhenti di sini!",
//       message:
//         "Setiap tempat punya suara, dan ${placeName} lagi bisikin sesuatu ke kamu.",
//       time: "11:00",
//       read: true,
//     },
//     {
//       id: 5,
//       type: "info",
//       title: "Waktu pernah berhenti di sini!",
//       message:
//         "Setiap tempat punya suara, dan ${placeName} lagi bisikin sesuatu ke kamu.",
//       time: "11:00",
//       read: true,
//     },
//     {
//       id: 6,
//       type: "info",
//       title: "Waktu pernah berhenti di sini!",
//       message:
//         "Setiap tempat punya suara, dan ${placeName} lagi bisikin sesuatu ke kamu.",
//       time: "11:00",
//       read: true,
//     },
//     {
//       id: 7,
//       type: "info",
//       title: "Waktu pernah berhenti di sini!",
//       message:
//         "Setiap tempat punya suara, dan ${placeName} lagi bisikin sesuatu ke kamu.",
//       time: "11:00",
//       read: true,
//     },
//   ];

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center bg-black">
//       <div className="w-full max-w-sm h-[95vh] bg-sand flex flex-col rounded-xl shadow-xl">
//         {/* Header */}
//         <div className="px-6 pt-12 pb-6 flex items-center relative w-fit">
//           <h1 className="text-2xl font-semibold text-coffee relative">
//             Notifikasi
//             {notifications.some((n) => !n.read) && (
//               <div className="absolute -top-2 -right-6 w-5 h-5 bg-golden rounded-full flex items-center justify-center">
//                 <span className="text-[10px] text-white font-semibold">
//                   {notifications.filter((n) => !n.read).length}
//                 </span>
//               </div>
//             )}
//           </h1>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto pl-8 pr-0 pb-20 space-y-0">
//           {notifications.map((notif, index) => (
//             <div
//               key={notif.id}
//               className={`p-4 ${notif.read ? "bg-parchment" : "bg-white"} ${
//                 index === 0 ? "rounded-tl-2xl" : ""
//               } ${
//                 index === notifications.length - 1
//                   ? "rounded-b-2xl"
//                   : "border-b border-linen"
//               }`}
//             >
//               <div className="flex justify-between items-start">
//                 <div className="flex gap-3 flex-1">
//                   <BiSolidBellRing
//                     className={`w-5 h-5 mt-0.5 stroke-2 ${
//                       notif.type === "warning" ? "text-chili" : "text-coffee"
//                     }`}
//                   />
//                   <div className="flex-1">
//                     <h3
//                       className={`font-semibold text-base leading-tight ${
//                         notif.type === "warning" ? "text-chili" : "text-stone"
//                       }`}
//                     >
//                       {notif.title}
//                     </h3>
//                     <p className="text-sm text-ash mt-1 leading-relaxed">
//                       {notif.message}
//                     </p>
//                   </div>
//                 </div>
//                 <span className="text-xs text-gray-light ml-2 mt-0.5">
//                   {notif.time}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { BiSolidBellRing } from "react-icons/bi";
// import { useRouter } from "next/router";

// // 1. Definisikan tipe notifikasi
// type NotificationItem = {
//   id: number;
//   type: "warning" | "info";
//   title: string;
//   message: string;
//   time: string;
//   read: boolean;
// };

// export default function NotificationPage() {
//   const [notifications, setNotifications] = useState<NotificationItem[]>([]);
//   const [placeName, setPlaceName] = useState("tempat ini");
//   const router = useRouter();
//   // const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
//   //   null
//   // );

//   useEffect(() => {
//     let entryLocation: { lat: number; lng: number } | null = null;
//     let timer: ReturnType<typeof setTimeout> | null = null;

//     const getDistance = (
//       lat1: number,
//       lng1: number,
//       lat2: number,
//       lng2: number
//     ) => {
//       const toRad = (value: number) => (value * Math.PI) / 180;
//       const R = 6371e3;
//       const φ1 = toRad(lat1);
//       const φ2 = toRad(lat2);
//       const Δφ = toRad(lat2 - lat1);
//       const Δλ = toRad(lng2 - lng1);

//       const a =
//         Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
//         Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
//       const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

//       return R * c;
//     };

//     const startTimer = (location: { lat: number; lng: number }) => {
//       timer = setTimeout(() => {
//         fetch("/api/generate-story", {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify(location),
//         })
//           .then((res) => res.json())
//           .then((data) => {
//             alert(data.story);
//           })
//           .catch(console.error);
//       }, 3 * 60 * 1000);
//     };

//     const watchId = navigator.geolocation.watchPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         const currentLocation = { lat: latitude, lng: longitude };

//         console.log("Current Location:", latitude, longitude);
//         // setLocation(currentLocation);

//         if (!entryLocation) {
//           entryLocation = currentLocation;
//           startTimer(currentLocation);

//           // 🔥 Fetch notifikasi saat pertama kali dapat lokasi
//           try {
//             const response = await fetch(
//               "https://jejaklokal-601258514414.europe-west1.run.app/get-content",
//               {
//                 method: "POST",
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   email: "risa.lestari@gmail.com",
//                   lat: currentLocation.lat,
//                   long: currentLocation.lng,
//                 }),
//               }
//             );

//             const data = await response.json();
//             setPlaceName(placeName || "tempat ini");

//             const customNotifs: NotificationItem[] = [];

//             if (data.has_customs && data.customs_list?.length) {
//               customNotifs.push({
//                 id: 1,
//                 type: "warning",
//                 title: "Langkahmu diawasi!",
//                 message: `Hati-hati ya, di ${placeName}, ada kebiasaan lokal yang wajib dihormati.`,
//                 time: "11:00",
//                 read: false,
//               });
//             }

//             customNotifs.push({
//               id: 2,
//               type: "info",
//               title: data.hook || "Waktu pernah berhenti di sini!",
//               message: `Setiap tempat punya suara, dan ${placeName} lagi bisikin sesuatu ke kamu.`,
//               time: "11:00",
//               read: false,
//             });

//             setNotifications(customNotifs);
//           } catch (error) {
//             console.error("Gagal fetch notifikasi:", error);
//           }
//         } else {
//           const dist = getDistance(
//             entryLocation.lat,
//             entryLocation.lng,
//             latitude,
//             longitude
//           );
//           if (dist > 100) {
//             if (timer) clearTimeout(timer);
//             entryLocation = currentLocation;
//             startTimer(currentLocation);
//           }
//         }
//       },
//       (err) => {
//         console.error("GPS error:", err);
//       },
//       {
//         enableHighAccuracy: true,
//         maximumAge: 5000,
//         timeout: 10000,
//       }
//     );

//     return () => {
//       if (timer) clearTimeout(timer);
//       navigator.geolocation.clearWatch(watchId);
//     };
//   }, []);

//   return (
//     <div className="w-full min-h-screen flex items-center justify-center bg-black">
//       <div className="w-full max-w-sm h-[95vh] bg-sand flex flex-col rounded-xl shadow-xl">
//         {/* Header */}
//         <div className="px-6 pt-12 pb-6 flex items-center relative w-fit">
//           <h1 className="text-2xl font-semibold text-coffee relative">
//             Notifikasi
//             {notifications.some((n) => !n.read) && (
//               <div className="absolute -top-2 -right-6 w-5 h-5 bg-golden rounded-full flex items-center justify-center">
//                 <span className="text-[10px] text-white font-semibold">
//                   {notifications.filter((n) => !n.read).length}
//                 </span>
//               </div>
//             )}
//           </h1>
//         </div>

//         {/* Content */}
//         <div className="flex-1 overflow-y-auto pl-8 pr-0 pb-20 space-y-0">
//           {notifications.map((notif, index) => (
//             <div
//               key={notif.id}
//               className={`p-4 ${notif.read ? "bg-parchment" : "bg-white"} ${
//                 index === 0 ? "rounded-tl-2xl" : ""
//               } ${
//                 index === notifications.length - 1
//                   ? "rounded-b-2xl"
//                   : "border-b border-linen"
//               }`}
//               onClick={() => router.push(`/stories/${notif.id}`)}
//             >
//               <div className="flex justify-between items-start">
//                 <div className="flex gap-3 flex-1">
//                   <BiSolidBellRing
//                     className={`w-5 h-5 mt-0.5 stroke-2 ${
//                       notif.type === "warning" ? "text-chili" : "text-coffee"
//                     }`}
//                   />
//                   <div className="flex-1">
//                     <h3
//                       className={`font-semibold text-base leading-tight ${
//                         notif.type === "warning" ? "text-chili" : "text-stone"
//                       }`}
//                     >
//                       {notif.title}
//                     </h3>
//                     <p className="text-sm text-ash mt-1 leading-relaxed">
//                       {notif.message}
//                     </p>
//                   </div>
//                 </div>
//                 <span className="text-xs text-gray-light ml-2 mt-0.5">
//                   {notif.time}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { BiSolidBellRing } from "react-icons/bi";
import { useRouter } from "next/router";
// import EmptyNotificationPage from "@/components/EmptyNotificationPage";

type NotificationItem = {
  id: string;
  type: "warning" | "info";
  title: string;
  message: string;
  time: string;
  is_read: boolean;
  is_historical: boolean;
};

export default function NotificationPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    console.log("mulai");
    let entryPoint: { lat: number; lng: number } | null = null;
    let timer: NodeJS.Timeout | null = null;

    const getDistance = (
      lat1: number,
      lng1: number,
      lat2: number,
      lng2: number
    ) => {
      const R = 6371e3;
      const toRad = (v: number) => (v * Math.PI) / 180;
      const dLat = toRad(lat2 - lat1);
      const dLng = toRad(lng2 - lng1);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    };

    const triggerNotificationFetch = async (location: {
      lat: number;
      lng: number;
    }) => {
      try {
        console.log(location, "loc");
        const res = await fetch(
          "https://jejaklokal-601258514414.europe-west1.run.app/get-content",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: "risa.lestari@gmail.com",
              lat: location.lat,
              long: location.lng,
            }),
          }
        );
        console.log(res.json());
      } catch (err) {
        console.error("Gagal fetch notifikasi:", err);
      }
    };

    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const currentLocation = { lat: latitude, lng: longitude };

        if (!entryPoint) {
          entryPoint = currentLocation;

          console.log(currentLocation, "cur loc");

          timer = setTimeout(() => {
            triggerNotificationFetch(currentLocation);
          }, 5 * 60 * 1000); // 5 menit
        } else {
          const distance = getDistance(
            entryPoint.lat,
            entryPoint.lng,
            currentLocation.lat,
            currentLocation.lng
          );

          if (distance > 100) {
            // Jika keluar dari radius sebelum 5 menit
            console.log(distance, " dist");
            if (timer) clearTimeout(timer);

            entryPoint = currentLocation;
            timer = setTimeout(() => {
              triggerNotificationFetch(currentLocation);
            }, 5 * 60 * 1000);
          }
        }
      },
      (err) => console.error("Geolocation error:", err),
      {
        enableHighAccuracy: true,
        maximumAge: 3000,
        timeout: 10000,
      }
    );

    return () => {
      if (timer) clearTimeout(timer);
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  useEffect(() => {
    const fetchNotifications = async () => {
      const email = localStorage.getItem("userEmail");

      if (!email) {
        console.warn("Email tidak ditemukan di localStorage");
        return;
      }

      try {
        const response = await fetch(
          "https://jejaklokal-601258514414.europe-west1.run.app/get-all-notifs",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(email),
          }
        );

        const raw = await response.text();
        const data = JSON.parse(raw);

        if (Array.isArray(data)) {
          data.sort(
            (a, b) =>
              new Date(b.created_at).getTime() -
              new Date(a.created_at).getTime()
          );

          const formatted: NotificationItem[] = [];

          data.forEach((item) => {
            if (item.has_customs === true) {
              formatted.push({
                id: item.id,
                type: "warning",
                title: "Perhatikan Adat Setempat",
                message: `Di ${item.location_name}, ada adat yang harus kamu hormati.`,
                time: new Date(item.created_at).toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                }),
                is_read: item.is_read === true,
                is_historical: item.is_historical,
              });
            }

            formatted.push({
              id: item.id,
              type: "info",
              title: item.hook || "Cerita menarik di sekitarmu!",
              message: `Setiap tempat punya suara, dan ${item.location_name} lagi bisikin sesuatu ke kamu.`,
              time: new Date(item.created_at).toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }),
              is_read: item.is_read === true,
              is_historical: item.is_historical,
            });
          });

          setNotifications(formatted);
        } else {
          console.error("Format data tidak sesuai:", data);
        }
      } catch (err) {
        console.error("Gagal ambil notifikasi:", err);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm h-[95vh] bg-sand flex flex-col rounded-xl shadow-xl">
        <div className="px-6 pt-12 pb-6 flex items-center relative w-fit">
          <h1 className="text-2xl font-semibold text-coffee relative">
            Notifikasi
            {notifications.filter((n) => !n.is_read).length > 0 && (
              <div className="absolute -top-2 -right-6 w-5 h-5 bg-golden rounded-full flex items-center justify-center">
                <span className="text-[10px] text-white font-semibold">
                  {notifications.filter((n) => !n.is_read).length}
                </span>
              </div>
            )}
          </h1>
        </div>

        <div className="flex-1 overflow-y-auto pl-8 pr-0 pb-20 space-y-0">
          {notifications.map((notif, index) => (
            <div
              key={notif.id}
              className={`p-4 cursor-pointer transition-colors duration-200 ${
                notif.is_read ? "bg-parchment" : "bg-white"
              } ${index === 0 ? "rounded-tl-2xl" : ""} ${
                index === notifications.length - 1
                  ? "rounded-b-2xl"
                  : "border-b border-linen"
              }`}
              // ketika onclick maka update /update-read-status dengan passing notify.id nya ke https://jejaklokal-601258514414.europe-west1.run.app/update-read-status

              onClick={async () => {
                try {
                  await fetch(
                    "https://jejaklokal-601258514414.europe-west1.run.app/update-read-status",
                    {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify(notif.id),
                    }
                  );

                  // Update local state
                  setNotifications((prev) =>
                    prev.map((n) =>
                      n.id === notif.id ? { ...n, is_read: true } : n
                    )
                  );

                  router.push(`/stories/${notif.id}`);
                } catch (err) {
                  console.error("Gagal update status baca:", err);
                }
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3 flex-1">
                  <BiSolidBellRing
                    className={`w-5 h-5 mt-0.5 stroke-2 ${
                      notif.type === "warning" ? "text-chili" : "text-coffee"
                    }`}
                  />
                  <div className="flex-1">
                    <h3
                      className={`font-semibold text-base leading-tight ${
                        notif.type === "warning" ? "text-chili" : "text-stone"
                      }`}
                    >
                      {notif.title}
                    </h3>
                    <p className="text-sm text-ash mt-1 leading-relaxed">
                      {notif.message}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-light ml-2 mt-0.5">
                  {notif.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
