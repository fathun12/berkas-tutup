// Kasus 1: Laci Kasir. Mekanik: coret.
// palsu: true  = kalimat tidak bisa dipercaya (harus dicoret).
// palsu: false = kalimat benar (mencoretnya memotong kredibilitas).
export default {
  no: 1,
  judul: 'Laci Kasir',
  tempat: 'Toko Sinar Baru',
  tanggal: '14 Maret 1987',
  mekanik: 'coret',
  ringkas: 'Uang laci kasir raib pada malam hari. Tidak ada pintu atau laci yang dirusak. Tiga orang punya akses ke toko.',
  bukti: [
    { kode: 'B-1', teks: 'Laci terbuka tanpa bekas paksa. Pintu depan dan pintu belakang terkunci dan utuh.' },
    { kode: 'B-2', teks: 'Mesin kasir mencatat laci dibuka tanpa transaksi pada pukul 22.15.' },
    { kode: 'B-3', teks: 'Buku pos ronda: Mas Joko keluar kompleks pukul 19.10 dan tidak tercatat masuk lagi. Lampu bilik gudang masih menyala pukul 22.10.' },
    { kode: 'B-4', teks: 'Sopir angkot terakhir (pukul 21.40) mencatat Bu Ratna naik. Tidak ada angkot setelahnya.' }
  ],
  laporan: [
    {
      saksi: 'Bu Ratna',
      peran: 'kasir',
      kalimat: [
        { id: 's1', teks: 'Saya mengunci pintu depan pukul 21.30, lalu pulang naik angkot terakhir.', palsu: false },
        { id: 's2', teks: 'Kunci laci hanya ada pada saya dan Pak Darto.', palsu: false }
      ]
    },
    {
      saksi: 'Mas Joko',
      peran: 'pengantar barang',
      kalimat: [
        { id: 's3', teks: 'Saya menurunkan barang sore hari, lalu keluar kompleks pukul 19.10.', palsu: false },
        { id: 's4', teks: 'Saya melihat Bu Ratna masih menghitung uang di toko pukul 22.15.', palsu: true }
      ]
    },
    {
      saksi: 'Pak Darto',
      peran: 'penjaga gudang',
      kalimat: [
        { id: 's5', teks: 'Mas Joko kembali ke gudang pukul 22.00 dan menunggu di depan bilik saya.', palsu: true },
        { id: 's6', teks: 'Saya sudah pulang ke rumah sebelum toko tutup.', palsu: true },
        { id: 's7', teks: 'Malam itu saya tidur di bilik gudang. Pintu bilik tembus ke ruang toko.', palsu: false }
      ]
    }
  ],
  tersangka: [
    { id: 'a', nama: 'Bu Ratna' },
    { id: 'b', nama: 'Pak Darto' },
    { id: 'c', nama: 'Mas Joko' }
  ],
  pelaku: 'b',
  batas: 60
};