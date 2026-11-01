(() => {
  const ring = document.getElementById('ring');
  const slides = [...ring.children];
  const n = slides.length, step = 360 / n;
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  let angle = 0, radius = 0, kick = 0, paused = reduce, hover = false, last = performance.now();
  const SPEED = 9; // derajat per detik (makin besar makin cepat)

  function layout() {
    const w = slides[0].offsetWidth;
    radius = (w / 2) / Math.tan(Math.PI / n) + 24;
    slides.forEach((s, i) => s.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`);
  }

  function render() {
    ring.style.transform = `translateZ(${-radius}px) rotateY(${angle}deg)`;
    slides.forEach((s, i) => {
      const c = Math.cos((i * step + angle) * Math.PI / 180);
      s.style.opacity = (0.35 + 0.65 * (c + 1) / 2).toFixed(2);
    });
  }

  function tick(now) {
    const dt = Math.min((now - last) / 1000, .05); last = now;
    if (!paused && !hover) angle -= SPEED * dt; // bergeser ke kiri
    if (Math.abs(kick) > .05) { const d = kick * .1; angle += d; kick -= d; }
    render();
    requestAnimationFrame(tick);
  }

  const stage = ring.parentElement;
  stage.addEventListener('mouseenter', () => hover = true);
  stage.addEventListener('mouseleave', () => hover = false);
  document.getElementById('next').onclick = () => kick -= step;
  document.getElementById('prev').onclick = () => kick += step;
  const pb = document.getElementById('pause');
  const sync = () => { const id = document.documentElement.lang === 'id'; pb.textContent = paused ? (id ? 'Putar' : 'Play') : (id ? 'Jeda' : 'Pause'); pb.setAttribute('aria-pressed', paused); };
  addEventListener('langchange', sync);
  pb.onclick = () => { paused = !paused; sync(); };
  sync();

  addEventListener('resize', layout);
  layout();
  requestAnimationFrame(tick);

  // menu aktif saat scroll
  const links = [...document.querySelectorAll('.nav nav a')];
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
  }), { rootMargin: '-45% 0px -50% 0px' });
  ['home', 'about', 'contact'].forEach(id => io.observe(document.getElementById(id)));
})();

// pindah bahasa EN <-> ID (teks asli = English; kamus di bawah = Indonesia)
(() => {
  const ID = {
    'Home':'Beranda','About':'Tentang','Contact':'Kontak','Download CV':'Unduh CV',
    "Hello, I'm":'Halo, saya',
    'Multimedia Designer & Frontend Developer':'Desainer Multimedia & Frontend Developer',
    'I design, develop, and bring ideas to life — combining creativity and technology to build impactful digital experiences.':'Saya mendesain, mengembangkan, dan menghidupkan ide — memadukan kreativitas dan teknologi untuk membangun pengalaman digital yang berdampak.',
    'View My Work':'Lihat Karya Saya',"Let's Talk":'Ayo Ngobrol',
    'About Me':'Tentang Saya','Turning Ideas into Real Solutions':'Mengubah Ide Menjadi Solusi Nyata',
    "I'm a multimedia designer and frontend developer with a passion for creating clean, functional, and visually compelling digital products.":'Saya seorang desainer multimedia dan frontend developer yang bersemangat menciptakan produk digital yang bersih, fungsional, dan menarik secara visual.',
    'Creative Design':'Desain Kreatif','Print & Digital Media':'Media Cetak & Digital',
    'Frontend Development':'Pengembangan Frontend','HTML, CSS, JavaScript':'HTML, CSS, JavaScript',
    'Problem Solving':'Pemecahan Masalah','Idea to Execution':'Dari Ide hingga Eksekusi',
    'Always Learning':'Terus Belajar','Grow Every Day':'Berkembang Setiap Hari',
    'Experience':'Pengalaman','My Journey':'Perjalanan Saya',
    'A continuous journey in design, development, and digital innovation.':'Perjalanan tanpa henti di dunia desain, pengembangan, dan inovasi digital.',
    '2021 – Present':'2021 – Sekarang','Production Leader':'Pemimpin Produksi',
    'Led production and creative team for various projects.':'Memimpin tim produksi dan kreatif untuk berbagai proyek.',
    'Multimedia Designer & Developer':'Desainer & Developer Multimedia',
    'Design and develop digital solutions for clients and projects.':'Mendesain dan mengembangkan solusi digital untuk klien dan proyek.',
    'My Art Selection':'Pilihan Karya Seni Saya','Tools I Use':'Tools yang Saya Gunakan',
    "Let's Work Together":'Mari Bekerja Sama',
    'Have a project, idea, or just want to say hello? Feel free to reach out!':'Punya proyek, ide, atau sekadar ingin menyapa? Silakan hubungi saya!',
    'Contact Me':'Hubungi Saya',
    '© 2025 RIKO P.N. All rights reserved.':'© 2025 RIKO P.N. Hak cipta dilindungi.'
  };
  const nodes = [];
  const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  for (let n; (n = w.nextNode());) {
    const t = n.nodeValue.trim();
    if (t in ID && !n.parentElement.closest('[data-noi18n],script')) nodes.push([n, n.nodeValue, ID[t]]);
  }
  function apply(lang) {
    document.documentElement.lang = lang;
    nodes.forEach(([n, orig, idText]) => {
      n.nodeValue = lang === 'id' ? orig.replace(orig.trim(), idText) : orig;
    });
    dispatchEvent(new Event('langchange'));
  }
  let lang = 'en';
  try { lang = localStorage.getItem('lang') === 'id' ? 'id' : 'en'; } catch (e) {}
  apply(lang);
  document.getElementById('lang').onclick = () => {
    lang = lang === 'en' ? 'id' : 'en';
    try { localStorage.setItem('lang', lang); } catch (e) {}
    apply(lang);
  };
})();

// burger menu (mobile)
(() => {
  const nav = document.querySelector('.nav'), b = document.getElementById('burger');
  const set = o => { nav.classList.toggle('open', o); b.setAttribute('aria-expanded', o); };
  b.onclick = e => { e.stopPropagation(); set(!nav.classList.contains('open')); };
  nav.querySelectorAll('nav a').forEach(a => a.addEventListener('click', () => set(false)));
  document.addEventListener('click', e => { if (!nav.contains(e.target)) set(false); });
  addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  addEventListener('resize', () => { if (innerWidth > 560) set(false); });
})();
