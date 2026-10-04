/**
 * Portfolio content — single source of truth.
 *
 * Every section (about, experience, skills, education, certifications,
 * projects, contact) is rendered from this file by js/render.js. The hero and
 * page metadata live in index.html so they work without JavaScript; keep them
 * in sync with `person` below.
 *
 * Wording must match the résumé and LinkedIn exactly. Do not add projects,
 * numbers, or skills here that are not on the résumé.
 */
const PORTFOLIO = {
  person: {
    name: 'Pallavi Nile',
    headline: 'Software Engineer | Full-Stack, Cloud & GenAI',
    tagline: 'I build software that is deterministic, tested, and deployed.',
    status: 'Open to full-time roles starting January 2027',
    email: 'npallavi0401@gmail.com',
    linkedin: 'https://www.linkedin.com/in/pallavi-nile',
    github: 'https://github.com/pallavi-nile-98',
    resume: 'resume.pdf',
  },

  about: {
    paragraphs: [
      'My first internship taught me to build apps. My second taught me that shipping them is the hard part. I started at Sumago Infotech in India, building React and Node.js applications, and returned in 2023 to deploy them with Docker, CI/CD pipelines, Terraform, and CloudWatch on AWS.',
      'In 2024 I moved to Boston for my M.S. in Information Systems at Northeastern. During my co-op at The Geode Foundation, our app generated images through an AI API capped at 24 a day. I replaced it with a deterministic system serving 1,220 pre-generated images, removing the cap and every runtime API call, and cut the metadata shipped to the browser by 89%.',
      'That project shaped how I build: use AI where it adds real value, and make everything around it predictable.',
    ],
  },

  experience: [
    {
      id: 'geode',
      role: 'Software Engineering Co-op',
      company: 'The Geode Foundation',
      location: 'Remote',
      start: '2026-01',
      end: '2026-06',
      dateLabel: 'Jan 2026 – Jun 2026',
      details: [
        'Eliminated all runtime image-API calls by replacing per-screen AI generation with a deterministic, manifest-driven lookup over 1,220 pre-generated images, removing a 24-images/day cap.',
        'Cut bundled image metadata 89% (1.7 MB → 189 KB) by building a lean runtime manifest with exact-match and fallback lookup.',
        "Made shared marketplace links reproduce users' original searches by persisting search keywords through React/TypeScript state and APIs.",
      ],
    },
    {
      id: 'sumago-devops',
      role: 'AWS DevOps Engineer Intern',
      company: 'Sumago Infotech Pvt. Ltd.',
      location: 'India',
      start: '2023-07',
      end: '2023-10',
      dateLabel: 'Jul 2023 – Oct 2023',
      details: [
        'Shipped MERN applications to AWS (EC2, S3), including Node.js/Express REST APIs with JWT authentication.',
        'Automated testing and deployment by containerizing applications with Docker and building GitHub Actions CI/CD pipelines.',
        'Made infrastructure reproducible and observable with Terraform templates and CloudWatch monitoring dashboards.',
      ],
    },
    {
      id: 'sumago-fullstack',
      role: 'Full-Stack Development Intern',
      company: 'Sumago Infotech Pvt. Ltd.',
      location: 'India',
      start: '2021-09',
      end: '2022-04',
      dateLabel: 'Sep 2021 – Apr 2022',
      details: [
        'Improved MongoDB query performance by adding targeted indexes.',
        'Built responsive React.js web applications with reusable components.',
        'Delivered Node.js and MongoDB features in Agile sprints.',
      ],
    },
  ],

  education: [
    {
      id: 'northeastern',
      degree: 'M.S. Information Systems',
      school: 'Northeastern University',
      dateLabel: 'Sep 2024 – Dec 2026',
    },
    {
      id: 'avcoe',
      degree: 'B.E. Computer Engineering',
      school: 'Amrutvahini College of Engineering (AVCOE)',
      dateLabel: 'Jul 2019 – Jul 2023',
    },
  ],

  certifications: [
    {
      id: 'aws-saa',
      name: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
      issuer: 'Amazon Web Services',
      date: 'Mar 2026',
      icon: 'fab fa-aws',
      verifyUrl: null,
    },
  ],

  skillGroups: [
    {
      id: 'languages',
      title: 'Languages',
      icon: 'fas fa-code',
      skills: ['Java', 'Python', 'TypeScript', 'JavaScript', 'SQL', 'Bash'],
    },
    {
      id: 'frontend',
      title: 'Frontend',
      icon: 'fas fa-cube',
      skills: ['React.js', 'Redux Toolkit'],
    },
    {
      id: 'backend',
      title: 'Backend and Data',
      icon: 'fas fa-server',
      skills: ['Spring Boot', 'Node.js', 'Express.js', 'FastAPI', 'REST APIs', 'PostgreSQL', 'MongoDB', 'OpenSearch'],
    },
    {
      id: 'cloud',
      title: 'Cloud and DevOps',
      icon: 'fas fa-cloud',
      skills: [
        'AWS (ECS Fargate, EC2, RDS, S3, ALB, VPC, IAM, CloudWatch)',
        'Terraform',
        'Docker',
        'GitHub Actions',
        'Linux',
      ],
    },
    {
      id: 'ai',
      title: 'AI',
      icon: 'fas fa-brain',
      skills: ['RAG', 'Embeddings', 'Hybrid Search', 'LLM APIs', 'Playwright automation'],
    },
    {
      id: 'testing',
      title: 'Testing',
      icon: 'fas fa-vial',
      skills: ['JUnit 5', 'Mockito', 'Testcontainers', 'pytest'],
    },
  ],

  /**
   * Projects render in this order. `problem` and `status` are optional; a
   * project without them simply shows fewer lines on its card.
   */
  projects: [
    {
      id: 'computer-use-engine',
      title: 'Computer-Use Capability Engine',
      icon: 'fas fa-robot',
      problem:
        'Most AI agents call the model on every step, which makes them slow, costly, and unpredictable.',
      highlights: [
        "An LLM discovers a legacy-UI workflow once; it's compiled into a typed, versioned artifact that replays deterministically with no model in the loop.",
        'Host/action allowlists, approval gates, redacted evidence logs, and same-session human handoff.',
        'Retries, recoverable states, and hard failures validated through failure injection, so every run is auditable.',
      ],
      stack: ['Python', 'Playwright', 'FastAPI', 'Pydantic', 'OpenAI API'],
      githubUrl: 'https://github.com/Pallavi-Nile-98/computer-use-capability-engine',
    },
    {
      id: 'claims-approval-api',
      title: 'Claims Approval API',
      icon: 'fas fa-file-invoice-dollar',
      highlights: [
        '4-state claims workflow with separation of duties and optimistic locking; 59 automated tests (JUnit 5, Mockito, Testcontainers) in CI in under a minute.',
        '39 AWS resources via Terraform: multi-AZ VPC, ECS Fargate behind an ALB, private RDS, least-privilege IAM, ~$0.07/hour.',
        'Induced and traced a database outage hidden ~25 minutes by security-group connection tracking; documented in a runbook.',
      ],
      stack: ['Java 21', 'Spring Boot 3', 'PostgreSQL', 'Terraform', 'AWS (ECS Fargate, RDS, ALB)', 'GitHub Actions'],
      githubUrl: 'https://github.com/Pallavi-Nile-98/claims-approval-api',
    },
    {
      id: 'paper-curator',
      title: 'AI Research Paper Curator',
      icon: 'fas fa-book-open',
      status: 'In progress',
      highlights: [
        'Async arXiv ingestion with OCR fallback and section-aware chunking that keeps citation context.',
        'Hybrid BM25 + vector retrieval with zero-downtime re-indexing via versioned OpenSearch indices and alias swaps.',
        '11-table PostgreSQL schema that makes pipeline re-runs duplicate-free; 358 automated tests in CI.',
      ],
      stack: ['Python', 'PostgreSQL', 'OpenSearch', 'Docker', 'GitHub Actions'],
      githubUrl: 'https://github.com/Pallavi-Nile-98/AI-Research-Paper-Curator_RAG-System',
    },
  ],

  navigation: [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'projects', label: 'Projects', href: '#projects' },
    { id: 'skills', label: 'Skills', href: '#skills' },
    { id: 'certifications', label: 'Certifications', href: '#certifications' },
    { id: 'contact', label: 'Contact', href: '#contact' },
  ],

  /**
   * Contact delivery endpoint. Leave null to fall back to the visitor's email
   * client. Set to a form provider URL (for example a Formspree endpoint) to
   * submit over HTTPS. Provider endpoints are public submission URLs, not
   * secrets — never place an API key here.
   */
  contactEndpoint: null,
};

if (typeof module !== 'undefined') {
  module.exports = PORTFOLIO;
}
