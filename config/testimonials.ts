export interface Testimonial {
  id: number;
  name: string;
  title: string;
  company?: string;
  relationship: {
    es: string;
    en: string;
  };
  date: string;
  imageUrl?: string;
  text: {
    es: string;
    en: string;
  };
  linkedinUrl?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "María Jesús García Godoy",
    title: "Senior Software Engineer - AI specialist",
    company: "PhD in AI and Computer Sciences",
    relationship: {
      es: "Compañera (equipos diferentes)",
      en: "Colleague (different teams)",
    },
    date: "August 30, 2018",
    text: {
      es: "Tuve el placer de trabajar con Daily. Es una persona muy organizada y una excelente solucionadora de problemas. Tiene mucha experiencia no solo en el contexto académico sino también en la industria. También sabe trabajar correctamente bajo presión y en equipo. La recomiendo altamente dados su trayectoria profesional y sus habilidades de programación.",
      en: "I had the pleasure to work with Daily. She is a very well-organized person and a great problem solver. She has a lot of experience not only in the context of academics but also in the industry. She also knows how to work properly under pressure and within a work team. I highly recommend her given her professional trajectory and her programming skills.",
    },
    linkedinUrl: "https://www.linkedin.com/in/maria-jesus-garcia-godoy/",
  },
  {
    id: 2,
    name: "Omar Antonio Díaz Peña",
    title: "Senior Software Engineer",
    relationship: {
      es: "Compañero (estudiaron juntos)",
      en: "Colleague (studied together)",
    },
    date: "August 26, 2018",
    text: {
      es: "Una dedicada profesional, formada en las tecnologías que fundamentan el desarrollo de software pero con grandes capacidades de liderazgo y aprendizaje. Es, por sobre todas las cosas, un activo altamente cualificado y competente lo que se complementa con actitudes para el trabajo en equipo. Su entusiasmo, carisma y talento la hacen, en el aspecto más personal, una persona de fácil trato así como receptiva y capaz de aprender de sus errores, lo que reconoce para poder superarlos.",
      en: "A dedicated professional, trained in the technologies that underpin software development but with great leadership and learning capabilities. Above all, she is a highly qualified and competent asset that is complemented by attitudes for teamwork. Her enthusiasm, charisma and talent make her, from a personal perspective, an approachable person, receptive and able to learn from her mistakes, which she acknowledges in order to overcome them.",
    },
    linkedinUrl: "https://www.linkedin.com/in/omar-antonio-diaz-pena/",
  },
  {
    id: 3,
    name: "Luis Gonzalo Cañas Iniesta",
    title: "Creator of dividendo.top",
    relationship: {
      es: "Colega senior",
      en: "Senior colleague",
    },
    date: "August 22, 2018",
    text: {
      es: "Daily tiene cualidades extremadamente valiosas para el desarrollo de software en equipo. No solo es brillante como programadora sino también a nivel personal. Le apasiona su trabajo y es de esas personas que mejoran el ambiente dentro del equipo, por su amabilidad, simpatía y capacidad de comunicación. Estas características unidas a su alto nivel técnico y su deseo de aprender la hacen muy especial. Fue un placer trabajar a su lado.",
      en: "Daily has extremely valuable qualities for team software development. She is not only brilliant as a programmer but also on a personal level. She is passionate about her work and is one of those people who improve the team environment through her kindness, friendliness, and communication skills. These characteristics combined with her high technical level and desire to learn make her very special. It was a pleasure working by her side.",
    },
    linkedinUrl: "https://www.linkedin.com/in/luis-gonzalo-canas-iniesta/",
  },
  {
    id: 4,
    name: "Braulio Diez Botella",
    title: "Technical Lead at Lemoncode",
    relationship: {
      es: "Profesor (Máster Frontend Lemoncode)",
      en: "Teacher (Frontend Master Lemoncode)",
    },
    date: "August 22, 2018",
    text: {
      es: "Como alumna del Máster Front End Lemoncode, destacar la capacidad de trabajo, aprendizaje y colaboraciones realizadas. Daily es una desarrolladora con muy buenas capacidades técnicas que además se desenvuelve bien en equipo, una apuesta segura.",
      en: "As a student of the Lemoncode Frontend Master's program, her work capacity, learning ability, and collaborative efforts stand out. Daily is a developer with excellent technical capabilities who also works well in a team, a safe bet.",
    },
    linkedinUrl: "https://www.linkedin.com/in/braulio-diez-botella/",
  },
  {
    id: 5,
    name: "Sandra G Meléndez",
    title: "Business Analyst | Product Designer | UX Designer",
    company: "at Cognizant",
    relationship: {
      es: "Compañera (equipos diferentes)",
      en: "Colleague (different teams)",
    },
    date: "August 20, 2018",
    text: {
      es: "Profesional competente sobre todo para el desarrollo Web. Ha terminado recientemente un máster en tecnologías frontend con buen desempeño, es muy dinámica y resolutiva. Es una desarrolladora Fullstack con grandes capacidades ya que domina varias tecnologías backend. Tiene un gran espíritu de trabajo, ambiciosa y con ganas de adquirir nuevos conocimientos. Posee un buen dominio del inglés y es muy comunicativa. Como compañera de equipo, tiene las mejores cualidades, además que su simpatía y profesionalidad aportan y transmiten mucha energía y favorecen un clima de trabajo satisfactorio.",
      en: "A competent professional, especially for Web development. She recently completed a master's degree in frontend technologies with excellent performance, is very dynamic and resourceful. She is a Fullstack developer with great capabilities as she masters various backend technologies. She has a great spirit of work, ambitious and eager to acquire new knowledge. She has good command of English and is very communicative. As a team member, she has the best qualities, and her friendliness and professionalism contribute and convey a lot of energy and foster a satisfying work environment.",
    },
    linkedinUrl: "https://www.linkedin.com/in/sandra-g-melendez/",
  },
  {
    id: 6,
    name: "Sara Lissette L. Ibáñez",
    title: "Senior Frontend Engineer @ Freepik AI",
    company: "Next.js • React • TypeScript",
    relationship: {
      es: "Compañera (mismo equipo)",
      en: "Colleague (same team)",
    },
    date: "August 20, 2018",
    text: {
      es: "Excelente profesional con un manejo de altísimo nivel en las tecnologías web. Tiene unos conocimientos envidiables sobre el ecosistema de React-Redux y Typescript. Es una desarrolladora Fullstack resolutiva con grandes capacidades que le permiten desenvolverse en cualquier entorno, ya que domina el mundo de Java, Oracle, JSP, jQuery, My Batis, Webpack y NPM, entre otros. Como compañera de grupo, posee un gran nivel que la hace destacar, además que su simpatía y profesionalidad aportan al grupo un clima de trabajo muy agradable. ¡Una profesional totalmente recomendable!",
      en: "Excellent professional with very high-level expertise in web technologies. She has enviable knowledge of the React-Redux and Typescript ecosystem. She is a resourceful Fullstack developer with great capabilities that allow her to work in any environment, as she masters Java, Oracle, JSP, jQuery, My Batis, Webpack and NPM, among others. As a team member, she stands out at a high level, and her kindness and professionalism contribute to a very pleasant work environment. A totally recommended professional!",
    },
    linkedinUrl: "https://www.linkedin.com/in/sara-lissette-ibanez/",
  },
  {
    id: 7,
    name: "Reforma Tu Hogar Málaga",
    title: "Director",
    company: "Reforma Tu Hogar",
    relationship: {
      es: "Cliente",
      en: "Client",
    },
    date: "January 19, 2017",
    text: {
      es: "Es una excelente y ágil trabajadora, consiguió resultados excelentes para la empresa. Desarrolló nuestra página web corporativa y realiza un trabajo de calidad en las redes sociales. Gestiona correctamente nuestra información y presupuestos. Es 100% recomendable como informática y como persona. Domina muy bien el inglés y nos ha ayudado en la gestión con nuestros clientes ingleses.",
      en: "She is an excellent and agile worker, achieving excellent results for the company. She developed our corporate website and delivers quality work on social media. She manages our information and budgets correctly. She is 100% recommended as an IT professional and as a person. She masters English very well and has helped us manage our English clients.",
    },
    linkedinUrl: "https://www.linkedin.com/company/reforma-tu-hogar-malaga/",
  },
];
