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

// ── About Tabs (Executive Bio vs Research Vision) ─────────────────
function switchAboutTab(tabName) {
  const btnBio = document.getElementById('tabBtnBio');
  const btnVision = document.getElementById('tabBtnVision');
  const paneBio = document.getElementById('tabPaneBio');
  const paneVision = document.getElementById('tabPaneVision');

  if (tabName === 'bio') {
    if (btnBio) { btnBio.classList.add('active'); btnBio.setAttribute('aria-selected', 'true'); }
    if (btnVision) { btnVision.classList.remove('active'); btnVision.setAttribute('aria-selected', 'false'); }
    if (paneBio) paneBio.classList.add('active');
    if (paneVision) paneVision.classList.remove('active');
  } else {
    if (btnBio) { btnBio.classList.remove('active'); btnBio.setAttribute('aria-selected', 'false'); }
    if (btnVision) { btnVision.classList.add('active'); btnVision.setAttribute('aria-selected', 'true'); }
    if (paneBio) paneBio.classList.remove('active');
    if (paneVision) paneVision.classList.add('active');
  }
}

// ── Spotlight Carousel ───────────────────────────────────────────
let spotIdx = 0;
let spotlightTimer = null;

function goToSpotlight(idx) {
  const slides = document.querySelectorAll('.spotlight-slide');
  const dots   = document.querySelectorAll('.spotlight-dot');
  const counter = document.getElementById('spotlightCounter') || document.querySelector('.spotlight-footer span:last-child');
  if (!slides.length) return;
  if (slides[spotIdx]) slides[spotIdx].classList.remove('active');
  if (dots[spotIdx]) dots[spotIdx].classList.remove('active');
  spotIdx = (idx + slides.length) % slides.length;
  if (slides[spotIdx]) slides[spotIdx].classList.add('active');
  if (dots[spotIdx]) dots[spotIdx].classList.add('active');
  if (counter) counter.textContent = `${spotIdx + 1} / ${slides.length}`;
}

function nextSpotlight() {
  goToSpotlight(spotIdx + 1);
  resetSpotlightTimer();
}

function prevSpotlight() {
  goToSpotlight(spotIdx - 1);
  resetSpotlightTimer();
}

function resetSpotlightTimer() {
  if (spotlightTimer) clearInterval(spotlightTimer);
  spotlightTimer = setInterval(() => {
    goToSpotlight(spotIdx + 1);
  }, 5000);
}

