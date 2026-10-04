/**
 * Portfolio application behaviour.
 *
 * Sections are rendered by js/render.js from js/content.js; this module owns
 * interaction: theme, navigation, scroll reveal, project filtering, the case
 * study dialog, the command palette, the assistant, and the contact form.
 */
(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ─── Theme ─── */
  const THEME_KEY = 'portfolio-theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* storage unavailable (private mode) — theme still applies for this session */
    }

    const toggle = $('#themeToggle');
    if (!toggle) return;
    toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
    toggle.setAttribute('aria-pressed', String(theme === 'dark'));
    const icon = toggle.querySelector('i');
    if (icon) icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }

  function initTheme() {
    let stored = null;
    try {
      stored = localStorage.getItem(THEME_KEY);
    } catch {
      /* ignore */
    }
    applyTheme(stored === 'light' || stored === 'dark' ? stored : 'dark');

    $('#themeToggle')?.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      applyTheme(current === 'dark' ? 'light' : 'dark');
    });
  }

  /* ─── Navigation ─── */
  function initNavigation() {
    const navbar = $('#navbar');
    const hamburger = $('#hamburger');
    const navMenu = $('#navMenu');

    const closeMenu = () => {
      hamburger?.classList.remove('active');
      navMenu?.classList.remove('active');
      hamburger?.setAttribute('aria-expanded', 'false');
    };

    window.addEventListener(
      'scroll',
      () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 80);
        highlightActiveSection();
      },
      { passive: true }
    );

    hamburger?.addEventListener('click', () => {
      const open = hamburger.classList.toggle('active');
      navMenu?.classList.toggle('active', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });

    $$('.nav-link').forEach((link) => link.addEventListener('click', closeMenu));

    document.addEventListener('click', (e) => {
      if (!navMenu?.classList.contains('active')) return;
      if (navMenu.contains(e.target) || hamburger?.contains(e.target)) return;
      closeMenu();
    });

    $$('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = $(href);
        if (!target) return;
        e.preventDefault();
        target.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        });
        // Move keyboard focus with the viewport so tabbing continues in context.
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      });
    });
  }

  function highlightActiveSection() {
    const scrollY = window.scrollY;
    $$('section[id]').forEach((section) => {
      const top = section.offsetTop - 120;
      const bottom = top + section.offsetHeight;
      if (scrollY >= top && scrollY < bottom) {
        $$('.nav-link').forEach((link) => {
          const active = link.getAttribute('href') === `#${section.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }

  /* ─── Scroll reveal ─── */
  function initReveal() {
    const targets = $$('.timeline-item, .skill-category, .contact-item, .cert-card, .project-showcase-card');

    if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    targets.forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${Math.min(i * 0.05, 0.3)}s`;
      observer.observe(el);
    });
  }

  /* ─── Scroll to top ─── */
  function initScrollToTop() {
    const btn = $('#scrollToTop');
    if (!btn) return;

    window.addEventListener(
      'scroll',
      () => btn.classList.toggle('show', window.scrollY > 400),
      { passive: true }
    );

    btn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
    );
  }

  /* ─── Dialog helpers ─── */
  let lastFocused = null;

  function trapFocus(container, event) {
    const focusable = $$(FOCUSABLE, container).filter((el) => el.offsetParent !== null);
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openDialog(dialog, focusTarget) {
    if (!dialog) return;
    lastFocused = document.activeElement;
    dialog.hidden = false;
    document.body.classList.add('modal-open');
    (focusTarget || $(FOCUSABLE, dialog))?.focus();
  }

  function closeDialog(dialog) {
    if (!dialog || dialog.hidden) return;
    dialog.hidden = true;
    if (!$$('.modal:not([hidden]), .command-palette:not([hidden])').length) {
      document.body.classList.remove('modal-open');
    }
    lastFocused?.focus?.();
  }

  /* ─── Project filters ─── */
  function initProjectFilters() {
    const filters = $('#projectFilters');
    const grid = $('#projectsShowcase');
    const empty = $('#projectsEmpty');
    if (!filters || !grid) return;

    filters.addEventListener('click', (e) => {
      const btn = e.target.closest('.filter-btn');
      if (!btn) return;

      const filter = btn.dataset.filter;

      $$('.filter-btn', filters).forEach((el) => {
        const active = el === btn;
        el.classList.toggle('is-active', active);
        el.setAttribute('aria-selected', String(active));
      });

      let visible = 0;
      $$('.project-showcase-card', grid).forEach((card) => {
        const categories = (card.dataset.categories || '').split(' ');
        const show = filter === 'all' || categories.includes(filter);
        card.hidden = !show;
        if (!show) return;
        visible += 1;
        // A card filtered up from below the fold may never have been revealed.
        card.classList.add('is-visible');
      });

      if (empty) empty.hidden = visible > 0;
    });
  }

  /* ─── Case study dialog ─── */
  function openProjectModal(projectId) {
    const project = PORTFOLIO.projects.find((p) => p.id === projectId);
    const modal = $('#projectModal');
    const body = $('#projectModalBody');
    if (!project || !modal || !body) return;

    body.innerHTML = window.PortfolioRender.caseStudyHtml(project);
    modal.scrollTop = 0;
    $('.modal-panel', modal)?.scrollTo?.({ top: 0 });
    openDialog(modal, $('#projectModalClose'));
  }

  function initProjectModal() {
    const modal = $('#projectModal');

    $('#projectsShowcase')?.addEventListener('click', (e) => {
      const btn = e.target.closest('.project-case-study-btn');
      if (btn) openProjectModal(btn.dataset.project);
    });

    $('#projectModalClose')?.addEventListener('click', () => closeDialog(modal));
    $('#projectModalBackdrop')?.addEventListener('click', () => closeDialog(modal));

    modal?.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') trapFocus(modal, e);
    });
  }

  /* ─── Contact form ─── */
  const FIELD_LIMITS = { name: 100, email: 150, subject: 150, message: 2000 };

  function setFieldError(field, message) {
    const input = $(`#contact${field[0].toUpperCase()}${field.slice(1)}`);
    const error = $(`#contact${field[0].toUpperCase()}${field.slice(1)}Error`);
    if (!input || !error) return;

    if (message) {
      input.setAttribute('aria-invalid', 'true');
      error.textContent = message;
    } else {
      input.removeAttribute('aria-invalid');
      error.textContent = '';
    }
  }

  function validateContact(values) {
    const errors = {};

    if (!values.name) errors.name = 'Please enter your name.';
    else if (values.name.length > FIELD_LIMITS.name) errors.name = 'Name is too long.';

    if (!values.email) errors.email = 'Please enter your email address.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = 'Please enter a valid email address.';
    else if (values.email.length > FIELD_LIMITS.email) errors.email = 'Email address is too long.';

    if (!values.subject) errors.subject = 'Please enter a subject.';
    else if (values.subject.length > FIELD_LIMITS.subject) errors.subject = 'Subject is too long.';

    if (!values.message) errors.message = 'Please enter a message.';
    else if (values.message.length > FIELD_LIMITS.message) errors.message = 'Message must be 2000 characters or fewer.';

    return errors;
  }

  function setFormState(state, message) {
    const status = $('#contactFormStatus');
    const submit = $('#contactSubmit');
    if (!status || !submit) return;

    status.className = `form-status form-status--${state}`;
    status.textContent = message || '';
    submit.disabled = state === 'loading';
    submit.textContent = state === 'loading' ? 'Sending…' : 'Send message';
  }

  function initContactForm() {
    const form = $('#contactForm');
    if (!form) return;

    const fields = ['name', 'email', 'subject', 'message'];

    fields.forEach((field) => {
      const input = $(`#contact${field[0].toUpperCase()}${field.slice(1)}`);
      input?.addEventListener('input', () => setFieldError(field, ''));
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const data = new FormData(form);
      const values = {
        name: String(data.get('name') || '').trim(),
        email: String(data.get('email') || '').trim(),
        subject: String(data.get('subject') || '').trim(),
        message: String(data.get('message') || '').trim(),
      };

      // Honeypot: real users leave this hidden field empty.
      if (String(data.get('company') || '').trim()) return;

      const errors = validateContact(values);
      fields.forEach((field) => setFieldError(field, errors[field] || ''));

      if (Object.keys(errors).length) {
        setFormState('error', 'Please correct the highlighted fields.');
        $(`#contact${Object.keys(errors)[0][0].toUpperCase()}${Object.keys(errors)[0].slice(1)}`)?.focus();
        return;
      }

      const endpoint = PORTFOLIO.contactEndpoint;

      if (!endpoint) {
        const subject = encodeURIComponent(values.subject);
        const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\n\n${values.message}`);
        window.location.href = `mailto:${PORTFOLIO.person.email}?subject=${subject}&body=${body}`;
        setFormState('success', `Opening your email client. If nothing happens, email ${PORTFOLIO.person.email} directly.`);
        return;
      }

      setFormState('loading', 'Sending your message…');

      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });

        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

        form.reset();
        setFormState('success', 'Thanks — your message was sent. I will reply soon.');
      } catch {
        setFormState(
          'error',
          `Something went wrong sending your message. Please email ${PORTFOLIO.person.email} directly.`
        );
      }
    });
  }

  /* ─── Portfolio assistant ─── */
  function assistantReply(input) {
    const q = input.toLowerCase().trim();
    const { person, experience, education, certifications, projects, skillGroups } = PORTFOLIO;

    if (/^(hi|hello|hey|greetings)\b/.test(q)) {
      return 'Hello. Ask me about Pallavi\'s experience, projects, skills, education, certifications, or how to get in touch.';
    }
    if (/skill|technolog|stack|tools|expertise/.test(q)) {
      return skillGroups.map((g) => `${g.title}: ${g.skills.slice(0, 6).join(', ')}`).join('\n');
    }
    if (/experience|work|job|role|co-?op|intern|company/.test(q)) {
      return experience
        .map((job) => `${job.role} — ${job.company} (${job.dateLabel})`)
        .join('\n');
    }
    if (/geode|blockchain|galactic|deep link|marketplace/.test(q)) {
      return 'During a six-month co-op at The Geode Foundation, Pallavi built frontend functionality for Galactic Conquest using React and TypeScript, and implemented shareable deep links for Geode Marketplace so a shared URL reopens the same search context.';
    }
    if (/education|degree|university|college|gpa|northeastern|study/.test(q)) {
      return education
        .map((e) => `${e.degree} — ${e.school} (${e.dateLabel}${e.detail ? `, ${e.detail}` : ''})`)
        .join('\n');
    }
    if (/project|built|portfolio work|case stud/.test(q)) {
      return projects.map((p, i) => `${i + 1}. ${p.title} — ${p.techSummary}`).join('\n');
    }
    if (/cert|aws|credential/.test(q)) {
      return certifications.map((c) => `${c.name} — ${c.issuer}, ${c.date}`).join('\n');
    }
    if (/contact|email|phone|reach|linkedin|hire|available/.test(q)) {
      return `Email: ${person.email}\nPhone: ${person.phone}\nLocation: ${person.location}\nLinkedIn: ${person.linkedin.replace('https://', '')}\n\n${person.availability}`;
    }
    if (/resume|cv/.test(q)) {
      return 'Her résumé is available from the Résumé link in the navigation, or through the command palette (Ctrl+K).';
    }
    if (/cloud|aws|devops|docker|terraform|ci/.test(q)) {
      return 'Pallavi is an AWS Certified Solutions Architect – Associate. At Sumago Infotech she containerised services with Docker, provisioned AWS infrastructure with Terraform, automated delivery with GitHub Actions, and monitored systems with CloudWatch.';
    }

    return 'I can answer questions about experience, projects, skills, education, certifications, résumé access, or contact details. Try asking "what projects has she built?"';
  }

  function addChatMessage(text, isUser = false) {
    const messages = $('#chatbotMessages');
    if (!messages) return;

    const wrapper = document.createElement('div');
    wrapper.className = `message ${isUser ? 'user-message' : 'bot-message'}`;

    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.innerHTML = `<i class="fas ${isUser ? 'fa-user' : 'fa-comment-dots'}"></i>`;

    const content = document.createElement('div');
    content.className = 'message-content';
    const p = document.createElement('p');
    p.textContent = text;
    content.appendChild(p);

    wrapper.append(avatar, content);
    messages.appendChild(wrapper);
    messages.scrollTop = messages.scrollHeight;
  }

  function closeAssistant() {
    const panel = $('#chatbotContainer');
    if (!panel?.classList.contains('active')) return;
    panel.classList.remove('active');
    $('#chatToggleBtn')?.focus();
  }

  function initAssistant() {
    const panel = $('#chatbotContainer');
    const input = $('#chatbotInput');

    const send = () => {
      const message = input?.value.trim();
      if (!message) return;
      addChatMessage(message, true);
      input.value = '';
      window.setTimeout(() => addChatMessage(assistantReply(message)), 350);
    };

    $('#chatToggleBtn')?.addEventListener('click', () => {
      panel?.classList.add('active');
      input?.focus();
    });

    $('#chatbotClose')?.addEventListener('click', closeAssistant);
    $('#chatbotSend')?.addEventListener('click', send);

    input?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        send();
      }
    });
  }

  /* ─── Command palette ─── */
  let commands = [];

  function buildCommands() {
    const nav = PORTFOLIO.navigation.map((item) => ({
      group: 'Navigate',
      label: item.label,
      run: () => {
        closeCommandPalette();
        $(item.href)?.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        });
      },
    }));

    const projects = PORTFOLIO.projects.map((p) => ({
      group: 'Case studies',
      label: p.title,
      run: () => {
        closeCommandPalette();
        window.setTimeout(() => openProjectModal(p.id), 120);
      },
    }));

    const actions = [
      {
        group: 'Actions',
        label: 'Open résumé',
        run: () => {
          closeCommandPalette();
          window.open(PORTFOLIO.person.resume, '_blank', 'noopener');
        },
      },
      {
        group: 'Actions',
        label: 'Open GitHub profile',
        run: () => {
          closeCommandPalette();
          window.open(PORTFOLIO.person.github, '_blank', 'noopener,noreferrer');
        },
      },
      {
        group: 'Actions',
        label: 'Open LinkedIn profile',
        run: () => {
          closeCommandPalette();
          window.open(PORTFOLIO.person.linkedin, '_blank', 'noopener,noreferrer');
        },
      },
      {
        group: 'Actions',
        label: 'Email Pallavi',
        run: () => {
          closeCommandPalette();
          window.location.href = `mailto:${PORTFOLIO.person.email}`;
        },
      },
      {
        group: 'Actions',
        label: 'Toggle theme',
        run: () => {
          closeCommandPalette();
          applyTheme(document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
        },
      },
    ];

    commands = [...nav, ...projects, ...actions];
  }

  function renderCommandResults(query = '') {
    const list = $('#commandPaletteList');
    if (!list) return;

    const q = query.toLowerCase().trim();
    const matches = commands.filter((cmd) => !q || cmd.label.toLowerCase().includes(q));

    if (!matches.length) {
      list.innerHTML = '<p class="command-empty">No matching commands.</p>';
      return;
    }

    list.innerHTML = matches
      .map(
        (cmd, i) =>
          `<button type="button" role="option" aria-selected="${i === 0}" class="command-item${i === 0 ? ' is-active' : ''}" data-command="${commands.indexOf(cmd)}">
            <span class="command-group">${cmd.group}</span>
            <span class="command-label">${cmd.label}</span>
          </button>`
      )
      .join('');
  }

  function openCommandPalette() {
    const palette = $('#commandPalette');
    const input = $('#commandPaletteInput');
    if (!palette) return;

    openDialog(palette, input);
    if (input) {
      input.value = '';
      renderCommandResults('');
    }
  }

  function closeCommandPalette() {
    closeDialog($('#commandPalette'));
  }

  function initCommandPalette() {
    buildCommands();

    const palette = $('#commandPalette');
    const input = $('#commandPaletteInput');
    const list = $('#commandPaletteList');

    input?.addEventListener('input', (e) => renderCommandResults(e.target.value));

    list?.addEventListener('click', (e) => {
      const btn = e.target.closest('.command-item');
      if (btn) commands[Number(btn.dataset.command)]?.run();
    });

    input?.addEventListener('keydown', (e) => {
      const items = $$('.command-item', list);
      if (!items.length) return;

      let index = items.findIndex((el) => el.classList.contains('is-active'));

      if (e.key === 'ArrowDown') index = Math.min(index + 1, items.length - 1);
      else if (e.key === 'ArrowUp') index = Math.max(index - 1, 0);
      else if (e.key === 'Enter') {
        e.preventDefault();
        items[index]?.click();
        return;
      } else return;

      e.preventDefault();
      items.forEach((el, i) => {
        el.classList.toggle('is-active', i === index);
        el.setAttribute('aria-selected', String(i === index));
      });
      items[index]?.scrollIntoView({ block: 'nearest' });
    });

    palette?.addEventListener('keydown', (e) => {
      if (e.key === 'Tab') trapFocus(palette, e);
    });

    $('#commandPaletteBackdrop')?.addEventListener('click', closeCommandPalette);
    $('#commandPaletteTrigger')?.addEventListener('click', openCommandPalette);

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if ($('#commandPalette')?.hidden) openCommandPalette();
        else closeCommandPalette();
        return;
      }

      if (e.key === 'Escape') {
        closeCommandPalette();
        closeDialog($('#projectModal'));
        closeAssistant();
      }
    });
  }

  /* ─── Init ─── */
  function init() {
    if (typeof PORTFOLIO === 'undefined' || !window.PortfolioRender) {
      console.error('Portfolio content or renderer failed to load.');
      return;
    }

    window.PortfolioRender.all();

    initTheme();
    initNavigation();
    initProjectFilters();
    initProjectModal();
    initContactForm();
    initAssistant();
    initCommandPalette();
    initReveal();
    initScrollToTop();
    highlightActiveSection();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
