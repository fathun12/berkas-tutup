// Putusan: cek pilihan pelaku dan pembukaan level berikutnya.

export function periksaPutusan(kasus, id) {
  return id === kasus.pelaku;
}

// Level tertinggi yang terbuka setelah level `no` selesai. Maksimum 6.
export function levelTerbuka(terbuka, no) {
  return Math.min(6, Math.max(terbuka, no + 1));
}