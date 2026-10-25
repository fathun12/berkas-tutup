import { KRED_MAKS } from './state.js';
import { jumlahPalsu } from '../mech/redact.js';
import { jamTeks } from '../mech/timeline.js';
import { idHubungan, hitungBenang } from '../mech/thread.js';

const el = (tag, atr = {}, ...anak) => {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(atr)) {
    if (k === 'class') n.className = v;
    else if (k.startsWith('on')) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  }
  n.append(...anak);
  return n;
};

const dua = n => String(n).padStart(2, '0');

function renderHud(s) {
  document.getElementById('hud-level').textContent = `${s.kasus ? s.kasus.no : 0} / 6`;
  const k = document.getElementById('hud-kred');
  k.replaceChildren(
    ...Array.from({ length: KRED_MAKS }, (_, i) =>
      el('span', { class: i < s.kredibilitas ? 'kotak penuh' : 'kotak' }))
  );
  k.setAttribute('aria-label', `Kredibilitas ${s.kredibilitas} dari ${KRED_MAKS}`);
  document.getElementById('hud-skor').textContent = s.skorTotal;
}

/* ---------- tahap kerja: coret ---------- */

function renderCoret(s, aksi) {
  const aktif = s.status === 'kerja';
  let urut = 0;

  const kolom = s.kasus.laporan.map(l => {
    const daftar = l.kalimat.map(q => {
      urut += 1;
      const tercoret = s.tercoret.includes(q.id);
      const cocok = s.terverifikasi.includes(q.id);
      const atr = {
        type: 'button',
        class: tercoret ? 'kalimat coret' : cocok ? 'kalimat cocok' : 'kalimat',
        onclick: () => aksi.coret(q.id)
      };
      if (!aktif || tercoret || cocok) atr.disabled = '';

      const isi = [el('span', { class: 'kode' }, `S-${urut}`), ' ', q.teks];
      if (tercoret) isi.push(el('span', { class: 'tanda' }, 'tercoret'));
      if (cocok) isi.push(el('span', { class: 'tanda' }, 'cocok bukti'));
      return el('li', {}, el('button', atr, ...isi));
    });

    return el('section', { class: 'saksi' },
      el('h3', {}, l.saksi, el('small', {}, ` ${l.peran}`)),
      el('ul', { class: 'kalimat-daftar' }, ...daftar));
  });

  return el('div', { class: 'laporan' }, ...kolom);
}

/* ---------- tahap kerja: jam ---------- */

function renderJam(s, aksi) {
  const k = s.kasus;
  const aktif = s.status === 'kerja';
  const kodeK = id => `K-${k.kejadian.findIndex(e => e.id === id) + 1}`;

  const tersusun = s.tersusun.map(id => k.kejadian.find(e => e.id === id));
  const sisa = k.kejadian.filter(e => !s.tersusun.includes(e.id));

  const garis = [
    ...tersusun.map((e, i) => {
      const baru = i === tersusun.length - 1 && s.kabar === 'tepat';
      return el('li', { class: baru ? 'garis-isi baru' : 'garis-isi' },
        el('span', { class: 'jam' }, jamTeks(e.menit)), ' ',
        el('span', { class: 'kode' }, kodeK(e.id)), ' ', e.teks);
    }),
    ...sisa.map((_, i) =>
      el('li', { class: i === 0 ? 'slot berikut' : 'slot' }, i === 0 ? 'Kejadian berikutnya?' : '...'))
  ];

  const tombol = sisa.map(e => {
    const atr = { type: 'button', class: 'kalimat', onclick: () => aksi.susun(e.id) };
    if (!aktif) atr.disabled = '';
    return el('li', {}, el('button', atr, el('span', { class: 'kode' }, kodeK(e.id)), ' ', e.teks));
  });

  return el('div', { class: 'jam-papan' },
    el('h3', {}, 'Garis waktu'),
    el('ol', { class: 'garis' }, ...garis),
    ...(sisa.length ? [el('h3', {}, 'Belum disusun')] : []),
    el('ul', { class: 'kalimat-daftar' }, ...tombol));
}

/* ---------- tahap kerja: benang ---------- */

