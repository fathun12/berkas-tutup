import { langgan, ambil } from './core/state.js';
import { muat, coret, susun, simpul, pilih, ulang } from './core/engine.js';
import { render } from './core/render.js';
import laciKasir from './cases/01-laci-kasir.js';
import bingkaiKosong from './cases/02-bingkai-kosong.js';
import supHariKamis from './cases/03-sup-hari-kamis.js';

// Urutan array = nomor level. Berkas baru ditambah di sini.
const DAFTAR = [laciKasir, bingkaiKosong, supHariKamis];

const aksi = {
  coret,
  susun,
  simpul,
  pilih,
  ulang,
  adaBerikut: no => no < DAFTAR.length,
  lanjut: () => {
    const berikut = DAFTAR[ambil().kasus.no];
    if (berikut) muat(berikut);
  }
};

langgan(s => render(s, aksi));
muat(DAFTAR[0]);