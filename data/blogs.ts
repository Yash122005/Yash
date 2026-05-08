
import { BlogPost } from '../types';

export const blogs: BlogPost[] = [
  {
    id: 'winning-hack-and-forge-2026',
    title: 'How We Built InterviewIQ and Won Hack & Forge 2026',
    excerpt: 'From an idea sparked at 2 AM to lifting the winner\'s trophy — this is the story of how our team built an AI-powered interview platform in under 36 hours at BIT Mesra\'s biggest hackathon.',
    content: `It still doesn't feel entirely real. A few weeks ago, I was sitting in my hostel room at BIT Mesra, scrolling through Instagram, when I saw the registration form for Hack & Forge 2026 — a hackathon organized by the Society of Data Science (SDS). I had this gut feeling: this was going to be different.

And it was.

---

## The Spark That Started Everything

The idea behind InterviewIQ didn't come from a textbook. It came from frustration. I'd watched friends prepare for placements — grinding DSA, rehearsing HR answers in front of mirrors — and yet, when the actual interview came, they'd freeze. There was no way to practice the real thing. Mock interviews were either too casual or too expensive.

I kept thinking: what if AI could simulate the entire interview experience — not just the questions, but the pressure, the proctoring, the adaptive difficulty? What if a recruiter could set up a session in two minutes and get a full AI-generated report on a candidate?

That's where InterviewIQ was born.

---

## The Team

I didn't do this alone. Every hackathon story that only talks about one person is missing the point. My teammates brought their A-game. We divided responsibilities early — I took ownership of the full-stack architecture and AI integration, while the rest of the team handled UI/UX polish, proctoring features, and the recruiter dashboard.

We barely knew each other before this hackathon. Some of us had never even worked together on a project. But when you're running on caffeine and adrenaline at 3 AM, you learn to trust quickly. The collaboration was seamless — no ego, just code.

---

## 36 Hours of Building

The hackathon started on a Saturday morning. By Saturday night, we had our core architecture locked:

- **React 19 + Vite** on the frontend with a glassmorphism-inspired dark UI
- **Node.js + Express** backend with JWT auth and Google OAuth
- **MongoDB Atlas** for storing users, sessions, answers, and reports
- **Google Gemini AI** for dynamic, adaptive question generation
- **Socket.IO** for real-time updates to the recruiter dashboard
- **MediaPipe** for face detection proctoring

The AI engine was the heart of the project. We built it so that Gemini would remember the last five Q&A exchanges and adjust difficulty dynamically. If a candidate gave strong answers, the next question would dig deeper. Shallow responses triggered follow-up drill-downs. It felt like talking to a real interviewer.

The hardest part? The proctoring system. Getting face detection, tab-switch monitoring, copy-paste blocking, and trust scoring to work reliably — all while not destroying the user experience — was a beast. There were moments at 4 AM where nothing worked, and we seriously considered stripping the feature. But we pushed through.

By Sunday morning, we had a working product: a full interview lifecycle from recruiter session creation to AI-driven interviews to PDF report generation.

---

## The Problem We Were Solving

Traditional hiring is broken in a lot of ways. Recruiters spend hours conducting repetitive first-round interviews. Candidates don't get real practice environments. Remote interviews lack integrity verification. Small companies can't afford enterprise assessment tools.

InterviewIQ addresses all of this:

1. **Recruiters** create sessions with job title, required skills, and experience level. They configure rounds (Introduction → Technical → Managerial), set time limits, and share a single link.
2. **Candidates** join via the link, go through a proctored AI interview with adaptive questioning, and receive instant feedback.
3. **The AI** evaluates every answer across four dimensions — relevance, depth, communication, and confidence — and generates a comprehensive hiring recommendation (HIRE / HOLD / REJECT) with reasoning.
4. **Real-time dashboards** let recruiters watch candidate progress live, view answer histories, and export professional PDF reports.

It's not a chatbot. It's a complete recruitment intelligence platform.

---

## The Demo That Changed Everything

When our turn came to present, I could feel my pulse in my ears. We had rehearsed the demo flow exactly once — at 6 AM, bleary-eyed, with cold coffee in our hands. But when the projector lit up and I started walking the judges through the recruiter flow → candidate interview → live proctoring → AI report generation, something clicked.

The judges leaned forward. They asked sharp questions about the AI scoring logic, the multi-model fallback system, and the Socket.IO architecture. We had answers for everything — not because we'd memorized them, but because we'd *built* every piece ourselves.

When they announced the winners and our team name echoed through the auditorium, I honestly didn't process it for a few seconds. Then the cheering hit. The hugs. The photos. That moment — holding the winner's certificate with my teammates — is something I'll carry with me for a long time.

---

## What Made Us Stand Out

Looking back, I think a few things set InterviewIQ apart:

- **Scope**: Most hackathon projects are proof-of-concepts. We built a production-ready platform with auth, real-time features, AI integration, and PDF exports.
- **Technical depth**: Multi-model AI fallback, adaptive questioning, four-dimensional scoring, WebSocket-powered live dashboards — the tech stack was ambitious and we delivered on all of it.
- **Real-world value**: This wasn't a toy project. Recruiters and colleges could genuinely use this tool today.
- **Polish**: We spent the last 3 hours purely on UI polish, responsive design, and edge case handling. That attention to detail showed.

---

## Challenges We Overcame

No hackathon is smooth sailing. Here's what almost broke us:

- **Gemini API rate limits** at peak hours forced us to build a multi-model fallback system (gemini-flash → gemini-pro → 2.0-flash-lite). This ended up becoming one of our strongest features.
- **MediaPipe face detection** was incredibly finicky in different lighting conditions. We had to add tolerance thresholds and smoothing logic.
- **Real-time sync** between the candidate's interview page and the recruiter's dashboard via Socket.IO had race conditions that took hours to debug.
- **Sleep deprivation**. Let's be honest — coding at 4 AM after being awake for 20 hours is a different kind of challenge entirely.

---

## Key Learnings

This hackathon taught me more in 36 hours than most courses teach in a semester:

1. **Ship, don't plan forever.** We had a working MVP by hour 12. Everything after that was iteration.
2. **AI is a tool, not a gimmick.** The judges could tell we'd integrated Gemini thoughtfully — not just slapped an API call on a basic app.
3. **Team chemistry matters more than individual skill.** None of us could have built this alone. The speed came from trust and clear communication.
4. **Demo preparation matters.** A great product with a poor demo loses. We made sure every click in our presentation told a story.
5. **Hackathons are about pushing limits.** I discovered I could build a full-stack AI platform from scratch in a weekend. That's a confidence boost no textbook can give you.

---

## What's Next

Winning Hack & Forge 2026 was a milestone, but it's also a starting point. Here's what I'm planning:

- **Open-source the project** and build a contributor community around it
- **Add video interview support** with real-time transcription
- **Integrate more AI models** beyond Gemini for evaluation diversity
- **Partner with college placement cells** to pilot InterviewIQ for campus recruitment
- **Continue building in public** — documenting every feature, every decision, every lesson

I came to BIT Mesra to learn. This hackathon reminded me why I fell in love with building things in the first place.

---

## To Everyone Who's Hesitating

If you're a student reading this, thinking about whether to sign up for that hackathon or start that side project — just do it. You'll surprise yourself. The worst that happens is you learn something new. The best? You build something that wins.

This one's for every late-night coder, every student-founder burning the midnight oil, every dreamer who thinks they're not ready yet. You are.

Build loud. Ship fast. Stay hungry.

🏆`,
    date: 'May 5, 2026',
    category: 'personal',
    readTime: '8 min read',
    image: '/assets/blog/hackathon-hero.png',
    tags: ['Hackathon', 'AI', 'Innovation', 'Teamwork', 'BIT Mesra', 'SDS'],
    featured: true
  }
];
