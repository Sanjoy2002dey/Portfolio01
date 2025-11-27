import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  Code2, 
  Database, 
  Server, 
  Terminal,
  Youtube,
  MessageSquare,
  Brain,
  Monitor,
  Heart,
  Trophy,
  Award,
  TrendingUp,
  ChevronRight,
  Download,
  Calendar,
  MapPin
} from 'lucide-react';

const Typewriter = ({ words }) => {
  const [currentWord, setCurrentWord] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const word = words[wordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (charIndex < word.length) {
          setCurrentWord(word.substring(0, charIndex + 1));
          setCharIndex(charIndex + 1);
        } else {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        if (charIndex > 0) {
          setCurrentWord(word.substring(0, charIndex - 1));
          setCharIndex(charIndex - 1);
        } else {
          setIsDeleting(false);
          setWordIndex((wordIndex + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 150);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, wordIndex, words]);

  return (
    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent font-bold">
      {currentWord}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const TiltCard = ({ children, className = "" }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -5; 
    const rotateY = ((x - centerX) / centerX) * 5;

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotation({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative transition-all duration-300 ease-out transform-gpu ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale3d(${isHovered ? 1.01 : 1}, ${isHovered ? 1.01 : 1}, 1)`,
        transformStyle: 'preserve-3d',
      }}
    >
      {children}
    </div>
  );
};

const SkillCategory = ({ title, icon: Icon, skills, color }) => (
  <div className="bg-white/5 backdrop-blur-sm border border-gray-800/50 p-5 sm:p-6 rounded-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 h-full group">
    <div className={`flex items-center gap-3 mb-5 ${color}`}>
      <div className="p-2 bg-gray-900/50 rounded-lg group-hover:scale-110 transition-transform duration-300">
        <Icon size={22} className="sm:w-6 sm:h-6" />
      </div>
      <h3 className="font-semibold text-base sm:text-lg text-gray-100 tracking-tight">{title}</h3>
    </div>
    <div className="flex flex-wrap gap-2">
      {skills.map((skill, idx) => (
        <span 
          key={idx} 
          className="text-xs sm:text-sm font-medium text-gray-300 bg-gray-900/60 border border-gray-700/50 px-3 py-1.5 rounded-lg hover:bg-gray-800/80 hover:border-cyan-500/40 hover:text-white transition-all duration-200 cursor-default"
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const AchievementItem = ({ title, subtitle, date, link, icon: Icon, color }) => (
  <a href={link} target="_blank" rel="noreferrer" className="block group">
    <div className="flex items-start gap-4 p-5 sm:p-6 rounded-xl bg-white/5 border border-gray-800/50 hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300">
      <div className={`p-3 sm:p-3.5 rounded-xl bg-gray-900/80 border border-gray-800/50 ${color} group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-300 flex-shrink-0`}>
        <Icon size={22} className="sm:w-6 sm:h-6" />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-sm sm:text-base text-white mb-1 group-hover:text-cyan-400 transition-colors duration-200">{title}</h4>
        <p className="text-xs sm:text-sm text-gray-400 mb-2 line-clamp-2">{subtitle}</p>
        {date && (
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <Calendar size={12} />
            <span>{date}</span>
          </div>
        )}
      </div>
      <ChevronRight size={18} className="text-gray-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition-all duration-200 flex-shrink-0 mt-1" />
    </div>
  </a>
);

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const projects = [
    {
      title: "Sanjoy_Tube",
      desc: "Full-stack MERN video streaming platform with robust authentication, video management, and cloud integration for scalable media delivery.",
      tech: ["MERN Stack", "Redux", "Cloudinary", "JWT"],
      link: "https://github.com/Sanjoy2002dey/Sanjoy_Tube",
      icon: Youtube,
      color: "text-red-500",
      featured: true
    },
    {
      title: "Gemini Clone",
      desc: "AI-powered conversational interface replicating Google's Gemini experience with optimized performance and modern React architecture.",
      tech: ["React.js", "Gemini API", "Vite"],
      link: "https://github.com/Sanjoy2002dey/Gemini-Clone",
      icon: Brain,
      color: "text-blue-400",
      featured: false
    },
    {
      title: "Real-Time Chat Application",
      desc: "Enterprise-grade Java chat system with multi-client support, socket programming, and intuitive Swing-based user interface.",
      tech: ["Java", "Socket.io", "Java Swing"],
      link: "https://github.com/Sanjoy2002dey/Java-Project",
      icon: MessageSquare,
      color: "text-green-400",
      featured: false
    },
    {
      title: "Dynamic Quiz Platform",
      desc: "Interactive web-based quiz application featuring real-time scoring, dynamic question rendering, and responsive design patterns.",
      tech: ["JavaScript", "HTML5", "CSS3"],
      link: "https://github.com/Sanjoy2002dey/Quiz-App",
      icon: Monitor,
      color: "text-purple-400",
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-x-hidden font-sans selection:bg-cyan-500/20">
      
      {/* Subtle grid background */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-[0.03]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)] bg-[size:4rem_4rem]"></div>
      </div>

      {/* Ambient light effects */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-gray-950/95 backdrop-blur-xl border-b border-gray-800/50 shadow-lg shadow-black/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 flex justify-between items-center">
          <div className="text-xl sm:text-2xl font-bold">
            <span className="text-white">Sanjoy</span>
            <span className="text-cyan-400">.</span>
          </div>
          <div className="flex gap-6 sm:gap-8 text-sm font-medium">
            <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">About</a>
            <a href="#skills" className="text-gray-400 hover:text-white transition-colors duration-200">Skills</a>
            <a href="#projects" className="text-gray-400 hover:text-white transition-colors duration-200">Projects</a>
            <a href="#achievements" className="text-gray-400 hover:text-white transition-colors duration-200 hidden sm:inline">Achievements</a>
          </div>
        </div>
      </nav>

      <main className="relative z-10 pt-24 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        
        {/* HERO SECTION */}
        <section id="about" className="min-h-[90vh] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 mb-20 sm:mb-32">
          <div className="flex-1 space-y-6 sm:space-y-8 order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs sm:text-sm font-medium backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span>Available for Opportunities</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight">
              Hello, I'm<br />
              <Typewriter words={["Sanjoy Dey"]} />
            </h1>

            <p className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed">
              <span className="text-white font-medium">MERN Stack Developer</span> specializing in building scalable, 
              high-performance web applications. Transforming complex problems into elegant digital solutions 
              with modern technologies and best practices.
            </p>

            <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 justify-center lg:justify-start">
              <a 
                href="https://github.com/Sanjoy2002dey" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 bg-white text-gray-900 px-6 py-3 rounded-xl font-medium hover:bg-gray-100 transition-all duration-200 hover:shadow-lg hover:shadow-white/20 hover:-translate-y-0.5"
              >
                <Github size={20} /> View GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/sanjoy-dey-713b67228/" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center gap-2 bg-cyan-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-cyan-600 transition-all duration-200 hover:shadow-lg hover:shadow-cyan-500/30 hover:-translate-y-0.5"
              >
                <Linkedin size={20} /> LinkedIn
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=Sanjoy.sanjoydey@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-gray-800/80 border border-gray-700/50 text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 hover:border-gray-600 transition-all duration-200 hover:-translate-y-0.5"
              >
                <Mail size={20} /> Contact
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 pt-8 sm:pt-12">
              <div className="bg-white/5 backdrop-blur-sm border border-gray-800/50 p-4 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">5★</div>
                <div className="text-xs sm:text-sm text-gray-400">HackerRank</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-gray-800/50 p-4 rounded-xl">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">100+</div>
                <div className="text-xs sm:text-sm text-gray-400">DSA Problems</div>
              </div>
              <div className="bg-white/5 backdrop-blur-sm border border-gray-800/50 p-4 rounded-xl col-span-2 sm:col-span-1">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400 mb-1">4+</div>
                <div className="text-xs sm:text-sm text-gray-400">Major Projects</div>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="flex-1 flex justify-center order-1 lg:order-2 w-full max-w-md lg:max-w-none">
            <TiltCard className="w-full max-w-sm lg:max-w-md">
              <div className="relative rounded-2xl overflow-hidden border border-gray-800/50 bg-gradient-to-br from-gray-900 to-gray-950 p-1 shadow-2xl shadow-black/20">
                <div className="relative rounded-xl overflow-hidden bg-gray-950">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
                  <img 
                    src="photo.jpg" 
                    alt="Sanjoy Dey" 
                    className="w-full h-[400px] sm:h-[500px] object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Sanjoy Dey</h3>
                    <div className="flex items-center gap-2 text-cyan-400 mb-3">
                      <Code2 size={18} />
                      <span className="text-sm sm:text-base">MERN Stack Developer</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <MapPin size={14} />
                      <span>Open to Remote & Relocation</span>
                    </div>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="py-16 sm:py-24 mb-20 sm:mb-32">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Technical <span className="text-cyan-400">Expertise</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Comprehensive skill set across modern web development technologies
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
            <TiltCard>
              <SkillCategory 
                title="Frontend" 
                icon={Monitor} 
                color="text-cyan-400"
                skills={["React.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "Responsive Design"]} 
              />
            </TiltCard>
            
            <TiltCard>
              <SkillCategory 
                title="Backend" 
                icon={Server} 
                color="text-green-400"
                skills={["Node.js", "Express.js", "RESTful APIs", "JSON", "JWT Auth"]} 
              />
            </TiltCard>
            
            <TiltCard>
              <SkillCategory 
                title="Languages" 
                icon={Terminal} 
                color="text-yellow-400"
                skills={["JavaScript", "Java", "C Programming"]} 
              />
            </TiltCard>
            
            <TiltCard>
              <SkillCategory 
                title="Database & Tools" 
                icon={Database} 
                color="text-purple-400"
                skills={["MongoDB", "MySQL", "Git/GitHub", "VS Code", "IntelliJ IDEA"]} 
              />
            </TiltCard>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="py-16 sm:py-24 mb-20 sm:mb-32">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 sm:mb-16 gap-4">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3">Featured <span className="text-cyan-400">Projects</span></h2>
              <p className="text-gray-400 text-base sm:text-lg">Building scalable solutions with modern technologies</p>
            </div>
            <a 
              href="https://github.com/Sanjoy2002dey" 
              target="_blank" 
              rel="noreferrer" 
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-medium"
            >
              View All Projects <ChevronRight size={18} />
            </a>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, idx) => (
              <TiltCard key={idx} className={project.featured ? 'lg:col-span-2' : ''}>
                <div className="h-full bg-white/5 backdrop-blur-sm border border-gray-800/50 rounded-xl overflow-hidden hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 group">
                  <div className="p-6 sm:p-8">
                    <div className="flex justify-between items-start mb-5">
                      <div className={`p-3 sm:p-4 rounded-xl bg-gray-900/80 border border-gray-800/50 ${project.color} group-hover:scale-110 group-hover:border-cyan-500/40 transition-all duration-300`}>
                        <project.icon size={24} className="sm:w-7 sm:h-7" />
                      </div>
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noreferrer" 
                        className="text-gray-500 hover:text-white transition-colors duration-200"
                      >
                        <ExternalLink size={20} />
                      </a>
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-200">
                      {project.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-gray-400 mb-6 leading-relaxed">
                      {project.desc}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t, i) => (
                        <span 
                          key={i} 
                          className="text-xs sm:text-sm font-medium text-gray-400 bg-gray-900/60 border border-gray-800/50 px-3 py-1.5 rounded-lg"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* ACHIEVEMENTS SECTION */}
        <section id="achievements" className="py-16 sm:py-24">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              Achievements & <span className="text-cyan-400">Experience</span>
            </h2>
            <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
              Continuous learning through competitions and community involvement
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            
            <div className="lg:col-span-2 space-y-5">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                <Trophy className="text-yellow-500" size={24} /> 
                Competitions & Hackathons
              </h3>
               
              <AchievementItem 
                title="Hack4Bengal Participation" 
                subtitle="Participated in one of Bengal's largest hackathons with focus on innovative problem-solving and collaborative development."
                date="2024"
                icon={Code2}
                color="text-orange-400"
                link="https://www.linkedin.com/posts/sanjoy-dey-713b67228_hack4bengal-github-redbull-activity-7213495395077742592-phC6"
              />

              <AchievementItem 
                title="Smart India Hackathon" 
                subtitle="Successfully completed internal round and received certificate of participation for innovative solution development."
                date="2023"
                icon={Award}
                color="text-blue-400"
                link="https://www.linkedin.com/posts/sanjoy-dey-713b67228_internal-hackathon-certificate-activity-7114603724504780800-KAh-"
              />
            </div>

            <div className="space-y-5">
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                <Heart className="text-red-500" size={24} /> 
                Community
              </h3>
               
              <div className="p-6 sm:p-8 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-gray-800/50 hover:border-cyan-500/30 transition-all duration-300 group">
                <div className="mb-4">
                  <Heart className="text-red-500 mb-4 group-hover:scale-110 transition-transform duration-300" size={32} />
                </div>
                <h4 className="font-semibold text-lg sm:text-xl mb-3 text-white">Community Volunteer</h4>
                <p className="text-sm sm:text-base text-gray-400 mb-4 leading-relaxed">
                  Active contributor to tech community events, fostering collaboration and knowledge sharing among developers.
                </p>
                <a 
                  href="https://www.linkedin.com/posts/sanjoy-dey-713b67228_hey-connections-i-am-very-excited-to-activity-7092899698423853056-hROy" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors duration-200"
                >
                  Learn More <ChevronRight size={16} />
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="text-center pt-16 sm:pt-24 pb-8 sm:pb-12 border-t border-gray-800/50 mt-16 sm:mt-24">
          <div className="mb-6">
            <h3 className="text-2xl sm:text-3xl font-bold mb-2">Let's Build Something Amazing</h3>
            <p className="text-gray-400 text-sm sm:text-base">Open to full-time opportunities and freelance projects</p>
          </div>
          
          <div className="flex justify-center gap-4 sm:gap-6 mb-8">
            <a 
              href="https://github.com/Sanjoy2002dey" 
              className="p-3 bg-white/5 border border-gray-800/50 rounded-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-200"
              target="_blank"
              rel="noreferrer"
            >
              <Github size={22} />
            </a>
            <a 
              href="https://www.linkedin.com/in/sanjoy-dey-713b67228/" 
              className="p-3 bg-white/5 border border-gray-800/50 rounded-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-200"
              target="_blank"
              rel="noreferrer"
            >
              <Linkedin size={22} />
            </a>
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=Sanjoy.sanjoydey@gmail.com"
              className="p-3 bg-white/5 border border-gray-800/50 rounded-xl hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Mail size={22} />
            </a>
          </div>
          
          <p className="text-sm text-gray-500">
            © Sanjoy Dey. Designed & Developed with precision.
          </p>
        </footer>

      </main>
    </div>
  );
}