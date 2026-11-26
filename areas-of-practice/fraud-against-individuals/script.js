const header = document.querySelector('#site-header');
const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('#primary-navigation');
const menuLabel = menuButton?.querySelector('.sr-only');

const updateHeader = () => {
  header?.classList.toggle('is-sticky', window.scrollY > 48);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

menuButton?.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menu?.classList.toggle('is-open', !isOpen);
  if (menuLabel) menuLabel.textContent = isOpen ? 'Open navigation' : 'Close navigation';
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu?.classList.contains('is-open')) {
    menu.classList.remove('is-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    if (menuLabel) menuLabel.textContent = 'Open navigation';
    menuButton?.focus();
  }
});

menu?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuButton?.setAttribute('aria-expanded', 'false');
    menu?.classList.remove('is-open');
  });
});

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const revealItems = document.querySelectorAll('.reveal');

if (reducedMotion || !('IntersectionObserver' in window)) {
  revealItems.forEach((item) => item.classList.add('is-visible'));
} else {
  revealItems.forEach((item) => item.classList.add('reveal-ready'));
  const observer = new IntersectionObserver((entries, instance) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -50px' });

  revealItems.forEach((item) => observer.observe(item));
}
