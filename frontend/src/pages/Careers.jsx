import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Clock, ArrowRight, Code, Database, Monitor, PhoneCall, Search } from 'lucide-react';

const jobs = [
  {
    id: 'fullstack',
    title: 'Full Stack Developer',
    icon: Code,
    color: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-50/50',
    textColor: 'text-blue-600',
    type: 'Full-time',
    location: 'Patna / Remote',
    description: 'Build and maintain complex, end-to-end web applications with React frontend and Node.js backend databases.',
    bullets: [
      '2+ years of experience with React, Node.js, Express, and databases.',
      'Strong proficiency in JavaScript/TypeScript and Tailwind CSS.',
      'Experience with REST APIs and third-party integrations.',
      'Writing clean, reusable, and self-documenting code.'
    ]
  },
  {
    id: 'backend',
    title: 'Backend Developer',
    icon: Database,
    color: 'from-emerald-500 to-teal-600',
    bg: 'bg-emerald-50/50',
    textColor: 'text-emerald-600',
    type: 'Full-time',
    location: 'Patna / Remote',
    description: 'Design robust backend systems, RESTful APIs, and databases that power high-performance client applications.',
    bullets: [
      'Experience in Node.js, Express, and SQL/NoSQL databases.',
      'Strong understanding of RESTful architecture and server security.',
      'Experience with code organization, security, and authentication.',
      'Familiarity with cloud platforms (AWS, Heroku, or Render).'
    ]
  },
  {
    id: 'frontend',
    title: 'Frontend Developer',
    icon: Monitor,
    color: 'from-violet-500 to-purple-600',
    bg: 'bg-violet-50/50',
    textColor: 'text-violet-600',
    type: 'Full-time',
    location: 'Patna / Remote',
    description: 'Create pixel-perfect, interactive, and visually stunning web interfaces using React and modern CSS.',
    bullets: [
      'Expert knowledge of HTML5, CSS3, Tailwind CSS, and React.',
      'Experience with state management, animations, and responsive design.',
      'Strong eye for design detail and user experience flows.',
      'Integrating frontend views with server-side REST APIs.'
    ]
  },
  {
    id: 'sales',
    title: 'Sales Executive',
    icon: PhoneCall,
    color: 'from-rose-500 to-orange-600',
    bg: 'bg-rose-50/50',
    textColor: 'text-rose-600',
    type: 'Full-time',
    location: 'Patna / On-site',
    description: 'Drive growth by identifying business opportunities, closing deals, and building long-term client relationships.',
    bullets: [
      'Proven experience in IT service sales, digital agency sales, or SaaS.',
      'Excellent verbal and written English communication skills.',
      'Target-driven mindset and ability to negotiate effectively.',
      'Familiarity with lead nurturing, CRM systems, and outreach.'
    ]
  },
  {
    id: 'leadgen',
    title: 'Lead Generation Executive',
    icon: Search,
    color: 'from-amber-500 to-yellow-600',
    bg: 'bg-amber-50/50',
    textColor: 'text-amber-600',
    type: 'Full-time / Part-time',
    location: 'Patna / On-site',
    description: 'Research potential clients by analyzing businesses, qualifying targets, and collecting details.',
    bullets: [
      'Find local/international businesses via Google Search & Maps.',
      'Assess targets (check if they have active websites or mobile apps).',
      'Collect qualified contact details (emails, phone numbers, owners).',
      'Maintain well-organized data records in Excel / Sheets.'
    ]
  }
];

const Careers = () => {
  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 pt-32 pb-24 font-sans transition-colors duration-200 relative overflow-hidden">
      
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-100/30 dark:bg-indigo-900/5 blur-[70px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-100/30 dark:bg-blue-900/5 blur-[70px] rounded-full pointer-events-none z-0" />
      
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none"></div>

      {/* Hero Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="px-4 py-1.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            Careers
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white tracking-tight mt-4 mb-6">
            Join Our Team
          </h1>
          <p className="text-base md:text-lg text-slate-500 dark:text-zinc-400 font-normal max-w-2xl mx-auto leading-relaxed">
            We are looking for passionate builders, designers, and growth partners to create the next generation of digital products.
          </p>
        </motion.div>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {jobs.map((job, idx) => {
            const IconComponent = job.icon;
            return (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative bg-white dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800/80 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:border-[#2563EB]/40 dark:hover:border-indigo-500/40 transition-all duration-500 flex flex-col justify-between overflow-hidden group hover:scale-[1.01]"
              >
                {/* Vertical left accent line (matching service cards style) */}
                <div className={`absolute top-0 bottom-0 left-0 w-[5px] bg-gradient-to-b ${job.color} z-30`}></div>

                <div className="pl-2">
                  {/* Job Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${job.color} flex items-center justify-center text-white shadow-sm`}>
                        <IconComponent size={24} />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1.5 text-xs text-gray-400 dark:text-gray-500 font-bold uppercase tracking-wider">
                          <span className="flex items-center gap-1">
                            <Clock size={14} /> {job.type}
                          </span>
                          <span className="text-gray-250">•</span>
                          <span className="flex items-center gap-1">
                            <MapPin size={14} /> {job.location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6 font-medium">
                    {job.description}
                  </p>

                  {/* Bullet Points */}
                  <div className="mb-8">
                    <h4 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-4">
                      Key Responsibilities & Skills
                    </h4>
                    <ul className="space-y-3">
                      {job.bullets.map((bullet, index) => (
                        <li key={index} className="flex items-start">
                          <span className={`flex-shrink-0 w-5 h-5 rounded-full ${job.bg} ${job.textColor} flex items-center justify-center mr-3 mt-0.5`}>
                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </span>
                          <span className="text-[14px] text-gray-600 dark:text-gray-300 font-medium leading-relaxed">
                            {bullet}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="pt-6 border-t border-gray-50 dark:border-zinc-800/50 mt-auto flex justify-center w-full">
                  <Link
                    to={`/apply?role=${encodeURIComponent(job.title)}`}
                    className="w-fit bg-[#DFFF00] text-slate-950 hover:bg-[#bce600] py-3.5 px-8 rounded-2xl text-[14px] font-bold transition-all flex items-center justify-center gap-2 group hover:shadow-lg active:scale-[0.98]"
                  >
                    Apply Now
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Careers;
