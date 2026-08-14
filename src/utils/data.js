export const skillsData = {
  "Languages": ["Java", "Python", "C", "SQL", "JavaScript"],
  "Frontend": ["React", "HTML", "CSS", "Bootstrap"],
  "Backend": ["Spring Boot", "REST APIs"],
  "Database": ["MySQL", "SQL", "Database Design", "CRUD Operations"],
  "Tools": ["Git", "GitHub", "IntelliJ IDEA", "VS Code"],
  "Core CS": ["Data Structures", "Algorithms", "Object-Oriented Programming (OOP)", "DBMS", "Agile Development", "Unit Testing"]
};

export const experienceData = [
  {
    role: "Full Stack Java Intern",
    company: "Ether Services",
    duration: "30 Apr 2026 – 03 Jun 2026",
    description: "Acquired hands-on exposure and practical skills in Full Stack Java development. Developed and optimized backend endpoints, managed data tables, and integrated dynamic user interfaces.",
    highlights: ["Full Stack Java", "Spring Boot", "React", "MySQL", "REST APIs", "ISO 9001:2015 Certified"],
    image: "/certs/ether_services_working.jpg",
    images: [
      {
        src: "/certs/ether_services_working.jpg",
        title: "Development Workstation",
        date: "11 May 2026",
        location: "Ether Services Office, Coimbatore"
      },
      {
        src: "/certs/ether_services_team.jpg",
        title: "Team Collaboration",
        date: "03 Jun 2026",
        location: "Incubation Center, Coimbatore"
      },
      {
        src: "/certs/pofitech_working.jpg",
        title: "Coding Session",
        date: "08 May 2026",
        location: "POFI Technologies, Coimbatore"
      },
      {
        src: "/certs/appin_lab.jpg",
        title: "Training Center Visit",
        date: "08 May 2026",
        location: "Appin Technology Lab, Coimbatore"
      }
    ],
    certificates: [
      {
        src: "/certs/ether_services_cert.jpg",
        title: "Internship Completion Certificate",
        date: "03 Jun 2026",
        location: "Ether Services Office, Coimbatore"
      },
      {
        src: "/certs/ether_services_internship.jpg",
        title: "Internship Attendance Certificate",
        date: "03 Jun 2026",
        location: "Ether Services Office, Coimbatore"
      }
    ],
    certificate: "/certs/ether_services_cert.jpg",
    type: "internship"
  },
  {
    role: "B.Tech Information Technology Student",
    company: "Sri Krishna College of Technology",
    duration: "2024 – 2028",
    description: "Maintaining a CGPA of 8.03/10 while actively participating in hackathons and building technical projects.",
    highlights: ["DevHack 2026 Participant", "Smart India Hackathon (SIH) 2025 Participant", "223+ day coding streak on LeetCode"]
  }
];
export const certsData = [
  {
    title: "AWS Cloud Practitioner Essentials",
    issuer: "AWS Training & Certification",
    link: "/certs/aws_cloud_practitioner.png",
    image: "/certs/aws_cloud_practitioner.png"
  },
  {
    title: "Java Full Stack Bootcamp: Industry Edition",
    issuer: "Botkov.AI",
    link: "/certs/botkov_java_bootcamp.jpg",
    image: "/certs/botkov_java_bootcamp.jpg"
  },
  {
    title: "Placement Training Certificate",
    issuer: "Botkov.AI",
    link: "/certs/botkov_placement.jpg",
    image: "/certs/botkov_placement.jpg"
  },
  {
    title: "Internship Attendance Certificate",
    issuer: "Ether Services",
    link: "/certs/ether_services_internship.jpg",
    image: "/certs/ether_services_internship.jpg"
  },
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
    title: "EvoDrive",
    description: "Real-time AI-powered vehicle experience and legacy platform built for Tata electric vehicles.",
    longDescription: "EvoDrive transforms raw sensor telemetry from electric vehicles into structured driving profiles, building a living AutoDNA profile per vehicle and preserving a permanent Vehicle Legacy that survives ownership changes. Built for the Tata Hackathon 2026.",
    features: [
      "Living AutoDNA profile for safety scoring, wear indexing, and evolution tracking",
      "Experience Engine classifying thermal stress, battery degradation, and eco-cruising",
      "Driver DNA clustering (Eco, Smooth, Aggressive, Mountain, Night Driver)",
      "Real-time vehicle telemetry streaming using WebSocket STOMP protocol",
      "ONNX-based machine learning model inference for style classification"
    ],
    technologies: ["Java", "Spring Boot", "Machine Learning", "WebSocket", "PostgreSQL", "Full-Stack"],
    githubUrl: "https://github.com/Stark1645/Evodrive",
    liveUrl: "https://evodrive-sand.vercel.app",
    image: "/projects/evodrive.png"
  },
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
    title: "SHIELD",
    description: "Autonomous Cybersecurity War Room powered by a multi-agent threat containment system.",
    longDescription: "An enterprise-grade cybersecurity war room powered by an autonomous multi-agent system. It automates threat detection, dynamically evaluates risk scores, tracks multi-stage attack chains, monitors real-time JVM system metrics, and uses Isolation Forest ML models to auto-remediate security threats.",
    features: [
      "6 autonomous defense agents performing real-time threat isolation and remediation",
      "Real-time JVM, CPU, and memory system health dashboard",
      "AI Threat Prediction Engine forecasting future security vectors",
      "ML anomaly detection using FastAPI and Isolation Forest models",
      "Advanced threat geolocation and frequency tracking grids"
    ],
    technologies: ["React", "Spring Boot", "FastAPI", "Machine Learning", "Full-Stack", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/Stark1645/S.H.I.E.L.D.",
    liveUrl: "https://s-h-i-e-l-d-gilt.vercel.app",
    image: "/projects/shield.png"
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
    liveUrl: "https://homeflameuh-final-1.onrender.com/",
    image: "/projects/homeflame.jpg"
  },
  {
    title: "EcoClean",
    description: "On-demand booking platform for eco-friendly home cleaning services with integrated Gemini AI assistant.",
    longDescription: "EcoClean is an on-demand service booking application that connects users with verified, eco-friendly cleaning professionals. It features slot booking logic, localized cleaner profiles, and integrates Google's Gemini GenAI API to provide cost estimation, cleaning advice, and customized requests.",
    features: [
      "Interactive booking system with real-time slot scheduling and cleaner matching",
      "Verified cleaner profiles showing ratings, completed jobs, and specialties",
      "AI assistant (Gemini API) for cleaning advice, cost estimation, and support",
      "Location-based filter mapping cleaners across different metropolitan cities"
    ],
    technologies: ["React", "TypeScript", "Google GenAI", "Tailwind CSS", "Vite", "Full-Stack"],
    githubUrl: "https://github.com/Stark1645/HOME-CLEANING-SERVICE-APP",
    liveUrl: "#",
    image: "/projects/ecoclean.png"
  },
  {
    title: "AgriSmart",
    description: "IoT-driven smart farming dashboard for precision agriculture, crop planning, and drone tracking.",
    longDescription: "AgriSmart is an IoT-based precision agriculture dashboard. It connects smart agricultural sensors to track soil moisture, plan precision irrigation, detect crop pests, monitor drone routes, analyze historical yields, and track real-time market prices.",
    features: [
      "IoT sensor telemetry monitoring for precision farming and moisture tracking",
      "Crop planning guides and smart irrigation recommendations",
      "Pest detection alerts and drone route visualizers",
      "Real-time crop market price index integration"
    ],
    technologies: ["React", "IoT", "JavaScript", "Full-Stack", "CSS"],
    githubUrl: "https://github.com/Stark1645/AgriSmart-Smart_farming",
    liveUrl: "#",
    image: "/projects/agrismart.png",
    status: "Under Development"
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
  }
];

