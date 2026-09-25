/* ================================================================
   MAIN.JS — Rashel Mahmud Rabbi Portfolio
   Apple Glassmorphism Theme · All interactivity & rendering
================================================================ */

'use strict';

// ── Theme ────────────────────────────────────────────────────────
function initTheme() {
  const btn = document.getElementById('themeToggle');
  if (!btn) return;
  const apply = (t) => {
    document.documentElement.setAttribute('data-theme', t);
    btn.innerHTML = t === 'dark' ? '<i class="bi bi-sun"></i>' : '<i class="bi bi-moon"></i>';
    try { localStorage.setItem('rmr_theme', t); } catch(e){}
  };
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  apply(current);
  btn.addEventListener('click', () => {
    apply(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
  });
}

// ── Navbar ───────────────────────────────────────────────────────
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Highlight active link on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(a => {
          a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px' });
  sections.forEach(s => observer.observe(s));
}

// ── Mobile Menu ──────────────────────────────────────────────────
function initMobileMenu() {
  const btn = document.getElementById('mobileMenuBtn');
  const nav = document.getElementById('mobileNav');
  if (!btn || !nav) return;
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    nav.classList.toggle('open');
    if (nav.classList.contains('open')) {
        btn.innerHTML = '<i class="bi bi-x-lg"></i>';
        document.body.style.overflow = 'hidden';
      } else {
        btn.innerHTML = '<i class="bi bi-list"></i>';
        document.body.style.overflow = '';
      }
  });
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && e.target !== btn && !btn.contains(e.target)) {
        if(nav.classList.contains('open')) {
          nav.classList.remove('open');
          btn.innerHTML = '<i class="bi bi-list"></i>';
          document.body.style.overflow = '';
        }
      }
  });
}
function closeMobileNav() {
  const nav = document.getElementById('mobileNav');
  const btn = document.getElementById('mobileMenuBtn');
  if (nav) nav.classList.remove('open');
  if (btn) btn.innerHTML = '<i class="bi bi-list"></i>';
  document.body.style.overflow = '';
}

// ── Scroll Progress ──────────────────────────────────────────────
function initScrollProgress() {
  const bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const pct = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}

// ── Scroll-to-Top ────────────────────────────────────────────────
function initScrollTop() {
  const btn = document.getElementById('scrollTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

// ── Reveal on Scroll ─────────────────────────────────────────────
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
  els.forEach(el => obs.observe(el));
}

// ── Counter Animation ────────────────────────────────────────────
function initCounters() {
  const els = document.querySelectorAll('.counter');
  if (!els.length) return;
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const target  = parseFloat(e.target.dataset.target || e.target.textContent) || 0;
      const decimal = parseInt(e.target.dataset.decimal || '0');
      const dur     = 1800;
      const step    = 16;
      const steps   = dur / step;
      let current   = 0;
      const inc     = target / steps;
      const timer   = setInterval(() => {
        current = Math.min(current + inc, target);
        e.target.textContent = decimal ? current.toFixed(decimal) : Math.floor(current);
        if (current >= target) clearInterval(timer);
      }, step);
    });
  }, { threshold: 0.5 });
  els.forEach(el => obs.observe(el));
}

// ── Typewriter ───────────────────────────────────────────────────
function initTypewriter() {
  const el = document.getElementById('typewriterText');
  if (!el) return;
  const phrases = [
    'Graduate Researcher – Computer Vision & AI',
    'Deep Learning Architect',
    'Medical Image Analysis',
    'Explainable AI Researcher',
    'Seeking PhD – Fall 2026'
  ];
  let pi = 0, ci = 0, deleting = false;
  const type = () => {
    const phrase = phrases[pi];
    if (!deleting) {
      el.textContent = phrase.slice(0, ++ci);
      if (ci === phrase.length) { deleting = true; setTimeout(type, 2200); return; }
    } else {
      el.textContent = phrase.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 45 : 80);
  };
  type();
}

