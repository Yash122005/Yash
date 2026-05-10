import { BlogPost } from '../types';

export const blogs: BlogPost[] = [
  {
    id: 'winning-hack-and-forge-2026',
    title: 'Winning Hack & Forge 2026 with InterviewIQ',
    excerpt:
      'Our team “Naankhatai” secured 1st place at Hack & Forge 2026, hosted during the Data Science Summit at BIT Mesra, by building InterviewIQ — an AI-powered remote hiring platform focused on fair and intelligent interviews.',
    content: `Hackathons always look exciting from the outside — cool ideas, energetic teams, late-night coding sessions, and demo day excitement. But this one felt different from the beginning.

A few weeks before Hack & Forge 2026, our team started discussing a problem that almost every student preparing for placements has faced at some point: interview preparation never truly feels realistic. You can solve DSA questions, watch videos, or practice HR answers with friends, but actual interview pressure is completely different.

That conversation eventually became the starting point of InterviewIQ.

---

## The Idea Behind InterviewIQ

We wanted to build something practical — not just another chatbot with AI attached to it.

InterviewIQ is an AI-powered interview and recruitment platform designed to make remote hiring more secure, structured, and intelligent. The goal was simple:

- Help recruiters conduct interviews more efficiently
- Give candidates a more realistic interview experience
- Reduce unfair practices in online assessments
- Automate repetitive evaluation tasks

Instead of focusing only on question generation, we tried to improve the complete interview workflow.

---

## Building During the Hackathon

Hack & Forge was organized under the Data Science Summit ’26 at BIT Mesra, and the energy throughout the event was incredible. Teams were brainstorming ideas everywhere, laptops were constantly charging, and almost everyone was running on caffeine and very little sleep.

Our team — “Naankhatai” — divided responsibilities early so we could move quickly. Everyone focused on different parts of the project simultaneously, which helped us save a lot of time during integration.

The stack we used included:

- React + Vite for the frontend
- Node.js and Express for the backend
- MongoDB for data storage
- Gemini AI APIs for intelligent interview interactions
- Real-time monitoring systems for proctoring features

The biggest challenge was balancing AI features with reliability. We didn’t want the product to feel gimmicky. Every feature had to solve a real problem.

---

## Features We Focused On

### Advanced Security & Monitoring

One major issue in remote hiring is maintaining assessment integrity. We added several monitoring features to help recruiters conduct fair interviews:

- Multi-face detection to identify proxy candidates
- Tab-switch tracking
- Copy-paste activity monitoring
- Real-time behavioral analysis during interviews

Implementing these systems properly during a hackathon timeline was honestly difficult. Small bugs kept appearing at the worst possible times, especially while syncing monitoring events in real time.

---

## Smart AI Interview Flow

The AI system was designed to make interviews feel more natural instead of static.

InterviewIQ could:
- Ask follow-up questions based on candidate responses
- Adjust question depth dynamically
- Analyze responses and interaction patterns
- Support voice-based interview interactions

One thing we spent a lot of time improving was the follow-up questioning system. We wanted the AI to respond contextually rather than simply reading prepared questions one by one.

That part ended up becoming one of the most appreciated features during the demo.

---

## Recruiter Experience

We also focused heavily on the recruiter side because most platforms ignore usability there.

Recruiters could:
- Schedule interviews quickly
- Send candidate invites
- Monitor interviews live
- Generate detailed PDF evaluation reports with one click

The PDF reporting system became one of those last-minute features that surprisingly made a huge impact during judging.

---

## Demo Day

By the final few hours, everyone in the hall looked exhausted but excited. We spent most of our remaining time fixing edge cases, improving UI consistency, and preparing the demo flow properly.

When it was finally our turn to present, things started clicking together smoothly.

We demonstrated:
- Recruiter onboarding
- AI-driven interview flow
- Monitoring and security features
- Automated reporting pipeline

The judges asked detailed technical questions about the AI workflow, monitoring logic, and scalability decisions. Since we had built every part ourselves during the hackathon, answering those questions felt natural.

One especially memorable moment was receiving appreciation from Shridhar Mankar (5 Minutes Engineering), who evaluated our project during the event.

---

## The Result

When the winners were announced and our team name was called for First Prize, it honestly took a few seconds to process.

Winning felt amazing, but more than that, it felt rewarding because of the amount of effort the entire team had put in over those intense 24 hours.

Huge credit goes to my teammates:
- Ved Sharma
- Kushaagra Bhatnagar
- Arjun Kumar

The teamwork, communication, and ability to stay calm under pressure made a huge difference.

---

## What I Learned

This hackathon taught me a lot beyond just coding.

### 1. Simple ideas executed properly matter more than flashy concepts
A strong implementation with real-world usability stands out.

### 2. Team coordination is everything
Good collaboration saves more time than writing clever code alone.

### 3. Shipping fast matters
We focused on getting a working MVP early and improving it step by step instead of over-planning.

### 4. Presentation matters almost as much as the product
A clean flow and confident explanation can completely change how people experience your project.

---

## What’s Next

Hack & Forge may be over, but InterviewIQ is definitely not.

We’re planning to continue improving the platform by adding:
- Better AI evaluation systems
- More advanced voice interaction
- Improved analytics dashboards
- Enhanced proctoring capabilities
- Scalable deployment infrastructure

This project started as a hackathon idea, but we genuinely believe it can evolve into something much bigger.

---

## Final Thoughts

Hackathons are stressful, messy, and unpredictable — but they’re also one of the best learning experiences for any developer.

You learn how to build under pressure, communicate quickly, solve unexpected problems, and trust your teammates.

Most importantly, you realize that you’re capable of building much more than you initially thought.

Winning Hack & Forge 2026 with InterviewIQ is definitely one of the most memorable experiences of my journey so far, and I’m excited to see where we take this project next.

🏆`,
    date: 'May 5, 2026',
    category: 'personal',
    readTime: '6 min read',
    image: '/assets/blog/hackathon-hero.png',
    tags: [
      'Hackathon',
      'AI',
      'InterviewIQ',
      'BIT Mesra',
      'Web Development',
      'Teamwork'
    ],
    featured: true
  }
];