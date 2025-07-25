"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (!email) return;

    // Simpan ke localStorage supaya bisa diakses di halaman lain
    localStorage.setItem("userEmail", email);

    // Arahkan ke halaman notifikasi
    router.push("/notifications");
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm h-[95vh] bg-sand flex flex-col rounded-xl shadow-xl">
        {/* Header with Logo */}
        <div className="relative px-6 pt-6 pb-8">
          <div className="absolute top-6 right-6 flex flex-col items-center">
            <Image
              src="/assets/logo.svg"
              alt="Logo Jejak Lokal"
              width={32}
              height={32}
              className="mb-1 w-14"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-row items-center justify-between px-6">
          {/* Illustration */}

          {/* Main Text */}
          <div className="mr-5 -mt-80 text-left w-1/4">
            <h1 className="text-3xl font-bold text-[#6B5B47] leading-tight">
              Jelajahi.
            </h1>
            <h1 className="text-3xl font-bold text-[#6B5B47] leading-tight">
              Dengarkan.
            </h1>
            <h1 className="text-3xl font-bold text-[#6B5B47] leading-tight">
              Rasakan.
            </h1>
          </div>
          <div className="pl-24 absolute bottom-60 z-10">
            <Image
              src="/assets/motorcycles.svg"
              alt="Hiker illustration"
              width={280}
              height={320}
              className="w-[220px] h-200px] object-contain"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-white rounded-t-3xl rounded-b-xl px-6 py-14 mt-auto">
          {/* Welcome Text */}
          <p className="text-md text-coffee mb-4 font-semibold text-center">
            Selamat datang! Yuk, masukan email mu!
          </p>

          {/* Email Input */}
          <div className="mb-6">
            <input
              type="email"
              placeholder="Ketik email mu disini"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-[#C4A574] bg-transparent text-[#6B5B47] placeholder-[#A0A0A0] focus:outline-none focus:border-[#6B5B47] text-sm"
            />
          </div>

          {/* Login Button */}
          <div className="flex justify-center">
            <button
              onClick={handleLogin}
              className="w-1/3 bg-[#6B5B47] text-white py-3 rounded-xl font-semibold text-base hover:bg-[#5A4A3D] transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
