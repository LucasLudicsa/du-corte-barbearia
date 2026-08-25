document.getElementById('year').textContent = new Date().getFullYear();

/* Nav background on scroll */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* Mobile menu */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const navCta = document.querySelector('.nav-cta');
burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  navLinks.classList.toggle('open', open);
  navCta.classList.toggle('open', open);
  burger.setAttribute('aria-expanded', open);
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  burger.classList.remove('open');
  navLinks.classList.remove('open');
  navCta.classList.remove('open');
}));

/* Active nav link on scroll */
const sections = ['servicos', 'galeria', 'sobre', 'contato'].map(id => document.getElementById(id));
const navItems = document.querySelectorAll('[data-nav]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navItems.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => s && sectionObserver.observe(s));

/* Scroll reveal */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${Math.min(i % 6, 5) * 60}ms`;
  revealObserver.observe(el);
});

/* Lightbox */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxVideo = document.getElementById('lightboxVideo');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox({ img, video }) {
  lightboxImg.classList.remove('show');
  lightboxVideo.classList.remove('show');
  lightboxVideo.pause();
  lightboxVideo.removeAttribute('src');

  if (video) {
    lightboxVideo.src = video;
    lightboxVideo.classList.add('show');
    lightboxVideo.play().catch(() => {});
  } else if (img) {
    lightboxImg.src = img;
    lightboxImg.classList.add('show');
  }
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
  lightboxVideo.pause();
}

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const video = item.getAttribute('data-video');
    const img = item.getAttribute('data-full');
    openLightbox({ img, video });
  });
});

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLightbox(); });