// ── Spotlight Carousel ───────────────────────────────────────────
let spotIdx = 0;
function goToSpotlight(idx) {
  const slides = document.querySelectorAll('.spotlight-slide');
  const dots   = document.querySelectorAll('.spotlight-dot');
  const counter = document.querySelector('.spotlight-footer span:last-child');
  if (!slides.length) return;
  slides[spotIdx].classList.remove('active');
  dots[spotIdx]?.classList.remove('active');
  spotIdx = (idx + slides.length) % slides.length;
  slides[spotIdx].classList.add('active');
  dots[spotIdx]?.classList.add('active');
  if (counter) counter.textContent = `${spotIdx + 1} / ${slides.length}`;
}
function nextSpotlight() { goToSpotlight(spotIdx + 1); }
function prevSpotlight() { goToSpotlight(spotIdx - 1); }
function initSpotlight() {
  setInterval(() => goToSpotlight(spotIdx + 1), 5000);
}

// ── Project Filter ───────────────────────────────────────────────
function initProjectFilter() {
  const btns  = document.querySelectorAll('.filter-btn');
  const cards = document.querySelectorAll('.project-card[data-category]');
  if (!btns.length) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      cards.forEach(card => {
        card.classList.toggle('hidden', filter !== 'all' && card.dataset.category !== filter);
      });
    });
  });
}

// ── Gallery ──────────────────────────────────────────────────────
function openLightbox(src, caption) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  const cap = document.getElementById('lightboxCaption');
  if (!lb) return;
  img.src        = src;
  img.alt        = caption || '';
  cap.textContent = caption || '';
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  const lb = document.getElementById('lightbox');
  if (lb) lb.classList.remove('open');
  document.body.style.overflow = '';
}
function initLightbox() {
  document.querySelectorAll('.gallery-photo').forEach(photo => {
    photo.addEventListener('click', () => {
      const img = photo.querySelector('img');
      const cap = photo.querySelector('.gallery-photo-caption');
      if (img) openLightbox(img.src, cap?.textContent);
    });
  });
  document.getElementById('lightbox')?.addEventListener('click', e => {
    if (e.target === e.currentTarget) closeLightbox();
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });
}

// ── Contact Form ─────────────────────────────────────────────────
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('[type=submit]');
    const success = document.getElementById('formSuccess');
    const data = {
      name:    form.querySelector('[name=name]')?.value?.trim(),
      email:   form.querySelector('[name=email]')?.value?.trim(),
      subject: form.querySelector('[name=subject]')?.value?.trim() || '',
      message: form.querySelector('[name=message]')?.value?.trim()
    };
    if (!data.name || !data.email || !data.message) {
      alert('Please fill in all required fields.');
      return;
    }
    btn.disabled = true;
    btn.innerHTML = '<i class="bi bi-arrow-repeat" style="animation:spin 1s linear infinite"></i> Sending…';
    try {
      await api.contact(data);
      form.reset();
      if (success) success.style.display = 'block';
    } catch (err) {
      alert('Failed to send message. Please email me directly at raselmahud6757@gmail.com');
    } finally {
      btn.disabled = false;
      btn.innerHTML = '<i class="bi bi-send-fill"></i> Send Message';
    }
  });
}

// ── Footer Year ──────────────────────────────────────────────────
function initFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}

// ── Pub Abstract Toggle ──────────────────────────────────────────
function initAbstractToggle() {
  document.querySelectorAll('.pub-abstract-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const abs = btn.previousElementSibling;
      if (!abs) return;
      const exp = abs.classList.toggle('expanded');
      btn.textContent = exp ? 'Show less ↑' : 'Show abstract ↓';
    });
  });
}

