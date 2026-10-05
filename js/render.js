/**
 * Renders every content-driven section from PORTFOLIO (js/content.js).
 *
 * Exposed as window.PortfolioRender so js/app.js can call render.all() once the
 * DOM is ready. Optional fields are omitted rather than rendered as empty
 * labels, so a project without a problem statement simply shows fewer lines.
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

  /** Inline SVG icon drawn from the sprite in index.html. */
  function icon(name) {
    return `<svg class="icon" aria-hidden="true" focusable="false"><use href="#i-${esc(name)}"></use></svg>`;
  }

  function badges(items = []) {
    return items.map((item) => `<span class="skill-badge">${esc(item)}</span>`).join('');
  }

  function list(items = []) {
    return items.map((item) => `<li>${esc(item)}</li>`).join('');
  }

  /* ─── Résumé links ─── */
  function resumeLinks() {
    document
      .querySelectorAll('[data-resume-link]')
      .forEach((link) => link.setAttribute('href', PORTFOLIO.person.resume));
  }

  /* ─── About ─── */
  function about() {
    const body = $('#aboutBody');
    if (!body) return;

    body.innerHTML = PORTFOLIO.about.paragraphs
      .map((p, i) => `<p${i === 0 ? ' class="lead"' : ''}>${esc(p)}</p>`)
      .join('');
  }

  /* ─── Education ─── */
  function education() {
    const container = $('#educationList');
    if (!container) return;

    container.innerHTML = PORTFOLIO.education
      .map(
        (item) => `
        <div class="education-item">
          <div class="edu-icon" aria-hidden="true">${icon('graduation-cap')}</div>
          <div class="edu-content">
            <h4>${esc(item.degree)}</h4>
            <p class="edu-institution">${esc(item.school)}</p>
            <p class="edu-date">${esc(item.dateLabel)}</p>
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
            <p class="company">${esc(job.company)}${job.location ? ` · ${esc(job.location)}` : ''}</p>
            <ul class="timeline-details">${list(job.details)}</ul>
          </div>
        </article>`
      )
      .join('');
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
            ${icon(group.icon)}
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
          <div class="cert-icon" aria-hidden="true">${icon(cert.icon)}</div>
          <h3>${esc(cert.name)}</h3>
          <p class="cert-issuer">${esc(cert.issuer)}</p>
          <p class="cert-date">${esc(cert.date)}</p>
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
  function projectCards() {
    const container = $('#projectsShowcase');
    if (!container) return;

    container.innerHTML = PORTFOLIO.projects
      .map(
        (p) => `
        <article class="project-showcase-card" id="project-${esc(p.id)}" aria-labelledby="project-${esc(p.id)}-title">
          <div class="project-showcase-header">
            <div class="project-icon" aria-hidden="true">${icon(p.icon)}</div>
            <div class="project-showcase-heading">
              <h3 id="project-${esc(p.id)}-title">${esc(p.title)}</h3>
              ${p.status ? `<span class="project-status project-status--wip">${icon('flask')} ${esc(p.status)}</span>` : ''}
            </div>
          </div>
          ${p.problem ? `<p class="project-showcase-summary"><strong>Problem:</strong> ${esc(p.problem)}</p>` : ''}
          <ul class="project-showcase-highlights">${list(p.highlights)}</ul>
          <div class="project-showcase-footer">
            <div class="project-skills">${badges(p.stack)}</div>
            <a class="btn btn-secondary" href="${esc(p.githubUrl)}" target="_blank" rel="noopener noreferrer">
              ${icon('github')} View on GitHub<span class="visually-hidden">: ${esc(p.title)} (opens in a new tab)</span>
            </a>
          </div>
        </article>`
      )
      .join('');
  }

  /* ─── Contact ─── */
  function contact() {
    const { person } = PORTFOLIO;
    const container = $('#contactInfo');
    if (!container) return;

    const items = [
      { icon: 'envelope', label: 'Email', value: person.email, href: `mailto:${person.email}` },
      {
        icon: 'linkedin',
        label: 'LinkedIn',
        value: person.linkedin.replace('https://', ''),
        href: person.linkedin,
        external: true,
      },
      {
        icon: 'github',
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
          <div class="contact-icon" aria-hidden="true">${icon(item.icon)}</div>
          <div class="contact-details">
            <h3>${esc(item.label)}</h3>
            <a href="${esc(item.href)}"${item.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${esc(item.value)}${item.external ? '<span class="visually-hidden"> (opens in a new tab)</span>' : ''}</a>
          </div>
        </div>`
      )
      .join('');

    const availability = $('#contactAvailability');
    if (availability) availability.textContent = person.status;
  }

  function all() {
    resumeLinks();
    about();
    education();
    experience();
    skills();
    certifications();
    projectCards();
    contact();
  }

  global.PortfolioRender = { all };
})(window);
