"use client";

import { useEffect, useState } from "react";

export default function LocationTracker() {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    let entryLocation: { lat: number; lng: number } | null = null;
    let timer: ReturnType<typeof setTimeout> | null = null;

    const getDistance = (
      lat1: number,
      lng1: number,
      lat2: number,
      lng2: number
    ) => {
      const toRad = (value: number) => (value * Math.PI) / 180;
      const R = 6371e3;
      const φ1 = toRad(lat1);
      const φ2 = toRad(lat2);
      const Δφ = toRad(lat2 - lat1);
      const Δλ = toRad(lng2 - lng1);

      const a =
        Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
        Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      return R * c;
    };

    const startTimer = (location: { lat: number; lng: number }) => {
      timer = setTimeout(() => {
        fetch("/api/generate-story", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(location),
        })
          .then((res) => res.json())
          .then((data) => {
            alert(data.story);
          })
          .catch(console.error);
      }, 3 * 60 * 1000);
    };

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        console.log("Current Location:", latitude, longitude);
        setLocation({ lat: latitude, lng: longitude });

        if (!entryLocation) {
          entryLocation = { lat: latitude, lng: longitude };
          startTimer(entryLocation);
        } else {
          const dist = getDistance(
            entryLocation.lat,
            entryLocation.lng,
            latitude,
            longitude
          );
          if (dist > 100) {
            if (timer) clearTimeout(timer);
            entryLocation = { lat: latitude, lng: longitude };
            startTimer(entryLocation);
          }
        }
      },
      (err) => {
        console.error("GPS error:", err);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 5000,
        timeout: 10000,
      }
    );

    return () => {
      if (timer) clearTimeout(timer);
      navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">🗺️ Location Tracker Active</h1>
      <p className="text-gray-600">
        Stay in one place for 3 minutes to hear a story.
      </p>

      {location && (
        <div className="mt-4">
          <p>📍 Latitude: {location.lat}</p>
          <p>📍 Longitude: {location.lng}</p>
        </div>
      )}
    </main>
  );
}
