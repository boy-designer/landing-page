// ===== NAVBAR RESPONSIVE =====
const navToggle = document.getElementById("nav-toggle");
const navMenu = document.getElementById("nav-menu");

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("show");
  const icon = navToggle.querySelector("i");
  if (navMenu.classList.contains("show")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});
const bestSlidesContainer = document.getElementById('bestSlides');
const bestSlides = document.querySelectorAll('.best-seller .best-slide');
const bestPrev = document.getElementById('bestPrev');
const bestNext = document.getElementById('bestNext');
const bestIndicators = document.getElementById('bestIndicators');

let bestIndex = 0;
let bestInterval;

// tampilkan slide
function showBestSlide(i) {
  bestIndex = (i + bestSlides.length) % bestSlides.length;
  bestSlidesContainer.style.transform = `translateX(${-bestIndex * 100}%)`;

  document.querySelectorAll('#bestIndicators button').forEach((btn, idx) => {
    btn.classList.toggle('active', idx === bestIndex);
  });
}

// pindah ke slide berikut
function nextBestSlide() {
  showBestSlide(bestIndex + 1);
}

// pindah ke slide sebelumnya
function prevBestSlide() {
  showBestSlide(bestIndex - 1);
}

// otomatis slide
function startBestAuto() {
  bestInterval = setInterval(nextBestSlide, 4000);
}

function stopBestAuto() {
  clearInterval(bestInterval);
}

// tombol
bestPrev.addEventListener('click', () => {
  prevBestSlide();
  stopBestAuto();
  startBestAuto();
});

bestNext.addEventListener('click', () => {
  nextBestSlide();
  stopBestAuto();
  startBestAuto();
});

// indikator
bestSlides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.addEventListener('click', () => {
    showBestSlide(i);
    stopBestAuto();
    startBestAuto();
  });
  bestIndicators.appendChild(dot);
});

showBestSlide(0);
startBestAuto();


// Tutup menu jika klik link
document.querySelectorAll(".nav__link").forEach(link => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("show");
    const icon = navToggle.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  });
});

// ===== SLIDESHOW BACKGROUND =====
let slideIndex = 0;
const slides = document.querySelectorAll(".slide");

function showSlides() {
  slides.forEach((slide, i) => slide.classList.remove("active"));
  slideIndex = (slideIndex + 1) % slides.length;
  slides[slideIndex].classList.add("active");
}

setInterval(showSlides, 5000);

// Ganti warna navbar saat scroll
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 100) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ====== ANIMASI BAGIAN LAYANAN ======
const serviceCards = document.querySelectorAll('.service-card');
const serviceObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        serviceObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  }
);

serviceCards.forEach(card => serviceObserver.observe(card));

// ====== ANIMASI MENU SAAT SCROLL ======
const menuCards = document.querySelectorAll('.menu-card');
const menuObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        menuObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  }
);
menuCards.forEach(card => menuObserver.observe(card));

// ====== MODAL DETAIL MENU ======
const modal = document.getElementById('menuModal');
const modalImg = modal.querySelector('.menu-modal__img');
const modalName = modal.querySelector('.menu-modal__name');
const modalDesc = modal.querySelector('.menu-modal__desc');
const modalPrice = modal.querySelector('.menu-modal__price');
const modalClose = modal.querySelector('.menu-modal__close');

document.querySelectorAll('.btn--detail').forEach(btn => {
  btn.addEventListener('click', () => {
    modalImg.src = btn.dataset.img;
    modalName.textContent = btn.dataset.name;
    modalDesc.textContent = btn.dataset.desc;
    modalPrice.textContent = btn.dataset.price;
    modal.classList.add('active');
  });
});

modalClose.addEventListener('click', () => {
  modal.classList.remove('active');
});

modal.addEventListener('click', e => {
  if (e.target === modal) modal.classList.remove('active');
});

// ====== ANIMASI BAGIAN TEAM ======
const teamCards = document.querySelectorAll('.team-card');
const teamObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        teamObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.2
  }
);
teamCards.forEach(card => teamObserver.observe(card));

// ====== SMOOTH SCROLL MANUAL DENGAN OFFSET ======
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', e => {
    const href = link.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      const offset = 80; // ubah sesuai tinggi navbar kamu
      const top = target.getBoundingClientRect().top + window.scrollY - offset;

      window.scrollTo({
        top: top,
        behavior: 'smooth'
      });
    }
  });
});

// ====== ANIMASI BAGIAN CONTACT ======
const contactSection = document.querySelector('.contact');
const contactObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        contactSection.classList.add('visible');
      }
    });
  }, {
    threshold: 0.2
  }
);

contactObserver.observe(contactSection);

// Smooth scroll custom (lebih lambat)
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        smoothScrollTo(target.offsetTop, 1000); // durasi 1000ms
      }
    }
  });
});

