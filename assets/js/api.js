/* ================================================================
   PORTFOLIO API — Rashel Mahmud Rabbi
   Fetches all data from the portfolio backend REST API.
   Falls back to embedded static data if the API is unavailable.
================================================================ */

// ── Embedded fallback data ────────────────────────────────────────
const FALLBACK = {
  settings: {
    name: 'Rashel Mahmud Rabbi',
    title: 'Graduate Researcher – Computer Vision & AI',
    email: 'raselmahud6757@gmail.com',
    phone: '+8801613-000855',
    location: 'Rajshahi, Bangladesh',
    cv_download_url: 'https://drive.google.com/file/d/1ezs8hs6v_8_XickPu8nDRnsOSmf9bYvE/view?usp=sharing',
    social_github: 'https://github.com/rashelmahmudrabbi',
    social_linkedin: 'https://www.linkedin.com/in/rashelmahmudrabbi',
    social_researchgate: 'https://www.researchgate.net/profile/Rashel-Mahmud-Rabbi',
    social_scholar: 'https://scholar.google.com/citations?hl=en&user=agrATD8AAAAJ',
    social_orcid: 'https://orcid.org/0009-0004-6070-4496',
    social_x: 'https://x.com/rashel_m_rabbi',
    stat_publications: 3,
    stat_projects: 7,
    stat_awards: 2,
    objective: 'I build hybrid CNN-Transformer architectures for medical image classification and satellite remote sensing, with a focus on making deep learning models interpretable for clinical and real-world decision-making. My B.Sc. thesis — HybSwinEff — achieved 99.69% binary accuracy and 100% staging accuracy for leukemia classification, while my MRCL-ELM framework reached 98.33% on EuroSAT (published in Neural Computing and Applications). I am seeking PhD opportunities to advance research at the intersection of Computer Vision, Medical AI, and Explainable AI.'
  },
  education: [
    { degree: 'B.Sc in CSE', major: 'Computer Science & Engineering', institution: 'North Bengal International University', year: '2025', grade: '3.87/4.00' },
    { degree: 'HSC', major: 'Science', institution: 'Notre Dame College, Mymensingh', year: '2020', grade: '5.00/5.00' },
    { degree: 'SSC', major: 'Science', institution: 'Hat Gangopara High School, Rajshahi', year: '2018', grade: '5.00/5.00' }
  ],
  experience: [
    {
      title: 'Graduate Researcher – Computer Vision / Medical Imaging',
      org: 'North Bengal International University',
      period: '2023 – 2025',
      bullets: 'Designed HybSwinEff, a hybrid CNN-Transformer achieving 99.69% binary accuracy and 100% staging accuracy for automated leukemia classification (B.Sc. thesis)\nDeveloped MRCL-ELM, a novel deep learning architecture achieving 98.33% accuracy on EuroSAT and 98.10% on UC Merced for satellite image classification (published in Neural Computing and Applications, Q1)\nPublished and presented a CNN-LSTM land-use classifier with LIME explainability at IEEE QPAIN 2025\nCurated and preprocessed medical imaging and satellite datasets; implemented LIME, SHAP, and Grad-CAM for model interpretability'
    }
  ],
  publications: [
    {
      type: 'journal', status: 'published',
      title: 'Enhancing Multi-Class Satellite Image Classification with MRCL-ELM: A Hybrid Explainable Deep Learning Approach',
      authors: 'Md Ashik Ahmmed, Rashel Mahmud Rabbi, Md Shafiuzzaman, Md. Faysal Ahamed, Md Nahiduzzaman & Muhammad E.H. Chowdhury',
      venue: 'Neural Computing and Applications, Springer', year: '2026',
      doi_link: 'https://link.springer.com/article/10.1007/s00521-026-12192-y',
      pdf_link: 'https://drive.google.com/file/d/1B8MU_tQevLZyDqzm3KHu28c4sDnOmFRZ/view?usp=drive_link'
    },
    {
      type: 'conference', status: 'published',
      title: 'An Explainable Approach to Land-Use Classification Using CNN-LSTM and LIME',
      authors: 'Md Ashik Ahmmed; Rashel Mahmud Rabbi; Md Shafiuzzaman; Tithi Podder; Most. Tasnina Jaman; Afsana Tasnim',
      venue: '2025 International Conference on Quantum Photonics, Artificial Intelligence, and Networking (QPAIN), Rangpur, Bangladesh', year: '2025',
      doi_link: 'https://ieeexplore.ieee.org/document/11172239',
      pdf_link: 'https://drive.google.com/file/d/1bRxEvEslm9k4yLljqfe7U8iZJb9wUWYS/view?usp=sharing'
    },
    {
      type: 'thesis', status: 'completed',
      title: 'HYBSWINEFF: Hybrid CNN-Transformer Fusion for Binary and Multi-Stage Blood Cell Cancer Classification',
      authors: 'Rashel Mahmud Rabbi',
      venue: 'B.Sc. Thesis, Department of CSE, North Bengal International University', year: '2025',
      doi_link: '',
      pdf_link: 'https://drive.google.com/file/d/10IeYdPdJPAQw3afi7ItVoYfZRQgBWlhm/view?usp=drive_link'
    }
  ],
  projects: [
    { category: 'thesis',       title: 'HYBSWINEFF: Hybrid CNN-Transformer Blood Cell Cancer Classification', description: 'Created a hybrid CNN-Transformer model that performs binary and multi-stage leukemia classification of peripheral blood smear images. 99.69% binary accuracy, 100% staging accuracy.', tech: 'PyTorch, Swin Transformer, EfficientNetV2, Grad-CAM, LIME, OpenCV', year: '2025', github_link: 'https://github.com/rashelmahmudrabbi/HybSwinEff', paper_link: '' },
    { category: 'research',     title: 'MRCL-ELM – Multi-Class Satellite Image Classifier', description: 'Novel hybrid deep learning approach achieving 98.33% accuracy on EuroSAT and 98.10% on UC Merced. Integrates LIME and SHAP; deployed as a real-time web application.', tech: 'PyTorch, LIME, SHAP, Flask, EuroSAT', year: '2024', github_link: 'https://github.com/rashelmahmudrabbi/MRCL-ELM', paper_link: '' },
    { category: 'research',     title: 'SatelliteNet – CNN-LSTM Land-Use Classifier', description: 'Hybrid CNN-LSTM network for land-use classification on EuroSAT achieving 98.30% accuracy. Published and presented at IEEE QPAIN 2025.', tech: 'TensorFlow, Keras, LIME, NumPy', year: '2024', github_link: 'https://github.com/rashelmahmudrabbi/CNN-LSTM', paper_link: '' },
    { category: 'research',     title: 'NeuroFusion – Brain Tumor Detection', description: 'Hybrid CNN-Transformer for brain tumor detection from MRI images. Combines MobileNetV3 with channel attention and Transformer encoder.', tech: 'PyTorch, MobileNetV3, Transformer, OpenCV', year: '2026', github_link: 'https://github.com/rashelmahmudrabbi', paper_link: '' },
    { category: 'development',  title: 'Academic Portfolio Website', description: 'Modern, responsive portfolio with Node.js/Express backend, Neon Postgres, and full admin CRUD panel.', tech: 'Node.js, Express, Neon Postgres, HTML/CSS/JS', year: '2025', github_link: 'https://github.com/rashelmahmudrabbi/rashelmahmudrabbi.github.io', paper_link: 'https://rashelmahmudrabbi.github.io/' },
    { category: 'development',  title: 'RentalHub – E-commerce Web App', description: 'Property rental platform with intuitive browsing, listing details, pricing, and amenities.', tech: 'Django, Tailwind CSS, SQLite, REST API', year: '2024', github_link: 'https://github.com/rashelmahmudrabbi/rental-hub', paper_link: '' },
    { category: 'development',  title: 'OUR RAJSHAHI – Regional Info Platform', description: 'Tourism and cultural information platform showcasing Rajshahi\'s heritage and lifestyle.', tech: 'Django, Bootstrap, SQLite', year: '2023', github_link: 'https://github.com/rashelmahmudrabbi/our-rajshahi', paper_link: '' }
  ],
  certifications: [
    { title: 'Data Science Math Skills', issuer: 'Coursera', year: '2024', image: 'media/certifications/images/Coursera__Data_Science_Math_Skills_7HHNEO5MT8WO_pages-to-jpg-0001.jpg', verify_link: 'https://www.coursera.org/account/accomplishments/verify/7HHNEO5MT8WO', pdf_link: 'media/certifications/pdfs/Coursera__Data_Science_Math_Skills_7HHNEO5MT8WO.pdf' },
    { title: 'Python Basics', issuer: 'Coursera', year: '2025', image: 'media/certifications/images/Coursera_Python_Basics_KJ1TIFBGN6W3_pages-to-jpg-0001.jpg', verify_link: 'https://coursera.org/verify/KJ1TIFBGN6W3', pdf_link: 'media/certifications/pdfs/Coursera_Python_Basics_KJ1TIFBGN6W3.pdf' }
  ],
  awards: [
    { title: '2nd Runner-Up, IEEE ProCon App Idea Competition', org: 'IEEE', year: '2025', image: 'media/awards/Idea_with_Poster_Presentation.jpg' },
    { title: '1st Position, Research Olympiad – Rajshahi Regional', org: 'Rajshahi University Research Society (RURS)', year: '2024', image: 'media/awards/Research_Olympiad.jpg' }
  ],
  activities: [
    { text: 'President, Computer Society – NBIU' },
    { text: 'Participation in research seminars and higher study camps' },
    { text: 'Active involvement in tech competitions and academic events' }
  ],
  blog: [
    { title: 'Why Explainability Matters in Medical AI — and How LIME Helps', slug: 'explainability-medical-ai-lime', date: 'March 2025', read_time: '8 min read', category: 'Explainable AI', excerpt: 'When an AI model tells a doctor a lesion is malignant, "trust me" isn\'t good enough. I explore how LIME bridges the gap between black-box accuracy and clinical trust in skin lesion classification.' },
    { title: 'Transfer Learning on Satellite Imagery: Lessons from EuroSAT', slug: 'transfer-learning-eurosat', date: 'Jan 2025', read_time: '6 min read', category: 'Computer Vision', excerpt: 'What I learned training ResNet-50 on the EuroSAT dataset — from data augmentation strategies to achieving 96.4% accuracy on 10 land-use categories.' },
    { title: 'LSTM for ECG Signal Analysis: A Practical Guide', slug: 'lstm-ecg-signal-analysis', date: 'Nov 2024', read_time: '5 min read', category: 'Deep Learning', excerpt: 'A walkthrough of building an LSTM-based arrhythmia detector from scratch using the MIT-BIH dataset, including preprocessing ECG signals with the Wfdb library.' },
    { title: 'How I Won 1st at the Research Olympiad — and What I Learned', slug: 'research-olympiad-win', date: 'Sep 2024', read_time: '4 min read', category: 'Academic Life', excerpt: 'My experience presenting at the Rajshahi Regional Research Olympiad, the feedback I received, and how it shaped my thinking on communicating research to non-technical audiences.' },
    { title: 'My 2024 Deep Learning Paper Reading List', slug: '2024-paper-reading-list', date: 'Jul 2024', read_time: '7 min read', category: 'Resources', excerpt: 'A curated list of the 10 most impactful papers I read this year in Computer Vision and Medical AI, with short summaries and why each one matters.' }
  ],
  references: [
    { name: 'Md. Emdadul Haque', role: 'Lecturer & Head, Department of CSE', org: 'North Bengal International University', note: 'Department Head', email: 'haque.emdadul.one5@gmail.com' },
    { name: 'Md. Shafiuzzaman', role: 'Lecturer, Department of CSE', org: 'North Bengal International University', note: 'Research Supervisor', email: 'shafiuzzaman.ruet@gmail.com' },
    { name: 'Saifur Rahman', role: 'Lecturer, Department of CSE', org: 'North Bengal International University', note: 'Thesis External Examiner', email: 'saifur.naim30@gmail.com' }
  ],
  researchInterests: [
    { icon: 'bi-eye-fill', topic: 'Computer Vision', description: 'Image classification, object detection, and segmentation using hybrid CNN-Transformer architectures.' },
    { icon: 'bi-heart-pulse-fill', topic: 'Medical Image Analysis', description: 'AI-driven diagnostics for histopathology and radiology, including leukemia classification from blood smears.' },
    { icon: 'bi-lightbulb-fill', topic: 'Explainable AI (XAI)', description: 'LIME, SHAP, and Grad-CAM for transparent, clinically trustworthy deep learning pipelines.' },
    { icon: 'bi-diagram-3-fill', topic: 'Deep Learning Architectures', description: 'Designing lightweight hybrid models combining CNNs, Transformers, LSTMs, and ELMs for resource-efficient inference.' }
  ]
};

