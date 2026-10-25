export const KRED_MAKS = 4;

const awal = () => ({
  kasus: null,
  kredibilitas: KRED_MAKS,
  tercoret: [],      // coret: id kalimat palsu yang sudah dicoret
  terverifikasi: [], // coret: id kalimat benar yang salah dicoret (terkunci)
  tersusun: [],      // jam: id kejadian yang sudah diurutkan benar
  tersambung: [],    // benang: kunci benang yang sudah tertarik
  simpulPilih: null, // benang: simpul pertama yang sedang dipilih
  salahOrang: [],    // id tersangka yang salah dipilih
  hasil: null,
  kabar: null,       // tepat | keliru | orang, untuk pesan terakhir
  mulai: 0,
  skorTotal: 0,
  terbuka: 1,        // nomor level tertinggi yang terbuka
  status: 'idle'     // idle | kerja | putusan | selesai | gagal
});

let s = awal();
const pendengar = new Set();

export const ambil = () => s;

export function set(patch) {
  s = { ...s, ...patch };
  pendengar.forEach(f => f(s));
}

export function langgan(f) {
  pendengar.add(f);
  return () => pendengar.delete(f);
}

export function reset() {
  set(awal());
}