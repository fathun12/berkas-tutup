// Mekanik jam: susun kejadian sesuai urutan waktu. Logika murni, tanpa DOM.

export const urutanBenar = kasus =>
  [...kasus.kejadian].sort((a, b) => a.menit - b.menit).map(e => e.id);

export function jamTeks(menit) {
  const j = String(Math.floor(menit / 60)).padStart(2, '0');
  const m = String(menit % 60).padStart(2, '0');
  return `${j}.${m}`;
}

// 'benar' | 'salah' | null (id tidak ada, atau sudah tersusun)
export function periksaLangkah(kasus, tersusun, id) {
  if (tersusun.includes(id)) return null;
  const urut = urutanBenar(kasus);
  if (!urut.includes(id)) return null;
  return urut[tersusun.length] === id ? 'benar' : 'salah';
}

export const susunSelesai = (kasus, tersusun) =>
  tersusun.length === kasus.kejadian.length;