function initSpotlight() {
  const card = document.getElementById('spotlightCard');
  if (card) {
    card.addEventListener('mouseenter', () => {
      if (spotlightTimer) clearInterval(spotlightTimer);
    });
    card.addEventListener('mouseleave', () => {
      resetSpotlightTimer();
    });
  }
  resetSpotlightTimer();
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
  if (!form || form.querySelector("[name=access_key]")) return;
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
      ${p.abstract ? `<div class="pub-abstract">${renderRichText(p.abstract)}</div><button class="pub-abstract-toggle" style="font-size:0.8rem;color:var(--blue);background:none;border:none;cursor:pointer;padding:0;margin-bottom:1rem">Show abstract ↓</button>` : ''}
      <div class="pub-links">
        ${p.doi_link ? `<a href="${esc(p.doi_link)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="bi bi-link-45deg"></i> DOI</a>` : ''}
        ${p.pdf_link ? `<a href="${esc(p.pdf_link)}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm"><i class="bi bi-file-earmark-pdf"></i> PDF</a>` : ''}
      </div>
    </div>`;
  }).join('');
  initAbstractToggle();
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
        <div class="project-desc">${renderRichText(p.description || '')}</div>
        <div class="project-tech">${(Array.isArray(p.tech) ? p.tech : String(p.tech || '').split(',')).map(t => `<span class="tag">${esc(t.trim())}</span>`).join('')}</div>
        <div class="project-links">
          ${(p.github_link||p.githubLink) ? `<a href="${esc(p.github_link||p.githubLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm"><i class="bi bi-github"></i> GitHub</a>` : ''}
          ${(p.paper_link||p.paperLink) ? `<a href="${esc(p.paper_link||p.paperLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="bi bi-box-arrow-up-right"></i> Live</a>` : ''}
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
        <div class="blog-excerpt">${renderRichText(p.excerpt)}</div>
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
    if (socials.github) document.querySelectorAll('a.social-pill[href*="github"], a.footer-social[href*="github"], a.footer-dock-btn[href*="github"]').forEach(a => a.href = socials.github);
    if (socials.linkedin) document.querySelectorAll('a.social-pill[href*="linkedin"], a.footer-social[href*="linkedin"], a.footer-dock-btn[href*="linkedin"]').forEach(a => a.href = socials.linkedin);
    if (socials.researchgate) document.querySelectorAll('a.social-pill[href*="researchgate"], a.footer-dock-btn[href*="researchgate"]').forEach(a => a.href = socials.researchgate);
    if (socials.scholar) document.querySelectorAll('a.social-pill[href*="scholar"], a.footer-dock-btn[href*="scholar"]').forEach(a => a.href = socials.scholar);
    if (socials.orcid) document.querySelectorAll('a.social-pill[href*="orcid"], a.footer-dock-btn[href*="orcid"]').forEach(a => a.href = socials.orcid);
    if (socials.social_x) document.querySelectorAll('a.social-pill[href*="twitter"], a.social-pill[href*="x.com"], a.footer-dock-btn[href*="twitter"], a.footer-dock-btn[href*="x.com"]').forEach(a => a.href = socials.social_x);

    // Footer Custom Certification Text
    if (settings.footerText || settings.footer_text) {
      const footerCert = document.querySelector('.footer-cert-note');
      if (footerCert) {
        footerCert.innerHTML = `<i class="bi bi-shield-check"></i> ${esc(settings.footerText || settings.footer_text)}`;
      }
    }

    // CV Download Links
    const cvUrl = profile.cv_download_url || settings.cvDownloadUrl;
    if (cvUrl) {
      document.querySelectorAll('a[href*="drive.google.com"], a.btn-primary[href*="drive.google"]').forEach(a => a.href = cvUrl);
    }

    // About Section (Kicker, Headline, Status, Bio, Statement & Pills)
    const aboutData = settings.about || {};
    const aboutKickerEl = document.getElementById('aboutKicker');
    if (aboutKickerEl && (aboutData.kicker || settings.about_kicker)) {
      aboutKickerEl.textContent = aboutData.kicker || settings.about_kicker;
    }

    const aboutHeadlineEl = document.getElementById('aboutHeadline');
    if (aboutHeadlineEl && (aboutData.headline || settings.about_headline)) {
      aboutHeadlineEl.textContent = aboutData.headline || settings.about_headline;
    }

    // Status Pill in About
    const statusPillEl = document.getElementById('aboutStatusPill');
    const statusText = aboutData.statusText || settings.about_status_text || profile.hero_status_text;
    if (statusPillEl && statusText) {
      statusPillEl.innerHTML = `<span class="dot"></span> ${esc(statusText)}`;
    }

    // Dynamic Meta Pills
    const pills = aboutData.pills || [];
    if (Array.isArray(pills) && pills.length > 0) {
      const pillsContainer = document.getElementById('aboutPillsContainer');
      if (pillsContainer) {
        const colorClassMap = {
          primary: 'text-primary',
          danger: 'text-danger',
          success: 'text-success',
          warning: 'text-warning',
          info: 'text-info',
          secondary: 'text-secondary'
        };
        const renderedPills = pills.map(p => {
          const colorClass = colorClassMap[p.colorType] || 'text-primary';
          const iconHtml = p.icon ? `<i class="bi ${esc(p.icon)} ${colorClass}"></i> ` : '';
          return `<span class="about-pill">${iconHtml}${esc(p.label)}</span>`;
        }).join('');
        const statusHtml = statusText ? `<span class="about-pill" id="aboutStatusPill"><span class="dot"></span> ${esc(statusText)}</span>` : '';
        pillsContainer.innerHTML = renderedPills + statusHtml;
      }
    }

    // Executive Bio Tab
    const bioText = aboutData.text || settings.about_text || profile.objective;
    if (bioText) {
      const bioEl = document.getElementById('aboutBioContent') || document.querySelector('.about-bio');
      if (bioEl) {
        if (bioText.includes('<')) {
          bioEl.innerHTML = sanitizeHTML(bioText);
        } else {
          bioEl.innerHTML = `<p>${esc(bioText)}</p>`;
        }
      }
    }

    // Research Statement / Vision Tab
    const visionText = aboutData.research_statement_text || settings.research_statement_text;
    if (visionText) {
      const visionEl = document.getElementById('aboutVisionContent');
      if (visionEl) {
        if (visionText.includes('<')) {
          visionEl.innerHTML = sanitizeHTML(visionText);
        } else {
          visionEl.innerHTML = `<p>${esc(visionText)}</p>`;
        }
      }
    }

    // Dynamic Spotlight Highlights
    try {
      const spotlights = await api.spotlights();
      if (Array.isArray(spotlights) && spotlights.length > 0) {
        const carousel = document.getElementById('spotlightCarousel');
        const dotsContainer = document.getElementById('spotlightDots');
        const counterEl = document.getElementById('spotlightCounter');

        if (carousel) {
          carousel.innerHTML = spotlights.map((s, idx) => {
            const badgeClass = s.badgeType || 'badge-pub';
            const iconBadge = badgeClass === 'badge-proj' ? 'bi-cpu' : (badgeClass === 'badge-xai' ? 'bi-eye' : 'bi-journal-check');
            const linkHref = s.linkUrl || '#';
            const linkText = s.linkLabel || 'Learn More';
            return `
              <div class="spotlight-slide ${idx === 0 ? 'active' : ''}">
                <span class="spotlight-badge ${esc(badgeClass)}"><i class="bi ${iconBadge}"></i> ${esc(s.badge || 'Highlight')}</span>
                <h4>${esc(s.title || '')}</h4>
                <p>${esc(s.description || '')}</p>
                ${s.tag ? `<span class="spotlight-tag-pill">${esc(s.tag)}</span>` : ''}
                ${linkHref !== '#' ? `<a href="${esc(linkHref)}" class="btn btn-glass btn-sm"><i class="bi bi-arrow-right-circle"></i> ${esc(linkText)}</a>` : ''}
              </div>
            `;
          }).join('');
        }

        if (dotsContainer) {
          dotsContainer.innerHTML = spotlights.map((_, idx) => `
            <div class="spotlight-dot ${idx === 0 ? 'active' : ''}" onclick="goToSpotlight(${idx})"></div>
          `).join('');
        }

        if (counterEl) {
          counterEl.textContent = `1 / ${spotlights.length}`;
        }
      }
    } catch (e) {
      console.warn('Could not hydrate spotlights:', e.message);
    }

    // 2. Research Interests
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

    // 3. Education
    const education = await api.education();
    if (Array.isArray(education) && education.length > 0) {
      const eduGrid = document.getElementById('educationGrid');
      if (eduGrid) {
        eduGrid.innerHTML = education.map((e, i) => `
          <div class="glass-card edu-card reveal reveal-delay-${i % 3}">
            <div class="edu-year">${esc(e.year)}</div>
            <div class="edu-info">
              <h4 class="edu-degree">${esc(e.degree)}</h4>
              <p class="edu-major">${esc(e.major)}</p>
              <p class="edu-inst"><i class="bi bi-bank me-1"></i>${esc(e.institution)}</p>
              ${e.grade ? `<span class="badge badge-purple mt-2"><i class="bi bi-star-fill"></i> CGPA / Grade: ${esc(e.grade)}</span>` : ''}
            </div>
          </div>
        `).join('');
      }
    }

    // 4. Experience
    const experience = await api.experience();
    if (Array.isArray(experience) && experience.length > 0) {
      const expTimeline = document.getElementById('experienceTimeline');
      if (expTimeline) {
        expTimeline.innerHTML = experience.map((ex, i) => `
          <div class="timeline-item reveal reveal-delay-${i % 3}">
            <div class="timeline-dot"><i class="bi bi-briefcase-fill"></i></div>
            <div class="timeline-content">
              <div class="timeline-period">${esc(ex.period)}</div>
              <h4 class="timeline-title">${esc(ex.title)}</h4>
              <p class="timeline-org">${esc(ex.org)}</p>
              <ul class="timeline-bullets">
                ${(Array.isArray(ex.bullets) ? ex.bullets : String(ex.bullets||'').split('\n')).map(b => b.trim()).filter(b => b).map(b => `<li>${b.includes('<strong>') ? b : esc(b)}</li>`).join('')}
              </ul>
            </div>
          </div>
        `).join('');
      }
    }

    // 4b. Publications (Home Page Preview)
    try {
      const pubs = await api.publications();
      if (Array.isArray(pubs) && pubs.length > 0) {
        const pubList = document.getElementById('pubList');
        if (pubList) {
          const typeLabels = {
            journal: { label: 'Journal', cls: 'badge-blue', icon: 'bi-journal-check' },
            conference: { label: 'Conference', cls: 'badge-purple', icon: 'bi-building' },
            thesis: { label: 'Thesis', cls: 'badge-glass', icon: 'bi-mortarboard-fill' }
          };
          const statusLabels = {
            published: { label: 'Published', cls: 'badge-green', icon: 'bi-check-circle-fill' },
            completed: { label: 'Completed', cls: 'badge-green', icon: 'bi-check-circle-fill' },
            accepted: { label: 'Accepted', cls: 'badge-blue', icon: 'bi-check-circle' },
            review: { label: 'Under Review', cls: 'badge-orange', icon: 'bi-hourglass-split' }
          };
          // Display top 3 featured / recent publications on home page
          const displayPubs = pubs.slice(0, 3);
          pubList.innerHTML = displayPubs.map((p, i) => {
            const t = typeLabels[p.type] || typeLabels.conference;
            const s = statusLabels[p.status] || statusLabels.published;
            return `
              <div class="glass-card pub-card reveal reveal-delay-${i % 3}">
                <div class="pub-meta">
                  <span class="badge ${t.cls}"><i class="bi ${t.icon}"></i> ${t.label}</span>
                  <span class="badge ${s.cls}"><i class="bi ${s.icon}"></i> ${s.label}</span>
                  ${p.year ? `<span class="badge badge-glass">${esc(p.year)}</span>` : ''}
                </div>
                <h4 class="pub-title">${esc(p.title)}</h4>
                <p class="pub-authors">${esc(p.authors || '')}</p>
                <p class="pub-venue">${esc(p.venue || '')}</p>
                <div class="pub-links">
                  ${p.doi_link ? `<a href="${esc(p.doi_link)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="bi bi-link-45deg"></i> DOI</a>` : ''}
                  ${p.pdf_link ? `<a href="${esc(p.pdf_link)}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm"><i class="bi bi-file-earmark-pdf"></i> PDF</a>` : ''}
                </div>
              </div>
            `;
          }).join('');
        }
      }
    } catch(e) {
      console.warn('Home pubs hydration notice:', e);
    }

    // 4c. Projects (Home Page Preview)
    try {
      const projects = await api.projects();
      if (Array.isArray(projects) && projects.length > 0) {
        const projectGrid = document.getElementById('projectGrid');
        if (projectGrid) {
          const catMap = {
            thesis: { label: 'Thesis', cls: 'badge-purple', icon: 'bi-mortarboard-fill', color: 'rgba(191,90,242,0.15),rgba(0,113,227,0.15)', fgColor: 'var(--purple)', thumbIcon: 'bi-dna' },
            research: { label: 'Research', cls: 'badge-green', icon: 'bi-graph-up', color: 'rgba(52,199,89,0.15),rgba(0,113,227,0.12)', fgColor: 'var(--green)', thumbIcon: 'bi-satellite' },
            development: { label: 'Development', cls: 'badge-blue', icon: 'bi-code-slash', color: 'rgba(0,113,227,0.12),rgba(90,200,250,0.1)', fgColor: 'var(--blue)', thumbIcon: 'bi-laptop' }
          };
          projectGrid.innerHTML = projects.map((p, i) => {
            const c = catMap[p.category] || catMap.research;
            const techList = Array.isArray(p.tech) ? p.tech : String(p.tech || '').split(',');
            const techHtml = techList.map(t => `<span class="tag">${esc(t.trim())}</span>`).join('');
            const gh = p.github_link || p.githubLink;
            const paper = p.paper_link || p.paperLink;
            return `
              <div class="glass-card project-card reveal reveal-delay-${i % 3}" data-category="${esc(p.category)}">
                <div class="project-thumb" style="background:linear-gradient(135deg,${c.color})">
                  <i class="bi ${c.thumbIcon}" style="color:${c.fgColor};position:relative;z-index:1;font-size:2.5rem"></i>
                </div>
                <div class="project-body">
                  <span class="badge ${c.cls} mb-0"><i class="bi ${c.icon}"></i> ${c.label}</span>
                  <h4 class="project-title">${esc(p.title)}</h4>
                  <div class="project-desc">${renderRichText(p.description || '')}</div>
                  <div class="project-tech">${techHtml}</div>
                  <div class="project-links">
                    ${gh ? `<a href="${esc(gh)}" target="_blank" rel="noopener noreferrer" class="btn btn-glass btn-sm"><i class="bi bi-github"></i> GitHub</a>` : ''}
                    ${paper ? `<a href="${esc(paper)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="bi bi-box-arrow-up-right"></i> Live / Paper</a>` : ''}
                    ${p.year ? `<span class="tag" style="align-self:center">${esc(p.year)}</span>` : ''}
                  </div>
                </div>
              </div>
            `;
          }).join('');
        }
      }
    } catch(e) {
      console.warn('Home projects hydration notice:', e);
    }

    // 5. Certifications
    const certs = await api.certifications();
    if (Array.isArray(certs) && certs.length > 0) {
      const certGrid = document.querySelector('#certifications .cert-grid');
      if (certGrid) {
        certGrid.innerHTML = certs.map((c, i) => {
          const imgUrl = c.image || '';
          const pdfUrl = c.pdfLink || '';
          return `
          <div class="glass-card cert-card reveal reveal-delay-${i % 3}">
            <img class="cert-thumb" src="${esc(imgUrl)}" loading="lazy" decoding="async" alt="${esc(c.title)}" onerror="this.outerHTML='<div class=cert-thumb-placeholder><i class=bi.bi-award-fill></i></div>'" />
            <div class="cert-info">
              <h4 class="cert-title">${esc(c.title)}</h4>
              <p class="cert-issuer"><i class="bi bi-building me-1"></i>${esc(c.issuer)} ${c.year ? '&bull; ' + esc(c.year) : ''}</p>
              <div class="cert-links">
                ${c.verifyLink ? `<a href="${esc(c.verifyLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm"><i class="bi bi-patch-check-fill"></i> Verify</a>` : ''}
                ${pdfUrl ? `<a href="${esc(pdfUrl)}" target="_blank" class="btn btn-glass btn-sm"><i class="bi bi-file-earmark-pdf"></i> PDF</a>` : ''}
              </div>
            </div>
          </div>`;
        }).join('');
      }
    }

    // 6. Awards
    const awards = await api.awards();
    if (Array.isArray(awards) && awards.length > 0) {
      const awardGrid = document.querySelector('#awards .awards-grid');
      if (awardGrid) {
        awardGrid.innerHTML = awards.map((a, i) => `
          <div class="glass-card award-card reveal reveal-delay-${i % 3}">
            <div class="award-icon"><i class="bi bi-trophy-fill"></i></div>
            <h4 class="award-title">${esc(a.title)}</h4>
            <p class="award-org">${esc(a.org)} ${a.year ? '&bull; ' + esc(a.year) : ''}</p>
            ${a.image ? `<img src="${esc(a.image)}" alt="${esc(a.title)}" loading="lazy" decoding="async" style="border-radius:var(--r-md);width:100%;max-height:120px;object-fit:cover;margin-top:0.5rem;cursor:pointer" onclick="openLightbox(this.src,'${esc(a.title)}')" onerror="this.style.display='none'" />` : ''}
          </div>
        `).join('');
      }
    }

    // 7. Gallery
    const gallery = await api.gallery();
    if (Array.isArray(gallery) && gallery.length > 0) {
      const galGrid = document.querySelector('#gallery .gallery-grid');
      if (galGrid) {
        galGrid.innerHTML = gallery.map((g, i) => {
          if (!g.photos || !g.photos.length) return '';
          return `
          <div class="gallery-group reveal reveal-delay-${i % 3}">
            <h3 class="gallery-group-title">${esc(g.title)}</h3>
            <div class="gallery-images">
              ${g.photos.map(img => `<img src="${esc(img.src)}" alt="${esc(img.caption)}" loading="lazy" decoding="async" onclick="openLightbox(this.src,'${esc(img.caption)}')"/>`).join('')}
            </div>
          </div>`;
        }).join('');
      }
    }

    // 8. Activities
    const activities = await api.activities();
    if (Array.isArray(activities) && activities.length > 0) {
      const actList = document.querySelector('#skills .activities-list');
      if (actList) {
        actList.innerHTML = activities.map((a, i) =>
          `<div class="activity-item reveal"><i class="bi bi-people-fill"></i> ${esc(a.title || a.name || a.role)}</div>`
        ).join('');
      }
    }

    // 8a. Skills Section
    const skills = settings.skills;
    if (skills) {
      const skillsContainer = document.querySelector('#skills .skills-grid');
      if (skillsContainer) {
        const renderTags = (arr) => (arr || []).map(t => `<span class="skill-tag">${esc(t.trim())}</span>`).join('');
        skillsContainer.innerHTML = `
          <div class="glass-card skill-group reveal">
            <div class="skill-group-icon" style="background:var(--blue-bg);color:var(--blue);border:1px solid var(--blue-border)"><i class="bi bi-code-slash"></i></div>
            <div class="skill-group-label">Programming Languages</div>
            <div class="skill-tags">${renderTags(skills.languages)}</div>
          </div>
          <div class="glass-card skill-group reveal reveal-delay-1">
            <div class="skill-group-icon" style="background:var(--purple-bg);color:var(--purple);border:1px solid rgba(191,90,242,0.22)"><i class="bi bi-cpu-fill"></i></div>
            <div class="skill-group-label">Frameworks &amp; Libraries</div>
            <div class="skill-tags">${renderTags(skills.frameworks)}</div>
          </div>
          <div class="glass-card skill-group reveal reveal-delay-2">
            <div class="skill-group-icon" style="background:var(--orange-bg);color:var(--orange);border:1px solid rgba(255,149,0,0.22)"><i class="bi bi-tools"></i></div>
            <div class="skill-group-label">Tools &amp; Environments</div>
            <div class="skill-tags">${renderTags(skills.tools)}</div>
          </div>
          <div class="glass-card skill-group reveal reveal-delay-3">
            <div class="skill-group-icon" style="background:var(--green-bg);color:var(--green);border:1px solid rgba(52,199,89,0.22)"><i class="bi bi-graph-up-arrow"></i></div>
            <div class="skill-group-label">Research Methods</div>
            <div class="skill-tags">${renderTags(skills.researchMethods)}</div>
          </div>
        `;
      }
    }

    // 8b. Spoken Languages
    const spokenLangs = settings.spokenLanguages;
    if (Array.isArray(spokenLangs) && spokenLangs.length > 0) {
      const langGrid = document.querySelector('#skills .lang-grid');
      if (langGrid) {
        const flagMap = { bangla: '🇧🇩', bengali: '🇧🇩', english: '🇬🇧', hindi: '🇮🇳', urdu: '🇵🇰', arabic: '🇸🇦', french: '🇫🇷', german: '🇩🇪', spanish: '🇪🇸' };
        langGrid.innerHTML = spokenLangs.map((l, i) => {
          const flag = flagMap[(l.name || '').toLowerCase()] || '🌐';
          return `
            <div class="glass-card lang-card reveal reveal-delay-${i % 3}">
              <span class="lang-flag">${flag}</span>
              <div><p class="lang-name">${esc(l.name)}</p><p class="lang-level text-muted">${esc(l.level)}</p></div>
            </div>
          `;
        }).join('');
      }
    }

    // 8c. Teaching Section
    const teaching = settings.teaching;
    if (teaching) {
      if (teaching.philosophy) {
        const philosophyEl = document.querySelector('#teaching .section-desc');
        if (philosophyEl) philosophyEl.textContent = teaching.philosophy;
      }
      if (Array.isArray(teaching.roles) && teaching.roles.length > 0) {
        const rolesContainer = document.querySelector('#teaching .teaching-roles');
        if (rolesContainer) {
          rolesContainer.innerHTML = teaching.roles.map((r, i) => `
            <div class="glass-card teaching-role-card reveal reveal-delay-${i % 3}">
              <div class="teaching-role-icon"><i class="bi ${i % 2 === 0 ? 'bi-people-fill' : 'bi-display'}"></i></div>
              <h4 class="teaching-role-title">${esc(r.title)}</h4>
              <p class="teaching-role-desc">${esc(r.desc || r.description || '')}</p>
            </div>
          `).join('');
        }
      }
      if (Array.isArray(teaching.areas) && teaching.areas.length > 0) {
        const areasContainer = document.querySelector('#teaching .teaching-areas');
        if (areasContainer) {
          areasContainer.innerHTML = teaching.areas.map(a => `
            <span class="teaching-area-tag">${esc(a.topic || a.title || '')}</span>
          `).join('');
        }
      }
    }

    // 8d. Blog Preview (Home Page)
    try {
      const blogPosts = await api.blog();
      if (Array.isArray(blogPosts) && blogPosts.length > 0) {
        const blogGrid = document.querySelector('#blog-preview .blog-grid');
        if (blogGrid) {
          const catColors = { 'Explainable AI': 'badge-orange', 'Computer Vision': 'badge-blue', 'Deep Learning': 'badge-purple', 'Academic Life': 'badge-green', 'Resources': 'badge-glass' };
          const catIcons  = { 'Explainable AI': 'bi-lightbulb-fill', 'Computer Vision': 'bi-eye-fill', 'Deep Learning': 'bi-cpu-fill', 'Academic Life': 'bi-mortarboard-fill', 'Resources': 'bi-bookmark-fill' };
          const displayPosts = blogPosts.slice(0, 3);
          blogGrid.innerHTML = displayPosts.map((p, i) => {
            const cls = catColors[p.category] || 'badge-glass';
            const icon = catIcons[p.category] || 'bi-pencil-fill';
            return `
              <div class="glass-card blog-card reveal reveal-delay-${i % 3}">
                <div class="blog-card-top"><i class="bi ${icon}" style="color:var(--blue);font-size:2.5rem;position:relative;z-index:1"></i></div>
                <div class="blog-card-body">
                  <div class="blog-meta">
                    <span class="badge ${cls}">${esc(p.category || 'AI')}</span>
                    <span style="font-size:0.78rem;color:var(--text-3)">${esc(p.date || '')} · ${esc(p.readTime || p.read_time || '5 min')}</span>
                  </div>
                  <h4 class="blog-title">${esc(p.title)}</h4>
                  <div class="blog-excerpt">${renderRichText(p.excerpt || '')}</div>
                  <a href="blog.html" class="blog-read-more">Read more <i class="bi bi-arrow-right"></i></a>
                </div>
              </div>
            `;
          }).join('');
        }
      }
    } catch(e) {
      console.warn('Home blog preview notice:', e);
    }

    // 8e. Gallery (Home Page) - Support both .gallery-grid and #gallery container
    try {
      const gallery = await api.gallery();
      if (Array.isArray(gallery) && gallery.length > 0) {
        const galContainer = document.querySelector('#gallery .container');
        if (galContainer) {
          const headerHtml = `
            <div class="section-header">
              <span class="section-label">Moments</span>
              <h2 class="section-title">Achievement Gallery</h2>
            </div>
          `;
          const groupsHtml = gallery.map((g, i) => {
            const photos = g.photos || [];
            if (!photos.length) return '';
            return `
              <div class="gallery-group reveal reveal-delay-${i % 3}">
                <h3 class="gallery-group-title">${esc(g.title)}</h3>
                ${g.year ? `<p class="gallery-group-meta"><i class="bi bi-calendar3 me-1"></i>${esc(g.year)}</p>` : ''}
                <div class="gallery-photos">
                  ${photos.map(p => `
                    <div class="gallery-photo">
                      <img src="${esc(p.src)}" alt="${esc(p.caption || g.title)}" loading="lazy" decoding="async" onclick="openLightbox(this.src,'${esc(p.caption || g.title)}')" />
                      ${p.caption ? `<div class="gallery-photo-caption">${esc(p.caption)}</div>` : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            `;
          }).join('');
          if (groupsHtml) {
            galContainer.innerHTML = headerHtml + groupsHtml;
          }
        }
      }
    } catch(e) {
      console.warn('Gallery hydration notice:', e);
    }

    // 8f. Co-curricular Activities
    try {
      const activities = await api.activities();
      if (Array.isArray(activities) && activities.length > 0) {
        const actList = document.querySelector('.activity-list');
        if (actList) {
          actList.innerHTML = activities.map((a, i) => `
            <div class="activity-item reveal reveal-delay-${i % 3}">
              <i class="bi bi-lightning-fill"></i> ${esc(a.text || a.title || a.name || '')}
            </div>
          `).join('');
        }
      }
    } catch(e) {
      console.warn('Activities hydration notice:', e);
    }

    // 9. References
    const refs = await api.references();
    if (Array.isArray(refs) && refs.length > 0) {
      const refGrid = document.querySelector('#references .ref-grid');
      if (refGrid) {
        refGrid.innerHTML = refs.map((r, i) => `
          <div class="glass-card ref-card reveal reveal-delay-${i % 3}">
            <h4 class="ref-name">${esc(r.name)}</h4>
            <p class="ref-designation">${esc(r.role || r.designation)}</p>
            <p class="ref-org"><i class="bi bi-building me-1"></i>${esc(r.org || r.organization)}</p>
            ${r.email ? `<p class="ref-email"><i class="bi bi-envelope me-1"></i><a href="mailto:${esc(r.email)}">${esc(r.email)}</a></p>` : ''}
          </div>
        `).join('');
      }
    }

    initReveal();
  } catch (err) {
    console.warn('[Hydration] Notice:', err);
  }
}

// ── Utility ──────────────────────────────────────────────────────

function renderRichText(content) {
  if (!content) return '';
  return String(content)
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*(["'][^"']*["']|[^\s>]+)/gi, '');
}

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

    // Dynamic Content Hydration from Admin / Backend API
  hydrateHomePage();

  // Page-specific
  if (document.getElementById('allPubsList'))     renderPublicationsPage();
  if (document.getElementById('allProjectsGrid')) renderProjectsPage();
  if (document.getElementById('allBlogGrid'))     renderBlogPage();
});