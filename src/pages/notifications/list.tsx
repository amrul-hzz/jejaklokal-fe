import { useEffect, useState } from "react";
import { TiBell } from "react-icons/ti";
import { useRouter } from "next/router";
import Image from "next/image";

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

        <div className="px-6 pb-6 flex items-center relative w-fit">
          {notifications.filter((n) => !n.is_read).length > 0 && (
            <div className="absolute -top-2 -right-6 w-5 h-5 bg-golden rounded-full flex items-center justify-center">
              <span className="text-[14px] text-white font-semibold">
                {notifications.filter((n) => !n.is_read).length}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto pl-8 pr-0 pb-20 space-y-0">
          {notifications.map((notif, index) => (
            <div
              key={notif.id}
              className={`p-4 cursor-pointer transition-colors duration-200 ${
                notif.is_read ? "bg-parchment" : "bg-white hover:bg-coffee/10"
              } ${index === 0 ? "rounded-tl-2xl" : ""} ${
                index === notifications.length - 1
                  ? "rounded-b-2xl"
                  : "border-b border-linen"
              }`}
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

                  // Redirect berdasarkan type
                  if (notif.type === "warning") {
                    router.push(`/customs/${notif.id}`);
                  } else {
                    router.push(`/stories/${notif.id}`);
                  }
                } catch (err) {
                  console.error("Gagal update status baca:", err);
                }
              }}
            >
              <div className="flex justify-between items-start">
                <div className="flex gap-3 flex-1">
                  <TiBell
                    className={`w-7 h-7 mt-0.5 stroke-2 ${
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