function smoothScrollTo(targetY, duration = 800) {
  const startY = window.pageYOffset;
  const distance = targetY - startY;
  const startTime = performance.now();

  function easeInOutCubic(t) {
    return t < 0.5 ?
      4 * t * t * t :
      1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  function animation(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const ease = easeInOutCubic(progress);
    window.scrollTo(0, startY + distance * ease);

    if (elapsed < duration) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}


(function () {
  // helper: set width percent untuk stars
  function renderStarsElement(el) {
    const raw = el.getAttribute('data-rating') || '0';
    const rating = Math.max(0, Math.min(5, parseFloat(raw)));
    const pct = (rating / 5) * 100;
    // set width of ::after via inline style on element using CSS custom property
    // (can't set pseudo-element width directly; instead toggle style element)
    el.style.setProperty('--star-fill', pct + '%');
    // fallback: set inline style for after using CSS variable via styleSheet injection
    // We'll set a data attribute and use a stylesheet observer below to apply width.
    el.setAttribute('data-fill-percent', pct.toFixed(2) + '%');
  }

  // apply to all .stars on load
  function renderAllStars() {
    document.querySelectorAll('.stars').forEach(renderStarsElement);
    // update numbers and bars based on data-rating when provided
    document.querySelectorAll('.cat').forEach(cat => {
      const stars = cat.querySelector('.stars');
      if (!stars) return;
      const r = parseFloat(stars.getAttribute('data-rating') || 0);
      const numEl = cat.querySelector('.cat-num');
      const barFill = cat.querySelector('.bar-fill');
      if (numEl) numEl.textContent = (Math.round(r * 10) / 10).toFixed(1);
      if (barFill) barFill.style.width = Math.max(0, Math.min(100, (r / 5) * 100)) + '%';
    });
    // overall
    const overall = document.getElementById('overall-score');
    if (overall) {
      // compute simple average of category ratings if present
      const ratings = Array.from(document.querySelectorAll('.categories .stars'))
        .map(s => parseFloat(s.getAttribute('data-rating') || 0))
        .filter(n => !isNaN(n));
      if (ratings.length) {
        const avg = ratings.reduce((a, b) => a + b, 0) / ratings.length;
        overall.textContent = (Math.round(avg * 10) / 10).toFixed(1);
        const overallStars = document.querySelector('.overall .stars');
        if (overallStars) overallStars.setAttribute('data-rating', avg.toFixed(2));
        const vote = document.getElementById('vote-count');
        if (vote && !vote.textContent.trim()) vote.textContent = '0 ulasan';
      }
    }
    // render pseudo-element widths by injecting style rules per element (works cross-browser)
    updateStarFillStyles();
  }

  // Create/Update a <style id="rating-star-fill"> with rules for each stars[data-fill-percent]
  function updateStarFillStyles() {
    let style = document.getElementById('rating-star-fill');
    if (!style) {
      style = document.createElement('style');
      style.id = 'rating-star-fill';
      document.head.appendChild(style);
    }
    let rules = '';
    document.querySelectorAll('.stars[data-fill-percent]').forEach((el, i) => {
      const pct = el.getAttribute('data-fill-percent') || '0%';
      // create unique selector using :nth-of-type is brittle; instead create attribute selector with an index
      const uid = 'data-rating-uid-' + i;
      el.setAttribute(uid, '1');
      rules += `.stars[${uid}]::after{ width: ${pct}; }\n`;
    });
    style.textContent = rules;
  }

  // initialize
  document.addEventListener('DOMContentLoaded', renderAllStars);

  // expose a small API: updateRatings({kebersihan:4.9, rasa:4.7, ...})
  window.RatingSection = {
    updateRatings(obj) {
      // map keys to category names (case-insensitive)
      const map = {
        'kebersihan': 'Kebersihan',
        'rasa': 'Rasa',
        'pelayanan': 'Pelayanan',
        'harga': 'Harga',
        'suasana': 'Suasana'
      };
      Object.keys(obj).forEach(k => {
        const val = parseFloat(obj[k]);
        if (isNaN(val)) return;
        // find category by text
        const cat = Array.from(document.querySelectorAll('.cat')).find(c => c.querySelector('.cat-name') && c.querySelector('.cat-name').textContent.trim().toLowerCase() === k.toLowerCase());
        if (cat) {
          const stars = cat.querySelector('.stars');
          if (stars) stars.setAttribute('data-rating', val.toFixed(2));
          const num = cat.querySelector('.cat-num');
          if (num) num.textContent = (Math.round(val * 10) / 10).toFixed(1);
          const barFill = cat.querySelector('.bar-fill');
          if (barFill) barFill.style.width = Math.max(0, Math.min(100, (val / 5) * 100)) + '%';
        }
      });
      renderAllStars();
    },
    // optional: update overall text
    updateSummary(text) {
      const p = document.querySelector('#rating .summary');
      if (p) p.textContent = text;
    },
    updateVoteCount(n) {
      const el = document.getElementById('vote-count');
      if (el) el.textContent = n.toLocaleString() + ' ulasan';
    }
  };

})();