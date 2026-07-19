import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from './components/SectionHeading'
import Lightbox from './components/Lightbox'
import './App.css'

const createBadgeImage = (title, issuer, accent = '#dc2626') => {
  const svg = `
    <svg width="320" height="320" viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg">
      <rect width="320" height="320" rx="38" fill="#0b0b0e"/>
      <rect x="24" y="24" width="272" height="272" rx="30" fill="url(#bg)" stroke="${accent}" stroke-width="3"/>
      <circle cx="160" cy="120" r="64" fill="${accent}" opacity="0.2"/>
      <path d="M160 76c22 0 40 18 40 40s-18 40-40 40-40-18-40-40 18-40 40-40Z" fill="${accent}"/>
      <rect x="90" y="180" width="140" height="8" rx="4" fill="${accent}" opacity="0.65"/>
      <rect x="90" y="200" width="110" height="8" rx="4" fill="#f5f5f5" opacity="0.8"/>
      <rect x="90" y="220" width="84" height="8" rx="4" fill="#f5f5f5" opacity="0.6"/>
      <defs>
        <linearGradient id="bg" x1="40" x2="280" y1="40" y2="280" gradientUnits="userSpaceOnUse">
          <stop stop-color="#17171d"/>
          <stop offset="1" stop-color="#1f1f2a"/>
        </linearGradient>
      </defs>
      <text x="160" y="154" text-anchor="middle" font-family="Inter,Segoe UI,sans-serif" font-size="24" font-weight="700" fill="#ffffff">${title}</text>
      <text x="160" y="272" text-anchor="middle" font-family="Inter,Segoe UI,sans-serif" font-size="16" fill="#d4d4d8">${issuer}</text>
    </svg>
  `

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const createCertificatePreview = (title, issuer, year, accent = '#dc2626') => {
  const svg = `
    <svg width="880" height="560" viewBox="0 0 880 560" xmlns="http://www.w3.org/2000/svg">
      <rect width="880" height="560" rx="48" fill="#09090b"/>
      <rect x="28" y="28" width="824" height="504" rx="38" fill="#0f1117" stroke="${accent}" stroke-width="4"/>
      <rect x="48" y="48" width="784" height="136" rx="28" fill="${accent}" opacity="0.12"/>
      <text x="64" y="120" font-family="Inter,Segoe UI,sans-serif" font-size="32" font-weight="700" fill="#ffffff">${title}</text>
      <text x="64" y="170" font-family="Inter,Segoe UI,sans-serif" font-size="18" fill="#d4d4d8">Issued by ${issuer}</text>
      <text x="64" y="210" font-family="Inter,Segoe UI,sans-serif" font-size="16" fill="#9ca3af">Issue year: ${year}</text>
      <line x1="64" y1="236" x2="816" y2="236" stroke="#303244" stroke-width="2"/>
      <text x="64" y="280" font-family="Inter,Segoe UI,sans-serif" font-size="18" fill="#f8fafc">Verified achievement in offensive security fundamentals with a strong focus on structured methodology and professional delivery.</text>
      <rect x="64" y="330" width="240" height="80" rx="20" fill="rgba(255,255,255,0.08)"/>
      <text x="84" y="362" font-family="Inter,Segoe UI,sans-serif" font-size="16" fill="#f8fafc">Certificate ID</text>
      <text x="84" y="394" font-family="Inter,Segoe UI,sans-serif" font-size="28" font-weight="700" fill="#ffffff">NOH-2024</text>
      <circle cx="754" cy="438" r="62" fill="${accent}" opacity="0.22"/>
      <text x="754" y="430" text-anchor="middle" font-family="Inter,Segoe UI,sans-serif" font-size="22" font-weight="700" fill="#ffffff">SEC</text>
      <text x="754" y="458" text-anchor="middle" font-family="Inter,Segoe UI,sans-serif" font-size="14" fill="#d4d4d8">Verified</text>
    </svg>
  `

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]

const aboutHighlights = [
  'Red Team curiosity grounded in structured adversary simulation',
  'Hands-on reporting with clear remediation guidance',
  'Security-minded development and collaborative research',
]

const educationItems = [
  {
    title: 'Cybersecurity Engineering',
    institution: 'Batam State Polytechnic',
    period: '08/2023 - Present',
    detail: 'Maintaining a 3.90 GPA while building a foundation in offensive security, networking, and defensive operations.',
  },
  {
    title: 'Multimedia',
    institution: 'State Vocational High School 7 Batam',
    period: '07/2020 - 05/2023',
    detail: 'Developed an early interest in technical storytelling, visual communication, and problem-solving.',
  },
]

const experiences = [
  {
    title: 'Cyber Ranger Member',
    company: 'Polibatam Cyber Labs',
    period: '12/2024 - Present',
    image: '/images/experience-cyber-ranger.webp',
    bullets: [
      'Collaborated with peers on external cybersecurity events and outreach activities.',
      'Co-created challenge content and contributed to recruitment-driven workshops.',
      'Helped shape the creative and technical narrative of the community.',
    ],
  },
  {
    title: 'Cyber Division Member',
    company: 'Batam Linux User Group',
    period: '12/2023 - 01/2026',
    image: '/images/experience-blug.webp',
    bullets: [
      'Delivered awareness sessions and technical talks for the local community.',
      'Supported event logistics and workshop facilitation for learning-focused initiatives.',
      'Strengthened community engagement around Linux, security, and practical training.',
    ],
  },
]

const projects = [
  {
    title: 'Web Application VAPT',
    intro: 'A structured assessment of a vulnerable web application in a controlled lab environment.',
    summary:
      'I mapped authentication pathways, tested access control weaknesses, and validated an IDOR flow using OWASP WSTG methodology to ensure the report was actionable and technically credible.',
    layout: 'A',
    image: '/images/project-vapt.webp',
    tags: ['OWASP', 'IDOR', 'VAPT'],
    images: [
      {
        src: '/images/project-vapt.webp',
        alt: 'Web application vulnerability assessment workflow',
        title: 'Web Application VAPT',
        description: 'A controlled assessment that traced data exposure paths and documented exploitable conditions with measured rigor.',
      },
      {
        src: '/images/project-wordpress.webp',
        alt: 'Application security report preview',
        title: 'Web Application VAPT',
        description: 'The second view highlights how remediation steps and evidence are packaged for easier technical review.',
      },
    ],
  },
  {
    title: 'WordPress Security Review',
    intro: 'A browser-focused review that examined headers, clickjacking exposure, and configuration posture.',
    summary:
      'The project translated security findings into practical engineering recommendations so the remediation plan felt realistic for a real-world deployment.',
    layout: 'A',
    image: '/images/project-wordpress.webp',
    tags: ['WordPress', 'Headers', 'Clickjacking'],
    images: [
      {
        src: '/images/project-wordpress.webp',
        alt: 'WordPress security review board',
        title: 'WordPress Security Review',
        description: 'An overview of the environment, attack surface, and the recommended hardening steps for deployment security.',
      },
      {
        src: '/images/project-siem.webp',
        alt: 'Security review findings summary',
        title: 'WordPress Security Review',
        description: 'A second perspective showing how findings transition into prioritized remediation and validation tasks.',
      },
    ],
  },
  {
    title: 'SIEM Development & SOC Simulation',
    intro: 'A layered security monitoring setup combining network segmentation and visibility tooling.',
    summary:
      'I connected practical defensive engineering with monitoring concepts, including VLAN segmentation, detection workflows, and centralised visibility.',
    layout: 'A',
    image: '/images/project-siem.webp',
    tags: ['SIEM', 'Wazuh', 'Snort'],
    images: [
      {
        src: '/images/project-siem.webp',
        alt: 'SIEM architecture and monitoring dashboard',
        title: 'SIEM Development & SOC Simulation',
        description: 'The first image captures the monitoring backbone that supports a practical SOC-style alerting workflow.',
      },
      {
        src: '/images/project-architecture.webp',
        alt: 'Security architecture diagram',
        title: 'SIEM Development & SOC Simulation',
        description: 'The second image illustrates how the environment connects telemetry, detection, and response processes.',
      },
    ],
  },
  {
    title: 'Well-Architected SIEM Implementation',
    intro: 'A security operations blueprint centred on observability, log collection, and polished dashboards.',
    summary:
      'This initiative focused on making SOC-style visibility feel operationally useful — from architecture to reporting without losing simplicity.',
    layout: 'A',
    image: '/images/project-architecture.webp',
    tags: ['Graylog', 'Grafana', 'Architecture'],
    images: [
      {
        src: '/images/project-architecture.webp',
        alt: 'SIEM implementation architecture board',
        title: 'Well-Architected SIEM Implementation',
        description: 'A focused view of the collection and visualisation layer that supports monitoring goals.',
      },
      {
        src: '/images/project-vapt.webp',
        alt: 'Operational dashboard preview',
        title: 'Well-Architected SIEM Implementation',
        description: 'The second image highlights how logging and reporting can remain clear and readable for operators.',
      },
    ],
  },
]

const skillGroups = [
  {
    title: 'Security Testing',
    items: ['Burp Suite', 'Nmap', 'SQLMap', 'OWASP ZAP', 'Wireshark'],
  },
  {
    title: 'Networking',
    items: ['VLAN Design', 'Routing & Switching', 'Firewalling', 'pfSense / OPNsense'],
  },
  {
    title: 'SIEM',
    items: ['Wazuh', 'Graylog', 'Grafana', 'Snort IDS/IPS'],
  },
  {
    title: 'Programming',
    items: ['Python', 'Automation Scripting', 'Linux Tooling', 'Report Writing'],
  },
  {
    title: 'Operating Systems',
    items: ['Ubuntu', 'Kali Linux', 'Windows', 'Networking Labs'],
  },
]

const certifications = [
  {
    title: 'System Administrator Cyber Ranger Certification',
    issuer: 'Cyber Ranger',
    year: '2024',
    badge: createBadgeImage('SACR', 'Cyber Ranger', '#dc2626'),
    images: [
      {
        src: createBadgeImage('SACR', 'Cyber Ranger', '#dc2626'),
        alt: 'Cyber Ranger certification badge',
        title: 'Certification badge',
        description: 'A badge-style visual representing the Cyber Ranger systems administrator credential.',
        meta: 'Cyber Ranger • 2024',
      },
      {
        src: createCertificatePreview('System Administrator Cyber Ranger Certification', 'Cyber Ranger', '2024', '#dc2626'),
        alt: 'Certificate preview for Cyber Ranger certification',
        title: 'Official Cyber Ranger certificate',
        description: 'A polished preview of the certificate layout, showing issuer, year, and verified achievement details.',
        meta: 'Cyber Ranger • 2024',
      },
    ],
  },
  {
    title: 'Cybersecurity',
    issuer: 'Talent Scouting Academy',
    year: '2024',
    badge: createBadgeImage('Cybersecurity', 'Talent Scouting Academy', '#ef4444'),
    images: [
      {
        src: createBadgeImage('Cybersecurity', 'Talent Scouting Academy', '#ef4444'),
        alt: 'Talent Scouting Academy cybersecurity badge',
        title: 'Certification badge',
        description: 'A modern badge representing the cybersecurity certification from Talent Scouting Academy.',
        meta: 'Talent Scouting Academy • 2024',
      },
      {
        src: createCertificatePreview('Cybersecurity Certification', 'Talent Scouting Academy', '2024', '#ef4444'),
        alt: 'Certificate preview for Talent Scouting Academy certification',
        title: 'Certificate preview',
        description: 'A refined certificate preview designed to showcase the achievement in a premium layout.',
        meta: 'Talent Scouting Academy • 2024',
      },
    ],
  },
  {
    title: 'Cybersecurity Essentials',
    issuer: 'Cisco Networking Academy',
    year: '2024',
    badge: createBadgeImage('Essentials', 'Cisco', '#f43f5e'),
    images: [
      {
        src: createBadgeImage('Essentials', 'Cisco', '#f43f5e'),
        alt: 'Cisco Networking Academy badge',
        title: 'Certification badge',
        description: 'An essentials-level badge representing foundational cybersecurity knowledge.',
        meta: 'Cisco Networking Academy • 2024',
      },
      {
        src: createCertificatePreview('Cybersecurity Essentials', 'Cisco Networking Academy', '2024', '#f43f5e'),
        alt: 'Certificate preview for Cisco cybersecurity essentials',
        title: 'Certificate preview',
        description: 'A structured preview of the Cisco certification, highlighting core achievement details.',
        meta: 'Cisco Networking Academy • 2024',
      },
    ],
  },
  {
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    year: '2023',
    badge: createBadgeImage('Intro', 'Cisco', '#b91c1c'),
    images: [
      {
        src: createBadgeImage('Intro', 'Cisco', '#b91c1c'),
        alt: 'Cisco introduction to cybersecurity badge',
        title: 'Certification badge',
        description: 'A foundational badge representing an introductory cybersecurity skill set.',
        meta: 'Cisco Networking Academy • 2023',
      },
      {
        src: createCertificatePreview('Introduction to Cybersecurity', 'Cisco Networking Academy', '2023', '#b91c1c'),
        alt: 'Certificate preview for Cisco introduction to cybersecurity',
        title: 'Certificate preview',
        description: 'A preview of the certificate that communicates reliability and professional recognition.',
        meta: 'Cisco Networking Academy • 2023',
      },
    ],
  },
  {
    title: 'Linux Essentials',
    issuer: 'NDG',
    year: '2023',
    badge: createBadgeImage('Linux', 'NDG', '#7f1d1d'),
    images: [
      {
        src: createBadgeImage('Linux', 'NDG', '#7f1d1d'),
        alt: 'NDG Linux Essentials badge',
        title: 'Certification badge',
        description: 'A badge representing Linux fundamentals and practical system administration awareness.',
        meta: 'NDG • 2023',
      },
      {
        src: createCertificatePreview('Linux Essentials', 'NDG', '2023', '#7f1d1d'),
        alt: 'Certificate preview for Linux Essentials',
        title: 'Certificate preview',
        description: 'A premium certificate preview highlighting the Linux Essentials achievement.',
        meta: 'NDG • 2023',
      },
    ],
  },
  {
    title: 'SOC Fundamentals',
    issuer: 'LetsDefend',
    year: '2024',
    badge: createBadgeImage('SOC', 'LetsDefend', '#f97316'),
    images: [
      {
        src: createBadgeImage('SOC', 'LetsDefend', '#f97316'),
        alt: 'LetsDefend SOC Fundamentals badge',
        title: 'Certification badge',
        description: 'A professional badge symbolizing a foundational SOC and monitoring skill set.',
        meta: 'LetsDefend • 2024',
      },
      {
        src: createCertificatePreview('SOC Fundamentals', 'LetsDefend', '2024', '#f97316'),
        alt: 'Certificate preview for SOC Fundamentals',
        title: 'Certificate preview',
        description: 'A certificate preview designed for security practitioners and hiring teams.',
        meta: 'LetsDefend • 2024',
      },
    ],
  },
  {
    title: 'Pre Security',
    issuer: 'TryHackMe',
    year: '2023',
    badge: createBadgeImage('Pre Security', 'TryHackMe', '#fb7185'),
    images: [
      {
        src: createBadgeImage('Pre Security', 'TryHackMe', '#fb7185'),
        alt: 'TryHackMe Pre Security badge',
        title: 'Certification badge',
        description: 'A badge representing introductory cybersecurity achievements on TryHackMe.',
        meta: 'TryHackMe • 2023',
      },
      {
        src: createCertificatePreview('Pre Security', 'TryHackMe', '2023', '#fb7185'),
        alt: 'Certificate preview for Pre Security',
        title: 'Certificate preview',
        description: 'A certificate preview that presents the learning achievement with premium visual polish.',
        meta: 'TryHackMe • 2023',
      },
    ],
  },
]

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/nohirohirmeison/',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M6.94 8.5A1.56 1.56 0 1 0 6.94 5.38a1.56 1.56 0 0 0 0 3.12ZM5.5 9.5h2.88V18H5.5zM10.2 9.5h2.76v1.16h.04c.38-.72 1.31-1.48 2.7-1.48 2.89 0 3.42 1.9 3.42 4.37V18H16.2v-7.43c0-1.77-.03-4.04-2.46-4.04-2.46 0-2.84 1.92-2.84 3.9V18H10.2z" />
      </svg>
    ),
  },
  {
    label: 'Medium',
    href: 'https://medium.com/@nohirohirmeison',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M7.8 7.2a.92.92 0 0 0-.3-.76L5.7 4.7v-.3h4.6l3.6 7.9 3.1-7.9H21v.3l-1.3 1.2a.56.56 0 0 0-.2.54v9.1a.56.56 0 0 0 .2.54l1.3 1.2v.3h-6.5v-.3l1.3-1.3c.1-.1.1-.2.1-.5V9.4l-3.6 9.2h-.5L7.2 9.4v6.2a1.3 1.3 0 0 0 .3 1.1l2.2 2.7v.3H3.2v-.3l2.2-2.7a1.3 1.3 0 0 0 .3-1.1z" />
      </svg>
    ),
  },
  {
    label: 'Email',
    href: 'mailto:nohiro.hirmeison@gmail.com',
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 6h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1Zm0 2 8 5 8-5v-.5L12 8 4 7.5Z" />
      </svg>
    ),
  },
]

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [projectLightbox, setProjectLightbox] = useState({ isOpen: false, projectIndex: 0, currentIndex: 0 })
  const [certificateLightbox, setCertificateLightbox] = useState({ isOpen: false, certificateIndex: 0, currentIndex: 0 })

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 18)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section[id]'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-35% 0px -45% 0px', threshold: 0.2 },
    )

    sections.forEach((section) => observer.observe(section))

    return () => observer.disconnect()
  }, [])

  const openProjectLightbox = (projectIndex, imageIndex = 0) => {
    setProjectLightbox({ isOpen: true, projectIndex, currentIndex: imageIndex })
  }

  const closeProjectLightbox = () => {
    setProjectLightbox({ isOpen: false, projectIndex: 0, currentIndex: 0 })
  }

  const moveProjectSlide = (direction) => {
    setProjectLightbox((current) => {
      const project = projects[current.projectIndex]
      const total = project.images.length
      const nextIndex = current.currentIndex + direction
      const safeIndex = nextIndex < 0 ? 0 : nextIndex >= total ? total - 1 : nextIndex
      return { ...current, currentIndex: safeIndex }
    })
  }

  const openCertificateLightbox = (certificateIndex, imageIndex = 0) => {
    setCertificateLightbox({ isOpen: true, certificateIndex, currentIndex: imageIndex })
  }

  const closeCertificateLightbox = () => {
    setCertificateLightbox({ isOpen: false, certificateIndex: 0, currentIndex: 0 })
  }

  const moveCertificateSlide = (direction) => {
    setCertificateLightbox((current) => {
      const certificate = certifications[current.certificateIndex]
      const total = certificate.images.length
      const nextIndex = current.currentIndex + direction
      const safeIndex = nextIndex < 0 ? 0 : nextIndex >= total ? total - 1 : nextIndex
      return { ...current, currentIndex: safeIndex }
    })
  }

  const projectItems = projectLightbox.isOpen ? projects[projectLightbox.projectIndex]?.images ?? [] : []
  const activeProject = projectItems[projectLightbox.currentIndex] ?? null
  const certificateItems = certificateLightbox.isOpen ? certifications[certificateLightbox.certificateIndex]?.images ?? [] : []
  const activeCertificate = certificateItems[certificateLightbox.currentIndex] ?? null

  return (
    <div className="app-shell">
      <header className="site-header">
        <nav className={`site-nav ${scrolled ? 'scrolled' : ''}`} aria-label="Primary navigation">
          <a className="brand" href="#home">
            <span className="brand-mark">NH</span>
            <span className="brand-text">Nohiro Hazel</span>
          </a>

          <button
            type="button"
            className={`nav-toggle ${mobileOpen ? 'open' : ''}`}
            aria-controls="site-navigation"
            aria-expanded={mobileOpen}
            aria-label="Toggle navigation"
            onClick={() => setMobileOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>

          <div id="site-navigation" className={`nav-links ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen && window.innerWidth <= 760}>
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                aria-current={activeSection === item.id ? 'page' : undefined}
                onClick={() => setMobileOpen(false)}
              >
                <span className="nav-link-text">{item.label}</span>
                <span className="nav-link-indicator" aria-hidden="true" />
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main>
        <section id="home" className="hero-section">
          <div className="hero-background" aria-hidden="true">
            <div className="hero-grid" />
            {Array.from({ length: 8 }).map((_, index) => (
              <motion.span
                key={index}
                className={`hero-particle particle-${index + 1}`}
                initial={{ opacity: 0.15, y: 0, x: 0 }}
                animate={{ opacity: [0.15, 0.5, 0.15], y: [0, -16, 0], x: [0, 10, 0] }}
                transition={{ duration: 6 + index, repeat: Infinity, ease: 'easeInOut' }}
              />
            ))}
          </div>

          <div className="hero-shell">
            <motion.div
              className="hero-copy"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="hero-kicker">Offensive security • Web testing • Red team thinking</p>
              <h1>Cybersecurity engineer with a strong offensive security focus.</h1>
              <p className="hero-text">
                I combine structured vulnerability assessment, hands-on lab work, and communication-ready reporting to help teams understand real risks.
              </p>
              <div className="hero-actions">
                <a className="button primary" href="#projects">
                  View Projects
                </a>
                <a className="button secondary" href="#certifications">
                  View Certifications
                </a>
              </div>
              <div className="hero-meta">
                <div>
                  <span className="meta-label">Focus</span>
                  <p>Red Team • Web App Pentesting • Vulnerability Assessment</p>
                </div>
                <div>
                  <span className="meta-label">Location</span>
                  <p>Batam, Indonesia</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="hero-portrait-card"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65 }}
            >
              <div className="portrait-frame">
                <img src="/images/profile.webp" alt="Portrait of Nohiro Hazel" loading="eager" />
              </div>
              <div className="portrait-content">
                <p className="profile-name">Nohiro Hazel Nayottama Rafid Hirmeison</p>
                <p className="profile-role">Cybersecurity Engineering Student</p>
                <div className="profile-stats">
                  <div>
                    <strong>3.90</strong>
                    <span>GPA</span>
                  </div>
                  <div>
                    <strong>Red</strong>
                    <span>Team Enthusiast</span>
                  </div>
                  <div>
                    <strong>6</strong>
                    <span>Projects</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about" className="section">
          <div className="section-inner">
            <SectionHeading number="01" intro="Professional profile" title="A modern security profile built for recruiters and teams." />
            <div className="about-grid">
              <motion.article className="about-card about-card--primary" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4 }}>
                <p className="card-badge">Security engineering perspective</p>
                <h3>Offensive thinking with a professional delivery style.</h3>
                <p>
                  I’m a cybersecurity engineering student focused on red team methodology, web application pentesting, vulnerability assessment, and security communication. My work is grounded in practical testing, clear documentation, and an appreciation for both the attacker mindset and the engineering discipline required to make security real.
                </p>
              </motion.article>

              <div className="about-stack">
                <motion.article className="about-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.5 }}>
                  <h3>What I bring</h3>
                  <ul className="detail-list">
                    {aboutHighlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.article>

                <motion.article className="about-card" initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.55 }}>
                  <h3>Working style</h3>
                  <p>
                    I approach security with curiosity and structure: identify the risk, validate the condition, document the findings, and communicate the remediation path in a way decision-makers can act on.
                  </p>
                </motion.article>
              </div>
            </div>
          </div>
        </section>

        <section id="education" className="section">
          <div className="section-inner">
            <SectionHeading number="02" intro="Academic foundation" title="Education that supports both technical depth and strategic thinking." />
            <div className="timeline-list">
              {educationItems.map((item, index) => (
                <motion.article className="timeline-card" key={item.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.35 + index * 0.05 }}>
                  <div className="timeline-marker" aria-hidden="true" />
                  <div className="timeline-content">
                    <p className="timeline-period">{item.period}</p>
                    <h3>{item.title}</h3>
                    <p className="timeline-institution">{item.institution}</p>
                    <p>{item.detail}</p>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="section">
          <div className="section-inner">
            <SectionHeading number="03" intro="Project portfolio" title="Selected case studies that demonstrate method and clarity." />
            <div className="project-list">
              {projects.map((project, index) => (
                <motion.article
                  key={project.title}
                  className={`project-card project-card--${project.layout.toLowerCase()}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.45 }}
                  whileHover={{ y: -5, scale: 1.01 }}
                >
                  <button type="button" className="project-image" onClick={() => openProjectLightbox(index, 0)} aria-label={`Open ${project.title} gallery`}>
                    <img src={project.image} alt={project.title} loading="lazy" />
                  </button>

                  <div className="project-body">
                    <div className="project-copy">
                      <p className="project-kicker">{project.intro}</p>
                      <h3>{project.title}</h3>
                      <p>{project.summary}</p>
                    </div>
                    <div className="project-meta">
                      <div className="project-tags">
                        {project.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                      <button type="button" className="text-button" onClick={() => openProjectLightbox(index, 0)}>
                        Open gallery
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section">
          <div className="section-inner">
            <SectionHeading number="04" intro="Experience" title="Community leadership and technical collaboration in motion." />
            <div className="experience-grid">
              {experiences.map((experience, index) => (
                <motion.article className="experience-card" key={experience.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.45 + index * 0.05 }}>
                  <img src={experience.image} alt={experience.title} loading="lazy" />
                  <div className="experience-content">
                    <p className="timeline-period">{experience.period}</p>
                    <h3>{experience.title}</h3>
                    <p className="experience-company">{experience.company}</p>
                    <ul>
                      {experience.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-inner">
            <SectionHeading number="05" intro="Core toolkit" title="A balanced stack across testing, monitoring, and systems." />
            <div className="skill-grid">
              {skillGroups.map((group, index) => (
                <motion.article className="skill-card" key={group.title} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4 + index * 0.04 }}>
                  <h3>{group.title}</h3>
                  <div className="skill-badges">
                    {group.items.map((item) => (
                      <motion.span key={item} className="skill-badge" whileHover={{ y: -3, scale: 1.02 }}>
                        {item}
                      </motion.span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section id="certifications" className="section">
          <div className="section-inner">
            <SectionHeading number="06" intro="Credentials" title="Professional certifications presented as premium portfolio assets." />
            <div className="cert-grid">
              {certifications.map((certification, index) => (
                <motion.button
                  key={certification.title}
                  type="button"
                  className="cert-card"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.35 + index * 0.04 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  onClick={() => openCertificateLightbox(index)}
                >
                  <img src={certification.badge} alt={`${certification.title} badge`} loading="lazy" />
                  <div className="cert-details">
                    <h3>{certification.title}</h3>
                    <p>{certification.issuer}</p>
                    <span>{certification.year}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-inner">
            <SectionHeading number="07" intro="Contact" title="Ready to discuss security work, collaboration, or research opportunities." />
            <motion.div className="contact-card" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.4 }}>
              <p>
                I’m interested in internships, research collaborations, and opportunities where practical offensive security can make a measurable impact.
              </p>
              <div className="contact-actions">
                <a className="button primary" href="mailto:nohiro.hirmeison@gmail.com">
                  Email Me
                </a>
                <div className="social-links" aria-label="Social links">
                  {socialLinks.map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer" aria-label={link.label}>
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>© 2026 Nohiro Hazel. Designed for security-minded teams and recruiters.</p>
      </footer>

      <Lightbox
        isOpen={projectLightbox.isOpen}
        item={activeProject}
        items={projectItems}
        currentIndex={projectLightbox.currentIndex}
        onClose={closeProjectLightbox}
        onNext={() => moveProjectSlide(1)}
        onPrev={() => moveProjectSlide(-1)}
        variant="project"
      />

      <Lightbox
        isOpen={certificateLightbox.isOpen}
        item={activeCertificate}
        items={certificateItems}
        currentIndex={certificateLightbox.currentIndex}
        onClose={closeCertificateLightbox}
        onNext={() => moveCertificateSlide(1)}
        onPrev={() => moveCertificateSlide(-1)}
        variant="certificate"
      />
    </div>
  )
}

export default App
