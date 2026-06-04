// Mock data for Sinan Kasikci Portfolio
// Replace with backend data later

export const personalInfo = {
  name: "Sinan Kasikci",
  nameParts: ["Sinan", "Kasikci"],
  initials: "SK",
  photo: "/images/sinan.jpg",
  cardBadge: "20 / 07",
  email: "sinankasikci8@gmail.com",
  phonePrimary: "+90 535 373 2991",
  phoneSecondary: "+48 733 415 248",
  instagram: "sinan_kasikci",
  linkedinHandle: "Sinan Kasikci",
  githubHandle: "pythonicoder",
  location: {
    tr: "Manisa, Türkiye",
    en: "Manisa, Turkey"
  },
  locationSecondary: {
    tr: "Varşova, Polonya",
    en: "Warsaw, Poland"
  },
  title: {
    tr: "Yazılım Mühendisi Öğrencisi",
    en: "Software Engineering Student"
  },
  tagline: {
    tr: "Kod yazıyorum, fikirleri gerçeğe dönüştürüyorum.",
    en: "I write code and turn ideas into reality."
  },
  heroIntro: {
    tr: "Merhaba, ben",
    en: "Hello, I'm"
  },
  heroDescription: {
    tr: "Temiz kod, modern arayüzler ve akıllı sistemler üzerine çalışan tutkulu bir yazılım mühendisi öğrencisiyim. Her satır kodla bir adım daha ileri.",
    en: "A passionate software engineering student focused on clean code, modern interfaces and intelligent systems. One step forward with every line of code."
  },
  availability: {
    status: { tr: "Çalışmaya Hazırım", en: "Available for Work" },
    detail: { tr: "Yeni fırsatlara ve işbirliklere açık", en: "Open to new opportunities and collaborations" }
  },
  links: {
    linkedin: "https://www.linkedin.com/in/sinan-kasikci-b784752b4/",
    github: "https://github.com/pythonicoder",
    instagram: "https://instagram.com/sinan_kasikci",
    cv: "/files/Sinan_Kasikci_CV_new.pdf"
  }
};

export const aboutData = {
  heading: {
    tr: "Hakkımda",
    en: "About Me"
  },
  subheading: {
    tr: "Kısaca Ben",
    en: "A Little About Me"
  },
  paragraphs: {
    tr: [
      "Merhaba ben Sinan Kasikci. Bilgisayar ve Yazılım Mühendisliği öğrencisi olarak Varşova'da network technologies, algoritmalar ve sistem performansı üzerine kendimi geliştirmeye odaklanıyorum. C ve Python ile veri yapıları, low-level mantık ve optimizasyon konularında çalışıyor, problem çözmeyi işin en keyifli tarafı olarak görüyorum.",
      "Yeni teknolojiler öğrenmek, öğrendiklerimi projelerde uygulamak ve karmaşık problemleri daha verimli çözümlere dönüştürmek beni motive ediyor. Uzun vadede hedefim, güvenilir ve ölçeklenebilir sistemler geliştiren güçlü bir mühendis olmak."
    ],
    en: [
      "Hi, I'm Sinan Kasikci. As a Computer and Software Engineering student based in Warsaw, I focus on improving myself in network technologies, algorithms and system performance. I work on data structures, low-level logic and optimization using C and Python, and I see problem solving as the most enjoyable part of the job.",
      "Learning new technologies, applying what I learn in projects and turning complex problems into more efficient solutions is what motivates me. My long-term goal is to become a strong engineer building reliable and scalable systems."
    ]
  },
  skillGroups: [
    {
      id: "frontend",
      title: { tr: "Frontend Geliştirme", en: "Frontend Development" },
      items: [
        { name: "HTML5", slug: "html5" },
        { name: "CSS3", slug: "css3" },
        { name: "React", slug: "react" },
        { name: "Tailwind", slug: "tailwindcss" }
      ]
    },
    {
      id: "backend",
      title: { tr: "Backend Geliştirme", en: "Backend Development" },
      items: [
        { name: "Python", slug: "python" },
        { name: "C", slug: "c" },
        { name: "C++", slug: "cplusplus" }
      ]
    },
    {
      id: "data",
      title: { tr: "Veri & Bilim", en: "Data & Science" },
      items: [
        { name: "Pandas", slug: "pandas" },
        { name: "NumPy", slug: "numpy" }
      ]
    },
    {
      id: "tools",
      title: { tr: "Araçlar & Sistem", en: "Tools & System" },
      items: [
        { name: "Git", slug: "git" },
        { name: "VS Code", slug: "vscode" },
        { name: "MongoDB", slug: "mongodb" },
        { name: "Linux", slug: "linux" },
        { name: "Bash", slug: "bash" }
      ]
    }
  ]
};

export const contactData = {
  heading: {
    tr: "İletişim",
    en: "Contact"
  },
  subheading: {
    tr: "Birlikte Çalışalım",
    en: "Let's Work Together"
  },
  description: {
    tr: "Bir proje fikriniz mi var, iş birliği mi yapmak istiyorsunuz veya sadece merhaba mı demek istiyorsunuz? Mesajınızı bekliyorum.",
    en: "Have a project idea, want to collaborate or just say hi? Drop me a message — I'd love to hear from you."
  },
  form: {
    name: { tr: "Adınız", en: "Your Name" },
    email: { tr: "E-posta", en: "Email" },
    subject: { tr: "Konu", en: "Subject" },
    message: { tr: "Mesajınız", en: "Your Message" },
    submit: { tr: "Gönder", en: "Send Message" },
    success: {
      tr: "Mesajınız alındı. En kısa sürede geri döneceğim.",
      en: "Your message has been received. I'll get back to you soon."
    }
  }
};

export const navItems = [
  { id: "home", label: { tr: "Ana Sayfa", en: "Home" } },
  { id: "about", label: { tr: "Hakkımda", en: "About" } },
  { id: "skills", label: { tr: "Yetenekler", en: "Skills" } },
  { id: "contact", label: { tr: "İletişim", en: "Contact" } }
];

export const uiStrings = {
  cvButton: { tr: "CV Görüntüle", en: "View CV" },
  viewLinkedIn: { tr: "LinkedIn", en: "LinkedIn" },
  viewGithub: { tr: "GitHub", en: "GitHub" },
  scrollDown: { tr: "Aşağı Kaydır", en: "Scroll Down" },
  footerRights: {
    tr: "Tüm hakları saklıdır.",
    en: "All rights reserved."
  },
  footerBuilt: {
    tr: "Tutkuyla tasarlandı ve kodlandı",
    en: "Designed and crafted with passion"
  },
  loadingName: {
    tr: "Portföy yükleniyor",
    en: "Loading portfolio"
  }
};
