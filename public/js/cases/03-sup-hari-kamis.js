// Kasus 3: Sup Hari Kamis. Mekanik: benang.
// hubungan = benang yang benar (6). Pasangan lain salah dan memotong kredibilitas.
export default {
  no: 3,
  judul: 'Sup Hari Kamis',
  tempat: 'Rumah Kos Melati',
  tanggal: '9 Agustus 1990',
  mekanik: 'benang',
  ringkas: 'Sup makan malam di kos dicampur obat pencahar sehingga seisi rumah sakit perut. Satu orang sengaja melakukannya. Tarik benang antarbukti, lalu tunjuk pelakunya.',
  bukti: [
    { kode: 'B-1', teks: 'Hasil periksa: sup di panci mengandung obat pencahar.' },
    { kode: 'B-2', teks: 'Sup selesai dimasak pukul 16.00. Panci lalu ditinggal tanpa tutup di dapur sampai 17.30.' },
    { kode: 'B-3', teks: 'Struk apotek bertanggal Kamis pagi mencatat pembelian obat pencahar. Pembeli menandatangani "A.W." dan menurut penjaga apotek pembelinya laki-laki.' },
    { kode: 'B-4', teks: 'Penghuni kos: Bu Warti, Pak Anwar Wibowo, dan Mbak Lastri.' },
    { kode: 'B-5', teks: 'Buku dapur: Bu Warti masuk 15.30 dan keluar 16.00. Pak Anwar masuk 17.00 untuk mengambil air. Mbak Lastri tidak tercatat masuk.' },
    { kode: 'B-6', teks: 'Karcis parkir pasar: Bu Warti tiba di pasar pukul 16.05 dan pulang pukul 18.00.' }
  ],
  simpul: [
    { id: 'panci', nama: 'Panci sup', jenis: 'barang' },
    { id: 'obat', nama: 'Obat pencahar', jenis: 'barang' },
    { id: 'struk', nama: 'Struk apotek', jenis: 'barang' },
    { id: 'dapur', nama: 'Dapur', jenis: 'tempat' },
    { id: 'warti', nama: 'Bu Warti', jenis: 'orang' },
    { id: 'anwar', nama: 'Pak Anwar', jenis: 'orang' },
    { id: 'lastri', nama: 'Mbak Lastri', jenis: 'orang' }
  ],
  hubungan: [
    { a: 'panci', b: 'obat', alasan: 'Hasil periksa: sup di panci mengandung obat pencahar.' },
    { a: 'panci', b: 'dapur', alasan: 'Panci ditinggal tanpa tutup di dapur pukul 16.00 sampai 17.30.' },
    { a: 'obat', b: 'struk', alasan: 'Struk apotek mencatat pembelian obat pencahar pada Kamis pagi.' },
    { a: 'struk', b: 'anwar', alasan: 'Struk ditandatangani "A.W." oleh pembeli laki-laki: Anwar Wibowo.' },
    { a: 'dapur', b: 'anwar', alasan: 'Pak Anwar masuk dapur pukul 17.00, saat panci masih terbuka.' },
    { a: 'dapur', b: 'warti', alasan: 'Bu Warti masuk dapur pukul 15.30 dan keluar 16.00, sebelum panci ditinggal terbuka.' }
  ],
  tersangka: [
    { id: 'a', nama: 'Bu Warti' },
    { id: 'b', nama: 'Pak Anwar' },
    { id: 'c', nama: 'Mbak Lastri' }
  ],
  pelaku: 'b',
  batas: 90
};