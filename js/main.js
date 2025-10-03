const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = siteNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen.toString());
  });
}

document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', (evt) => {
    const targetId = link.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      evt.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
      if (siteNav && siteNav.classList.contains('is-open')) {
        siteNav.classList.remove('is-open');
        navToggle?.setAttribute('aria-expanded', 'false');
      }
    }
  });
});
