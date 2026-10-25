// Mekanik coret. Logika murni, tanpa DOM.

const semua = kasus => kasus.laporan.flatMap(l => l.kalimat);

export function jumlahPalsu(kasus) {
  return semua(kasus).filter(k => k.palsu).length;
}

// true = palsu, false = benar, null = id tidak ada
export function apakahPalsu(kasus, id) {
  const k = semua(kasus).find(x => x.id === id);
  return k ? k.palsu : null;
}

export function coretSelesai(kasus, tercoret) {
  return tercoret.length === jumlahPalsu(kasus);
}