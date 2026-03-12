export const skillsData = {
  "Languages": ["Java", "Python", "C", "SQL", "JavaScript"],
  "Frameworks": ["Spring Boot", "React"],
  "Tools": ["Git", "GitHub", "MySQL", "IntelliJ IDEA", "VS Code"],
  "Concepts": ["Data Structures", "OOP", "REST APIs"]
};

export const experienceData = [
  {
    role: "B.Tech Information Technology Student",
    company: "Sri Krishna College of Technology",
    duration: "2024 – 2028",
    description: "Maintaining a CGPA of 7.91/10 while actively participating in hackathons and building technical projects.",
    highlights: ["DevHack 2026 Participant", "Smart India Hackathon (SIH) 2025 Participant", "70+ day coding streak on LeetCode"]
  }
];
export const certsData = [
  {
    title: "Algorithm Design Techniques",
    issuer: "iamneo",
    link: "/certs/algorithm_design.jpg",
    image: "/certs/algorithm_design.jpg"
  },
  {
    title: "Build Your Own GPT Workshop",
    issuer: "Sri Eshwar THIRAN 2026",
    link: "/certs/gpt_workshop.jpg",
    image: "/certs/gpt_workshop.jpg"
  },
  {
    title: "IBM Java Developer Professional Certificate",
    issuer: "Coursera",
    link: "https://coursera.org/verify/professional-cert/DWPFNO5REIVW",
    image: "/certs/ibm_java.png"
  },
  {
    title: "Crash Course on Python",
    issuer: "Google",
    link: "https://coursera.org/verify/AX1A5NE480V7",
    image: "/certs/google_python.png"
  },
  {
    title: "SQL: A Practical Introduction for Querying Databases",
    issuer: "IBM",
    link: "https://coursera.org/verify/9ENTK0VK90II",
    image: "/certs/ibm_sql.png"
  },
  {
    title: "Getting Started with Git and GitHub",
    issuer: "IBM",
    link: "https://coursera.org/verify/PXX6EARK7EKM",
    image: "/certs/ibm_git.png"
  }
];

export const projectsData = [
  {
    title: "ExplainFirst",
    description: "AI learning evaluation platform that evaluates student explanations using Gemini API.",
    longDescription: "ExplainFirst is an innovative educational tool designed to test high-level understanding. Instead of multiple-choice questions, it asks students to explain concepts in their own words. The system uses Google's Gemini AI to analyze these explanations, identify gaps in knowledge, and provide personalized feedback.",
    features: [
      "AI-driven explanation analysis using Gemini Pro",
      "Dynamic follow-up questions to probe deeper understanding",
      "Teacher dashboard for monitoring student progress",
      "Real-time feedback and knowledge gap identification"
    ],
    technologies: ["React", "Spring Boot", "Gemini API", "REST API", "Tailwind CSS"],
    githubUrl: "https://github.com/Stark1645/explainfirstuh-working",
    liveUrl: "#",
    image: "/projects/explainfirst.jpg"
  },
  {
    title: "HomeFlame",
    description: "Full-stack web application for a premium chef-led cloud kitchen service.",
    longDescription: "HomeFlame is a comprehensive platform for a Cloud Kitchen business. It streamlines the process of ordering gourmet meals prepared by professional chefs. The application handles menu management, secure order processing, and real-time delivery tracking, ensuring a premium culinary experience from kitchen to table.",
    features: [
      "Dynamic menu management for chefs",
      "Secure user authentication and profile management",
      "Order tracking and status updates",
      "Integrated payment gateway simulation"
    ],
    technologies: ["React", "Spring Boot", "MySQL", "Full-Stack", "JWT"],
    githubUrl: "https://github.com/Stark1645/HomeFlameuh-Final",
    liveUrl: "#",
    image: "/projects/homeflame.jpg"
  },
  {
    title: "Asset Tracking API",
    description: "Enterprise-grade REST APIs for tracking organizational assets and their lifecycle.",
    longDescription: "A specialized backend solution for large organizations to track the procurement, assignment, and maintenance of hardware and software assets. Built with security in mind, it provides a centralized system for IT administrators to manage inventory and ensure accountability.",
    features: [
      "Comprehensive CRUD operations for asset management",
      "Role-based access control (RBAC)",
      "Automated maintenance alerts and logs",
      "JWT-based secure API endpoints"
    ],
    technologies: ["Spring Boot", "MySQL", "JWT", "REST API", "Hibernate"],
    githubUrl: "#",
    liveUrl: "#"
  },
  {
    title: "SHIELD",
    description: "Advanced authentication and threat defense system for web applications.",
    longDescription: "SHIELD is a security-focused application layer that provides automated threat defense for modern web apps. It implements multi-factor authentication, session monitoring, and real-time security logging to protect user data against common vulnerabilities like XSS and Brute Force attacks.",
    features: [
      "Advanced JWT authentication layer",
      "Real-time security threat monitoring",
      "Automated session invalidation on suspicious activity",
      "Comprehensive security event logging"
    ],
    technologies: ["React", "Spring Boot", "Security", "Full-Stack", "Docker"],
    githubUrl: "https://github.com/Stark1645/S.H.I.E.L.D.",
    liveUrl: "#",
    image: "/projects/shield.png"
  }
];

export const eventsData = [
  {
    title: "Build Your Own GPT Workshop",
    location: "Sri Eshwar College Of Engineering",
    description: "Collaborated with team to build custom AI agents and GPT models at 'THIRAN 2026'. (05.02.2026)",
    image: "/events/thiran_backdrop.jpg"
  },
  {
    title: "App & Web Showcase",
    location: "SKCT Incubation Center",
    description: "Showcasing our full-stack application architecture and backend systems to mentors. (31.01.2026)",
    image: "/events/workshop_thiran.jpg"
  },
  {
    title: "Team Byte Fyre",
    location: "Innovation Lab",
    description: "Intense brainstorming and development session with my team 'Byte Fyre'.",
    image: "/events/bytefyre_lab.jpg"
  },
  {
    title: "Project Review & Mentorship",
    location: "Kovaipudur, Tamil Nadu",
    description: "Presenting project progress and receiving industry-expert feedback during a technical review. (17.09.2025)",
    image: "/events/kovaipudur_event.jpg"
  }
];

