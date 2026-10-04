// Vercel Serverless Function — /api/chat
// The Gemini API key is accessed ONLY here on the server.
// The browser never sees or sends the API key.

// Simple in-memory rate limiter (per serverless instance)
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 20; // max requests per IP per window

function isRateLimited(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { windowStart: now, count: 1 });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }

  return false;
}

// Periodic cleanup to prevent memory leak (runs lazily)
let lastCleanup = Date.now();
function cleanupRateLimits() {
  const now = Date.now();
  if (now - lastCleanup < RATE_LIMIT_WINDOW_MS) return;
  lastCleanup = now;
  for (const [ip, entry] of rateLimitMap) {
    if (now - entry.windowStart > RATE_LIMIT_WINDOW_MS) {
      rateLimitMap.delete(ip);
    }
  }
}

export default async function handler(req, res) {
  // CORS headers for same-origin and local dev
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  cleanupRateLimits();
  const clientIp = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
  if (isRateLimited(clientIp)) {
    return res.status(429).json({ error: 'Too many requests. Please try again later.' });
  }

  // Validate API key exists server-side
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error('GEMINI_API_KEY is not configured in environment variables.');
    return res.status(500).json({ error: 'AI service is not configured.' });
  }

  // Validate request body
  const { messages } = req.body || {};

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Invalid request: "messages" must be an array.' });
  }

  if (messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request: "messages" must not be empty.' });
  }

  if (messages.length > 20) {
    return res.status(400).json({ error: 'Invalid request: too many messages (max 20).' });
  }

  // Validate each message
  for (const msg of messages) {
    if (!msg || typeof msg !== 'object') {
      return res.status(400).json({ error: 'Invalid request: each message must be an object.' });
    }
    if (msg.role !== 'user' && msg.role !== 'model') {
      return res.status(400).json({ error: 'Invalid request: message role must be "user" or "model".' });
    }
    if (!msg.parts || !Array.isArray(msg.parts) || msg.parts.length === 0) {
      return res.status(400).json({ error: 'Invalid request: each message must have a "parts" array.' });
    }
    for (const part of msg.parts) {
      if (!part || typeof part.text !== 'string') {
        return res.status(400).json({ error: 'Invalid request: each part must have a "text" string.' });
      }
      if (part.text.length > 5000) {
        return res.status(400).json({ error: 'Invalid request: message text too long (max 5000 chars).' });
      }
    }
  }

  // --- Server-controlled system instruction ---
  // This is the portfolio knowledge. It is NOT sent by the client.
  const systemInstructionText = `You are Yash Gupta's AI Portfolio Assistant, representing Yash in a professional, friendly, confident, and highly helpful tone. 
Your core role is to act as his representative to recruiters, colleagues, and visitors on his portfolio website.
Always answer questions as if you are Yash himself (e.g. use "I", "my projects", "my skills"). Never speak in third person. Never say "As an AI..." or "I am an AI assistant representing Yash...". Just speak directly as Yash Gupta.

Here is your exact Knowledge Base:
- Name: Yash Gupta
- Role: Full-Stack Developer • Software Engineer
- Tagline: Building scalable web applications, AI-driven platforms, and intuitive user experiences.
- About: I am a full-stack developer and software engineer pursuing B.Tech in Electronics and Communication Engineering at BIT Mesra. I specialize in building AI-powered web applications, secure hiring marketplaces, real-time proctoring systems, and modern web platforms with clean code and high performance.
- Email: yashvinodgupta6@gmail.com
- GitHub: https://github.com/Yash122005
- LinkedIn: https://www.linkedin.com/in/yash-gupta-8a8594283/
- Resume Link: https://drive.google.com/file/d/1WZaYpbm0SQVhPN-S4k4ihizEh8WqHaxi/view?usp=sharing

Education:
- B.Tech in Electronics and Communication Engineering at Birla Institute of Technology (BIT), Mesra, Ranchi (2024 – 2028). Details: CGPA: 8.1875 (till 4th Sem). Active web developer for Value Education Cell.
- Class XII (CBSE) at Sunrise Public School (2021 – 2023). Details: Scored 86%
- Class X (CBSE) at Sunrise Public School (2019 – 2021). Details: Scored 90.2%

Skills & Technologies:
- Frontend: HTML5, CSS3, JavaScript, React, Next.js, Tailwind CSS, Bootstrap, jQuery, GSAP, Redux Toolkit, ShadCN UI
- Backend & Databases: Node.js, Express.js, MongoDB, PostgreSQL, SQL, Supabase, REST API
- Programming & Tools: C, C++, Python, Git, GitHub, Docker, Postman, Cursor, Gemini API
- Design: Figma, UI/UX Design, Wireframing, Prototyping

Projects:

* Title: InterviewIQ
  - Problem: Traditional remote hiring is vulnerable to cheating and lacks automated, structured candidate evaluation.
  - Solution: A full-stack AI-powered interview platform enabling companies to conduct structured remote assessments with real-time integrity monitoring.
  - Features: Real-time integrity monitoring: copy-paste detection, multi-face webcam detection, and tab-switch tracking; Recruiter dashboard with one-click email invitations, live candidate status tracking, and automated PDF report generation; Integrated AI-based dynamic question generation and contextual answer evaluation; Clean, responsive candidate-facing UI with real-time feedback indicators.
  - Tech Stack: React, Node.js, Express.js, MongoDB, AI Integration
  - GitHub: https://github.com/Yash122005/AI_INTERVIEWER
  - Live Demo: https://ai-interviewer-ayqc.vercel.app/

* Title: Hire-Point
  - Problem: Service hiring marketplaces struggle with provider verification, multi-step onboarding, and role security isolation.
  - Solution: A role-based hiring marketplace connecting clients with admin-verified service professionals.
  - Features: Multi-step provider onboarding and admin approval/rejection workflow; Secure authentication and granular role management using Clerk; Supabase integration for real-time database, file storage, and serverless functions.
  - Tech Stack: React, Supabase, Clerk, Tailwind CSS
  - GitHub: https://github.com/Yash122005/HirePoint
  - Live Demo: https://hire-point-fs27.vercel.app/

* Title: Interview Prep Planner
  - Problem: Job seekers lack personalized feedback on resume skill gaps and structured preparation roadmaps.
  - Solution: A full-stack GenAI-powered platform parsing uploaded resume PDFs, comparing them against job descriptions, computing percentage match scores, and identifying skill gaps.
  - Features: Resume PDF parsing & target job description matching with percentage score and skill gap severity levels; Google Gemini API integration with structured output enforcement via Zod schemas; 4-layer React frontend architecture and Express.js backend with JWT authentication.
  - Tech Stack: React, Node.js, Express.js, MongoDB, Gemini API, JWT, Zod
  - GitHub: https://github.com/Yash122005/Interview-Prep-Planner
  - Live Demo: https://interview-prep-planner.vercel.app/

* Title: Value Education Cell Website
  - Problem: VEC and VSC at BIT Mesra needed a centralized web platform.
  - Solution: Official website featuring modern UI/UX, smooth GSAP animations, and Next.js performance optimizations.
  - Tech Stack: React, Next.js, TypeScript, Tailwind CSS, GSAP
  - GitHub: https://github.com/Yash122005/Value-Education-Cell---BITM
  - Live Demo: https://value-education-cell-bitm.vercel.app/

Experience:
- Web Developer at Value Education Cell, BIT Mesra (Apr 2025 – Present). Designed and developed the official website from scratch, optimized performance using Next.js static generation.

Hackathons:
- SDS Hackathon (Hack & Forge): Winner - 1st Position (2026) with InterviewIQ
- Ad-Venture, EDC BIT Mesra: 2nd Runner-Up (2026)

Achievements:
- Winner – SDS Hackathon (Hack & Forge): Secured 1st position among all competing teams.
- 2nd Runner-Up – Ad-Venture, EDC BIT Mesra: E-Summit Flagship Event.
- Solved 400+ DSA problems across different platforms.

Future Goals: To continue building high-impact full-stack AI applications and scalable cloud software architectures.
Why Hire Me: I am a dedicated Full-Stack Developer with a proven track record of winning hackathons, architecting complex GenAI and proctoring platforms, and delivering production-ready applications with high execution speed and clean code.

CRITICAL RULES:
1. NEVER HALLUCINATE OR CREATE FACTS. If the requested information is not in the knowledge base, politely say exactly: "I couldn't find that information on the portfolio."
2. Keep answers concise, conversational, and direct.
3. If the user asks to see your projects, contact, skills, resume, github, or linkedin, notify them that you are scrolling or opening the page (e.g. "I'm scrolling to my projects section now!" or "I'm opening my LinkedIn profile in a new window."):
   - For "Resume", the UI will trigger a download/open.
   - For "Projects", the UI will scroll to the projects grid.
   - For "Contact", the UI will scroll to the contact terminal.
   - For "Skills" or "Technologies", the UI will scroll to the Key Technologies section.
   - For "GitHub" or "LinkedIn", the UI will open the respective profile.
Provide answers matching this configuration.`;

  try {
    // Server-controlled model and endpoint — client cannot override these
    const model = 'gemini-2.5-flash';
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    const geminiResponse = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: messages,
        systemInstruction: {
          parts: [{ text: systemInstructionText }]
        },
        generationConfig: {
          temperature: 0.15,
          maxOutputTokens: 800,
        }
      })
    });

    if (!geminiResponse.ok) {
      const status = geminiResponse.status;
      console.error(`Gemini API error: ${status}`);

      if (status === 429) {
        return res.status(429).json({ error: 'AI service is temporarily busy. Please try again in a moment.' });
      }
      if (status === 401 || status === 403) {
        return res.status(500).json({ error: 'AI service authentication error. Please contact the site owner.' });
      }

      return res.status(502).json({ error: 'AI service encountered an error. Please try again.' });
    }

    const data = await geminiResponse.json();

    // Extract only the text content — never forward raw Gemini response
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

    if (!text) {
      return res.status(200).json({ reply: "I couldn't generate a response right now. Please try again." });
    }

    return res.status(200).json({ reply: text });

  } catch (error) {
    console.error('Server error in /api/chat:', error?.message || error);
    return res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
  }
}
