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
      <div className="w-full h-screen flex items-center justify-center text-[#675549]">
        Memuat cerita...
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-sm h-[95vh] bg-sand flex flex-col rounded-xl shadow-xl">
        {/* Header */}
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

        {/* Judul */}
        <div className="px-6 pb-4">
          <h1 className="text-2xl font-bold text-[#675549]">Jejak Cerita</h1>
        </div>

        {/* Lokasi */}
        <div className="px-6 pb-4 flex items-center gap-2">
          <CiLocationOn className="w-5 h-5 text-red-500 fill-red-500" />
          <span className="text-base font-medium text-[#675549]">
            {story.location_name}
          </span>
        </div>

        {/* Konten */}
        <div className="flex-1 px-6 pb-6">
          <div className="bg-white rounded-3xl p-6 h-[65vh] flex flex-col">
            <h2 className="text-xl font-bold text-[#675549] leading-tight mb-6 text-center">
              {story.hook}
            </h2>

            {/* Tag */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {["Folklore", "History", "Festivals & Rituals"].map(
                (tag, index) => (
                  <span
                    key={index}
                    className="px-4 py-1 rounded-full border border-[#C4A574] text-[#675549] text-xs"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>

            {/* Deskripsi Placeholder */}
            <div className="overflow-y-auto pr-2 flex-1">
              <div className="space-y-4">
                <p className="text-sm text-[#4A4A4A] leading-relaxed">
                  Cerita menarik seputar <strong>{story.location_name}</strong>{" "}
                  akan ditampilkan di sini berdasarkan data dari notifikasi.
                  Silakan integrasikan deskripsi lengkap berdasarkan struktur
                  backend jika tersedia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
