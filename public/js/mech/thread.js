// Mekanik benang: hubungkan dua simpul yang berhubungan menurut bukti.
// Logika murni, tanpa DOM. Id simpul tidak boleh mengandung "|".

const SEP = '|';

export const kunci = (a, b) => [a, b].sort().join(SEP);
export const idHubungan = h => kunci(h.a, h.b);

// objek hubungan, atau null kalau dua simpul itu tidak berhubungan
export const cariHubungan = (kasus, a, b) =>
  kasus.hubungan.find(h => idHubungan(h) === kunci(a, b)) || null;

export const benangSelesai = (kasus, tersambung) =>
  tersambung.length === kasus.hubungan.length;

export const hitungBenang = (tersambung, id) =>
  tersambung.filter(k => k.split(SEP).includes(id)).length;