// ── Generic fetch helper ─────────────────────────────────────────

const API_BASE = 'https://acportfolio-backend.vercel.app/api';


async function apiFetch(endpoint) {
  try {
    const cacheKey = 'rmr_api_' + endpoint;
    const cached = localStorage.getItem(cacheKey);
    let cachedData = null;
    if (cached) {
      try { cachedData = JSON.parse(cached); } catch(e){}
    }

    const fetchPromise = fetch(API_BASE + '/' + endpoint, {
      method: 'GET',
      headers: { 'Accept': 'application/json' },
      signal: AbortSignal.timeout(8000)
    }).then(async res => {
      if (res.ok) {
        const data = await res.json();
        const finalData = Array.isArray(data) ? data : (data.value ? data.value : (data.data || data));
        localStorage.setItem(cacheKey, JSON.stringify(finalData));
        return finalData;
      }
      return null;
    }).catch(() => null);

    if (cachedData) { if (cachedData.value) { cachedData = cachedData.value; } if (cachedData.data) { cachedData = cachedData.data; } return cachedData; }
    return await fetchPromise;

  } catch (e) {
    console.warn('[API] Falling back to static data for "' + endpoint + '":', e.message);
    return null;
  }
}

const api = {
  async settings()          { return await apiFetch('settings')          || FALLBACK.settings; },
  async education()         { return await apiFetch('education')         || FALLBACK.education; },
  async experience()        { return await apiFetch('experience')        || FALLBACK.experience; },
  async publications()      { return await apiFetch('publications')      || FALLBACK.publications; },
  async projects()          { return await apiFetch('projects')          || FALLBACK.projects; },
  async certifications()    { return await apiFetch('certifications')    || FALLBACK.certifications; },
  async awards()            { return await apiFetch('awards')            || FALLBACK.awards; },
  async activities()        { return await apiFetch('activities')        || FALLBACK.activities; },
  async blog()              { return await apiFetch('blog')              || FALLBACK.blog; },
  async references()        { return await apiFetch('references')        || FALLBACK.references; },
  async researchInterests() { return await apiFetch('research-interests')|| FALLBACK.researchInterests; },
  async spokenLanguages()   { return await apiFetch('spoken-languages')  || []; },
  async gallery() {
    try {
      const res = await fetch(API_BASE + '/gallery', { signal: AbortSignal.timeout(8000) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn('[API] Gallery fallback');
      return null;
    }
  },
  async contact(data) {
    const res = await fetch(API_BASE + '/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    return res.json();
  }
};
