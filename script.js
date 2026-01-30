// Navigation scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.timeline-item, .project-card, .skill-category, .contact-item');
animateElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add active class to nav links on click
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        navLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
    });
});

// Form validation (if contact form is added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// AI Chatbot Functionality
const chatbotContainer = document.getElementById('chatbotContainer');
const chatToggleBtn = document.getElementById('chatToggleBtn');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');
const chatbotMessages = document.getElementById('chatbotMessages');

// Knowledge base about Pallavi
const knowledgeBase = {
    skills: ['Python', 'React.js', 'Node.js', 'Express.js', 'MongoDB', 'PostgreSQL', 'AWS', 'TypeScript', 'Rust', 'Blockchain', 'AI/ML', 'DevOps', 'Docker', 'Terraform', 'GitHub Actions', 'CI/CD'],
    experience: {
        current: {
            role: 'Software Engineering Co-Op',
            company: 'The Geode Foundation',
            duration: 'Jan 2026 - Present',
            tech: ['React', 'TypeScript', 'PostgreSQL', 'Rust', 'Blockchain', 'Node.js', 'Express.js', 'AWS']
        },
        previous: [
            {
                role: 'AWS DevOps Engineer',
                company: 'Sumago Infotech',
                duration: 'Jul 2023 - Oct 2023',
                tech: ['AWS', 'DevOps', 'Docker', 'Terraform', 'CI/CD']
            },
            {
                role: 'Full Stack Development',
                company: 'Sumago Infotech',
                duration: 'Sep 2021 - Apr 2022',
                tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB']
            }
        ]
    },
    education: {
        masters: {
            degree: 'Master of Science in Management Information Systems',
            school: 'Northeastern University',
            duration: 'Sep 2024 - Dec 2026',
            gpa: '3.5'
        },
        bachelors: {
            degree: 'Bachelor of Engineering in Computer Science',
            school: 'Amrutvahini College of Engineering',
            duration: 'Jul 2019 - Jul 2023',
            grade: 'A'
        }
    },
    projects: [
        {
            name: 'Gesture-Based Messaging & Video Calling App',
            tech: ['Python', 'OpenCV', 'Deep Learning', 'CNN', 'JavaScript'],
            description: 'AI-powered sign language recognition app for deaf and mute users'
        },
        {
            name: 'Geode Link Router',
            tech: ['Node.js', 'Express', 'LLM Integration'],
            description: 'AI-driven routing microservice for blockchain dApps'
        },
        {
            name: 'Job Portal Web Application',
            tech: ['MERN Stack', 'AWS EC2'],
            description: 'Full-stack job portal with authentication and role-based access'
        }
    ],
    location: 'Boston, MA',
    email: 'nilepallavi98@gmail.com',
    phone: '(857) 930-8230'
};

