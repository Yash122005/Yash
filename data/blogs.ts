
import { BlogPost } from '../types';

export const blogs: BlogPost[] = [
  {
    id: 'getting-started-with-react',
    title: 'Getting Started with React in 2024',
    excerpt: 'A comprehensive guide for beginners to jump into the React ecosystem with modern best practices.',
    content: `
      ## The Rise of React
      React continues to dominate the frontend landscape. In this post, we explore why it remains the go-to library for developers...
      
      ### Core Concepts
      - **Components**: The building blocks of React.
      - **Hooks**: Managing state and side effects with ease.
      - **Virtual DOM**: How React optimizes rendering.
      
      Learning React is about understanding the flow of data. Props down, events up. Once you grasp this, everything else falls into place.
    `,
    date: 'Oct 24, 2024',
    category: 'technical',
    readTime: '5 min read',
    image: 'https://picsum.photos/seed/react/800/400'
  },
  {
    id: 'my-journey-as-a-developer',
    title: 'My Journey: From First Line to Full Apps',
    excerpt: 'Sharing my personal experiences, hurdles, and triumphs while learning to code from scratch.',
    content: `
      ## Where it all began
      It started with a simple HTML "Hello World". I remember the thrill of seeing my code come to life in the browser...
      
      ### Challenges
      The hardest part wasn't the syntax, but the logic. Solving problems is what makes programming both frustrating and rewarding.
      
      ### Future Goals
      I aim to specialize in full-stack development, creating experiences that are as beautiful as they are functional.
    `,
    date: 'Nov 12, 2024',
    category: 'personal',
    readTime: '8 min read',
    image: 'https://picsum.photos/seed/dev/800/400'
  },
  {
    id: 'mastering-tailwind-css',
    title: 'Why I Switched to Tailwind CSS',
    excerpt: 'Utility-first CSS is a game changer. Here is how it improved my workflow and productivity.',
    content: `
      ## The CSS Dilemma
      Writing custom CSS can often lead to messy, unmaintainable stylesheets. Tailwind solves this by providing low-level utility classes...
      
      ### Key Benefits
      1. **No context switching**: Style right in your HTML/JSX.
      2. **Consistency**: Use a predefined design system.
      3. **Performance**: Only the CSS you use is shipped to production.
    `,
    date: 'Dec 05, 2024',
    category: 'technical',
    readTime: '4 min read',
    image: 'https://picsum.photos/seed/tailwind/800/400'
  }
];
