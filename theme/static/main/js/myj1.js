document.addEventListener('DOMContentLoaded', function () {

  (function () {
    // Basic DOM helper
    const $ = (sel, ctx = document) => ctx.querySelector(sel);
    const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

    const navbar = document.querySelector('header.navbar')
    if (!navbar) return; // safety guard

    const mobileToggle = document.getElementById('mobile-toggle');
    const mobilePanel = document.getElementById('mobile-panel');
    const allNavLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
    const scrollTopBtn = document.getElementById('scroll-top');

    // MOBILE toggle
    let mobileOpen = false;
    if (mobileToggle && mobilePanel) {
      mobileToggle.addEventListener('click', () => {
        mobileOpen = !mobileOpen;
        mobilePanel.classList.toggle('open', mobileOpen);
        mobileToggle.setAttribute('aria-expanded', mobileOpen ? "true" : "false");
        document.body.style.overflow = mobileOpen ? 'hidden' : '';
      });
    }

    // Navbar color change + scroll top button
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      if (y > 20) {
        navbar.classList.add('show-color');
        scrollTopBtn?.classList.add('show');
      } else {
        navbar.classList.remove('show-color');
        scrollTopBtn?.classList.remove('show');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Smooth scroll
    function smoothScrollTo(targetEl) {
      const navH = navbar.getBoundingClientRect().height;
      const rect = targetEl.getBoundingClientRect();
      const offsetTop = rect.top + window.scrollY - navH - 6;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }

    allNavLinks.forEach(a => {
  const href = a.getAttribute('href');

  // 🚫 ignore empty or #
  if (!href || href === '#' || !href.startsWith('#')) return;

  const target = document.querySelector(href);
  if (!target) return;


      a.addEventListener('click', (e) => {
        e.preventDefault();

        if (mobileOpen) {
          mobileOpen = false;
          mobilePanel?.classList.remove('open');
          document.body.style.overflow = '';
          mobileToggle?.setAttribute('aria-expanded', 'false');
        }

        target.classList.add('section-focus');
        setTimeout(() => target.classList.remove('section-focus'), 1800);

        smoothScrollTo(target);
        setTimeout(() => history.replaceState(null, '', href), 700);
      });
    });

    // ScrollSpy
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          $$('a[href^="#"]').forEach(x => x.classList.remove('active-nav'));
          document.querySelector(`a[href="#${id}"]`)?.classList.add('active-nav');
        }
      });
    }, {
      root: null,
      rootMargin: '-40% 0px -40% 0px',
      threshold: 0
    });

    sections.forEach(s => observer.observe(s));

    // Inject dynamic CSS
    const style = document.createElement('style');
    style.innerHTML = `
      .active-nav {
        color: var(--primary) !important;
        box-shadow: inset 0 -3px 0 0 var(--primary);
        background: rgba(255,255,255,0.06);
        padding-bottom: 4px;
      }
      .nav-link { color: rgba(255,255,255,0.85); }
      header.navbar { background: transparent; }
      header.navbar.show-color {
        background: white;
        box-shadow: 0 8px 20px rgba(0,0,0,0.12);
      }
      header.navbar.show-color .navbar-brand,
      header.navbar.show-color .nav-link,
      header.navbar.show-color button {
        color: var(--font-dark) !important;
      }
      #mobile-panel {
        position: absolute;
        left: 0;
        right: 0;
        top: 100%;
        z-index: 60;
      }
    `;
    document.head.appendChild(style);

    // Scroll top
    scrollTopBtn?.addEventListener('click', e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });

  })();
  const callFab = document.getElementById('call-fab');

window.addEventListener('scroll', () => {
  if (window.scrollY > 200) {
    callFab.style.transform = 'scale(1)';
    callFab.style.opacity = '1';
  } else {
    callFab.style.transform = 'scale(0.9)';
    callFab.style.opacity = '0.85';
  }
});
$(".custom-carousel").owlCarousel({
  autoWidth: true,
  loop: true
});

});
document.addEventListener('DOMContentLoaded', () => {
  const track = document.getElementById('brands-track');
  const prev = document.getElementById('brands-prev');
  const next = document.getElementById('brands-next');
  if (!track) return;

  let isDown = false;
  let startX = 0;
  let scrollLeft = 0;
  let moved = false;

  const start = (e) => {
    isDown = true;
    moved = false;
    track.classList.add('cursor-grabbing');
    startX = (e.touches ? e.touches[0].pageX : e.pageX);
    scrollLeft = track.scrollLeft;
  };

  const move = (e) => {
    if (!isDown) return;
    const x = (e.touches ? e.touches[0].pageX : e.pageX);
    const walk = startX - x;
    if (Math.abs(walk) > 6) moved = true;
    track.scrollLeft = scrollLeft + walk;
  };

  const end = () => {
    isDown = false;
    track.classList.remove('cursor-grabbing');
  };

  track.addEventListener('mousedown', start);
  track.addEventListener('touchstart', start, { passive: true });

  window.addEventListener('mousemove', move);
  window.addEventListener('touchmove', move, { passive: true });

  window.addEventListener('mouseup', end);
  window.addEventListener('touchend', end);

  // ✅ لینک فقط اگر drag نبوده
  track.querySelectorAll('.brand-card').forEach(card => {
    card.addEventListener('click', (e) => {
      if (moved) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return;
      }
      const link = card.querySelector('a');
      if (link) window.location.href = link.href;
    });
  });

  // arrows (mobile + desktop)
  const card = track.querySelector('.brand-card');
  const gap = parseFloat(getComputedStyle(track).gap) || 24;
  const step = card ? card.offsetWidth + gap : 320;

  prev?.addEventListener('click', () => {
    track.scrollBy({ left: -step, behavior: 'smooth' });
  });

  next?.addEventListener('click', () => {
    track.scrollBy({ left: step, behavior: 'smooth' });
  });
});