function renderBenang(s, aksi) {
  const k = s.kasus;
  const aktif = s.status === 'kerja';
  const nama = id => k.simpul.find(n => n.id === id).nama;
  const jenis = [['barang', 'Barang'], ['tempat', 'Tempat'], ['orang', 'Orang']];

  const kelompok = jenis.map(([j, label]) =>
    el('div', { class: 'simpul-kelompok' },
      el('h3', {}, label),
      el('div', { class: 'pilihan' },
        ...k.simpul.filter(n => n.jenis === j).map(n => {
          const jml = hitungBenang(s.tersambung, n.id);
          const atr = {
            type: 'button',
            class: s.simpulPilih === n.id ? 'kalimat simpul pilih' : 'kalimat simpul',
            onclick: () => aksi.simpul(n.id)
          };
          if (!aktif) atr.disabled = '';
          return el('button', atr, n.nama, jml ? el('span', { class: 'tanda' }, `${jml} benang`) : '');
        }))));

  const tali = s.tersambung.map((key, i) => {
    const h = k.hubungan.find(x => idHubungan(x) === key);
    const baru = i === s.tersambung.length - 1 && s.kabar === 'tepat';
    return el('li', { class: 'benang-baris' },
      el('span', { class: 'benang-ujung' }, nama(h.a)),
      el('span', { class: baru ? 'tali baru' : 'tali', 'aria-hidden': 'true' }),
      el('span', { class: 'benang-ujung' }, nama(h.b)),
      el('p', { class: 'alasan' }, h.alasan));
  });

  return el('div', { class: 'benang-papan' },
    ...kelompok,
    el('h3', {}, `Benang terpasang: ${s.tersambung.length} dari ${k.hubungan.length}`),
    el('ul', { class: 'benang-daftar' }, ...tali));
}

/* ---------- pesan ---------- */

function pesanCoret(s) {
  const total = jumlahPalsu(s.kasus);
  const maju = el('p', {}, `Tercoret ${s.tercoret.length} dari ${total} kalimat yang tidak bisa dipercaya.`);
  if (s.kabar === 'tepat') {
    return el('div', { class: 'pesan benar', role: 'status' },
      el('p', {}, 'Tepat. Kalimat itu bertentangan dengan bukti.'), maju);
  }
  if (s.kabar === 'keliru') {
    return el('div', { class: 'pesan', role: 'status' },
      el('p', {}, 'Kalimat itu cocok dengan bukti. Kredibilitas dipotong 1.'), maju);
  }
  return el('div', { class: 'pesan', role: 'status' },
    el('p', {}, `Bandingkan laporan dengan bukti. Coret ${total} kalimat yang bertentangan. Mencoret kalimat yang benar memotong kredibilitas.`));
}

function pesanJam(s) {
  const maju = el('p', {}, `Tersusun ${s.tersusun.length} dari ${s.kasus.kejadian.length} kejadian.`);
  if (s.kabar === 'tepat') {
    return el('div', { class: 'pesan benar', role: 'status' },
      el('p', {}, 'Tepat. Kejadian itu memang berikutnya.'), maju);
  }
  if (s.kabar === 'keliru') {
    return el('div', { class: 'pesan', role: 'status' },
      el('p', {}, 'Bukan kejadian berikutnya. Kredibilitas dipotong 1.'), maju);
  }
  return el('div', { class: 'pesan', role: 'status' },
    el('p', {}, 'Hitung jam setiap kejadian dari bukti, lalu klik kejadian paling awal. Salah urutan memotong kredibilitas.'));
}

function pesanBenang(s) {
  const k = s.kasus;
  const maju = el('p', {}, `Benang tertarik ${s.tersambung.length} dari ${k.hubungan.length}.`);
  if (s.simpulPilih) {
    const n = k.simpul.find(x => x.id === s.simpulPilih);
    return el('div', { class: 'pesan', role: 'status' },
      el('p', {}, `Pilih simpul kedua untuk menarik benang dari ${n.nama}. Klik simpul yang sama untuk batal.`));
  }
  if (s.kabar === 'tepat') {
    return el('div', { class: 'pesan benar', role: 'status' },
      el('p', {}, 'Tepat. Kedua simpul itu memang berhubungan.'), maju);
  }
  if (s.kabar === 'keliru') {
    return el('div', { class: 'pesan', role: 'status' },
      el('p', {}, 'Tidak ada bukti yang menghubungkan keduanya. Kredibilitas dipotong 1.'), maju);
  }
  return el('div', { class: 'pesan', role: 'status' },
    el('p', {}, 'Klik dua simpul yang dihubungkan oleh bukti. Satu benang salah memotong kredibilitas.'));
}

const PESAN_KERJA = { coret: pesanCoret, jam: pesanJam, benang: pesanBenang };

const KERJA_SELESAI = {
  coret: 'Semua kalimat palsu sudah tercoret.',
  jam: 'Urutan kejadian sudah benar.',
  benang: 'Semua benang sudah tertarik.'
};
const AKHIR = {
  coret: 'Kalimat yang tersisa menunjuk satu orang. Siapa pelakunya?',
  jam: 'Cocokkan jam kejadian dengan alibi di bukti. Siapa pelakunya?',
  benang: 'Lihat siapa yang terhubung ke tempat dan barang bukti. Siapa pelakunya?'
};

