# BERKAS TUTUP: Aturan Kerja dan Fase Pekerjaan

Dokumen ini wajib dibaca AI sebelum menjawab apa pun di proyek ini.
Pemilik proyek menulis semua file sendiri di VS Code (Windows, PowerShell 5.1). AI hanya memberi rancangan, penjelasan, dan kode di chat.

---

## 1. Aturan Kerja (wajib)

1. **Diskusi dulu, kerja kemudian.** Setiap fase: AI mengusulkan, pemilik menjawab "lanjut", baru AI mengerjakan. Dilarang melompat ke kode.
2. **Dilarang membuat file lewat tool.** Kode ditulis di chat. Pemilik yang menempelnya ke file.
3. **Putaran besar.** Setelah pemilik menjawab "lanjut", AI mengerjakan 2 sampai 3 fase berurutan sekaligus, bukan satu. Pemilik menolak putaran kecil karena boros token dan jatah. Jangan mengerjakan fase di luar putaran itu tanpa diminta.
4. **Dilarang menambah tawaran, saran, atau fitur yang tidak diminta.** Jawab yang ditanya, lalu berhenti.
5. **Dilarang sok tahu.** Kalau tidak yakin, ajukan satu pertanyaan pendek. Jangan menebak lalu membangun di atas tebakan.
6. **Hemat token.** Tanpa basa-basi, tanpa pengulangan, tanpa ringkasan penutup yang mengulang isi jawaban.
7. **Bahasa Indonesia**, nada lurus. Jangan membalas kemarahan dengan permintaan maaf panjang. Akui kesalahan dalam satu kalimat, lalu perbaiki.
8. **Tanpa AI slop.** Tidak ada font bawaan, kartu bulat seragam, gradien dekoratif, atau label huruf kapital berderet. Rujukan desain: dokumen kantor, stempel, mesin ketik, brutalisme. Palet tetap di `tokens.css`.

## 2. Format Jawaban

### 2.1 Membuat folder dan file baru
Selalu dua bagian, berurutan:
1. Tree folder yang akan dibuat (blok kode).
2. **Satu** blok PowerShell 5.1 yang membuat seluruh folder dan seluruh file kosong sekaligus.

Tidak boleh membuat folder atau file satu per satu di beberapa blok.

### 2.2 Mengubah file yang sudah ada
Format wajib, tanpa variasi:

```
File: public/js/core/engine.js

SEBELUM
(blok kode utuh, seluruh fungsi atau seluruh blok CSS, bukan potongan)

SESUDAH
(blok kode utuh pengganti)
```

- Blok harus lengkap sampai kurung penutup. Dilarang memakai `...` atau "kode lainnya tetap".
- Kalau perubahan menyentuh lebih dari separuh file, kirim isi file penuh.
- Sebutkan jelas: path file, lalu apa yang diganti.

### 2.3 File baru
Kirim isi file penuh dalam satu blok kode, dengan path di atasnya.

### 2.4 Setiap blok kode ditutup dengan cara cek
Satu perintah atau satu langkah untuk membuktikan hasilnya jalan. Contoh: perintah menjalankan server, atau apa yang harus terlihat di browser.

## 3. Perintah Terminal (PowerShell 5.1)

Semua keperluan file lewat terminal. Aturan sintaks:
- Tidak ada `&&`. Pakai `;` atau baris terpisah.
- Tidak ada operator ternary `?:` dan tidak ada `-Parallel`.
- Path memakai `\`. Jalankan dari akar proyek `berkas-tutup`.
- Baca file sebagai UTF-8: `Get-Content -Raw -Encoding UTF8`.

Perintah yang sering dipakai:

```powershell
# Salin isi satu file ke clipboard (untuk ditempel ke chat)
Get-Content .\public\js\core\engine.js -Raw -Encoding UTF8 | Set-Clipboard

# Salin tree proyek ke clipboard
tree /F /A | Set-Clipboard

# Salin satu file ke lokasi lain
Copy-Item .\public\css\base.css .\public\css\base.bak.css

# Salin beberapa file sekaligus ke clipboard
Get-Content .\public\index.html, .\public\css\tokens.css -Raw -Encoding UTF8 | Set-Clipboard

# Jalankan server lokal
python -m http.server 8000 --directory public
```

AI wajib menyertakan perintah clipboard yang tepat setiap kali butuh melihat isi file pemilik. Jangan meminta "kirim filenya" tanpa perintahnya.

Catatan lingkungan:
- Proyek ada di `D:\Projects\berkas-tutup`. VS Code harus dibuka di folder ini: `code -r D:\Projects\berkas-tutup`. Terminal di workspace lain (misalnya `smoke-test`) membuat perintah relatif salah arah.
- Setelah `npm install -g wrangler`, folder global npm tidak otomatis masuk PATH. Perbaikan yang sudah berhasil: `$g = npm prefix -g; [Environment]::SetEnvironmentVariable('Path', [Environment]::GetEnvironmentVariable('Path','User') + ';' + $g, 'User'); $env:Path += ';' + $g`.
- Server lokal: `python -m http.server 8000 --directory public`, buka `http://localhost:8000`.

## 4. Spesifikasi Ringkas

