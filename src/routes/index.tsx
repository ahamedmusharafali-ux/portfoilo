import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Star, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import teamImg from "@/assets/about-team.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest(".work-card") !== null
      );
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-4 h-4 rounded-full bg-primary pointer-events-none z-50 mix-blend-difference hidden md:block"
      animate={{
        x: position.x - 8,
        y: position.y - 8,
        scale: isHovering ? 3 : 1,
        opacity: position.x === 0 && position.y === 0 ? 0 : 1,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
    />
  );
}

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-4 bg-background/90 backdrop-blur-xl border-b border-foreground/5 shadow-sm" : "py-6 md:py-8 bg-transparent"}`}>
      <div className="mx-auto max-w-[1400px] px-6 md:px-8 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl tracking-tight z-50">
          AHAMED<span className="text-primary">.</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10 text-sm font-medium tracking-widest">
          {["ABOUT", "EXPERIENCE", "EXPERTISE", "CONTACT"].map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} className="relative group overflow-hidden">
              <span className="block transition-transform duration-300 group-hover:-translate-y-full">{l}</span>
              <span className="absolute top-0 left-0 block transition-transform duration-300 translate-y-full group-hover:translate-y-0 text-primary">{l}</span>
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <a href="#contact" className={`hidden sm:inline-flex transition-all duration-500 ${scrolled ? "bg-primary text-primary-foreground px-5 py-2.5 text-xs" : "bg-primary text-primary-foreground px-6 py-3 text-sm"} font-semibold tracking-wider hover:bg-foreground transition items-center gap-2 cursor-pointer`}>
            LET'S CONNECT <ArrowUpRight className="w-4 h-4" />
          </a>
          
          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden z-50 p-2 text-foreground"
          >
            <div className="w-6 h-5 relative flex flex-col justify-between">
              <span className={`w-full h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`w-full h-0.5 bg-current transition-opacity duration-300 ${mobileMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-full h-0.5 bg-current transition-transform duration-300 ${mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <motion.div
        initial={false}
        animate={{ x: mobileMenuOpen ? 0 : "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 bg-background z-40 md:hidden flex flex-col items-center justify-center gap-8 p-6"
      >
        {["ABOUT", "EXPERIENCE", "EXPERTISE", "CONTACT"].map((l) => (
          <a 
            key={l} 
            href={`#${l.toLowerCase()}`} 
            onClick={() => setMobileMenuOpen(false)}
            className="text-4xl font-display tracking-tighter hover:text-primary transition"
          >
            {l}
          </a>
        ))}
        <a 
          href="#contact" 
          onClick={() => setMobileMenuOpen(false)}
          className="mt-8 bg-primary text-primary-foreground px-10 py-5 text-sm font-bold tracking-widest"
        >
          LET'S CONNECT
        </a>
      </motion.div>
    </header>
  );
}

function Hero() {
  const services = ["Growth Strategy", "Performance Marketing", "Revenue Scaling", "Meta Ads"];
  return (
    <section className="relative grid-bg pt-28 pb-12 overflow-hidden noise">
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-primary/15 blur-3xl pointer-events-none" />
      <div className="absolute top-24 right-6 lg:top-32 lg:right-12 flex items-center gap-2 text-[10px] md:text-xs font-mono tracking-widest">
        <span className="w-2 h-2 rounded-full bg-primary blink" /> ACTIVE IN D2D SCALING
      </div>

      <div className="mx-auto max-w-[1400px] px-6 md:px-8 relative">
        <motion.p 
          initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6 }}
          className="text-primary text-xs md:text-sm font-semibold tracking-widest mb-6 flex items-center gap-2"
        >
          <Sparkles className="w-4 h-4" /> AHAMED MUSHARAF ALI
        </motion.p>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:items-center">
          <div className="lg:col-span-8">
            <motion.h1 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(2.5rem,8.5vw,7.5rem)] font-display leading-[0.9]"
            >
              BUILDING<br />
              <span className="text-stroke">BRANDS,</span><br />
              <span className="text-primary italic whitespace-nowrap">NOT JUST ADS</span>
            </motion.h1>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
            <motion.ul 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-3 text-xs md:text-sm"
            >
              {services.map((s, i) => (
                <li key={s} className="flex items-center gap-4 group cursor-default">
                  <span className="text-muted-foreground font-mono">//{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 border-t border-foreground/30 group-hover:border-primary transition" />
                  <span className="font-medium group-hover:text-primary transition">{s}</span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>

        <motion.div 
          initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 md:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end"
        >
          <div className="lg:col-span-5 bg-foreground text-background p-6 md:p-8 text-xs md:text-sm leading-relaxed relative">
            <span className="absolute -top-3 -left-3 bg-primary text-primary-foreground text-[10px] font-bold px-3 py-1 tracking-widest">CEO @ Raphael Creative</span>
            I lead Raphael Creative with a simple belief — brands don’t grow through marketing alone, they grow through the right combination of strategy, storytelling, and execution.
          </div>
          <div className="lg:col-span-7 flex justify-end">
            <button className="flex items-center gap-4 group cursor-pointer" onClick={() => document.getElementById('experience')?.scrollIntoView({behavior: 'smooth'})}>
              <span className="font-semibold tracking-widest text-xs md:text-sm">VIEW EXPERIENCE</span>
              <span className="bg-primary text-primary-foreground p-3 group-hover:translate-x-2 transition">
                <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
              </span>
            </button>
          </div>
        </motion.div>
      </div>

      <div className="mt-16 md:mt-20 border-t border-b border-foreground/15">
        <div className="mx-auto max-w-[1400px] px-6 md:px-8 py-10 md:py-12 flex flex-wrap gap-y-10">
          {[
            ["META/GOOGLE", "PERFORMANCE ADS"],
            ["LEAD GENERATION", "ACQUISITION"],
            ["D2D", "SCALING BRANDS"],
            ["PERSONAL BRANDING", "AUTHORITY"],
          ].map(([n, l], i) => (
            <div key={n} className="w-full sm:w-1/2 xl:w-1/4 group relative pr-4">
              {i > 0 && (
                <span className={`hidden ${i % 2 === 0 ? "xl:block" : "sm:block"} absolute left-0 top-2 bottom-2 w-px bg-foreground/15`} />
              )}
              <div className={i > 0 ? "pl-6 sm:pl-8" : ""}>
                <div className="font-display text-xl md:text-2xl xl:text-[1.5rem] leading-tight group-hover:text-primary transition tracking-tight uppercase">
                  {n}
                </div>
                <div className="mt-2 text-[9px] font-semibold tracking-widest text-muted-foreground uppercase">
                  {l}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Marquee() {
  const items = ["STRATEGY", "★", "METRICS", "★", "CONVERSION", "★", "POSITIONING", "★", "REVENUE", "★", "GROWTH", "★"];
  const row = [...items, ...items];
  return (
    <div className="bg-foreground text-background py-6 overflow-hidden border-y border-background/10">
      <div className="flex marquee-track whitespace-nowrap">
        {row.map((t, i) => (
          <span key={i} className={`px-8 font-display text-3xl md:text-5xl ${t === "★" ? "text-primary" : ""}`}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function About() {
  const [activePhase, setActivePhase] = useState(0);
  const phases = [
    {
      title: "EXECUTION",
      desc: "I started my journey in digital marketing and sales, learning how to generate leads, close clients, and understand real business challenges. This was the foundation of my execution mindset.",
      tag: "Early Days",
      year: "2024"
    },
    {
      title: "GROWTH",
      desc: "Over time, I moved beyond execution into handling projects and leading teams. I discovered how to align marketing activities with overall business goals and outcomes.",
      tag: "Evolution",
      year: "2025"
    },
    {
      title: "STRATEGY",
      desc: "Today, I lead Raphael Creative as CEO. We work closely with emerging brands as growth partners — focusing on brand identity, revenue, and creating scalable systems.",
      tag: "Present",
      year: "2026"
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-full md:w-1/2 h-full bg-gradient-to-b md:bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
        className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] rounded-full border border-primary/10 border-dashed pointer-events-none" 
      />

      <div className="mx-auto max-w-[1400px] px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 lg:gap-24">
          
          {/* Left Column - Timeline */}
          <div className="lg:col-span-5 relative">
            <motion.p 
              initial={{ x: -20, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }} viewport={{ once: true }}
              className="text-primary text-xs md:text-sm font-semibold tracking-[0.2em] mb-6 md:mb-8 flex items-center gap-4"
            >
              <span className="w-8 h-px bg-primary" /> MY JOURNEY
            </motion.p>
            <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-display leading-[0.9] mb-8 md:mb-16">
              THE <span className="text-primary italic">EVOLUTION</span><br className="hidden md:block" /> OF GROWTH
            </h2>
            
            {/* Timeline Container */}
            <div className="relative flex flex-row md:flex-col gap-4 md:gap-12 overflow-x-auto md:overflow-visible pb-6 md:pb-8 md:pl-10 md:border-l border-foreground/10 scrollbar-hide snap-x">
              {/* Vertical Progress Line (Desktop) */}
              <motion.div 
                className="hidden md:block absolute top-0 left-0 w-[2px] bg-primary origin-top"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: (activePhase + 1) / phases.length }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{ height: '100%', transformOrigin: 'top' }}
              />

              {phases.map((p, i) => (
                <div 
                  key={p.title} 
                  className={`relative group cursor-pointer flex-shrink-0 w-[85vw] sm:w-[300px] md:w-auto snap-center border md:border-0 rounded-2xl p-6 md:p-0 transition-colors duration-500 ${activePhase === i ? "border-primary/50 bg-primary/5 md:bg-transparent" : "border-foreground/10 bg-card md:bg-transparent"}`} 
                  onClick={() => setActivePhase(i)}
                >
                  {/* Timeline Dot (Desktop) */}
                  <div className={`hidden md:flex absolute -left-[47px] top-2 w-4 h-4 rounded-full border-2 bg-background transition-colors duration-500 items-center justify-center z-10 ${activePhase === i ? "border-primary" : "border-foreground/20 group-hover:border-primary/50"}`}>
                    {activePhase === i && (
                      <motion.div 
                        layoutId="activeDotDesktop"
                        className="w-2 h-2 rounded-full bg-primary"
                      />
                    )}
                  </div>

                  {/* Horizontal indicator (Mobile) */}
                  <div className="md:hidden w-full h-1 bg-foreground/10 rounded-full mb-4 overflow-hidden relative">
                    {activePhase === i && (
                      <motion.div 
                        layoutId="activeLineMobile"
                        className="absolute top-0 left-0 h-full bg-primary w-full"
                      />
                    )}
                  </div>

                  <div className={`transition-all duration-500 ${activePhase === i ? "opacity-100 md:translate-x-2" : "opacity-50 hover:opacity-80"}`}>
                    <div className="flex items-center gap-4 mb-2">
                      <span className="text-primary font-mono text-xs">{p.year}</span>
                      <span className="text-[10px] font-bold tracking-widest uppercase text-muted-foreground">{p.tag}</span>
                    </div>
                    <div className={`text-2xl md:text-4xl font-display uppercase tracking-tight ${activePhase === i ? "text-foreground" : ""}`}>
                      {p.title}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Dynamic Card */}
          <div className="lg:col-span-7 flex flex-col justify-center relative">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activePhase}
                initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="group bg-foreground text-background p-6 md:p-16 relative overflow-hidden min-h-[350px] md:min-h-[500px] flex flex-col justify-center rounded-[2rem] shadow-2xl"
              >
                {/* Decorative Background inside card */}
                <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground to-primary/20 opacity-50" />
                <motion.div 
                  className="absolute -bottom-20 -right-20 md:-bottom-32 md:-right-32 w-64 h-64 md:w-96 md:h-96 bg-primary rounded-full blur-[80px] md:blur-[100px] opacity-20"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.3, 0.1]
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                />

                <Sparkles className="absolute top-6 right-6 md:top-8 md:right-8 w-8 h-8 md:w-12 md:h-12 text-primary opacity-30 group-hover:opacity-100 group-hover:rotate-12 transition-all duration-500" />
                
                <div className="relative z-10">
                  <div className="inline-flex items-center gap-3 px-3 py-1.5 md:px-4 md:py-2 rounded-full border border-background/20 mb-6 md:mb-8">
                    <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-primary font-mono text-[10px] md:text-xs uppercase tracking-widest">Phase {String(activePhase + 1).padStart(2, '0')}</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display leading-[1.2] md:leading-[1.1] mb-6 md:mb-8 italic">
                    {phases[activePhase].desc.split(' ').map((word, index) => (
                      <motion.span
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="inline-block mr-[0.25em]"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </h3>

                  <motion.div 
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                    className="pt-6 md:pt-8 border-t border-background/10 flex items-center justify-between"
                  >
                    <div className="text-background/60 font-semibold tracking-widest text-[9px] md:text-xs uppercase">
                      AHAMED MUSHARAF ALI<br/>
                      <span className="text-primary mt-1 block">CEO @ Raphael Creative</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8">
              {[
                { label: "STRATEGY", val: "100%" },
                { label: "EXECUTION", val: "100%" },
                { label: "RESULTS", val: "100%" },
                { label: "GROWTH", val: "∞" },
              ].map((stat, i) => (
                <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="bg-card border border-foreground/10 p-4 md:p-6 text-center rounded-[1rem] hover:border-primary hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group cursor-default"
                >
                  <div className="text-xl md:text-2xl font-display text-primary group-hover:scale-110 transition-transform">{stat.val}</div>
                  <div className="mt-1 md:mt-2 text-[9px] md:text-[10px] font-bold tracking-widest text-muted-foreground uppercase group-hover:text-foreground transition-colors">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const EXPERIENCES = [
  {
    role: "Chief Executive Officer",
    company: "Raphael Creative",
    date: "Feb 2026 - Present",
    desc: "Scaling D2D and purpose-driven brands by handling their branding, marketing, and growth strategies end-to-end. Working closely with emerging brands as growth partners to create long-term impact.",
  },
  {
    role: "Digital Marketing & Business Analyst",
    company: "Raphael Creative",
    date: "Aug 2025 - Feb 2026",
    desc: "Worked at the intersection of digital marketing and business analysis. Handled campaign planning across digital platforms and tracked key metrics to align marketing activities with overall business goals.",
  },
  {
    role: "Sales And Digital Marketing Associate",
    company: "ZenBasket",
    date: "Feb 2025 - Jun 2025",
    desc: "Specialized in lead generation, digital strategy, and client relationship management. Leveraged CRM tools and social media platforms to drive measurable business growth.",
  },
  {
    role: "Tamil Content Writer",
    company: "Voice of Tamilnadu Foundation",
    date: "Jan 2024 - Dec 2024",
    desc: "Developed high-quality, purpose-driven Tamil content to support the foundation's social awareness initiatives. Authored scripts and adapted complex topics into emotionally engaging narratives.",
  }
];

function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-[1400px] px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          <div className="lg:col-span-3 lg:pt-4">
            <p className="text-primary text-sm font-semibold tracking-widest">— EXPERIENCE</p>
          </div>
          <div className="lg:col-span-9">
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-display">
              CAREER <span className="text-primary">JOURNEY</span> &<br />ROLES
            </h2>
          </div>
        </div>

        <div className="flex flex-col gap-[15vh] md:gap-[30vh] pb-[20vh] md:pb-[40vh]">
          {EXPERIENCES.map((exp, i) => (
            <motion.div 
              key={i}
              initial={{ y: 80, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.8 }}
              className="sticky group border border-foreground/15 p-8 md:p-24 bg-card hover:bg-foreground hover:text-background transition-colors duration-500 flex flex-col lg:flex-row lg:items-start justify-between gap-10 min-h-[40vh] md:min-h-[60vh] shadow-2xl rounded-[var(--radius-xl)]"
              style={{ top: `calc(80px + ${i * 30}px)` }}
            >
              <div className="md:w-full lg:w-1/3">
                <div className="text-xs font-mono text-primary mb-3 md:mb-4">{exp.date}</div>
                <h3 className="font-display text-2xl md:text-5xl leading-[0.9]">{exp.role}</h3>
                <div className="mt-3 md:mt-4 text-[10px] md:text-sm font-semibold tracking-[0.2em] opacity-80 uppercase">{exp.company}</div>
              </div>
              <div className="md:w-full lg:w-2/3 lg:pl-12 lg:border-l border-foreground/15 group-hover:border-background/20">
                <p className="text-base md:text-xl leading-relaxed opacity-80 font-medium">{exp.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const EXPERTISE = [
  { 
    n: "01", 
    title: "BRAND BUILDING", 
    desc: "Creating strong brand identity and positioning that stands out and resonates with the target market.", 
    tactics: ["Audience Research", "Brand Archetyping", "Visual Storytelling", "Strategic Positioning"],
    tags: ["POSITIONING", "STORYTELLING", "IDENTITY"] 
  },
  { 
    n: "02", 
    title: "PERFORMANCE MARKETING", 
    desc: "Running data-driven campaigns focused on lead generation, conversion, and measurable ROI.", 
    tactics: ["Full-Funnel Meta Ads", "Google Search & Shopping", "Lead Magnet Strategy", "A/B Creative Testing"],
    tags: ["META ADS", "GOOGLE ADS", "LEAD GEN"], 
    dark: true 
  },
  { 
    n: "03", 
    title: "SCALING D2D BRANDS", 
    desc: "End-to-end growth strategies tailored for direct-to-consumer and early-stage brands.", 
    tactics: ["Customer Acquisition Cost Optimization", "LTV Maximization", "Retention Systems", "Market Expansion"],
    tags: ["E-COMMERCE", "ACQUISITION", "RETENTION"] 
  },
  { 
    n: "04", 
    title: "MARKETING SYSTEMS", 
    desc: "Building scalable marketing engines and automation workflows that consistently deliver results.", 
    tactics: ["CRM & Email Automation", "Data Dashboards", "Workflow Optimization", "Revenue Forecasting"],
    tags: ["CRM", "AUTOMATION", "ANALYTICS"], 
    dark: true 
  },
];

function Expertise() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="expertise" className="py-32 bg-muted relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-full h-px bg-foreground/5 pointer-events-none" />
      <div className="mx-auto max-w-[1400px] px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-12 md:mb-20">
          <div className="lg:col-span-4">
            <p className="text-primary text-sm font-semibold tracking-widest mb-4 md:mb-6">— EXPERTISE</p>
            <h2 className="text-[clamp(2rem,5vw,4.5rem)] font-display leading-[0.9]">
              STRATEGIES THAT DRIVE<br /><span className="text-primary italic">REAL</span> GROWTH
            </h2>
          </div>
          <div className="lg:col-span-8 flex items-end">
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl border-l-2 border-primary/20 pl-6 md:pl-8">
              We work closely with emerging brands as growth partners — focusing on building strong brand identity, driving revenue, and creating scalable systems.
            </p>
          </div>
        </div>

        <div className="flex flex-col border-t border-foreground/10">
          {EXPERTISE.map((s, i) => (
            <motion.div 
              key={s.n} 
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setHoveredIndex(hoveredIndex === i ? null : i)}
              className={`group relative border-b border-foreground/10 py-8 md:py-10 px-2 md:px-4 transition-all duration-700 cursor-default ${s.dark ? "hover:bg-foreground hover:text-background" : "hover:bg-background"}`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-center relative z-10">
                <div className="lg:col-span-1">
                  <span className={`text-4xl md:text-6xl font-display opacity-10 transition-opacity duration-500 group-hover:opacity-100 ${s.dark ? "group-hover:text-primary" : "group-hover:text-primary"}`}>{s.n}</span>
                </div>
                <div className="lg:col-span-5">
                  <h3 className={`font-display text-2xl md:text-5xl tracking-tight leading-none transition-colors duration-500 ${s.dark ? "group-hover:text-background" : ""}`}>
                    {s.title}
                  </h3>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: hoveredIndex === i ? "auto" : 0, opacity: hoveredIndex === i ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <p className={`mt-4 md:mt-6 text-base md:text-lg leading-relaxed transition-colors duration-500 ${s.dark ? "text-foreground/70 group-hover:text-background/70" : "text-muted-foreground"}`}>
                      {s.desc}
                    </p>
                  </motion.div>
                </div>
                <div className="lg:col-span-6">
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {s.tags.map((t) => (
                      <span key={t} className={`px-3 md:px-4 py-1 border text-[9px] md:text-[10px] font-bold tracking-widest transition-all duration-500 ${s.dark ? "border-foreground/10 text-foreground/60 group-hover:border-primary group-hover:bg-primary group-hover:text-white" : "border-foreground/10 text-muted-foreground group-hover:bg-foreground group-hover:text-background"}`}>
                        {t}
                      </span>
                    ))}
                  </div>
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: hoveredIndex === i ? "auto" : 0, opacity: hoveredIndex === i ? 1 : 0 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-8 grid grid-cols-2 gap-4">
                      {s.tactics.map((tactic) => (
                        <div key={tactic} className="flex items-center gap-3">
                          <div className={`w-1 h-1 rounded-full transition-colors duration-500 ${s.dark ? "bg-primary group-hover:bg-primary" : "bg-primary"}`} />
                          <span className={`text-xs font-semibold tracking-wide transition-colors duration-500 ${s.dark ? "text-foreground group-hover:text-background/80" : "text-foreground"}`}>{tactic}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <div className="absolute top-1/2 right-12 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:translate-x-4">
                <ArrowUpRight className="w-12 h-12 text-primary" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contact" className="py-32 bg-foreground text-background grid-bg relative overflow-hidden noise">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-primary/30 blur-3xl pointer-events-none" />
      <div className="mx-auto max-w-[1400px] px-6 md:px-8 text-center relative">
        <p className="text-primary text-xs md:text-sm font-semibold tracking-widest mb-6 uppercase">— LET'S CONNECT</p>
        <h2 className="text-[clamp(2.5rem,8vw,8rem)] font-display leading-[0.9]">
          BUILDING SOMETHING<br /><span className="text-primary italic">MEANINGFUL?</span>
        </h2>
        <p className="mt-6 md:mt-8 max-w-xl mx-auto text-sm md:text-base text-background/70 px-4">
          This is just the beginning — the goal is to build something that goes beyond services and creates real value in how brands are built and scaled.
        </p>
        <a href="mailto:ahamedmusharafali@gmail.com" className="mt-10 md:mt-12 bg-primary text-primary-foreground px-8 md:px-10 py-4 md:py-5 text-xs md:text-sm font-semibold tracking-widest hover:bg-paper hover:text-foreground transition inline-flex items-center gap-4 cursor-pointer">
          REACH OUT <ArrowRight className="w-5 h-5" />
        </a>
        <div className="mt-8 md:mt-10 text-[10px] md:text-sm text-background/60 uppercase tracking-widest">
          OR EMAIL ME DIRECTLY AT <br className="md:hidden" /> <a href="mailto:ahamedmusharafali@gmail.com" className="text-background underline underline-offset-4">ahamedmusharafali@gmail.com</a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background/70 border-t border-background/10">
      <div className="mx-auto max-w-[1400px] px-6 md:px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
        <div className="font-display text-background text-xl">AHAMED<span className="text-primary">.</span></div>
        <div>© 2026 AHAMED MUSHARAF ALI. ALL RIGHTS RESERVED.</div>
        <div className="flex gap-6 text-xs tracking-widest">
          <a href="https://www.linkedin.com/in/ahamed-musharaf-ali-699132229/" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition cursor-pointer">LINKEDIN</a>
          <a href="#" className="hover:text-primary transition cursor-pointer">Raphael Creative</a>
        </div>
      </div>
    </footer>
  );
}

function Index() {
  return (
    <main className="min-h-screen">
      <CustomCursor />
      <Nav />
      <Hero />
      <Marquee />
      <About />
      <Experience />
      <Expertise />
      <CTA />
      <Footer />
    </main>
  );
}
