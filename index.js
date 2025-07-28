import {
  mobile,
  backend,
  creator,
  web,
  javascript,
  typescript,
  html,
  css,
  reactjs,
  redux,
  tailwind,
  git,
  threejs,
  freelancer,
  c,
  sql,
  net,
  github,
  gmail,
  whatsapp,
  linkedin,
  Brainwave,
  fitnees,
  joCompany,
  travelCamp,
  portfolio,
  Valon,
  expenseTracker,
  unifiSolutions,
  IPhone
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "projects",
    title: "Projects",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "React js Developer",
    icon: web,
  },
  {
    title: "Animation Appliactions",
    icon: mobile,
  },
  {
    title: "Modern Web Applications",
    icon: backend,
  },
  {
    title: "Proplem Solving",
    icon: creator,
  },
];

const technologies = [
  {
    name: "HTML 5",
    icon: html,
  },
  {
    name: "CSS 3",
    icon: css,
  },
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "TypeScript",
    icon: typescript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "c-charp",
    icon: c,
  },
  {
    name: ".net",
    icon: net,
  },
  {
    name: "sql server",
    icon: sql,
  },
  {
    name: "docker",
    icon: docker,
  },
];

const experiences = [
  {
    title: "React Developer",
    company_name: "Unifiy solutions",
    icon: unifiSolutions,
    iconBg: "#d9d9fc",
    date: "May 2024 - Dec 2024",
    points: [
    "Created efficient and effective software solutions to meet client requirements and enhance user experience",
    "Built and maintained user interfaces using React.js (MUI), ensuring a seamless and intuitive user experience",
    "Improved website performance and speed by optimizing code, implementing best practices. ",
    "Created comprehensive documentation for codebases, facilitating easier understanding and maintenance for current and future team members",
    "Worked closely with team members, including designers, back-end developers, and project managers.",
    ],
  },
  {
    title: "Web Developer",
    company_name: "Freelancer",
    icon: freelancer,
    iconBg: "#282E6E",
    date: "March 2022 - May 2024",
    points: [
      "Developing and maintaining web applications using React.js and other related technologies.",
      "Collaborating with cross-functional teams including designers, product managers, and other developers to create high-quality products.",
      "Implementing responsive design and ensuring cross-browser compatibility.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "IPhone 15",
    description:
      "Designed seamless animations, interactive scrolling effects, and realistic 3D models for an immersive user experience. Utilized modern web technologies to achieve cutting-edge functionality.",
    tags: [
      {
        name: "nextjs",
        color: "text-gray-300",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "three js",
        color: "blue-text-gradient",
      },  
      {
        name: "gsap",
        color: "green-text-gradient",
      },  
    ],
    image: IPhone,
    source_code_link: "https://github.com/YamnJoha1/IPhone",
    preview_link:"https://iphone15-opal.vercel.app/",
  },
  {
    name: "Brainwave",
    description:
      "A AI modern UI/UX website, developed using React.js and Tailwind CSS, exemplifies modern UI/UX principles. Its sleek design, seamless animations.",
    tags: [
      {
        name: "nextjs",
        color: "text-gray-300",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
      {
        name: "typeScript",
        color: "blue-text-gradient",
      },  
    ],
    image: Brainwave,
    source_code_link: "https://github.com/YamnJoha1/Brainwave",
    preview_link:"https://brainwave-phi-snowy.vercel.app/",
  },
  {
    name: "Portfolio",
    description:
      "A personal website built using HTML, SCSS, and JavaScript. It contains several pages that can be navigated amazingly. jQuery was used to build a filter to review projects.",
    tags: [
      {
        name: "html",
        color: "text-red-400",
      },
      {
        name: "css",
        color: "blue-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
      {
        name: "javaScript",
        color: "green-text-gradient",
      },
      {
        name: "Jquery",
        color: "text-red-400"
      },
    ],
    image: portfolio,
    source_code_link: "https://github.com/YamnJoha1/New-Portfolio/",
    preview_link: "https://yamnjoha1.github.io/New-Portfolio/"
    
  },
  {
    name: "Expense Tracker",
    description:
      "This is an Expense Tracker App in Asp.Net Core MVC using SyncFusion Components, Implemented CRUD Operation of Category & Transaction Grid with Paging Etc...",
    tags: [
      {
        name: ".net",
        color: "blue-text-gradient",
      },
      {
        name: "sql",
        color: "green-text-gradient",
      },
      {
        name: "bootstrap",
        color: "pink-text-gradient",
      },
    ],
    image: expenseTracker,
    source_code_link: "https://github.com/YamnJoha1/expense-tracker",
  },
  {
    name: "Travel Camp",
    description:
      "Built with Next.js, TailwindCSS, and TypeScript, this landing page not only looks great but also serves as a hands-on project to reinforce one's understanding of these technologies.",
    tags: [
      {
        name: "nextjs",
        color: "text-gray-300",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      }, 
      {
        name: "typeScript",
        color: "blue-text-gradient",
      },
    ],
    image: travelCamp,
    source_code_link: "https://github.com/YamnJoha1/travel-app",
    preview_link: "https://travel-app-eta-cyan.vercel.app/",
  },
  {
    name: "BEFIT",
    description:
        "A gym website that displays the available trainers and training plans and everything the user needs, It contains slides created using Swiper Slide using JavaScript.",
    tags: [
      {
        name: "html",
        color: "text-red-400",
      },
      {
        name: "scss",
        color: "blue-text-gradient",
      },
      {
        name: "javaScript",
        color: "green-text-gradient",
      },
    ],
    image: fitnees,
    source_code_link: "https://github.com/YamnJoha1/GYM",
    preview_link: "https://yamnjoha1.github.io/GYM/",
  },
  {
    name: "Valon",
    description:
        "A social media site interface with a beautiful and simple design, containing tabs that the user needs, such as notifications, conversations, etc.",
    tags: [
      {
        name: "html",
        color: "text-red-400",
      },
      {
        name: "css",
        color: "blue-text-gradient",
      },
      {
        name: "javaScript",
        color: "green-text-gradient",
      },
    ],
    image: Valon,
    source_code_link: "https://github.com/YamnJoha1/Vlora",
    preview_link: "https://yamnjoha1.github.io/Vlora",
  },
  {
    name: "JO Company",
    description:
      "A website for a software company with a dashboard and multiple pages that can be navigated through, using only HTML and CSS",
    tags: [
      {
        name: "html",
        color: "text-red-400",
      },
      {
        name: "css",
        color: "blue-text-gradient",
      },
    ],
    image: joCompany,
    source_code_link: "https://github.com/YamnJoha1/JO-Company",
    preview_link: "https://yamnjoha1.github.io/JO-Company/",
  },
];

const cons = [
  {
    name:"Gmail",
    icon:gmail,
    description:"yamn.joha@gmail.com",
    source_code_link:"mailto:yamn.joha@gmail.com",
  },
  {
    name:"Phone",
    icon:whatsapp,
    description:"+963 938 044 059",
    source_code_link:"https://wa.me/+963938044059",
  },
  {
    name:"Github",
    icon:github,
    description:"YamnJoha1",
    source_code_link:"https://github.com/YamnJoha1",
  },
  {
    name:"LinkedIn",
    icon:linkedin,
    description:"Yamn Joha",
    source_code_link:"https://www.linkedin.com/in/yamn-joha-45586a267/",
  },
];
 
export { services, technologies, experiences, testimonials, projects, cons };