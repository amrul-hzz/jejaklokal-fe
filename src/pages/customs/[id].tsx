"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import { CiLocationOn } from "react-icons/ci";

export default function JejakCeritaPage() {
  const router = useRouter();
  const { id } = router.query;

  const [story, setStory] = useState<{
    location_name: string;
    hook: string;
    customs_list: string[];
  } | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchStory = async () => {
      try {
        const response = await fetch(
          "https://jejaklokal-601258514414.europe-west1.run.app/get-notif-by-id",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(id),
          }
        );

        const textData = await response.text();
        const data = JSON.parse(textData);

        setStory(data);
      } catch (err) {
        console.error("Gagal mengambil cerita:", err);
      }
    };

    fetchStory();
  }, [id]);

  if (!story) {
    return (
      <div className="w-full h-screen flex items-center justify-center text-coffee">
        Memuat cerita...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm h-[95vh] bg-sand flex flex-col rounded-xl shadow-xl">
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <ArrowLeft
            className="w-6 h-6 text-[#675549] cursor-pointer"
            onClick={() => router.back()}
          />

          <Image
            src="/assets/logo.svg"
            alt="Logo Jejak Lokal"
            width={56}
            height={56}
            className="w-14 h-14"
          />
        </div>

        <div className="px-6 pb-4">
          <div className="flex items-center gap-3 relative w-fit">
            <h1 className="text-2xl font-bold text-coffee">Adat Lokal</h1>

            <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-white font-semibold leading-none">
                !
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6 flex items-center gap-2">
          <CiLocationOn className="w-5 h-5 text-red-500 fill-red-500" />
          <span className="text-base font-medium text-coffee">
            {story.location_name}
          </span>
        </div>

        <div className="flex-1 px-6 pb-6">
          <div className="bg-white rounded-3xl p-6 h-[65vh] flex flex-col">
            <h2 className="text-xl font-bold text-coffee leading-tight mb-6 text-center">
              {story.hook}
            </h2>

            <div className="overflow-y-auto pr-2 flex-1">
              <div className="space-y-4">
                <p className="text-sm text-[#4A4A4A] leading-relaxed text-justify">
                  Beberapa tempat punya aturan tak tertulis yang penting untuk
                  dihormati. Sebelum menjelajah lebih jauh, yuk kenali dulu{" "}
                  <strong>adat dan kebiasaan setempat</strong> berikut ini:
                </p>

                <div className="space-y-4 mt-6">
                  {story.customs_list.map((custom, index) => (
                    <div key={index} className="flex gap-3">
                      <span className="text-sm font-semibold text-[#4A4A4A] min-w-[20px]">
                        {index + 1}.
                      </span>
                      <p className="text-sm text-[#4A4A4A] leading-relaxed text-justify">
                        {custom}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
