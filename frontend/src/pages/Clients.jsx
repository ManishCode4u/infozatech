/* eslint-disable */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ClientsTestimonialsPage = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const testimonials = [
    {
      id: 1,
      rating: 5,
      quote: "InfozaTech transformed our legacy systems into a modern cloud architecture. Their expertise in enterprise solutions is unmatched.",
      name: "Marcus Thorne",
      role: "CTO at TechFlow Systems",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDFL0vgCPPshwtwu7mWjQKa1hz7SKfomnG68rF6UWWc4teZ24ickHVPDZNAa9zoluMo6NcykbVnhuq2jVdp4gogYKS_SPZCKaoMN548ap4-1jpnWBi_L-EoeRdytnNBnJMlZFQ2KLyhK6R3MkBxDPdPKfWmiOC9OkTJSJKZ_xbw_XCbycsrPtn712Rr7YzH_I-f9IShQ-Mfm1fUWX01lFNm_6exBSkLioEocg-TxSnZeANQauWq12z5UWcWvchBW7twGzouJexHEsL_"
    },
    {
      id: 2,
      rating: 5,
      quote: "Working with the InfozaTech team was seamless. They delivered the project 2 weeks ahead of schedule without compromising on quality.",
      name: "Elena Rodriguez",
      role: "Project Director at InnovateCo",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBy9fUJp2e2HuwmKJsMaHvOgoMaAsRaSfM8OAORAsm88rc2bYTkZ9MONV9StcOubOB-FFd_zw9BA0xD1Ps61Gn4Ub8nySePNYH2jcROtTHFEgblqitbKb4gkGatWkaUXpfSMtvwbIkv8i994L7N8V6ZVmwBeFqrQ6u4K6rIiiRJeYOVzs9MhnEkcyr_Heq2D3NPd3DcpZHCJFFUYnVh2thvWxcboxe2zmb2Lx0MLpb6IRUtAS1FVU3RWzukrdD68IH4F_C3MYM6Hqhf"
    },
    {
      id: 3,
      rating: 5,
      quote: "The strategic insights provided by their consultants helped us pivot our digital strategy during a critical growth phase.",
      name: "David Chen",
      role: "Founder of Nexus Ventures",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBevN42wyVsmI0XuPbp4yUEgY8kMHf3DndpdibSA_nZ_SfYOY5VYQPPPsHSSqooVzt6QQL3E06D6J92lsMV__hHPiEZjYINmOutqjHIGNCkrA2UIWYC7QdaVGtCYHudx_vSS_o6x0Qw2OIbIdmYGaFVDfLLiTKF5V5m5e9RHJ8AqaXsx4NE4M-LC6hMJb-UCYlhvEA2p_B4Sb5q3tr_RQyf_hL_BF7nXCcaxOpEmnCuJXGOXbHpHqJRwQ2xO5Sft68a935njTWU01EI"
    }
  ];

  const clientLogos = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCAK0auMHbFY_uKNHkp_EcPhvoBklI_V8p1IkXQ5VxRwexH-NnVZx4mKI-R_fEry_hFDYRZz8ukftg-AlUbKMD0o036E1-fLesRaakQddFjzTh4xhC625Raw8ZHjV91ojZGCl6OYm5PYfUhUvrJ7L8BYcS_HuebGbkcyHGy8tsNaAKcNwBZmJCnl2iNSpurw6iCLU7Ny-UK7eaj3b-oscMgU36MPJaNxCu8QE_MzkhNkU116JyKjePAzXg68B7JI4Ko4meqUyWEzoLb",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBJGbYD7SgnRXNN8yzOgc49w7g0qUC86vB5eN96ZgZqAd-xR3cHKzuHgTT2i5lgsoRLPmNYVm7sst-gQnrAkzMwlYXISN5B56mY58LWmyCnx3EE7tn3_H7Nwq05ATJF79wIthuCh5dlyrlSmMDT-6mRPv15ldiYfuov8x06caFsa6HvAepJdvIj_hCXQ0qbA5wntbmrZiigwPgelpSZyrcQXfocRD6u8-JuqJymn21XYfLg5jRcXPqtqWA3Iuy51vF_izCefjZsZaks",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuD6qCv6bj28uLKw7A69t6T2P166KJPgqIhgU2xF8wvuLfQZq91k11Iy7qhSr1PZdfKCpL4iY27M4IQ0R7vj9ruEilslaFBlh6urRFd1aDvdcAVSRWxjFhf8hPlL0a5HaFZEVKQPNGcMLoSAID8lRJN2-Yqotfbk6OqzCS3--_Ng-LMkUfJIhrGF1-OvuojL_Wszfghbf9FxBKRO7SczmSkBWx6l5Jwm0uJ0ASMGgW76mSrpOeDpLJ-4JbvP7BsQm8H_w6VJhSXA6jyg",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBIbpsW6EIMNQmZfgxO224-wp5uvtF6phELMU5xTfYlxOP5F-P2TMcJGkd9h-CsHMnhEbEpPRxR6PjP59BArmDKjvLTt0-0Skfe3eJ60p8StyKCwPAhPcQ8inb9GAHqGDBGWlrJJi3iRrSo9WouMzgYQeh0u2wM91RBBl3n0tpnsJXgwAnz4ttIgMptuj_XqUr_QXVaVS2FikYfYgwBhn4xI-hyajeHIO5Gr0M8GPa8xf-ktMyxVOsRdc6RD2xW_8DEtiOFvb9EPJsB",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuBOReoDCgTLPhjXL_SiMLqNlBFu4zY9EcSbmiqEWxKffNsa3UTw_Tm4Ht7_g_nxdAcBe2XO4IeAo-i9BefYNrAhtxs5eE4dcs3uEuSLrFFUeopvDvW2_BPskCj19LuF9C0Ke1VxskgpaLhsIJTGJDsaTuz4a6supP6fYLSBEXTdxIgHNeHCOGL8fA1ChHUOwgiD67ORBeXJvYY6KJqG_QjU76DmvGWM4VzstCdUaFp6xQnN-quACtUNbu45RGKir43at2eNr3TNOFb3",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCp1Ij7h1PEKG79UxVfNb-LOOqoHPpxrfkCkyv7sVEyeVyM74CgnunYqF2RUA63CGntmxeE077G-9ceY7cWS95CYXXKkV5itYVax7-CCuwv4P6cxbszqLa4MjFEcwSQ24uvhUvZx5Gw5l1yjzDll3R82WfdQ_Y_8zP-sXX9KTkvlk2KXjdoe8TXr-bRTT8zdTEC2-2YSTXvJTPx0HWdj7p4pdInltU5emo4Xy_hB_hFwvxQbeNldmskNKlr_p8eoFaMy7h13yJmkKiN"
  ];

  const stats = [
    { value: "20+", label: "Projects" },
    { value: "15+", label: "Clients" },
    { value: "99%", label: "Success" }
  ];

  const renderStars = (count) => {
    return Array(count).fill(0).map((_, i) => (
      <svg key={i} className="w-4 h-4 text-amber-400 fill-current" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ));
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark bg-gray-900' : 'bg-gray-50'} font-sans`}>
       


      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-900 pt-12 pb-16">
        <div className="absolute inset-0 opacity-50" 
             style={{
               backgroundImage: `radial-gradient(rgba(13, 64, 165, 0.05) 1px, transparent 1px)`,
               backgroundSize: '20px 20px'
             }}>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <span className="inline-block py-1 px-3 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-xs font-semibold uppercase tracking-wider mt-12 mb-4">
            Our Success Stories
          </span>
          <h1 className="text-3xl md:text-4xl font-[700] leading-tight mb-4 text-[#0f172a] dark:text-white">
            Trusted by <br />Our Clients
          </h1>
          <p className="text-[#64748b] dark:text-gray-400 text-sm md:text-base leading-relaxed max-w-md mx-auto">
            Delivering innovative tech solutions for industry leaders and visionary startups worldwide.
          </p>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="px-4 -mt-8 relative z-20">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg shadow-blue-500/5 p-6 flex justify-around border border-gray-100 dark:border-gray-700">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-[700] text-blue-700 dark:text-blue-400">{stat.value}</div>
              <div className="text-xs uppercase font-[700] text-gray-400 tracking-widest mt-1">
                {stat.label}
              </div>
              {index < stats.length - 1 && (
                <div className="hidden md:block w-px h-10 bg-gray-100 dark:bg-gray-700 my-auto"></div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 px-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl md:text-2xl font-[700] text-[#0f172a] dark:text-black">Client Feedback</h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {renderStars(5)}
            </div>
            <span className="font-[700] text-[#0f172a] dark:text-white">4.9/5</span>
          </div>
        </div>

        <div className="space-y-6">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white dark:bg-gray-800/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm">
              <div className="flex mb-3">
                {renderStars(testimonial.rating)}
              </div>
              
              <p className="italic text-[#64748b] dark:text-gray-300 text-sm md:text-base leading-relaxed mb-6">
                "{testimonial.quote}"
              </p>
              
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center text-gray-400">
                          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                      `;
                    }}
                  />
                </div>
                <div>
                  <h4 className="font-[700] text-sm text-[#0f172a] dark:text-white">{testimonial.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900/40">
  <div className="px-4 max-w-6xl mx-auto">

    <p className="text-sm text-center uppercase tracking-widest text-black-500 dark:text-black-400 font-semibold mb-14">
      Trusted by global partners
    </p>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-14 items-center">
      {clientLogos.map((logo, index) => (
        <div
          key={index}
          className="flex justify-center items-center transition-all duration-300 hover:scale-110"
        >
          <img
            src={logo}
            alt={`Client Logo ${index + 1}`}
            className="h-12 md:h-14 object-contain opacity-90 hover:opacity-100 transition-all duration-300"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentNode.innerHTML = `
                <div class="h-12 md:h-14 w-32 flex items-center justify-center text-gray-400 border border-gray-300 dark:border-gray-700 rounded-md text-sm font-semibold">
                  CLIENT ${index + 1}
                </div>
              `;
            }}
          />
        </div>
      ))}
    </div>

  </div>
</section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-white dark:bg-gray-900 text-center">
        <div className="max-w-md mx-auto">
          <h3 className="text-2xl md:text-3xl font-[700] text-[#0f172a] dark:text-white mb-4">
            Ready to build your vision?
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mb-8">
            Join our list of successful partners and let's create something extraordinary together.
          </p>
          
          <Link to="/contact" className="w-full">
            <button className="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group">
              <span>Start Your Project</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </Link>
          
          <Link to="/contact" className="w-full">
            <button className="mt-4 w-full bg-transparent text-[#64748b] dark:text-gray-400 font-medium py-3 text-sm hover:text-blue-700 dark:hover:text-blue-400 transition-colors">
              Schedule a Consultation
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default ClientsTestimonialsPage;