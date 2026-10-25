import { ambil, set, KRED_MAKS } from './state.js';
import { hitungSkor } from './score.js';
import { apakahPalsu, coretSelesai } from '../mech/redact.js';
import { periksaLangkah, susunSelesai } from '../mech/timeline.js';
import { cariHubungan, idHubungan, benangSelesai } from '../mech/thread.js';
import { periksaPutusan, levelTerbuka } from './verdict.js';

export function muat(kasus) {
  set({
    kasus,
    kredibilitas: KRED_MAKS,
    tercoret: [],
    terverifikasi: [],
    tersusun: [],
    tersambung: [],
    simpulPilih: null,
    salahOrang: [],
    hasil: null,
    kabar: null,
    mulai: Date.now(),
    status: 'kerja'
  });
}

// Satu langkah keliru di tahap kerja: potong 1 kredibilitas.
function keliru(s, patch = {}) {
  const kred = s.kredibilitas - 1;
  set({ ...patch, kredibilitas: kred, kabar: 'keliru', status: kred <= 0 ? 'gagal' : 'kerja' });
}

// Tahap 1, mekanik coret.
export function coret(id) {
  const s = ambil();
  if (s.status !== 'kerja' || s.kasus.mekanik !== 'coret') return;
  if (s.tercoret.includes(id) || s.terverifikasi.includes(id)) return;

  const palsu = apakahPalsu(s.kasus, id);
  if (palsu === null) return;

  if (palsu) {
    const tercoret = [...s.tercoret, id];
    set({
      tercoret,
      kabar: 'tepat',
      status: coretSelesai(s.kasus, tercoret) ? 'putusan' : 'kerja'
    });
    return;
  }

  keliru(s, { terverifikasi: [...s.terverifikasi, id] });
}

// Tahap 1, mekanik jam.
export function susun(id) {
  const s = ambil();
  if (s.status !== 'kerja' || s.kasus.mekanik !== 'jam') return;

  const r = periksaLangkah(s.kasus, s.tersusun, id);
  if (r === null) return;

  if (r === 'benar') {
    const tersusun = [...s.tersusun, id];
    set({
      tersusun,
      kabar: 'tepat',
      status: susunSelesai(s.kasus, tersusun) ? 'putusan' : 'kerja'
    });
    return;
  }

  keliru(s);
}

// Tahap 1, mekanik benang: klik dua simpul berurutan.
export function simpul(id) {
  const s = ambil();
  if (s.status !== 'kerja' || s.kasus.mekanik !== 'benang') return;

  if (s.simpulPilih === null) {
    set({ simpulPilih: id, kabar: null });
    return;
  }
  if (s.simpulPilih === id) {
    set({ simpulPilih: null, kabar: null });
    return;
  }

  const h = cariHubungan(s.kasus, s.simpulPilih, id);
  if (h && s.tersambung.includes(idHubungan(h))) {
    set({ simpulPilih: null, kabar: null }); // benang itu sudah ada, tanpa hukuman
    return;
  }
  if (h) {
    const tersambung = [...s.tersambung, idHubungan(h)];
    set({
      tersambung,
      simpulPilih: null,
      kabar: 'tepat',
      status: benangSelesai(s.kasus, tersambung) ? 'putusan' : 'kerja'
    });
    return;
  }

  keliru(s, { simpulPilih: null });
}

// Tahap 2: memilih pelaku.
export function pilih(id) {
  const s = ambil();
  if (s.status !== 'putusan' || s.salahOrang.includes(id)) return;

  if (periksaPutusan(s.kasus, id)) {
    const detik = (Date.now() - s.mulai) / 1000;
    const hasil = hitungSkor(s.kredibilitas, detik, s.kasus.batas);
    set({
      hasil,
      skorTotal: s.skorTotal + hasil.total,
      terbuka: levelTerbuka(s.terbuka, s.kasus.no),
      kabar: null,
      status: 'selesai'
    });
    return;
  }

  const kred = s.kredibilitas - 1;
  set({
    kredibilitas: kred,
    salahOrang: [...s.salahOrang, id],
    kabar: 'orang',
    status: kred <= 0 ? 'gagal' : 'putusan'
  });
}

export function ulang() {
  const s = ambil();
  set({ skorTotal: s.skorTotal - (s.hasil ? s.hasil.total : 0) });
  muat(s.kasus);
}