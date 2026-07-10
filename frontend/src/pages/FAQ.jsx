import { useState } from "react";
import { ScrollReveal } from "../components/ui/scroll-reveal";

const faqs = [
  {
    q: "How does InfozaTech work?",
    a: "You share your project or startup requirement, and InfozaTech provides the right technical solution, guidance, and execution support — from idea to delivery.",
  },
  {
    q: "Do you provide real projects and internships?",
    a: "Yes. We work on real-world projects and provide genuine internship guidance, project mentoring, and hands-on development support.",
  },
  {
    q: "Is my idea and data safe with InfozaTech?",
    a: "Absolutely. Your idea, code, and data remain completely confidential. We follow strict privacy and security practices.",
  },
  {
    q: "What services does InfozaTech offer?",
    a: "We offer AI/ML development, web & app development, institutional training, hackathon solutions, data analytics, chatbots, and startup incubation support.",
  },
  {
    q: "Who can use InfozaTech?",
    a: "Students, developers, startups, founders, and institutions — anyone looking for reliable technical solutions or guidance.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      className="bg-white py-20 px-6 overflow-hidden"
    >
      {/* HEADER */}
      <ScrollReveal direction="up" delay={0.1}>
      <div
        className="text-center max-w-3xl mx-auto mb-14"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-[#2563EB] bg-[#2563EB]/5 px-6 py-2 rounded-full mb-6 border border-[#2563EB]/15">
          ● FAQ
        </span>

        <h2 className="text-4xl sm:text-5xl font-[700] tracking-tight text-[#0F0F0F]">
          Frequently Asked <span className="text-[#2563EB]">Questions</span>
        </h2>

        <p className="mt-4 text-base sm:text-lg text-slate-500">
          Everything you need to know about working with InfozaTech
        </p>
      </div>
      </ScrollReveal>

      {/* FAQ BOX */}
      <ScrollReveal direction="up" delay={0.2}>
      <div
        className={`
          max-w-4xl mx-auto bg-white rounded-3xl
          border border-slate-200 shadow-sm overflow-hidden
          transition-all duration-700 ease-out
        `}
      >
        {faqs.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={index} className="border-b last:border-b-0 border-slate-200">
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="w-full flex items-center justify-between px-8 py-6 text-left group"
              >
                <span className="text-lg font-medium text-[#0F0F0F] group-hover:text-[#2563EB] transition">
                  {item.q}
                </span>

                {/* PLUS ICON */}
                <span
                  className={`
                    text-2xl font-light text-[#2563EB]
                    transition-transform duration-300
                    ${isOpen ? "rotate-45" : "rotate-0"}
                  `}
                >
                  +
                </span>
              </button>

              {/* ANSWER */}
              <div
                className={`
                  px-8 overflow-hidden transition-all duration-300
                  ${isOpen ? "max-h-40 pb-6" : "max-h-0"}
                `}
              >
                <p className="text-slate-500 leading-relaxed">
                  {item.a}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      </ScrollReveal>
    </section>
  );
};

export default FAQ;
