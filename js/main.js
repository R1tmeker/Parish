const root = document.documentElement;
root.classList.remove('no-js');
root.classList.add('js');

const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const NAV_BREAKPOINT = 960;

let setNavState = () => {};

if (navToggle && siteNav) {
  const openLabel = navToggle.getAttribute('aria-label') || 'Открыть меню';
  const closeLabel = navToggle.dataset.closeLabel || 'Закрыть меню';

  setNavState = (isOpen, { skipFocus = false } = {}) => {
    siteNav.classList.toggle('is-open', isOpen);
    navToggle.classList.toggle('is-active', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? closeLabel : openLabel);
    document.body.classList.toggle('nav-open', isOpen);

    if (!isOpen && !skipFocus) {
      navToggle.focus({ preventScroll: true });
    }
  };

  navToggle.addEventListener('click', () => {
    const willOpen = !siteNav.classList.contains('is-open');
    setNavState(willOpen, { skipFocus: true });
  });

  siteNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setNavState(false, { skipFocus: true }));
  });

  window.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
      setNavState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= NAV_BREAKPOINT) {
      setNavState(false, { skipFocus: true });
    }
  });
}

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (evt) => {
    const href = link.getAttribute('href');
    const targetId = href ? href.slice(1) : '';
    if (!targetId) {
      return;
    }

    const target = document.getElementById(targetId);
    if (target) {
      evt.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setNavState(false, { skipFocus: true });
    }
  });
});
