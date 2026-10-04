/**
 * Renders every content-driven section from PORTFOLIO (js/content.js).
 *
 * Exposed as window.PortfolioRender so js/app.js can call render.all() once the
 * DOM is ready. Optional fields are omitted rather than rendered as empty
 * labels, so a project without results or testing notes simply shows fewer
 * sections.
 */
(function (global) {
  'use strict';

  const $ = (sel, root = document) => root.querySelector(sel);

  /** Content is author-controlled, but escaping keeps template strings safe. */
  function esc(value) {
    if (value === null || value === undefined) return '';
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function badges(items = []) {
    return items.map((item) => `<span class="skill-badge">${esc(item)}</span>`).join('');
  }

  function list(items = []) {
    return items.map((item) => `<li>${esc(item)}</li>`).join('');
  }

  /** Renders a case-study block only when the content exists. */
  function block(heading, body) {
    if (!body) return '';
    return `<section class="case-block"><h4>${esc(heading)}</h4>${body}</section>`;
  }

  function textBlock(heading, text) {
    return text ? block(heading, `<p>${esc(text)}</p>`) : '';
  }

  function listBlock(heading, items) {
    return items && items.length ? block(heading, `<ul>${list(items)}</ul>`) : '';
  }

  /* ─── Hero ─── */
  function hero() {
    const { person } = PORTFOLIO;

    const highlights = $('#heroHighlights');
    if (highlights) {
      highlights.innerHTML = person.highlights
        .map((h) => `<li><i class="${esc(h.icon)}" aria-hidden="true"></i> ${esc(h.label)}</li>`)
        .join('');
    }

    const resumeLinks = document.querySelectorAll('[data-resume-link]');
    resumeLinks.forEach((link) => link.setAttribute('href', person.resume));
  }

  /* ─── About ─── */
  function about() {
    const { about: content } = PORTFOLIO;

    const body = $('#aboutBody');
    if (body) {
      body.innerHTML = content.paragraphs
        .map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${esc(p)}</p>`)
        .join('');
    }

    const focus = $('#aboutFocus');
    if (focus) {
      focus.innerHTML = content.focusAreas
        .map(
          (area) =>
            `<div class="highlight-item"><i class="${esc(area.icon)}" aria-hidden="true"></i><span>${esc(area.label)}</span></div>`
        )
        .join('');
    }
  }

  /* ─── Education ─── */
  function education() {
    const container = $('#educationList');
    if (!container) return;

    container.innerHTML = PORTFOLIO.education
      .map(
        (item) => `
        <div class="education-item">
          <div class="edu-icon" aria-hidden="true"><i class="fas fa-graduation-cap"></i></div>
          <div class="edu-content">
            <h4>${esc(item.degree)}</h4>
            <p class="edu-institution">${esc(item.school)}${item.locationLabel ? `, ${esc(item.locationLabel)}` : ''}</p>
            <p class="edu-date">${esc(item.dateLabel)}${item.detail ? ` · ${esc(item.detail)}` : ''}</p>
          </div>
        </div>`
      )
      .join('');
  }

  /* ─── Experience ─── */
  function experience() {
    const container = $('#experienceTimeline');
    if (!container) return;

    container.innerHTML = PORTFOLIO.experience
      .map(
        (job) => `
        <article class="timeline-item">
          <div class="timeline-marker" aria-hidden="true"></div>
          <div class="timeline-content">
            <div class="timeline-header">
              <h3>${esc(job.role)}</h3>
              <time class="timeline-date" datetime="${esc(job.start)}/${esc(job.end)}">${esc(job.dateLabel)}</time>
            </div>
            <p class="company">${esc(job.company)}${job.meta ? ` · ${esc(job.meta)}` : ''}</p>
            <ul class="timeline-details">${list(job.details)}</ul>
            <div class="timeline-skills">${badges(job.stack)}</div>
          </div>
        </article>`
      )
      .join('');

    const extra = $('#additionalExperience');
    const extras = PORTFOLIO.additionalExperience || [];
    if (extra && extras.length) {
      extra.innerHTML = `
        <h3 class="subsection-title">Additional Experience</h3>
        <ul class="additional-list">
          ${extras
            .map(
              (item) =>
                `<li><strong>${esc(item.role)}</strong> — ${esc(item.company)}${item.note ? ` <span class="additional-note">${esc(item.note)}</span>` : ''}</li>`
            )
            .join('')}
        </ul>`;
    }
  }

  /* ─── Skills ─── */
  function skills() {
    const container = $('#skillsGrid');
    if (!container) return;

    container.innerHTML = PORTFOLIO.skillGroups
      .map(
        (group) => `
        <div class="skill-category">
          <div class="skill-category-header">
            <i class="${esc(group.icon)}" aria-hidden="true"></i>
            <h3>${esc(group.title)}</h3>
          </div>
          <ul class="skill-tags">
            ${group.skills.map((s) => `<li class="skill-tag">${esc(s)}</li>`).join('')}
          </ul>
        </div>`
      )
      .join('');
  }

  /* ─── Certifications ─── */
  function certifications() {
    const container = $('#certificationsGrid');
    if (!container) return;

    container.innerHTML = PORTFOLIO.certifications
      .map(
        (cert) => `
        <article class="cert-card">
          <div class="cert-icon" aria-hidden="true"><i class="${esc(cert.icon)}"></i></div>
          <h3>${esc(cert.name)}</h3>
          <p class="cert-issuer">${esc(cert.issuer)}</p>
          <p class="cert-date">${esc(cert.date)}</p>
          <p class="cert-skills">${esc(cert.skills)}</p>
          ${
            cert.verifyUrl
              ? `<a class="cert-verify-link" href="${esc(cert.verifyUrl)}" target="_blank" rel="noopener noreferrer">Verify credential<span class="visually-hidden"> (opens in a new tab)</span></a>`
              : ''
          }
        </article>`
      )
      .join('');
  }

  /* ─── Projects ─── */
  function projectStatusBadge(project) {
    if (project.confidentiality === 'private') {
      return '<span class="project-status project-status--private"><i class="fas fa-lock" aria-hidden="true"></i> Employer code</span>';
    }
    if (project.confidentiality === 'source-unavailable') {
      return '<span class="project-status project-status--unavailable"><i class="fas fa-folder" aria-hidden="true"></i> Source on request</span>';
    }
    return '<span class="project-status project-status--public"><i class="fab fa-github" aria-hidden="true"></i> Public repo</span>';
  }

  function projectCards() {
    const container = $('#projectsShowcase');
    if (!container) return;

    container.innerHTML = PORTFOLIO.projects
      .map(
        (p) => `
        <article class="project-showcase-card" data-categories="${esc(p.categories.join(' '))}" aria-labelledby="project-${esc(p.id)}-title">
          <div class="project-showcase-header">
            <div class="project-icon" aria-hidden="true"><i class="${esc(p.icon)}"></i></div>
            <div class="project-showcase-heading">
              <h3 id="project-${esc(p.id)}-title">${esc(p.title)}</h3>
              <p class="project-tech">${esc(p.techSummary)}</p>
            </div>
          </div>
          <p class="project-showcase-summary">${esc(p.summary)}</p>
          <ul class="project-showcase-highlights">${list((p.features || []).slice(0, 3))}</ul>
          <div class="project-showcase-meta">
            ${projectStatusBadge(p)}
            ${p.status ? '<span class="project-status project-status--wip"><i class="fas fa-flask" aria-hidden="true"></i> In development</span>' : ''}
          </div>
          <div class="project-showcase-footer">
            <div class="project-skills">${badges(p.stack.slice(0, 5))}</div>
            <button type="button" class="btn btn-outline project-case-study-btn" data-project="${esc(p.id)}">
              View case study<span class="visually-hidden">: ${esc(p.title)}</span>
            </button>
          </div>
        </article>`
      )
      .join('');
  }

  function projectFilters() {
    const container = $('#projectFilters');
    if (!container) return;

    container.innerHTML = PORTFOLIO.projectFilters
      .map(
        (filter, i) =>
          `<button type="button" role="tab" class="filter-btn${i === 0 ? ' is-active' : ''}" data-filter="${esc(filter.id)}" aria-selected="${i === 0}">${esc(filter.label)}</button>`
      )
      .join('');
  }

  function projectLinks(project) {
    const parts = [];

    if (project.githubUrl) {
      parts.push(
        `<a class="btn btn-secondary" href="${esc(project.githubUrl)}" target="_blank" rel="noopener noreferrer"><i class="fab fa-github" aria-hidden="true"></i> View repository<span class="visually-hidden"> (opens in a new tab)</span></a>`
      );
    }
    if (project.demoUrl) {
      parts.push(
        `<a class="btn btn-primary" href="${esc(project.demoUrl)}" target="_blank" rel="noopener noreferrer">Live demo<span class="visually-hidden"> (opens in a new tab)</span></a>`
      );
    }
    if (project.confidentialityNote) {
      parts.push(`<p class="project-note">${esc(project.confidentialityNote)}</p>`);
    }

    return parts.length ? `<div class="modal-project-links">${parts.join('')}</div>` : '';
  }

  function caseStudyHtml(project) {
    return `
      <header class="modal-project-header">
        <div class="project-icon" aria-hidden="true"><i class="${esc(project.icon)}"></i></div>
        <div>
          <h2 id="projectModalTitle">${esc(project.title)}</h2>
          <p class="project-tech">${esc(project.techSummary)}</p>
        </div>
      </header>
      ${project.status ? `<p class="project-status-banner"><i class="fas fa-flask" aria-hidden="true"></i> ${esc(project.status)}</p>` : ''}
      <div class="case-study-grid">
        ${textBlock('Context', project.context)}
        ${textBlock('Problem', project.problem)}
        ${textBlock('Objective', project.objective)}
        ${textBlock('My role', project.role)}
        ${textBlock('Solution', project.solution)}
        ${textBlock('Architecture', project.architecture)}
        ${listBlock('Technical decisions', project.decisions)}
        ${listBlock('Key features', project.features)}
        ${textBlock('Engineering challenge', project.challenges)}
        ${textBlock('Testing', project.testing)}
        ${textBlock('Security', project.security)}
        ${listBlock('Results', project.results)}
        ${block('Technologies', `<div class="project-skills">${badges(project.stack)}</div>`)}
      </div>
      ${projectLinks(project)}`;
  }

  /* ─── Contact ─── */
  function contact() {
    const { person } = PORTFOLIO;
    const container = $('#contactInfo');
    if (!container) return;

    const items = [
      { icon: 'fas fa-map-marker-alt', label: 'Location', value: person.location },
      { icon: 'fas fa-envelope', label: 'Email', value: person.email, href: `mailto:${person.email}` },
      { icon: 'fas fa-phone', label: 'Phone', value: person.phone, href: `tel:${person.phoneHref}` },
      {
        icon: 'fab fa-linkedin',
        label: 'LinkedIn',
        value: person.linkedin.replace('https://', ''),
        href: person.linkedin,
        external: true,
      },
      {
        icon: 'fab fa-github',
        label: 'GitHub',
        value: person.github.replace('https://', ''),
        href: person.github,
        external: true,
      },
    ];

    container.innerHTML = items
      .map(
        (item) => `
        <div class="contact-item">
          <div class="contact-icon" aria-hidden="true"><i class="${esc(item.icon)}"></i></div>
          <div class="contact-details">
            <h4>${esc(item.label)}</h4>
            ${
              item.href
                ? `<a href="${esc(item.href)}"${item.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(item.value)}${item.external ? '<span class="visually-hidden"> (opens in a new tab)</span>' : ''}</a>`
                : `<p>${esc(item.value)}</p>`
            }
          </div>
        </div>`
      )
      .join('');

    const availability = $('#contactAvailability');
    if (availability) availability.textContent = person.availability;
  }

  function all() {
    hero();
    about();
    education();
    experience();
    skills();
    certifications();
    projectFilters();
    projectCards();
    contact();
  }

  global.PortfolioRender = { all, caseStudyHtml };
})(window);