function pesanPutusan(s) {
  const mek = s.kasus.mekanik;
  const awal = s.kabar === 'orang' ? 'Bukan dia. Kredibilitas dipotong 1.' : KERJA_SELESAI[mek];
  return el('div', { class: 'pesan', role: 'status' },
    el('p', {}, awal),
    el('p', {}, AKHIR[mek]));
}

function pesanSelesai(s, aksi) {
  const k = s.kasus;
  const h = s.hasil;
  const pelaku = k.tersangka.find(t => t.id === k.pelaku);
  const isi = [
    el('p', {}, `Putusan benar: ${pelaku.nama}.`),
    el('p', {}, `Dasar ${h.dasar} + kredibilitas ${h.kred} + waktu ${h.bonus} (${h.detik} dtk) = ${h.total}`)
  ];
  const tombol = [
    el('button', { type: 'button', class: 'btn', onclick: () => aksi.ulang() }, 'Ulang')
  ];

  if (k.no < 6) {
    const nomor = dua(k.no + 1);
    if (aksi.adaBerikut(k.no)) {
      isi.push(el('p', {}, `Berkas no. ${nomor} terbuka.`));
      tombol.unshift(
        el('button', { type: 'button', class: 'btn', onclick: () => aksi.lanjut() }, `Buka berkas no. ${nomor}`));
    } else {
      isi.push(el('p', {}, `Berkas no. ${nomor} terbuka, tetapi belum disiapkan.`));
    }
  }

  return el('div', { class: 'pesan benar', role: 'status' },
    ...isi, el('div', { class: 'pilihan' }, ...tombol));
}

function pesanGagal(aksi) {
  return el('div', { class: 'pesan gagal', role: 'status' },
    el('p', {}, 'Kredibilitas habis. Berkas dikembalikan.'),
    el('button', { type: 'button', class: 'btn', onclick: () => aksi.ulang() }, 'Ulang'));
}

function stempel(s) {
  const k = s.kasus;
  const pelaku = k.tersangka.find(t => t.id === k.pelaku);
  return el('div', { class: 'stempel', 'aria-hidden': 'true' },
    el('strong', {}, 'Berkas ditutup'),
    el('span', {}, `Pelaku: ${pelaku.nama}`));
}

/* ---------- render utama ---------- */

export function render(s, aksi) {
  renderHud(s);
  const meja = document.getElementById('meja');
  if (!s.kasus) { meja.replaceChildren(); return; }

  const k = s.kasus;
  const mek = k.mekanik;
  const tahapPutusan = s.status === 'putusan' || s.status === 'selesai' || s.salahOrang.length > 0;

  const kerja =
    mek === 'coret' ? [el('h2', {}, 'Laporan saksi'), renderCoret(s, aksi)] :
    mek === 'jam' ? [el('h2', {}, 'Susun kejadian'), renderJam(s, aksi)] :
    [el('h2', {}, 'Papan benang'), renderBenang(s, aksi)];

  const putusan = tahapPutusan ? [
    el('h2', {}, 'Putusan: siapa pelakunya?'),
    el('div', { class: 'pilihan' },
      ...k.tersangka.map(t => {
        const salah = s.salahOrang.includes(t.id);
        const tepat = s.status === 'selesai' && t.id === k.pelaku;
        const atr = {
          type: 'button',
          class: salah ? 'btn salah' : tepat ? 'btn tepat' : 'btn',
          onclick: () => aksi.pilih(t.id)
        };
        if (s.status !== 'putusan' || salah) atr.disabled = '';
        return el('button', atr, t.nama);
      }))
  ] : [];

  const pesan =
    s.status === 'selesai' ? pesanSelesai(s, aksi) :
    s.status === 'gagal' ? pesanGagal(aksi) :
    s.status === 'putusan' ? pesanPutusan(s) :
    PESAN_KERJA[mek](s);

  const berkas = el('article', { class: 'berkas' },
    el('p', { class: 'nomor' }, `Berkas no. ${dua(k.no)}`),
    el('h1', {}, k.judul),
    el('p', { class: 'meta' }, `${k.tempat} \u00B7 ${k.tanggal}`),
    el('p', { class: 'ringkas' }, k.ringkas),
    el('h2', {}, 'Bukti'),
    el('ol', { class: 'bukti' },
      ...k.bukti.map(b => el('li', {}, el('span', { class: 'kode' }, b.kode), ' ', b.teks))),
    ...kerja,
    ...putusan,
    pesan
  );

  if (s.status === 'selesai') berkas.append(stempel(s));
  meja.replaceChildren(berkas);
}