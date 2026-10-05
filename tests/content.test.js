/**
 * Content contract tests.
 *
 * The whole site renders from js/content.js, so a malformed entry there is a
 * broken page. These tests run with Node's built-in runner and need no
 * dependencies: `npm test`.
 */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const PORTFOLIO = require('../js/content.js');

function uniqueIds(items) {
  return new Set(items.map((item) => item.id)).size === items.length;
}

test('person has the contact details the page and schema depend on', () => {
  const { person } = PORTFOLIO;
  assert.ok(person.name, 'name is required');
  assert.match(person.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  assert.match(person.linkedin, /^https:\/\//);
  assert.match(person.github, /^https:\/\//);
  assert.ok(person.resume.endsWith('.pdf'));
  assert.ok(person.headline && person.status && person.summary.length > 0);
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
    assert.ok(p.icon, `${p.id} needs an icon`);
    assert.ok(p.highlights.length > 0, `${p.id} needs highlight bullets`);
    assert.ok(p.stack.length > 0, `${p.id} needs a tech stack`);
    assert.match(p.githubUrl || '', /^https:\/\/github\.com\//, `${p.id} must link a repository`);
  });
});

test('all outbound URLs use https', () => {
  const urls = [
    PORTFOLIO.person.linkedin,
    PORTFOLIO.person.github,
    ...PORTFOLIO.projects.map((p) => p.githubUrl),
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

test('the linked résumé file exists in the repository', () => {
  const resume = path.join(__dirname, '..', PORTFOLIO.person.resume);
  assert.ok(fs.existsSync(resume), `${PORTFOLIO.person.resume} is linked but missing`);
});

test('retired contact details never reappear on the site', () => {
  const retired = ['nilepallavi98@gmail.com', '857-930-8230', '8579308230'];
  const files = ['index.html', '404.html', 'README.md', 'js/content.js'];

  files.forEach((file) => {
    const text = fs.readFileSync(path.join(__dirname, '..', file), 'utf8');
    retired.forEach((value) => {
      assert.ok(!text.includes(value), `${file} still contains retired value "${value}"`);
    });
  });
});