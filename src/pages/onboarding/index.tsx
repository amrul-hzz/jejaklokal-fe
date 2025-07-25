import { MapPin } from "lucide-react";
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
            <MapPin className="w-5 h-5 text-[#6B5B47] fill-[#6B5B47] mb-1" />
            <span className="text-xs font-medium text-[#6B5B47]">
              Jejak Lokal
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-row items-center justify-between px-6">
          {/* Illustration */}

          {/* Main Text */}
          <div className="mr-5 text-left w-1/4">
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
          <div className="">
            <Image
              src="/assets/hiker-illustration.png"
              alt="Hiker illustration"
              width={280}
              height={320}
              className="w-[300px] h-[400px]"
            />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="bg-white rounded-t-3xl px-6 py-12 mt-auto">
          {/* Welcome Text */}
          <p className="text-sm text-[#6B5B47] mb-4 text-center">
            Selamat datang! Masukan email mu disini
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
          <button
            onClick={handleLogin}
            className="w-full bg-[#6B5B47] text-white py-3 rounded-xl font-semibold text-base hover:bg-[#5A4A3D] transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
