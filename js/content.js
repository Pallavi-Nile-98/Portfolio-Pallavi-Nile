/**
 * Portfolio content — single source of truth.
 *
 * Every section (hero, about, experience, skills, education, certifications,
 * projects, contact) is rendered from this file by js/app.js. Editing content
 * here updates the page, the command palette, and the portfolio assistant.
 *
 * Projects use `confidentiality` to control how links are presented:
 *   'public'  — repository link is rendered
 *   'private' — employer-owned source; shown as a labelled badge, never a link
 */
const PORTFOLIO = {
  person: {
    name: 'Pallavi Nile',
    role: 'Software Engineer',
    eyebrow: 'Software Engineer · Full-Stack · Cloud',
    headline: 'I build reliable, user-focused software from interface to infrastructure.',
    location: 'Boston, MA',
    email: 'nilepallavi98@gmail.com',
    phone: '(857) 930-8230',
    phoneHref: '+18579308230',
    linkedin: 'https://linkedin.com/in/pallavi-nile',
    github: 'https://github.com/Pallavi-Nile-98',
    resume: 'resume.pdf',
    availability: 'Open to onsite, hybrid, and remote roles, including relocation within the United States.',
    summary:
      "I'm Pallavi Nile, a software engineer and M.S. Information Systems student at Northeastern University. I build responsive web applications, full-stack systems, cloud infrastructure, and developer-focused solutions using React, TypeScript, Node.js, databases, and AWS.",
    highlights: [
      { icon: 'fab fa-aws', label: 'AWS Certified Solutions Architect – Associate' },
      { icon: 'fas fa-code', label: 'React · TypeScript · Node.js · MongoDB' },
      { icon: 'fas fa-cloud', label: 'AWS · Docker · Terraform · CI/CD' },
    ],
  },

  about: {
    paragraphs: [
      "I'm a Boston-based software engineer who enjoys turning complex requirements into clear, dependable products. My experience spans production-facing React and TypeScript development, full-stack applications, REST APIs, relational and NoSQL databases, AWS infrastructure, and CI/CD automation.",
      'During my Software Engineering Co-op with The Geode Foundation, I contributed to blockchain marketplace and gaming experiences, including shareable marketplace search links and game-asset integration.',
      "I'm currently completing my M.S. in Information Systems at Northeastern University and am seeking software engineering opportunities where I can contribute across product development, cloud systems, and user experience.",
    ],
    focusAreas: [
      { icon: 'fas fa-code', label: 'Full-Stack Development' },
      { icon: 'fas fa-cloud', label: 'Cloud & DevOps' },
      { icon: 'fas fa-cube', label: 'Frontend Engineering' },
    ],
  },

  experience: [
    {
      id: 'geode',
      role: 'Software Engineering Co-op',
      company: 'The Geode Foundation',
      meta: 'Six-month co-op · Blockchain applications',
      start: '2026-01',
      end: '2026-06',
      dateLabel: 'Jan 2026 – Jun 2026',
      details: [
        'Developed frontend functionality for Galactic Conquest, a blockchain-based strategy game, using React and TypeScript.',
        'Implemented shareable deep links for Geode Marketplace so users could share searches and reproduce the corresponding results.',
        'Extended routing and redirect logic to process application, module, identifier, and keyword parameters.',
        'Integrated deep-link auto-loading behavior into marketplace reporting and search workflows.',
        'Helped implement a manifest-driven image-loading system for game assets.',
        'Added image fallback behavior to improve resilience when an asset could not be loaded.',
        'Tested game image behavior using mock blockchain state.',
        'Worked inside an established monorepo and participated in collaborative Git and code-review workflows.',
      ],
      stack: ['React', 'TypeScript', 'JavaScript', 'Deep Linking', 'Monorepo', 'Git', 'Code Review'],
    },
    {
      id: 'sumago',
      role: 'Full-Stack Developer / AWS DevOps Engineer',
      company: 'Sumago Infotech',
      meta: 'Internship · India',
      start: '2023-07',
      end: '2023-10',
      dateLabel: 'Jul 2023 – Oct 2023',
      details: [
        'Contributed to MERN-stack application development within a three-person engineering team.',
        'Developed and integrated REST API functionality.',
        'Worked with JWT-based authentication.',
        'Containerized application components using Docker.',
        'Supported AWS-based application deployment.',
        'Used Terraform for infrastructure provisioning.',
        'Worked with GitHub Actions for automation and CI/CD.',
        'Used Amazon CloudWatch dashboards for application and infrastructure monitoring.',
      ],
      stack: ['React', 'Node.js', 'Express.js', 'MongoDB', 'JWT', 'Docker', 'AWS', 'Terraform', 'GitHub Actions', 'CloudWatch'],
    },
  ],

  additionalExperience: [
    {
      id: 'nu-security',
      role: 'Residential Security Office Proctor',
      company: 'Northeastern University',
      note: 'On-campus role held alongside graduate coursework.',
    },
  ],

  education: [
    {
      id: 'northeastern',
      degree: 'Master of Science — Information Systems',
      school: 'Northeastern University',
      locationLabel: 'Boston, MA',
      dateLabel: 'Expected December 2026',
      detail: 'GPA 3.37 / 4.0',
    },
    {
      id: 'avcoe',
      degree: 'Bachelor of Engineering — Computer Engineering',
      school: 'Amrutvahini College of Engineering, Savitribai Phule Pune University',
      locationLabel: 'India',
      dateLabel: 'Graduated 2023',
      detail: null,
    },
  ],

  certifications: [
    {
      id: 'aws-saa',
      name: 'AWS Certified Solutions Architect – Associate (SAA-C03)',
      issuer: 'Amazon Web Services',
      date: 'Issued March 2026',
      skills: 'Cloud architecture, EC2, S3, RDS, Lambda, VPC, IAM, scalability, system design',
      icon: 'fab fa-aws',
      verifyUrl: null,
    },
    {
      id: 'linkedin-blockchain',
      name: 'Blockchain and Smart Contracts Security',
      issuer: 'LinkedIn Learning',
      date: 'Issued February 2026',
      skills: 'Smart contract security, blockchain fundamentals, secure development practices',
      icon: 'fab fa-linkedin',
      verifyUrl: null,
    },
    {
      id: 'coursera-eml',
      name: 'Introduction to Embedded Machine Learning',
      issuer: 'Coursera',
      date: 'Issued January 2024',
      skills: 'Neural networks, data ethics, applied machine learning',
      icon: 'fas fa-microchip',
      verifyUrl: null,
    },
  ],

  skillGroups: [
    {
      id: 'languages',
      title: 'Languages',
      icon: 'fas fa-code',
      skills: ['JavaScript (ES6+)', 'TypeScript', 'Python', 'Java', 'SQL', 'PL/SQL', 'HTML5', 'CSS3', 'Bash'],
    },
    {
      id: 'frontend',
      title: 'Frontend',
      icon: 'fas fa-cube',
      skills: ['React', 'React Router', 'Vite', 'Redux Toolkit', 'Tailwind CSS', 'Bootstrap', 'Responsive Design', 'Component Architecture'],
    },
    {
      id: 'backend',
      title: 'Backend & APIs',
      icon: 'fas fa-server',
      skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT', 'bcrypt', 'node-cron', 'Nodemailer', 'Nginx'],
    },
    {
      id: 'databases',
      title: 'Databases',
      icon: 'fas fa-database',
      skills: ['MongoDB', 'PostgreSQL', 'MySQL', 'Oracle', 'Firebase Firestore', 'Schema Design'],
    },
    {
      id: 'cloud',
      title: 'Cloud',
      icon: 'fas fa-cloud',
      skills: ['AWS EC2', 'AWS S3', 'AWS RDS', 'AWS IAM', 'AWS Lambda', 'CloudWatch', 'Route 53', 'CloudFront'],
    },
    {
      id: 'devops',
      title: 'DevOps & Tooling',
      icon: 'fas fa-tools',
      skills: ['Docker', 'Terraform', 'GitHub Actions', 'CI/CD', 'Git', 'GitHub', 'Linux', 'Postman'],
    },
    {
      id: 'ai',
      title: 'AI & Data',
      icon: 'fas fa-brain',
      skills: ['OpenAI API', 'LLM Integration', 'TensorFlow', 'Scikit-Learn', 'Pandas', 'OpenCV', 'CNNs'],
    },
    {
      id: 'practices',
      title: 'Practices',
      icon: 'fas fa-diagram-project',
      skills: ['Agile Collaboration', 'Code Reviews', 'Unit Testing', 'Debugging', 'API Integration', 'Data Structures & Algorithms'],
    },
  ],

  projectFilters: [
    { id: 'all', label: 'All work' },
    { id: 'professional', label: 'Professional' },
    { id: 'fullstack', label: 'Full-stack' },
    { id: 'frontend', label: 'Frontend' },
    { id: 'cloud', label: 'Cloud & DevOps' },
    { id: 'database', label: 'Database' },
    { id: 'ai', label: 'AI & Data' },
  ],

  projects: [
    {
      id: 'galactic-conquest',
      title: 'Galactic Conquest',
      categories: ['professional', 'frontend'],
      icon: 'fas fa-gamepad',
      techSummary: 'React · TypeScript · Blockchain application integration',
      summary:
        'Frontend contributions to a blockchain-based strategy game, including a manifest-driven system for selecting and rendering game-world imagery.',
      context: 'Blockchain-based strategy game developed within the Geode ecosystem during my Software Engineering Co-op.',
      problem:
        'Game world imagery had to be selected and displayed from blockchain-derived data, and the interface needed to stay usable when an expected asset was missing or invalid.',
      objective:
        'Support the game interface and improve how game-world imagery is selected, loaded, and displayed.',
      role: 'Frontend and integration contributor working within an established monorepo.',
      solution:
        'Built React and TypeScript frontend functionality and helped implement a manifest-driven image-loading system with graceful fallback rendering for unavailable assets.',
      decisions: [
        'Manifest-based asset lookup so image selection is data-driven rather than hard-coded.',
        'Fallback rendering path so a missing or invalid asset degrades gracefully instead of breaking the view.',
        'Mock blockchain state for testing image behavior without depending on live chain data.',
      ],
      features: [
        'React and TypeScript game interface contributions',
        'Manifest-driven image-loading system for game assets',
        'Image fallback behavior for unavailable assets',
        'Component-based frontend development within a monorepo',
      ],
      challenges:
        'Integrating image assets with blockchain-derived world data while keeping the interface resilient to missing or invalid assets.',
      testing: 'Verified game image behavior using mock blockchain state.',
      stack: ['React', 'TypeScript', 'JavaScript', 'Git', 'GitHub', 'Monorepo'],
      githubUrl: null,
      demoUrl: null,
      confidentiality: 'private',
      confidentialityNote: 'Professional co-op work — source code is owned by the employer and is not public.',
    },
    {
      id: 'geode-deep-links',
      title: 'Geode Marketplace Deep Links',
      categories: ['professional', 'frontend'],
      icon: 'fas fa-link',
      techSummary: 'React · TypeScript · URL APIs · Routing & state restoration',
      summary:
        'Shareable marketplace links that restore application context, module configuration, and search state so another user reopens the same results.',
      context: 'Geode Marketplace deep-linking feature built during my Software Engineering Co-op.',
      problem:
        'Marketplace searches were difficult to share because another user could not reproduce the same search state directly from a link.',
      objective: 'Create shareable links capable of restoring the relevant application and search context.',
      role: 'Frontend implementation, routing logic, integration, testing, and debugging.',
      solution:
        'Added structured URL parameters with redirect handling, module configuration, and search keyword support, then wired automatic result loading so a shared link reopens the corresponding search.',
      decisions: [
        'Structured URL parameters for application, module, identifier, and keyword values.',
        'Redirect logic extended to interpret those parameters before the destination view renders.',
        'Auto-loading behavior integrated into marketplace reporting and search workflows.',
      ],
      features: [
        'Shareable marketplace search links',
        'Application, module, identifier, and keyword parameter handling',
        'Redirect and routing logic for restored context',
        'Automatic result loading from a shared link',
      ],
      challenges:
        'Mapping a range of URL parameter combinations onto existing routing and reporting workflows without disrupting normal navigation.',
      results: ['Users could share marketplace links that reopened the associated search context.'],
      stack: ['React', 'TypeScript', 'URL API', 'Routing', 'State Restoration', 'Git'],
      githubUrl: null,
      demoUrl: null,
      confidentiality: 'private',
      confidentialityNote: 'Professional co-op work — source code is owned by the employer and is not public.',
    },
    {
      id: 'job-portal',
      title: 'MERN Job Portal',
      categories: ['fullstack', 'cloud'],
      icon: 'fas fa-briefcase',
      techSummary: 'React · Node.js · Express · MongoDB · JWT · node-cron',
      summary:
        'Full-stack recruitment platform with separate recruiter and job-seeker roles, authenticated REST APIs, file uploads, and a scheduled newsletter job.',
      problem:
        'Recruiters and job seekers need different capabilities in one platform: posting and reviewing roles on one side, browsing and applying on the other, without exposing either role to the wrong actions.',
      objective:
        'Build a secure full-stack job portal with role-separated workflows, authenticated APIs, and automated candidate outreach.',
      role: 'Designed and implemented the application end to end — data models, REST API, authentication, frontend pages, and scheduled automation.',
      solution:
        'An Express and MongoDB backend exposes REST endpoints for users, jobs, and applications, protected by JWT authentication with hashed credentials. A React and Vite frontend provides role-aware pages, and a scheduled cron job emails newsletters to candidates.',
      architecture:
        'React (Vite) client → Express REST API → Mongoose models on MongoDB. Cross-cutting concerns are handled by auth, async-error, and error middleware. Cloudinary stores uploaded files; Nodemailer plus node-cron handle scheduled email delivery.',
      decisions: [
        'Mongoose schemas for users, jobs, and applications to keep relationships explicit.',
        'JWT stored in cookies with bcrypt-hashed passwords for authentication.',
        'Centralized error and async-wrapper middleware so controllers stay focused on business logic.',
        'node-cron for scheduled newsletter delivery rather than an external job runner.',
        'Cloudinary for resume and file uploads instead of storing binaries in the database.',
      ],
      features: [
        'Separate recruiter and job-seeker roles',
        'Registration and login with JWT authentication',
        'Job posting, browsing, and application workflows',
        'Resume and file uploads',
        'Scheduled newsletter automation with node-cron',
        'Validation and centralized error handling',
      ],
      challenges:
        'Keeping role-based access consistent across every protected route while sharing a single authentication middleware.',
      security:
        'Passwords hashed with bcrypt, JWT-based session handling, input validation with validator, and configuration supplied through environment variables.',
      stack: ['React', 'Vite', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'bcrypt', 'node-cron', 'Nodemailer', 'Cloudinary'],
      githubUrl: 'https://github.com/Pallavi-Nile-98/Full-Stack-Project-Job-Portal',
      demoUrl: null,
      confidentiality: 'public',
    },
    {
      id: 'crs-database',
      title: 'Course Registration System (CRS)',
      categories: ['database'],
      icon: 'fas fa-database',
      techSummary: 'Oracle · PL/SQL · Relational modeling',
      summary:
        'Relational database system for course registration, implementing enrollment rules, waitlists, and registration windows through PL/SQL packages.',
      problem:
        'Course registration depends on rules that are difficult to enforce in application code alone: class capacity, waitlist ordering, and registration windows must hold even under concurrent requests.',
      objective:
        'Model the registration domain relationally and enforce its business rules inside the database itself.',
      role: 'Designed the relational schema, implemented PL/SQL packages, and defined test cases.',
      solution:
        'An Oracle schema models students, courses, sections, and registrations, with PL/SQL packages encapsulating the registration workflow so capacity, waitlist, and timing rules are enforced at the data layer.',
      decisions: [
        'Business rules implemented as stored procedures and packages rather than in application code.',
        'Transactional handling so registration and waitlist changes stay consistent.',
        'Role-based database security to separate student, instructor, and administrative access.',
      ],
      features: [
        'Relational schema for course registration',
        'Class capacity enforcement',
        'Waitlist rules and ordering',
        'Registration-window validation',
        'PL/SQL packages and stored procedures',
        'Role-based database security',
      ],
      challenges:
        'Maintaining transactional consistency between enrollment and waitlist state when capacity limits are reached.',
      testing: 'Test cases written to exercise capacity limits, waitlist promotion, and registration-window boundaries.',
      stack: ['Oracle', 'PL/SQL', 'SQL', 'Relational Modeling', 'Database Security'],
      githubUrl: null,
      demoUrl: null,
      confidentiality: 'source-unavailable',
      confidentialityNote: 'Academic project — source is not published publicly. Available on request.',
    },
    {
      id: 'asl-recognition',
      title: 'Sign Language Recognition System',
      categories: ['ai'],
      icon: 'fas fa-hands',
      techSummary: 'Python · TensorFlow · CNN · OpenCV · Flask',
      summary:
        'Real-time American Sign Language gesture classifier served through a Flask API, with an automated preprocessing and tuning pipeline.',
      problem:
        'Sign language users lack real-time translation tools that work from an ordinary camera feed without specialised hardware.',
      objective:
        'Classify American Sign Language gestures in real time from a live video stream.',
      role: 'Built the dataset pipeline, trained the model, and deployed the inference API.',
      solution:
        'A convolutional neural network trained on augmented and normalised gesture data, with OpenCV handling live frame capture and a Flask API serving predictions for real-time translation.',
      decisions: [
        'CNN architecture for gesture classification from image frames.',
        'Augmentation and normalisation applied to improve generalisation.',
        'Flask API chosen to serve live inference to clients.',
        'TensorFlow GPU acceleration used to reduce inference latency.',
      ],
      features: [
        'Real-time ASL gesture classification',
        'OpenCV live video frame processing',
        'Flask API for live translation',
        'Automated preprocessing and model tuning pipeline',
      ],
      results: [
        '95% validation accuracy on the gesture classification task.',
        'Inference latency reduced by 25% using TensorFlow GPU acceleration.',
      ],
      stack: ['Python', 'TensorFlow', 'CNN', 'OpenCV', 'Flask', 'NumPy'],
      githubUrl: null,
      demoUrl: null,
      confidentiality: 'source-unavailable',
      confidentialityNote: 'Academic project — source is not published publicly. Available on request.',
    },
    {
      id: 'mindvault',
      title: 'MindVault',
      categories: ['fullstack', 'frontend'],
      icon: 'fas fa-note-sticky',
      techSummary: 'React · Vite · Tailwind CSS · Firebase',
      summary:
        'Note-taking application with Firebase authentication and Firestore persistence, structured for a retrieval-based assistant currently in development.',
      problem:
        'Personal notes accumulate faster than they can be reorganised, so finding a specific detail later means scrolling rather than searching.',
      objective:
        'Build an authenticated note-taking application with a foundation for retrieval-based question answering over a user\'s own notes.',
      role: 'Sole developer — authentication, data layer, UI, and deployment configuration.',
      solution:
        'A React and Vite single-page application with Tailwind styling, Firebase Authentication for accounts, and a Firestore-backed notes service supporting create, read, update, and delete operations.',
      architecture:
        'React SPA with a React Context auth provider, route-level pages, and a dedicated notes service module that isolates all Firestore access from the UI components.',
      decisions: [
        'React Context for authentication state so route guards stay declarative.',
        'A dedicated notes service module so Firestore access is isolated from components.',
        'Firebase Authentication and Firestore to avoid running a separate backend for a single-user workload.',
      ],
      features: [
        'Email and password authentication',
        'Create, edit, and delete notes',
        'Protected dashboard routes',
        'Responsive Tailwind interface',
      ],
      status: 'In development — the retrieval-based assistant interface is built, but the retrieval backend is not yet implemented.',
      stack: ['React', 'Vite', 'Tailwind CSS', 'Firebase Auth', 'Firestore', 'React Router'],
      githubUrl: 'https://github.com/Pallavi-Nile-98/MindVault-AI',
      demoUrl: null,
      confidentiality: 'public',
    },
    {
      id: 'ci-cd-pipeline',
      title: 'Node.js CI/CD Pipeline',
      categories: ['cloud'],
      icon: 'fas fa-arrows-rotate',
      techSummary: 'GitHub Actions · Node.js · Automated testing',
      summary:
        'A GitHub Actions workflow that installs dependencies and runs the unit test suite on every push and pull request to main.',
      problem:
        'Tests only protect a codebase if they run automatically; relying on contributors to run them locally means regressions reach the main branch.',
      objective: 'Automate dependency installation and test execution for a Node.js project.',
      role: 'Authored the workflow and the accompanying unit tests.',
      solution:
        'A GitHub Actions pipeline triggered on pushes and pull requests to main, which checks out the repository, provisions Node.js 18, installs dependencies, and runs the test suite as a required step.',
      decisions: [
        'Triggered on both push and pull request so regressions surface before merge.',
        'Pinned Node.js 18 via actions/setup-node for reproducible runs.',
        'Test execution treated as a gating step rather than an advisory one.',
      ],
      features: [
        'Automated builds on push and pull request',
        'Node.js 18 environment provisioning',
        'Dependency installation and unit test execution',
      ],
      testing: 'Unit tests run automatically as the gating step of the pipeline.',
      stack: ['GitHub Actions', 'Node.js', 'YAML', 'Unit Testing'],
      githubUrl: 'https://github.com/Pallavi-Nile-98/ci-cd-demo',
      demoUrl: null,
      confidentiality: 'public',
    },
  ],

  navigation: [
    { id: 'home', label: 'Home', href: '#home' },
    { id: 'about', label: 'About', href: '#about' },
    { id: 'experience', label: 'Experience', href: '#experience' },
    { id: 'projects', label: 'Work', href: '#projects' },
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
