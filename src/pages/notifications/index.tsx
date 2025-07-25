/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
// import Image from "next/image";

// export default function NotificationPage() {
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

// pages/notifications/index.tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import EmptyNotificationPage from "../components/EmptyNotificationPage";

type NotificationItem = {
  id: string;
  has_customs: string;
  customs_list?: any[];
  location_name: string;
  hook?: string;
};

export default function NotificationWrapper() {
  const [loading, setLoading] = useState(true);
  const [hasNotif, setHasNotif] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchNotifications = async () => {
      const email = localStorage.getItem("userEmail");

      if (!email) {
        console.warn("Email tidak ditemukan di localStorage");
        setLoading(false);
        return;
      }

      console.log(email, "emailnya");

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

        console.log(data, "  data");

        if (Array.isArray(data) && data.length > 0) {
          setHasNotif(true);
          router.replace("/notifications/list");
        } else {
          setHasNotif(false);
          setLoading(false);
        }
      } catch (err) {
        console.error("Gagal ambil notifikasi:", err);
        setHasNotif(false);
        setLoading(false);
      }
    };

    fetchNotifications();
  }, [router]);

  if (loading) return null;

  return <EmptyNotificationPage />;
}
