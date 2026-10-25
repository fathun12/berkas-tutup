export const DASAR = 100;
export const PER_KRED = 50;
export const BONUS_MAKS = 50;

export function hitungSkor(sisaKred, detik, batas) {
  const bonus = Math.round(BONUS_MAKS * Math.max(0, 1 - detik / batas));
  const kred = sisaKred * PER_KRED;
  return { dasar: DASAR, kred, bonus, detik: Math.round(detik), total: DASAR + kred + bonus };
}