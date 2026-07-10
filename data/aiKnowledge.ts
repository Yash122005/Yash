export interface ProjectDetail {
  title: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  challenges: string;
  learnings: string;
  github: string;
  demo: string;
}

export interface AIKnowledgeBase {
  name: string;
  role: string;
  tagline: string;
  aboutMe: string;
  email: string;
  githubUrl: string;
  linkedinUrl: string;
  resumeUrl: string;
  education: {
    institution: string;
    degree: string;
    timeline: string;
    details: string;
  }[];
  skills: {
    category: string;
    items: string[];
  }[];
  projects: ProjectDetail[];
  experience: {
    role: string;
    organization: string;
    timeline: string;
    details: string[];
  }[];
  hackathons: {
    title: string;
    achievement: string;
    date: string;
    team: string;
    project: string;
    details: string;
  }[];
  achievements: string[];
  futureGoals: string;
  whyHireMe: string;
}

export const aiKnowledge: AIKnowledgeBase = {
  name: "Yash Gupta",
  role: "Creative Full-Stack Developer & Robotics Enthusiast",
  tagline: "Pushing the boundaries of the modern web with high-performance animations and seamless user experiences.",
  aboutMe: "I am a passionate full-stack developer who loves turning ideas into fast, polished web experiences—from responsive interfaces to reliable APIs and everything in between. My journey in tech is driven by clean code, thoughtful UX, and solving real problems. I focus on building accessible, performant products with precision and creativity.",
  email: "yashvinodgupta6@gmail.com",
  githubUrl: "https://github.com/Yash122005",
  linkedinUrl: "https://www.linkedin.com/in/yash-gupta-8a8594283/",
  resumeUrl: "https://drive.google.com/file/d/1WZaYpbm0SQVhPN-S4k4ihizEh8WqHaxi/view?usp=sharing",
  education: [
    {
      institution: "Birla Institute of Technology (BIT), Mesra, Ranchi",
      degree: "Bachelor of Technology (B.Tech) in Computer Science & Engineering",
      timeline: "2023 - 2027",
      details: "Pursuing engineering. Focusing on algorithms, systems design, software engineering, and robotics integration. Active member of Value Education Cell web team."
    }
  ],
  skills: [
    {
      category: "Frontend",
      items: ["React.js", "Next.js", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "HTML5", "CSS3", "Redux Toolkit", "Bootstrap"]
    },
    {
      category: "Backend & Databases",
      items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "Supabase", "RESTful APIs"]
    },
    {
      category: "Developer Tools & DevOps",
      items: ["Git", "GitHub", "Docker", "Postman", "Figma"]
    },
    {
      category: "Robotics & Hardware",
      items: ["ROS (Robot Operating System)", "Arduino", "Raspberry Pi", "ESP8266 / ESP32 microcontrollers", "C++", "C", "MQTT protocol"]
    }
  ],
  projects: [
    {
      title: "InterviewIQ",
      problem: "Traditional online hiring is prone to cheating and lacks structural assessment, while mock interview preparation rarely simulates real stress.",
      solution: "An AI-powered remote interview and hiring platform featuring security safeguards and conversational AI evaluating flows.",
      features: [
        "Multiple face detection via webcam to verify identity and detect proxy candidates.",
        "Proctoring alerts for browser tab-switching and copy-paste activities.",
        "Smart AI interviewer that adjusts question depth and asks contextual follow-up questions.",
        "Voice-based interview inputs for verbal responses.",
        "Detailed PDF evaluation report generated instantly with one-click."
      ],
      techStack: ["React.js", "Vite", "Node.js", "Express.js", "MongoDB", "Gemini AI API", "WebRTC / Media Streams"],
      challenges: "Implementing robust real-time proctoring event listeners and syncing them with state during multi-stage webcam analysis without compromising web performance.",
      learnings: "Learned to prioritize MVP features, optimize real-time media feeds, and build contextual AI conversation nodes under strict hackathon deadlines.",
      github: "https://github.com/Yash122005/AI_INTERVIEWER",
      demo: "https://ai-interviewer-ayqc.vercel.app/"
    },
    {
      title: "BFIT",
      problem: "Gym goers and home workout enthusiasts lack direct posture feedback, leading to physical injuries or incorrect repetitions.",
      solution: "An intelligent, browser-based AI fitness assistant that tracks workout postures and counts repetitions using real-time computer vision.",
      features: [
        "Real-time rep counting for common exercises like squats, pushups, and bicep curls.",
        "Interactive posture correction overlay to guide user joint alignment.",
        "Performance dashboard showing streak tracking and workout summaries.",
        "Audio feedback to prompt posture adjustments dynamically."
      ],
      techStack: ["React.js", "Tailwind CSS", "MediaPipe Pose", "TensorFlow.js", "Express.js", "MongoDB"],
      challenges: "Optimizing the pose detection inference loop on client-side browsers to maintain a steady 60 FPS frame rate on low-end mobile devices.",
      learnings: "Mastered canvas drawing operations, client-side ML model loading, and mathematical angle calculations for joint positions.",
      github: "https://github.com/Yash122005/BFIT",
      demo: "https://bfit-fitness.vercel.app/"
    },
    {
      title: "HirePoint",
      problem: "Standard job portals are cluttered and fail to match technical skills effectively with job descriptions.",
      solution: "A dynamic job portal web application that connects tech candidates and recruiters with direct matching flows.",
      features: [
        "Secure job application workflows with customized candidate dashboards.",
        "Fine-grained recruiter panels to post listings and manage applications.",
        "Integration of Supabase Row Level Security (RLS) to safeguard user records.",
        "Instant user profile synchronization and authentication."
      ],
      techStack: ["React.js", "Supabase", "Clerk Authentication", "Tailwind CSS"],
      challenges: "Configuring complex multi-tenant database policies in Supabase to strictly isolate recruiter resources from applicant records.",
      learnings: "Acquired deep understanding of database schema design, serverless backend-as-a-service (BaaS) platforms, and state-of-the-art authentication providers.",
      github: "https://github.com/Yash122005/HirePoint",
      demo: "https://hire-point-fs27.vercel.app/"
    },
    {
      title: "Value Education Cell Website",
      problem: "Campus organizations at BIT Mesra like the Value Education Cell (VEC) and Vivekananda Study Circle (VSC) had no centralized digital platform for announcements, newsletters, and registrations.",
      solution: "The official, SEO-optimized, highly accessible multi-page web platform for VEC BIT Mesra.",
      features: [
        "Newsletter archive containing all published magazines and materials.",
        "Event coordination board showing upcoming and active registrations.",
        "SEO-friendly header tags and optimized bundle delivery.",
        "Clean, responsive dark layout adhering to WCAG accessibility principles."
      ],
      techStack: ["React.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
      challenges: "Maintaining fast page-load speeds while loading high-resolution image galleries and archival PDFs.",
      learnings: "Gained proficiency in production-grade SEO, structured typography hierarchies, and creating reusable component architectures.",
      github: "https://github.com/Yash122005/Value-Education-Cell---BITM",
      demo: "https://value-education-cell-bitm.vercel.app/"
    },
    {
      title: "Robotics Projects",
      problem: "Performing surveillance and mapping operations in hazardous environments is dangerous for humans and expensive for standard robots.",
      solution: "Designed and constructed an autonomous mobile surveillance rover equipped with sensors and mapping capabilities.",
      features: [
        "Obstacle avoidance routines and automatic path planning.",
        "Live video streams and telemetry feed back to a remote monitoring board.",
        "Sensor fusion combining ultrasonic and LIDAR measurements."
      ],
      techStack: ["ROS (Robot Operating System)", "Arduino", "Raspberry Pi", "Python", "C++"],
      challenges: "Synchronizing high-frequency sensor readings with motor command controllers over high-latency wireless local networks.",
      learnings: "Learned hardware debugging, PID controller calibration, and programming asynchronous pub-sub nodes in ROS.",
      github: "https://github.com/Yash122005/Robotics-Projects",
      demo: "https://github.com/Yash122005/Robotics-Projects"
    },
    {
      title: "Embedded Systems Projects",
      problem: "Smart home automation and microclimatic tracking require low-cost, low-power microcontrollers communicating reliably over long distances.",
      solution: "Developed custom smart micro-controller nodes (such as weather stations and automated electrical grid controllers).",
      features: [
        "Low-power deep sleep cycles to maximize battery life.",
        "Real-time sensor reads (e.g. DHT11 for temperature/humidity) pushed to clouds.",
        "Smart network re-association to handle unstable WiFi connections."
      ],
      techStack: ["C", "C++", "ESP8266 / ESP32", "Arduino IDE", "MQTT Protocol"],
      challenges: "Optimizing memory usage and managing dynamic allocations on hardware platforms with only 80KB of RAM.",
      learnings: "Mastered low-level communication protocols (I2C, SPI, UART), interrupt handling routines, and socket-based MQTT messaging.",
      github: "https://github.com/Yash122005/Embedded-Systems",
      demo: "https://github.com/Yash122005/Embedded-Systems"
    }
  ],
  experience: [
    {
      role: "Core Web Team Lead & Developer",
      organization: "Value Education Cell (VEC), BIT Mesra",
      timeline: "2024 - Present",
      details: [
        "Spearheaded design and deployment of the official multi-page react portal.",
        "Implemented performance improvements, resulting in faster visual load times.",
        "Configured accessibility features to enable all campus students to review resources."
      ]
    }
  ],
  hackathons: [
    {
      title: "Hack & Forge 2026",
      achievement: "1st Place (First Prize Winners)",
      date: "May 2026",
      team: "Naankhatai (Yash Gupta, Ved Sharma, Kushaagra Bhatnagar, Arjun Kumar)",
      project: "InterviewIQ",
      details: "Competed in the hackathon organized during the Data Science Summit '26 at BIT Mesra. Built a functional AI-powered remote hiring system from scratch in 24 hours. Evaluated and highly commended by judges and tech educators, including Shridhar Mankar (5 Minutes Engineering)."
    }
  ],
  achievements: [
    "Secured First Prize at Hack & Forge 2026 (Data Science Summit, BIT Mesra).",
    "Successfully built and launched official web portals for Birla Institute of Technology Mesra campus student groups.",
    "Integrated robotics telemetry dashboards with live web components, merging IoT and Web Dev."
  ],
  futureGoals: "My dream is to bridge the gap between AI, high-performance web development, and robotics. I plan to build intelligent user-interfaces that allow seamless control of autonomous hardware, making smart tech accessible and useful.",
  whyHireMe: "I am a versatile, quick-learning developer who lives for problem-solving. Winning Hack & Forge 2026 under pressure proved my ability to build real-world, secure MVPs on short timelines. Whether it's writing React hooks, scaling backend endpoints, or interfacing with hardware sensors in C++, I bring absolute dedication, high execution speed, and clean code to the table."
};
