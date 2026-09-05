import { Code, Database, Monitor, PhoneCall, Search, Crown, Sparkles, Rocket } from 'lucide-react';

export const INITIAL_JOBS = [
  {
    id: 'cofounder',
    title: 'Technical Co-Founder & Partner',
    iconName: 'Crown',
    color: 'from-amber-500 via-orange-500 to-rose-600',
    bg: 'bg-amber-50/70 dark:bg-amber-950/30',
    textColor: 'text-amber-600 dark:text-amber-400',
    borderColor: 'border-amber-400 dark:border-amber-500/50',
    badge: '🔥 Co-Founder & Leadership Role',
    type: 'Co-Founder / Equity + Comp',
    location: 'Patna / Hybrid / Remote',
    isFeatured: true,
    description: 'We are seeking an ambitious Technical Co-Founder to co-lead InfozaTech. You will manage high-value client relations, build & lead our engineering teams, architect full-stack solutions, and drive marketing & agency growth.',
    bullets: [
      'Client Communication: Exceptional verbal & written communication in both English and Hindi for high-ticket client meetings & project consultations.',
      'Full-Stack Mastery: Deep technical understanding and hands-on expertise in React, Node.js, Cloud architectures, Databases, and AI systems.',
      'Team Making & Leadership: Proven ability to hire top developers, structure agile teams, mentor engineers, and oversee project sprints.',
      'Marketing & Growth Strategy: Strong sense for digital agency scaling, marketing funnels, client acquisitions, and brand presence.',
      'Ownership & Vision: True founder mindset with complete accountability for product execution, team velocity, and client satisfaction.'
    ]
  },
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    iconName: 'Code',
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50/50 dark:bg-blue-950/20',
    textColor: 'text-blue-600 dark:text-blue-400',
    badge: 'Engineering',
    type: 'Full-time',
    location: 'Patna / Remote',
    isFeatured: false,
    description: 'Build and maintain complex, end-to-end web applications with React frontend and Node.js backend databases.',
    bullets: [
      'Strong technical mastery of React, Node.js, Express, and SQL/NoSQL databases.',
      'Deep proficiency in JavaScript/TypeScript, component architecture, and modern Tailwind CSS.',
      'Hands-on expertise in designing robust RESTful APIs, third-party integrations, and scalable systems.',
      'Writing clean, performant, scalable, and self-documenting code with strong problem-solving ability.'
    ]
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    iconName: 'Database',
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50/50 dark:bg-emerald-950/20',
    textColor: 'text-emerald-600 dark:text-emerald-400',
    badge: 'Engineering',
    type: 'Full-time',
    location: 'Patna / Remote',
    isFeatured: false,
    description: 'Design robust backend systems, RESTful APIs, and databases that power high-performance client applications.',
    bullets: [
      'Hands-on mastery of Node.js, Express, server architectures, and relational/non-relational databases.',
      'Strong understanding of high-performance API design, microservices, security protocols, and authentication.',
      'Expertise in database optimization, schema design, caching, and server-side logic.',
      'Familiarity with modern deployment pipelines and cloud platforms (AWS, Render, Docker, or Heroku).'
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Developer',
    iconName: 'Monitor',
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50/50 dark:bg-violet-950/20',
    textColor: 'text-violet-600 dark:text-violet-400',
    badge: 'Design & UI',
    type: 'Full-time',
    location: 'Patna / Remote',
    isFeatured: false,
    description: 'Create pixel-perfect, interactive, and visually stunning web interfaces using React and modern CSS.',
    bullets: [
      'Expert-level mastery of React, modern JavaScript/TypeScript, HTML5, and responsive Tailwind CSS.',
      'Strong hands-on skills in UI/UX detail, fluid animations (Framer Motion), and pixel-perfect design systems.',
      'Experience with complex state management, client-side caching, and seamless REST API integrations.',
      'Deep focus on speed optimization, clean code hierarchy, and cross-device browser compatibility.'
    ]
  },
  {
    id: 'sales',
    title: 'Sales Executive',
    iconName: 'PhoneCall',
    color: 'from-rose-500 to-orange-600',
    bg: 'bg-rose-50/50 dark:bg-rose-950/20',
    textColor: 'text-rose-600 dark:text-rose-400',
    badge: 'Growth & Sales',
    type: 'Full-time',
    location: 'Patna / On-site',
    isFeatured: false,
    description: 'Drive growth by identifying business opportunities, closing deals, and building long-term client relationships.',
    bullets: [
      'Strong capability in IT solutions sales, digital agency client acquisition, or SaaS consulting.',
      'Exceptional verbal and written communication skills in both English and Hindi.',
      'Mastery of client discovery, requirement analysis, proposal preparation, and negotiation.',
      'Proficiency in lead nurturing, CRM workflows, and driving long-term strategic client partnerships.'
    ]
  },
  {
    id: 'leadgen',
    title: 'Lead Generation Executive',
    iconName: 'Search',
    color: 'from-amber-500 to-yellow-600',
    bg: 'bg-amber-50/50 dark:bg-amber-950/20',
    textColor: 'text-amber-600 dark:text-amber-400',
    badge: 'Outreach',
    type: 'Full-time / Part-time',
    location: 'Patna / On-site',
    isFeatured: false,
    description: 'Research potential clients by analyzing businesses, qualifying targets, and collecting details.',
    bullets: [
      'Mastery of advanced search techniques to discover and qualify high-potential B2B clients globally.',
      'Ability to analyze business models and evaluate their digital needs (websites, mobile apps, custom tech).',
      'Expertise in accurate data extraction, verified decision-maker contacts, and outreach readiness.',
      'Strong organizational discipline with Excel / Google Sheets and lead tracking tools.'
    ]
  }
];

const STORAGE_KEY = 'infozatech_career_openings_v3';

export const getCareers = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('Error loading careers from localStorage:', err);
  }
  return INITIAL_JOBS;
};

export const saveCareers = (jobsList) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(jobsList));
  } catch (err) {
    console.error('Error saving careers to localStorage:', err);
  }
};

export const resetCareersToDefault = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (err) {
    console.error('Error resetting careers:', err);
  }
  return INITIAL_JOBS;
};

export const getIconComponent = (iconName) => {
  switch (iconName) {
    case 'Crown':
      return Crown;
    case 'Code':
      return Code;
    case 'Database':
      return Database;
    case 'Monitor':
      return Monitor;
    case 'PhoneCall':
      return PhoneCall;
    case 'Search':
      return Search;
    case 'Rocket':
      return Rocket;
    default:
      return Sparkles;
  }
};
