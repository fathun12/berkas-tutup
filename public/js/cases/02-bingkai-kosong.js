// Kasus 2: Bingkai Kosong. Mekanik: jam.
// menit = menit sejak tengah malam. 1260 = 21.00. Jam tidak ditampilkan
// sebelum kejadian disusun benar; pemain menghitungnya dari bukti.
export default {
  no: 2,
  judul: 'Bingkai Kosong',
  tempat: 'Galeri Kartika',
  tanggal: '2 Juni 1989',
  mekanik: 'jam',
  ringkas: 'Lukisan "Perahu Senja" lenyap dari bingkainya di ruang utama. Bingkainya masih tergantung, kosong. Susun urutan kejadian malam itu, lalu cocokkan dengan alibi.',
  bukti: [
    { kode: 'B-1', teks: 'Buku jaga: pintu utama galeri dikunci pukul 21.00.' },
    { kode: 'B-2', teks: 'Panel alarm: ruang lukisan dinonaktifkan pukul 21.40.' },
    { kode: 'B-3', teks: 'Sensor getar bingkai berbunyi 7 menit setelah alarm dinonaktifkan.' },
    { kode: 'B-4', teks: 'Lampu ruang lukisan padam 3 menit sebelum sensor getar berbunyi.' },
    { kode: 'B-5', teks: 'Sensor pintu belakang mencatat pintu dibuka dari dalam 8 menit setelah sensor getar berbunyi.' },
    { kode: 'B-6', teks: 'Alarm hanya bisa dinonaktifkan dengan kunci panel. Kunci itu dipegang tiga orang: Pak Hendra, Bu Sari, dan Mas Dimas.' },
    { kode: 'B-7', teks: 'Gerbang kompleks mencatat Pak Hendra keluar pukul 21.20 dan tidak masuk lagi malam itu. Struk toko seberang mencatat Bu Sari membayar di kasir pukul 21.43 dan masih berada di toko itu pukul 21.50.' },
    { kode: 'B-8', teks: 'Mas Dimas mengaku sendirian di ruang istirahat sejak pukul 21.00. Tidak ada saksi.' }
  ],
  kejadian: [
    { id: 'k4', menit: 1307, teks: 'Lukisan diangkat dari bingkai (sensor getar berbunyi).' },
    { id: 'k1', menit: 1260, teks: 'Penjaga mengunci pintu utama galeri.' },
    { id: 'k5', menit: 1315, teks: 'Pintu belakang dibuka dari dalam.' },
    { id: 'k3', menit: 1304, teks: 'Lampu ruang lukisan padam.' },
    { id: 'k2', menit: 1300, teks: 'Alarm ruang lukisan dinonaktifkan dari panel.' }
  ],
  tersangka: [
    { id: 'a', nama: 'Pak Hendra' },
    { id: 'b', nama: 'Bu Sari' },
    { id: 'c', nama: 'Mas Dimas' }
  ],
  pelaku: 'c',
  batas: 75
};