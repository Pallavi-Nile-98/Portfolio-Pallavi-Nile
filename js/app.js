/**
 * Portfolio application behaviour.
 *
 * Sections are rendered by js/render.js from js/content.js; this module owns
 * interaction: navigation, scroll reveal, the command palette, and the
 * contact form.
 */
(function () {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  const FOCUSABLE =
    'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

  const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
      () => navbar?.classList.toggle('scrolled', window.scrollY > 80),
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

  /**
   * Marks the nav link for the section crossing the middle of the viewport.
   * IntersectionObserver reports this without reading layout on every scroll.
   */
  function initActiveSection() {
    if (!('IntersectionObserver' in window)) return;
    const links = $$('.nav-link[href^="#"]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          links.forEach((link) => {
            const active = link.getAttribute('href') === `#${entry.target.id}`;
            link.classList.toggle('active', active);
            if (active) link.setAttribute('aria-current', 'true');
            else link.removeAttribute('aria-current');
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );

    $$('section[id]').forEach((section) => observer.observe(section));
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
      group: 'Projects',
      label: p.title,
      run: () => {
        closeCommandPalette();
        $(`#project-${p.id}`)?.scrollIntoView({
          behavior: prefersReducedMotion() ? 'auto' : 'smooth',
          block: 'start',
        });
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

    initNavigation();
    initContactForm();
    initCommandPalette();
    initReveal();
    initScrollToTop();
    initActiveSection();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
