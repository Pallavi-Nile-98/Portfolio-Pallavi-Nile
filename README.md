# Pallavi Nile — Software Engineer Portfolio

A content-driven personal portfolio built as a real engineering project rather than a single-page template. Every section renders from one content module, and the data contract is enforced by an automated test suite in CI.

**Live site:** https://pallavi-nile-98.github.io/Portfolio-Pallavi-Nile/

---

## Why it is built this way

A portfolio's real maintenance cost is content drift: a job title updated in the hero but not the schema markup, a project renamed in one place and not another. This site removes that class of bug by making `js/content.js` the only place content lives. The DOM and the command palette are both derived from it, and `npm test` fails the build if that data breaks its contract.

## Architecture

```
Portfolio-Pallavi-Nile/
├── index.html                 # Semantic document shell; sections are empty containers
├── styles.css                 # Design tokens + component styles (single stylesheet, no build step)
├── js/
│   ├── content.js             # Single source of truth: person, experience, projects, skills, certs
│   ├── render.js              # Pure content → DOM rendering
│   └── app.js                 # Behaviour: theme, nav, palette, contact form
├── tests/
│   └── content.test.js        # Content contract tests (Node built-in test runner, zero deps)
├── .github/workflows/ci.yml   # Runs tests and asserts deployment files exist
├── 404.html                   # Custom error page
├── robots.txt / sitemap.xml   # Crawler directives
├── site.webmanifest           # PWA manifest
├── resume.pdf
└── images/
```

The three JavaScript files separate concerns deliberately:

| File | Responsibility | Knows about |
|---|---|---|
| `content.js` | Data only | Nothing |
| `render.js` | Content → HTML | `content.js` |
| `app.js` | Interaction and state | `content.js`, `render.js`, the DOM |

No framework and no build step. The site is deployable by copying the directory to any static host.

## Features

**Project cards.** Each project card shows the problem, what was built with its key numbers, the tech stack, and a link to the public repository. Optional fields such as a problem statement or an in-progress status are omitted rather than rendered empty.

**Command palette.** `Ctrl/⌘ + K` opens fuzzy search over sections, projects, and actions, with full arrow-key and Enter support.

**Theme switching.** Dark by default, persisted to `localStorage`, degrading safely when storage is unavailable.

**Contact form.** Client-side validation with per-field error messages, `aria-invalid` wiring, a honeypot field, and distinct loading, success, and error states.

## Accessibility

- Skip link, landmark elements, and a single `h1` per page
- Focus trapping in the command palette, with focus restored to the trigger on close
- `aria-live` region for form status
- Visible focus indicators, and "opens in a new tab" announced to screen readers
- Full keyboard operability across navigation, the palette, and the contact form
- `prefers-reduced-motion` disables scroll reveal, background animation, and smooth scrolling

## Performance

- No framework, no bundler, no runtime dependencies
- Fonts preconnected; hero image given explicit dimensions to prevent layout shift
- Scroll reveal via `IntersectionObserver`, with observers disconnected after firing
- Scroll listeners registered as passive

## SEO

Canonical URL, Open Graph and Twitter card metadata, `Person` JSON-LD including credentials, `sitemap.xml`, `robots.txt`, and a custom `404.html`.

## Development

Requires Node.js 18 or later for the test suite. Serving the site needs only a static file server.

```bash
git clone https://github.com/Pallavi-Nile-98/Portfolio-Pallavi-Nile.git
cd Portfolio-Pallavi-Nile

npm start     # serve at http://localhost:8000
npm test      # run the content contract tests
```

Open the site through a local server rather than the `file://` protocol so that relative asset paths resolve correctly.

### Editing content

All content changes go through `js/content.js`. Adding a project means appending one object to the `projects` array; the card and command palette entry follow automatically.

Run `npm test` after editing. The suite checks that experience is ordered newest-first, every project links a GitHub repository, outbound URLs use HTTPS, identifiers are unique, and retired contact details never reappear.

### Configuring the contact form

By default the form composes a message in the visitor's email client. To deliver over HTTPS instead, set `contactEndpoint` in `js/content.js` to a form provider's submission URL:

```js
contactEndpoint: 'https://formspree.io/f/your-form-id',
```

Provider submission URLs are public endpoints, not secrets. Never place an API key, SMTP password, or other credential in this file — it ships to the browser.

## Deployment

Pushing to `main` publishes through GitHub Pages from the repository root. CI runs the test suite and verifies that every file required for deployment is present.

To use a custom domain, add a `CNAME` file containing the domain, point a `CNAME` DNS record at `pallavi-nile-98.github.io`, and enable "Enforce HTTPS" in repository settings.

## Browser support

Current versions of Chrome, Firefox, Safari, and Edge, including mobile Safari and Chrome for Android.

## License

MIT. Feel free to use the structure as a starting point for your own portfolio; please replace the content with your own.

## Contact

**Pallavi Nile**

- Email: npallavi0401@gmail.com
- LinkedIn: [linkedin.com/in/pallavi-nile](https://www.linkedin.com/in/pallavi-nile)
- GitHub: [github.com/pallavi-nile-98](https://github.com/pallavi-nile-98)
