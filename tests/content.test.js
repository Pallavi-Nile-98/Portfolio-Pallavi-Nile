/**
 * Content contract tests.
 *
 * The whole site renders from js/content.js, so a malformed entry there is a
 * broken page. These tests run with Node's built-in runner and need no
 * dependencies: `npm test`.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const PORTFOLIO = require('../js/content.js');

const VALID_CONFIDENTIALITY = ['public', 'private', 'source-unavailable'];

function uniqueIds(items) {
  return new Set(items.map((item) => item.id)).size === items.length;
}

test('person has the contact details the page and schema depend on', () => {
  const { person } = PORTFOLIO;
  assert.ok(person.name, 'name is required');
  assert.match(person.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  assert.match(person.phoneHref, /^\+\d{10,15}$/);
  assert.match(person.linkedin, /^https:\/\//);
  assert.match(person.github, /^https:\/\//);
  assert.ok(person.resume.endsWith('.pdf'));
  assert.ok(person.highlights.length > 0);
});

test('experience entries are ordered most recent first and fully populated', () => {
  const { experience } = PORTFOLIO;
  assert.ok(experience.length > 0);
  assert.ok(uniqueIds(experience), 'experience ids must be unique');

  experience.forEach((job) => {
    assert.ok(job.role, `${job.id} needs a role`);
    assert.ok(job.company, `${job.id} needs a company`);
    assert.ok(job.dateLabel, `${job.id} needs a date label`);
    assert.ok(job.details.length > 0, `${job.id} needs detail bullets`);
    assert.ok(job.stack.length > 0, `${job.id} needs a tech stack`);
    assert.match(job.start, /^\d{4}-\d{2}$/, `${job.id} start must be YYYY-MM`);
  });

  const starts = experience.map((job) => job.start);
  assert.deepEqual(starts, [...starts].sort().reverse(), 'experience must be newest first');
});

test('education and certifications carry issuer and date information', () => {
  assert.ok(PORTFOLIO.education.length > 0);
  PORTFOLIO.education.forEach((item) => {
    assert.ok(item.degree && item.school && item.dateLabel, `${item.id} is incomplete`);
  });

  assert.ok(uniqueIds(PORTFOLIO.certifications));
  PORTFOLIO.certifications.forEach((cert) => {
    assert.ok(cert.name && cert.issuer && cert.date, `${cert.id} is incomplete`);
    assert.ok(cert.icon, `${cert.id} needs an icon`);
    if (cert.verifyUrl) assert.match(cert.verifyUrl, /^https:\/\//);
  });
});

test('every project satisfies the case study contract', () => {
  const { projects } = PORTFOLIO;
  assert.ok(projects.length > 0);
  assert.ok(uniqueIds(projects), 'project ids must be unique');

  projects.forEach((p) => {
    assert.ok(p.title, `${p.id} needs a title`);
    assert.ok(p.summary, `${p.id} needs a summary`);
    assert.ok(p.problem, `${p.id} needs a problem statement`);
    assert.ok(p.solution, `${p.id} needs a solution`);
    assert.ok(p.role, `${p.id} needs a role`);
    assert.ok(p.stack.length > 0, `${p.id} needs a tech stack`);
    assert.ok(p.categories.length > 0, `${p.id} needs at least one category`);
    assert.ok(
      VALID_CONFIDENTIALITY.includes(p.confidentiality),
      `${p.id} has an unknown confidentiality value`
    );
  });
});

test('project categories all map to a declared filter', () => {
  const filterIds = new Set(PORTFOLIO.projectFilters.map((f) => f.id));
  assert.ok(filterIds.has('all'), 'an "all" filter is required');

  PORTFOLIO.projects.forEach((p) => {
    p.categories.forEach((category) => {
      assert.ok(filterIds.has(category), `${p.id} uses undeclared category "${category}"`);
    });
  });
});

test('non-public projects never expose a repository link', () => {
  PORTFOLIO.projects.forEach((p) => {
    if (p.confidentiality === 'public') {
      assert.match(p.githubUrl || '', /^https:\/\/github\.com\//, `${p.id} must link a repository`);
    } else {
      assert.equal(p.githubUrl, null, `${p.id} must not expose a repository link`);
      assert.ok(p.confidentialityNote, `${p.id} needs a note explaining why source is unavailable`);
    }
  });
});

test('all outbound URLs use https', () => {
  const urls = [
    PORTFOLIO.person.linkedin,
    PORTFOLIO.person.github,
    ...PORTFOLIO.projects.flatMap((p) => [p.githubUrl, p.demoUrl]),
    ...PORTFOLIO.certifications.map((c) => c.verifyUrl),
  ].filter(Boolean);

  urls.forEach((url) => assert.match(url, /^https:\/\//, `${url} must use https`));
});

test('navigation targets are in-page anchors with unique ids', () => {
  assert.ok(uniqueIds(PORTFOLIO.navigation));
  PORTFOLIO.navigation.forEach((item) => {
    assert.match(item.href, /^#[a-z-]+$/, `${item.id} must be an in-page anchor`);
    assert.equal(item.href, `#${item.id}`, `${item.id} href must match its id`);
  });
});

test('skill groups are populated and free of duplicates', () => {
  assert.ok(uniqueIds(PORTFOLIO.skillGroups));
  PORTFOLIO.skillGroups.forEach((group) => {
    assert.ok(group.skills.length > 0, `${group.id} has no skills`);
    assert.equal(
      new Set(group.skills).size,
      group.skills.length,
      `${group.id} lists a duplicate skill`
    );
  });
});

test('contact endpoint is either unset or an https URL', () => {
  const { contactEndpoint } = PORTFOLIO;
  if (contactEndpoint !== null) {
    assert.match(contactEndpoint, /^https:\/\//, 'contact endpoint must use https');
  }
});