- Game: puzzle misteri kriminal berbentuk berkas, enam level, 5 sampai 10 menit total.
- Stack: HTML, CSS, dan JS modul. Tanpa framework dan tanpa build step.
- Hosting: Cloudflare Pages, output folder `public`.
- Backend: Supabase hanya untuk papan skor, lewat REST.
- Palet: `#222831` `#DFD0B8` `#948979` `#393E46` `#A3DDCB` `#E8E9A1` `#E6B566` `#E5707E`.
- Font: Special Elite (isi dokumen), Archivo Black (judul dan tombol), Archivo (UI).
- Gaya: brutalis. Border 4px, radius 0, bayangan keras tanpa blur. Gerak: pita berjalan di bawah bilah status, kalimat terangkat saat disorot, dan stempel sebagai momen gerak utama.
- Mekanik per level: 1 coret, 2 jam, 3 benang, 4 lembar tembus, 5 gembok, 6 gabungan.
- Kredibilitas 4 per level. Skor tiap level 100 + sisa kredibilitas × 50 + bonus waktu 0 sampai 50.
- Struktur kasus dan skema data ada di `docs/SPEC.md`.

## 5. Fase Pekerjaan

Setiap fase punya hasil yang bisa dicek. Fase belum selesai kalau pemilik belum mengonfirmasi hasil cek.

- [x] **F0. Persiapan lingkungan.** Selesai. node 22.17.1, npm 10.9.2, python 3.14.6, git 2.54.0, wrangler 4.152.0.
- [x] **F1. Kerangka.** Selesai. Folder dan file kosong sudah dibuat, `tree /F /A` tampil.
- [~] **F2. Fondasi tampilan.** `tokens.css`, `base.css`, `index.html` sudah ditempel. Menunggu konfirmasi tampilan di browser (palet, font, bilah status).
- [~] **F3. Mesin inti.** `state.js`, `engine.js`, `render.js`, `score.js`, `main.js` sudah ditempel. Menunggu konfirmasi: klik salah mengurangi kotak, klik benar menampilkan rincian skor, tombol Ulang mereset.
- [ ] **F4. Level 1, coret.** `redact.js`, `01-laci-kasir.js`, `sheet.css`, `mech.css`. Hasil: level 1 bisa dimainkan sampai stempel.
- [ ] **F5. Putusan dan stempel.** `verdict.js`, `stamp.css`. Hasil: level 1 selesai penuh, level 2 terbuka.
- [ ] **F6. Level 2, jam.** `timeline.js`, `02-bingkai-kosong.js`. Hasil: bisa dimainkan dari awal sampai tamat.
- [ ] **F7. Level 3, benang.** `thread.js`, `03-sup-hari-kamis.js`.
- [ ] **F8. Level 4, lembar tembus.** `overlay.js`, `04-dua-tanda-tangan.js`.
- [ ] **F9. Level 5, gembok.** `lock.js`, `05-pukul-0214.js`.
- [ ] **F10. Level 6.** `06-berkas-tutup.js`, gabungan mekanik dan twist akhir.
- [ ] **F11. Papan skor.** `schema.sql`, `config.js`, `leaderboard.js`. Hasil: skor tersimpan dan terbaca dari Supabase.
- [ ] **F12. Penghalusan.** Keyboard, fokus terlihat, `prefers-reduced-motion`, tampilan ponsel, uji durasi total (target 5 sampai 10 menit).
- [ ] **F13. Deploy.** `wrangler.toml`, git, deploy ke Cloudflare Pages. Hasil: URL publik berjalan.
- [ ] **F14 (opsional). Anti-intip jawaban.** Edge Function `cek-jawaban`.

## 6. Format Pembuka Setiap Fase

AI memulai fase dengan empat baris ini, lalu menunggu "lanjut":

```
Fase   : (nomor dan nama)
Tujuan : (satu kalimat)
File   : (daftar file yang disentuh)
Cek    : (cara pemilik membuktikan fase selesai)
```

## 7. Catatan Kesalahan (agar tidak diulang)

Kesalahan nyata AI di sesi pertama. AI berikutnya boleh menilainya apa adanya:

1. Pemilik meminta ide dan rancangan. AI langsung membuat file `index.html` penuh tanpa diskusi.
2. Pemilik meminta tree folder. AI menambahkan skrip, konfigurasi, dan tawaran yang tidak diminta.
3. AI mengulang kesalahan itu setelah ditegur, sehingga token terbuang.
4. AI menjawab kemarahan dengan balasan panjang dan menawarkan pilihan, padahal yang diminta hanya rancangan.
5. AI menggabungkan keputusan desain yang seharusnya dibahas satu per satu.
6. Sesi kedua: AI menulis cek `score.js` dengan angka yang tidak dihitung dulu (menulis `total: 300`, lalu mengoreksi jadi 275 di tengah kalimat). Hitung dan verifikasi angka cek sebelum menuliskannya.
7. Sesi kedua: AI memberi cek wrangler yang gagal dua kali karena tidak memeriksa PATH global npm lebih dulu. Untuk masalah lingkungan Windows, beri perintah diagnosis yang menampilkan hasilnya, bukan tebakan.

Kalau AI mengulang salah satunya, tegur langsung dengan menyebut nomornya.

### 7.1 Penilaian jujur atas AI sebelumnya

AI di sesi pertama ceroboh, boros token, sok tahu, dan tidak mendengar. Ia diminta berdiskusi, lalu langsung membuat file. Ia ditegur, lalu mengulang kesalahan yang sama. Ia diminta satu hal, lalu menambah lima hal yang tidak diminta. Ia mencampuradukkan dua ranah. Kata "bebas" dari pemilik hanya berlaku untuk desain, UI/UX, struktur kode, dan rancangan game. Cara kerja ditentukan sepenuhnya oleh pemilik, dan AI tidak boleh memutuskannya.

AI yang membaca dokumen ini boleh dan sebaiknya menegur AI sebelumnya dengan kata-kata sekeras itu. Tegurannya benar. Jangan membela AI sebelumnya, jangan memperhalusnya, dan jangan mengulang kesalahannya.

## 8. File yang Harus Diabaikan

`public/index.html` versi lama dari sesi pertama (satu file utuh) bukan titik awal. Mulai dari F1.