// ── Page-Specific Rendering ───────────────────────────────────────
// Publications page
async function renderPublicationsPage() {
  const container = document.getElementById('allPubsList');
  if (!container) return;
  container.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--text-3)"><i class="bi bi-arrow-repeat" style="font-size:2rem;animation:spin 1s linear infinite;display:block;margin-bottom:1rem"></i>Loading…</div>';
  const pubs = await api.publications();
  const typeLabels = { journal: { label: 'Journal', cls: 'badge-blue', icon: 'bi-journal-check' }, conference: { label: 'Conference', cls: 'badge-purple', icon: 'bi-building' }, thesis: { label: 'Thesis', cls: 'badge-glass', icon: 'bi-mortarboard-fill' } };
  const statusLabels = { published: { label: 'Published', cls: 'badge-green', icon: 'bi-check-circle-fill' }, completed: { label: 'Completed', cls: 'badge-green', icon: 'bi-check-circle-fill' }, accepted: { label: 'Accepted', cls: 'badge-blue', icon: 'bi-check-circle' }, review: { label: 'Under Review', cls: 'badge-orange', icon: 'bi-hourglass-split' } };
  container.innerHTML = pubs.map((p, i) => {
    const t = typeLabels[p.type] || typeLabels.conference;
    const s = statusLabels[p.status] || statusLabels.published;
    return `<div class="glass-card pub-card reveal reveal-delay-${i % 3}" style="margin-bottom:0">
      <div class="pub-meta">
        <span class="badge ${t.cls}"><i class="bi ${t.icon}"></i> ${t.label}</span>
        <span class="badge ${s.cls}"><i class="bi ${s.icon}"></i> ${s.label}</span>
        ${p.year ? `<span class="badge badge-glass">${p.year}</span>` : ''}
      </div>
      <h4 class="pub-title">${esc(p.title)}</h4>
      <p class="pub-authors">${esc(p.authors || '')}</p>
      <p class="pub-venue">${esc(p.venue || '')}</p>
      ${p.abstract ? `<p class="pub-abstract">${esc(p.abstract)}</p><button class="pub-abstract-toggle" style="font-size:0.8rem;color:var(--blue);background:none;border:none;cursor:pointer;padding:0;margin-bottom:1rem">Show abstract ↓</button>` : ''}
      <div class="pub-links">
        ${p.doi_link ? `<a href="${esc(p.doi_link)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="bi bi-link-45deg"></i> DOI</a>` : ''}
        ${p.pdf_link ? `<a href="${esc(p.pdf_link)}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm"><i class="bi bi-file-earmark-pdf"></i> PDF</a>` : ''}
      </div>
    </div>`;
  }).join('');
  initAbstractToggle();
    hydrateHomePage();
  initReveal();
}

// Projects page
async function renderProjectsPage() {
  const container = document.getElementById('allProjectsGrid');
  if (!container) return;
  container.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--text-3)"><i class="bi bi-arrow-repeat" style="font-size:2rem;animation:spin 1s linear infinite;display:block;margin-bottom:1rem"></i>Loading…</div>';
  const projects = await api.projects();
  const catMap = { thesis: { label: 'Thesis', cls: 'badge-purple', icon: 'bi-mortarboard-fill', color: 'rgba(191,90,242,0.15),rgba(0,113,227,0.15)', fgColor: 'var(--purple)' }, research: { label: 'Research', cls: 'badge-green', icon: 'bi-graph-up', color: 'rgba(52,199,89,0.15),rgba(0,113,227,0.12)', fgColor: 'var(--green)' }, development: { label: 'Development', cls: 'badge-blue', icon: 'bi-code-slash', color: 'rgba(0,113,227,0.12),rgba(90,200,250,0.1)', fgColor: 'var(--blue)' } };
  container.innerHTML = projects.map((p, i) => {
    const c = catMap[p.category] || catMap.research;
    return `<div class="glass-card project-card reveal reveal-delay-${i % 3}" data-category="${esc(p.category)}">
      <div class="project-thumb" style="background:linear-gradient(135deg,${c.color})">
        <i class="bi bi-stars" style="color:${c.fgColor};position:relative;z-index:1;font-size:2.5rem"></i>
      </div>
      <div class="project-body">
        <span class="badge ${c.cls} mb-0"><i class="bi ${c.icon}"></i> ${c.label}</span>
        <h4 class="project-title">${esc(p.title)}</h4>
        <p class="project-desc">${esc(p.description || '')}</p>
        <div class="project-tech">${(p.tech || '').split(',').map(t => `<span class="tag">${esc(t.trim())}</span>`).join('')}</div>
        <div class="project-links">
          ${p.github_link ? `<a href="${esc(p.github_link)}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm"><i class="bi bi-github"></i> GitHub</a>` : ''}
          ${p.paper_link  ? `<a href="${esc(p.paper_link)}"  target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="bi bi-box-arrow-up-right"></i> Live</a>` : ''}
          <span class="tag" style="align-self:center">${esc(p.year || '')}</span>
        </div>
      </div>
    </div>`;
  }).join('');
  initReveal();
}

// Blog page
async function renderBlogPage() {
  const container = document.getElementById('allBlogGrid');
  if (!container) return;
  container.innerHTML = '<div style="text-align:center;padding:3rem;color:var(--text-3)"><i class="bi bi-arrow-repeat" style="font-size:2rem;animation:spin 1s linear infinite;display:block;margin-bottom:1rem"></i>Loading…</div>';
  const posts = await api.blog();
  const catColors = { 'Explainable AI': 'badge-orange', 'Computer Vision': 'badge-blue', 'Deep Learning': 'badge-purple', 'Academic Life': 'badge-green', 'Resources': 'badge-glass' };
  const catIcons  = { 'Explainable AI': 'bi-lightbulb-fill', 'Computer Vision': 'bi-eye-fill', 'Deep Learning': 'bi-cpu-fill', 'Academic Life': 'bi-mortarboard-fill', 'Resources': 'bi-bookmark-fill' };
  container.innerHTML = posts.map((p, i) => {
    const cls  = catColors[p.category] || 'badge-glass';
    const icon = catIcons[p.category]  || 'bi-pencil-fill';
    return `<div class="glass-card blog-card reveal reveal-delay-${i % 3}">
      <div class="blog-card-top"><i class="bi ${icon}" style="color:var(--blue);font-size:2.5rem;position:relative;z-index:1"></i></div>
      <div class="blog-card-body">
        <div class="blog-meta">
          <span class="badge ${cls}">${esc(p.category)}</span>
          <span style="font-size:0.78rem;color:var(--text-3)">${esc(p.date)} · ${esc(p.read_time)}</span>
          ${p.featured ? '<span class="badge badge-orange"><i class="bi bi-star-fill"></i> Featured</span>' : ''}
        </div>
        <h4 class="blog-title">${esc(p.title)}</h4>
        <p class="blog-excerpt">${esc(p.excerpt)}</p>
        <span class="blog-read-more">Read more <i class="bi bi-arrow-right"></i></span>
      </div>
    </div>`;
  }).join('');
  initReveal();
}

// ── Dynamic Live Hydration from Backend / Admin Panel ──────────────
async function hydrateHomePage() {
  try {
    const settings = await api.settings();
    if (!settings) return;

    // 1. Profile / Hero & About
    const profile = settings.profile || settings;
    if (profile.name) {
      document.querySelectorAll('.hero-name').forEach(el => el.textContent = profile.name);
      document.title = `${profile.name} — Portfolio`;
    }
    if (profile.title) {
      const tw = document.getElementById('typewriterText');
      if (tw) tw.textContent = profile.title;
    }
    if (profile.location) {
      document.querySelectorAll('.hero-meta-item:nth-child(1)').forEach(el => {
        el.innerHTML = `<i class="bi bi-geo-alt-fill"></i> ${esc(profile.location)}`;
      });
    }
    if (profile.email) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(el => {
        el.href = `mailto:${profile.email}`;
        if (el.textContent.includes('@')) el.textContent = profile.email;
      });
    }
    if (profile.avatar) {
      document.querySelectorAll('.hero-avatar').forEach(img => {
        img.src = profile.avatar;
      });
    }
    if (profile.hero_status_text) {
      document.querySelectorAll('.hero-status').forEach(el => {
        el.textContent = profile.hero_status_text;
      });
    }

    // Social Links
    const socials = profile.socials || profile;
    if (socials.github) document.querySelectorAll('a.social-pill[href*="github"], a.footer-social[href*="github"]').forEach(a => a.href = socials.github);
    if (socials.linkedin) document.querySelectorAll('a.social-pill[href*="linkedin"], a.footer-social[href*="linkedin"]').forEach(a => a.href = socials.linkedin);
    if (socials.researchgate) document.querySelectorAll('a.social-pill[href*="researchgate"]').forEach(a => a.href = socials.researchgate);
    if (socials.scholar) document.querySelectorAll('a.social-pill[href*="scholar"]').forEach(a => a.href = socials.scholar);
    if (socials.orcid) document.querySelectorAll('a.social-pill[href*="orcid"]').forEach(a => a.href = socials.orcid);
    if (socials.social_x) document.querySelectorAll('a.social-pill[href*="twitter"], a.social-pill[href*="x.com"]').forEach(a => a.href = socials.social_x);

    // CV Download Links
    const cvUrl = profile.cv_download_url || settings.cvDownloadUrl;
    if (cvUrl) {
      document.querySelectorAll('a[href*="drive.google.com"], a.btn-primary[href*="drive.google"]').forEach(a => a.href = cvUrl);
    }

    // Bio / Objective in About
    const bioText = profile.objective || settings.about_text;
    if (bioText) {
      const bioCard = document.querySelector('.about-bio');
      if (bioCard) {
        if (bioText.includes('<')) {
          bioCard.innerHTML = bioText;
        } else {
          bioCard.innerHTML = `<p>${esc(bioText)}</p>`;
        }
      }
    }

    // 2. Research Interests dynamic update
    const interests = settings.researchInterests;
    if (Array.isArray(interests) && interests.length > 0) {
      const grid = document.getElementById('researchGrid');
      if (grid) {
        grid.innerHTML = interests.map((r, i) => `
          <div class="glass-card research-card reveal reveal-delay-${i % 3}">
            <div class="research-icon"><i class="bi ${r.icon ? (r.icon.startsWith('bi-') ? r.icon : 'bi-' + r.icon) : 'bi-stars'}"></i></div>
            <h4>${esc(r.topic)}</h4>
            <p>${esc(r.desc || r.description || '')}</p>
          </div>
        `).join('');
      }
    }
  } catch (err) {
    console.warn('[Hydration] Notice:', err);
  }
}

// ── Utility ──────────────────────────────────────────────────────
function esc(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

// CSS keyframes for spinner
const spinStyle = document.createElement('style');
spinStyle.textContent = '@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}';
document.head.appendChild(spinStyle);

// ── Bootstrap ────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  initMobileMenu();
  initScrollProgress();
  initScrollTop();
  initReveal();
  initCounters();
  initTypewriter();
  initSpotlight();
  initProjectFilter();
  initLightbox();
  initContactForm();
  initFooterYear();
  initAbstractToggle();
    hydrateHomePage();

  // Dynamic Content Hydration from Admin / Backend API
  hydrateHomePage();

  // Page-specific
  if (document.getElementById('allPubsList'))     renderPublicationsPage();
  if (document.getElementById('allProjectsGrid')) renderProjectsPage();
  if (document.getElementById('allBlogGrid'))     renderBlogPage();
});





  // --- Dynamic Live Hydration from Backend / Admin Panel ---
  async function hydrateHomePage() {
    try {
      const settings = await api.settings();
      if (!settings) return;
  
      const profile = settings.profile || settings;
      if (profile.name) {
        document.querySelectorAll('.hero-name').forEach(el => el.textContent = profile.name);
        document.title = profile.name + ' - Portfolio';
      }
      if (profile.title) {
        const tw = document.getElementById('typewriterText');
        if (tw) tw.textContent = profile.title;
      }
      if (profile.location) {
        const loc = document.querySelector('.hero-meta-item:nth-child(1)');
        if (loc) loc.innerHTML = <i class="bi bi-geo-alt-fill"></i>  + esc(profile.location);
      }
      if (profile.email) {
        const email = document.querySelector('.hero-meta-item:nth-child(2)');
        if (email) email.innerHTML = <i class="bi bi-envelope-fill"></i><a href="mailto: + esc(profile.email) + "> + esc(profile.email) + </a>;
      }
  
      const interests = settings.researchInterests;
      if (Array.isArray(interests) && interests.length > 0) {
        const grid = document.getElementById('researchGrid');
        if (grid) {
          grid.innerHTML = interests.map((r, i) => 
            <div class="glass-card research-card reveal reveal-delay- + (i % 3) + ">
              <div class="research-icon"><i class="bi  + (r.icon ? (r.icon.startsWith('bi-') ? r.icon : 'bi-' + r.icon) : 'bi-stars') + "></i></div>
              <h4> + esc(r.topic) + </h4>
              <p> + esc(r.desc || r.description || '') + </p>
            </div>
          ).join('');
          initReveal();
        }
      }
    } catch (err) {
      console.warn('[Hydration] Notice:', err);
    }
  }