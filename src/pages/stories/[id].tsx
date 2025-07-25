import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ArrowLeft, MapPin } from "lucide-react";
import { FaMapMarkerAlt } from "react-icons/fa";

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
      <div className="w-full max-w-sm min-h-screen bg-[#FFF2E1] flex flex-col">
        {/* Header */}
        <div className="px-6 pt-6 pb-4 flex items-center justify-between">
          <ArrowLeft
            className="w-5 h-5 text-[#675549] cursor-pointer"
            onClick={() => router.back()}
          />
          <div className="flex flex-col items-center">
            <FaMapMarkerAlt className="w-4 h-4 text-[#675549]" />
            <span className="text-sm font-medium text-[#675549]">Jejak</span>
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-[#675549]">Lokal</span>
            </div>
          </div>
        </div>

        {/* Judul */}
        <div className="px-6 pb-4">
          <h1 className="text-2xl font-bold text-[#675549]">Jejak Cerita</h1>
        </div>

        {/* Lokasi */}
        <div className="px-6 pb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#C4A574]" />
          <span className="text-base font-medium text-[#675549]">
            {story.location_name}
          </span>
        </div>

        {/* Konten */}
        <div className="flex-1 px-6 pb-6">
          <div className="bg-white rounded-3xl p-6 h-[73vh] flex flex-col">
            <h2 className="text-xl font-bold text-[#675549] leading-tight mb-6 text-center">
              {story.hook}
            </h2>

            {/* Tag */}
            <div className="flex flex-wrap gap-2 justify-center mb-6">
              {story.customs_list.map((tag, index) => (
                <span
                  key={index}
                  className="px-4 py-1 rounded-full border border-[#C4A574] text-[#675549] text-xs"
                >
                  {tag}
                </span>
              ))}
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
