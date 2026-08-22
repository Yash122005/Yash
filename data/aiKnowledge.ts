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
  role: "Full-Stack Developer • Software Engineer",
  tagline: "Building scalable web applications, AI-driven platforms, and intuitive user experiences.",
  aboutMe: "I am a full-stack developer and software engineer pursuing B.Tech in Electronics and Communication Engineering at BIT Mesra. I specialize in building AI-powered web applications, secure hiring marketplaces, real-time proctoring systems, and modern web platforms with clean code and high performance.",
  email: "yashvinodgupta6@gmail.com",
  githubUrl: "https://github.com/Yash122005",
  linkedinUrl: "https://www.linkedin.com/in/yash-gupta-8a8594283/",
  resumeUrl: "https://drive.google.com/file/d/1WZaYpbm0SQVhPN-S4k4ihizEh8WqHaxi/view?usp=sharing",
  education: [
    {
      institution: "Birla Institute of Technology (BIT), Mesra, Ranchi",
      degree: "B.Tech in Electronics and Communication Engineering",
      timeline: "2024 – 2028",
      details: "CGPA: 8.1875 (till 4th Sem). Active web developer for Value Education Cell."
    },
    {
      institution: "Sunrise Public School",
      degree: "Class XII (CBSE)",
      timeline: "2021 – 2023",
      details: "Scored 86%"
    },
    {
      institution: "Sunrise Public School",
      degree: "Class X (CBSE)",
      timeline: "2019 – 2021",
      details: "Scored 90.2%"
    }
  ],
  skills: [
    {
      category: "Frontend",
      items: ["HTML5", "CSS3", "JavaScript", "React", "Next.js", "Tailwind CSS", "Bootstrap", "jQuery", "GSAP", "Redux Toolkit", "ShadCN UI"]
    },
    {
      category: "Backend & Databases",
      items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL", "SQL", "Supabase", "REST API"]
    },
    {
      category: "Programming & Tools",
      items: ["C", "C++", "Python", "Git", "GitHub", "Docker", "Postman", "Cursor", "Gemini API"]
    },
    {
      category: "Design",
      items: ["Figma", "UI/UX Design", "Wireframing", "Prototyping"]
    }
  ],
  projects: [
    {
      title: "InterviewIQ",
      problem: "Traditional remote hiring is vulnerable to cheating and lacks automated, structured candidate evaluation.",
      solution: "A full-stack AI-powered interview platform enabling companies to conduct structured remote assessments with real-time integrity monitoring.",
      features: [
        "Real-time integrity monitoring: copy-paste detection, multi-face webcam detection, and tab-switch tracking.",
        "Recruiter dashboard with one-click email invitations, live candidate status tracking, and automated PDF report generation covering scores, flags, and performance metrics per candidate.",
        "Integrated AI-based dynamic question generation and contextual answer evaluation for fully automated role-specific interview rounds.",
        "Clean, responsive candidate-facing UI with real-time feedback indicators."
      ],
      techStack: ["React", "Node.js", "Express.js", "MongoDB", "AI Integration"],
      challenges: "Synchronizing real-time integrity detection event listeners with multi-face webcam feeds without degrading user experience.",
      learnings: "Mastered building real-time event monitoring loops, automated candidate scoring pipelines, and dynamic AI interview generation.",
      github: "https://github.com/Yash122005/AI_INTERVIEWER",
      demo: "https://ai-interviewer-ayqc.vercel.app/"
    },
    {
      title: "Hire-Point",
      problem: "Service hiring marketplaces struggle with provider verification, multi-step onboarding, and role security isolation.",
      solution: "A role-based hiring marketplace connecting clients with admin-verified service professionals featuring multi-step provider onboarding and admin approval workflow.",
      features: [
        "Multi-step provider onboarding and admin approval/rejection workflow.",
        "Secure authentication and granular role management using Clerk, with distinct dashboards for clients, providers, and administrators.",
        "Supabase integration for real-time database, file storage, and serverless functions delivering a scalable architecture."
      ],
      techStack: ["React", "Supabase", "Clerk", "Tailwind CSS"],
      challenges: "Implementing granular role-based access control policies across clients, providers, and admins while managing serverless functions.",
      learnings: "Gained expertise in multi-tenant authorization patterns, Clerk role management, and Supabase serverless database workflows.",
      github: "https://github.com/Yash122005/HirePoint",
      demo: "https://hire-point-fs27.vercel.app/"
    },
    {
      title: "Interview Prep Planner",
      problem: "Job seekers lack personalized feedback on resume skill gaps and structured preparation roadmaps for target job descriptions.",
      solution: "A full-stack GenAI-powered platform parsing uploaded resume PDFs, comparing them against job descriptions, computing percentage match scores, and identifying skill gaps with severity levels.",
      features: [
        "Resume PDF parsing & target job description matching with percentage score and skill gap severity levels (low, medium, high).",
        "Google Gemini API integration with structured output enforcement via Zod schemas for technical/behavioral question generation, day-wise roadmaps, and ATS resumes.",
        "4-layer React frontend architecture (UI, hooks, context, services) and Express.js backend with JWT authentication, cookie management, and token blacklisting."
      ],
      techStack: ["React", "Node.js", "Express.js", "MongoDB", "Gemini API", "JWT", "Zod"],
      challenges: "Enforcing strict structured JSON outputs from LLM calls using Zod schemas to ensure reliable ATS resume and roadmap formatting.",
      learnings: "Deepened knowledge of schema validation, 4-layer frontend design, token blacklisting, and GenAI pipeline integration.",
      github: "https://github.com/Yash122005/Interview-Prep-Planner",
      demo: "https://interview-prep-planner.vercel.app/"
    },
    {
      title: "Value Education Cell Website",
      problem: "Value Education Cell (VEC) and Vivekananda Study Circle (VSC) needed a centralized web platform for announcements and digital resources.",
      solution: "Official website for VEC and VSC at BIT Mesra, featuring modern UI/UX, smooth GSAP animations, and Next.js performance optimizations.",
      features: [
        "Designed and developed from scratch with modern responsive layout.",
        "Smooth GSAP animations and Next.js static generation.",
        "High Lighthouse score and SEO optimization."
      ],
      techStack: ["React", "Next.js", "TypeScript", "Tailwind CSS", "GSAP"],
      challenges: "Achieving top performance scores while loading media-rich content.",
      learnings: "Mastered GSAP animation pipelines and Next.js static asset optimization.",
      github: "https://github.com/Yash122005/Value-Education-Cell---BITM",
      demo: "https://value-education-cell-bitm.vercel.app/"
    }
  ],
  experience: [
    {
      role: "Web Developer",
      organization: "Value Education Cell, BIT Mesra",
      timeline: "Apr 2025 – Present",
      details: [
        "Designed and developed the official website from scratch, implementing modern UI/UX, smooth GSAP animations, and a fully responsive layout.",
        "Optimized performance using Next.js static generation and image optimization, achieving fast load times and a high Lighthouse score."
      ]
    }
  ],
  hackathons: [
    {
      title: "SDS Hackathon (Hack & Forge)",
      achievement: "Winner - 1st Position",
      date: "2026",
      team: "Naankhatai",
      project: "InterviewIQ",
      details: "Secured 1st position among all competing teams by building InterviewIQ — an AI-powered remote interview platform with integrity monitoring."
    },
    {
      title: "Ad-Venture, EDC BIT Mesra",
      achievement: "2nd Runner-Up",
      date: "2026",
      team: "BIT Mesra Team",
      project: "E-Summit Flagship Event",
      details: "Secured 2nd Runner-Up position in Ad-Venture, the flagship event of EDC BIT Mesra E-Summit."
    }
  ],
  achievements: [
    "Winner – SDS Hackathon (Hack & Forge): Secured 1st position among all competing teams.",
    "2nd Runner-Up – Ad-Venture, EDC BIT Mesra: E-Summit Flagship Event.",
    "Solved 400+ DSA problems across different platforms."
  ],
  futureGoals: "To continue building high-impact full-stack AI applications and scalable cloud software architectures.",
  whyHireMe: "I am a dedicated Full-Stack Developer with a proven track record of winning hackathons, architecting complex GenAI and proctoring platforms, and delivering production-ready applications with high execution speed and clean code."
};
