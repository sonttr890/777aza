export default function About() {
  return (
    <div className="prose">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">About Sonic AI</h2>
      <p className="text-gray-600">
        Sonic AI adalah aplikasi tanya jawab berbasis AI yang menggunakan Google
        Gemini API untuk memberikan jawaban yang akurat dan informatif. Aplikasi
        ini dibuat oleh sonttr777 sebagai proyek hobi untuk membantu pengguna
        mendapatkan jawaban cepat atas pertanyaan mereka.
      </p>
      <p className="text-gray-600">
        Fitur utama:
      </p>
      <ul className="list-disc pl-5 text-gray-600">
        <li>Form input untuk mengajukan pertanyaan</li>
        <li>Validasi input untuk memastikan pertanyaan tidak kosong</li>
        <li>Respons AI dengan label "Sonic AI Response"</li>
        <li>Pesan error yang ramah pengguna jika terjadi masalah</li>
        <li>Desain bersih dengan animasi halus</li>
      </ul>
    </div>
  );
}