// Chatbot responses
function getBotResponse(userMessage) {
    const message = userMessage.toLowerCase().trim();
    
    // Greetings
    if (message.match(/hi|hello|hey|greetings/)) {
        return "Hello! 👋 I'm here to help you learn about Pallavi's skills, experience, and projects. What would you like to know?";
    }
    
    // Skills questions
    if (message.match(/skill|technology|tech|what can|what does|expertise/)) {
        return `Pallavi is skilled in: ${knowledgeBase.skills.slice(0, 10).join(', ')}, and more! She specializes in Full-Stack Development, AI/ML, Cloud & DevOps. Would you like to know about her experience with any specific technology?`;
    }
    
    // Experience questions
    if (message.match(/experience|work|job|position|role|current|where does|company/)) {
        if (message.match(/current|now|present/)) {
            return `Pallavi is currently working as a ${knowledgeBase.experience.current.role} at ${knowledgeBase.experience.current.company} (${knowledgeBase.experience.current.duration}). She's working with ${knowledgeBase.experience.current.tech.join(', ')} and contributing to blockchain and AI-driven applications.`;
        }
        return `Pallavi has experience as:\n1. ${knowledgeBase.experience.current.role} at ${knowledgeBase.experience.current.company} (Current)\n2. ${knowledgeBase.experience.previous[0].role} at ${knowledgeBase.experience.previous[0].company}\n3. ${knowledgeBase.experience.previous[1].role} at ${knowledgeBase.experience.previous[1].company}`;
    }
    
    // Education questions
    if (message.match(/education|degree|university|college|study|student|gpa|grade/)) {
        return `Pallavi is pursuing a ${knowledgeBase.education.masters.degree} at ${knowledgeBase.education.masters.school} (${knowledgeBase.education.masters.duration}, GPA: ${knowledgeBase.education.masters.gpa}). She completed her ${knowledgeBase.education.bachelors.degree} from ${knowledgeBase.education.bachelors.school} (${knowledgeBase.education.bachelors.duration}, Grade: ${knowledgeBase.education.bachelors.grade}).`;
    }
    
    // Project questions
    if (message.match(/project|work on|built|developed|app|application/)) {
        const projectsList = knowledgeBase.projects.map((p, i) => `${i + 1}. ${p.name} - ${p.description}`).join('\n');
        return `Pallavi has worked on several projects:\n${projectsList}\n\nWould you like details about any specific project?`;
    }
    
    // Contact questions
    if (message.match(/contact|email|phone|reach|connect|linkedin/)) {
        return `You can reach Pallavi at:\n📧 Email: ${knowledgeBase.email}\n📱 Phone: ${knowledgeBase.phone}\n📍 Location: ${knowledgeBase.location}\n💼 LinkedIn: linkedin.com/in/pallavi-nile`;
    }
    
    // AI/ML questions
    if (message.match(/ai|artificial intelligence|machine learning|ml|neural|llm|openai/)) {
        return "Pallavi has experience with AI and Machine Learning! She's worked with LLMs, OpenAI API, Neural Networks, TensorFlow, and has built AI-powered applications including sign language recognition using CNNs and AI-driven routing systems.";
    }
    
    // Blockchain questions
    if (message.match(/blockchain|geode|crypto|web3/)) {
        return "Pallavi is currently working with blockchain technology at The Geode Foundation! She's developing blockchain and AI-driven applications, working with Rust, and building microservices for distributed dApps.";
    }
    
    // Default responses
    if (message.match(/help|what can|how can/)) {
        return "I can tell you about:\n• Pallavi's skills and technologies\n• Her work experience\n• Education background\n• Projects she's worked on\n• Contact information\n• AI/ML and Blockchain expertise\n\nJust ask me anything!";
    }
    
    // Fallback
    const fallbacks = [
        "That's an interesting question! Could you be more specific? I can tell you about Pallavi's skills, experience, education, projects, or contact info.",
        "I'm not sure I understand. Try asking about her skills, experience, projects, or education!",
        "Let me help you better! You can ask about:\n• What skills does Pallavi have?\n• What is her current role?\n• Tell me about her projects\n• What is her education background?"
    ];
    return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

// Add message to chat
function addMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = `<i class="fas ${isUser ? 'fa-user' : 'fa-robot'}"></i>`;
    
    const content = document.createElement('div');
    content.className = 'message-content';
    const p = document.createElement('p');
    p.textContent = text;
    content.appendChild(p);
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    chatbotMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Send message
function sendMessage() {
    const message = chatbotInput.value.trim();
    if (!message) return;
    
    // Add user message
    addMessage(message, true);
    chatbotInput.value = '';
    
    // Simulate thinking delay
    setTimeout(() => {
        const response = getBotResponse(message);
        addMessage(response);
    }, 500);
}

// Toggle chatbot
chatToggleBtn.addEventListener('click', () => {
    chatbotContainer.classList.toggle('active');
});

chatbotClose.addEventListener('click', () => {
    chatbotContainer.classList.remove('active');
});

// Send on button click
chatbotSend.addEventListener('click', sendMessage);

// Send on Enter key
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Console message
console.log('%c👋 Hello! Thanks for checking out my portfolio.', 'color: #FF6B35; font-size: 16px; font-weight: bold;');
console.log('%cFeel free to reach out if you\'d like to collaborate!', 'color: #6b7280; font-size: 14px;');
console.log('%c💬 Try the "Chat with Me" feature to learn more about my skills!', 'color: #FF6B35; font-size: 14px;');