export const eventsData = [
  {
    title: "OTT Content Security Presentation",
    location: "Kuniyamuthur, Coimbatore",
    description: "Seminar presentation on how Netflix & Amazon Prime protect streaming content using AES encryption, block cipher modes, DRM, and secure delivery. (29.07.2026)",
    image: "/events/ott_security_seminar.jpg"
  },
  {
    title: "Containerization Using Docker Presentation",
    location: "Kuniyamuthur, Coimbatore",
    description: "Delivering a technical presentation on Containerization using Docker, covering container management, isolated environments, and modern DevOps workflows. (07.07.2026)",
    image: "/events/docker_containerization_seminar.png",
    tag: "Solo Presentation"
  },
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

export const blogData = [
  {
    title: "Mastering Spring Boot: A Beginner's Guide",
    date: "March 15, 2026",
    excerpt: "Learn the fundamentals of building robust backend systems and REST APIs with Spring Boot and Java.",
    readTime: "5 min read",
    tags: ["Spring Boot", "Java", "Backend"]
  },
  {
    title: "Understanding RESTful APIs",
    date: "February 28, 2026",
    excerpt: "A deep dive into REST architectural constraints and how to design scalable and maintainable APIs.",
    readTime: "7 min read",
    tags: ["APIs", "Web Dev", "Architecture"]
  },
  {
    title: "Problem Solving Strategies in Competitive Programming",
    date: "January 14, 2026",
    excerpt: "How maintaining a 223+ days LeetCode streak improved my logical thinking and coding efficiency.",
    readTime: "4 min read",
    tags: ["Problem Solving", "LeetCode", "Algorithms"]
  }
];
