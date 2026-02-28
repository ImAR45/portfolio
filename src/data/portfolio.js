const portfolioData = {
    name: "Aaryan Choubey",
    title: "Frontend Developer",
    bio: "Results-driven Senior Frontend Developer with 4+ years of expertise in developing scalable web applications using React.js, Redux, SCSS, Tailwind CSS, Material UI, and GitHub Copilot. Proven success in modernizing legacy systems, enhancing UI/UX performance, and driving faster development cycles. Adept at integrating REST/SOAP APIs and collaborating in Agile teams to deliver high-impact solutions.",
    resumeUrl: "./resume.pdf",
    location: "India",

    skills: [
        { name: "AI Dev Mastery", level: 95, category: "Tools", icon: "🧠", desc: "AI-powered coding grandmaster! 🤖 GitHub Copilot certified by Microsoft, Antigravity, Cursor — I wield AI coding tools like a pro. 10x developer mode: ACTIVATED. 🚀" },
        { name: "React", level: 95, category: "Frontend", icon: "⚛️", desc: "My primary weapon of choice! ⚔️ Building dynamic UIs with hooks, context, and component architecture. Can split atoms into reusable components. 💥" },
        { name: "JavaScript", level: 92, category: "Languages", icon: "🟨", desc: "The language that started it all! 🌟 From closures to async/await, I bend JavaScript to my will. ES6+ is my native tongue. 🗣️" },
        { name: "TypeScript", level: 88, category: "Languages", icon: "🔷", desc: "JavaScript's evolution stone! 💎 Type safety keeps bugs at bay. Migrating legacy code to TypeScript for better maintainability. 🛡️" },
        { name: "SCSS/CSS", level: 90, category: "Frontend", icon: "🎨", desc: "Painting pixels with precision! 🖼️ Grid, Flexbox, animations — I make designs come alive. Every pixel is a brushstroke. ✨" },
        { name: "Next.js", level: 75, category: "Frontend", icon: "▲", desc: "The ultimate React framework! 🚀 Migrating legacy React apps to Next.js with TypeScript for enhanced performance and scalability. ⚡" },
        { name: "Redux/RTK", level: 88, category: "Frontend", icon: "🔄", desc: "State management fortress! 🏰 Redux, RTK, middleware — I tame complex app state with predictable flows across entire booking lifecycles. 🎮" },
        { name: "Tailwind CSS", level: 92, category: "Frontend", icon: "💨", desc: "Utility-first speed demon! 🏎️ Rapid prototyping with utility classes. From Figma to styled UI in record time. ⏱️" },
        { name: "Git", level: 90, category: "Tools", icon: "📦", desc: "Master of version control! 🌳 Branching strategies, rebasing, and merge conflict resolution. My code always has a save point. 💾" },
        { name: "REST APIs", level: 90, category: "Backend", icon: "🔗", desc: "Data summoning mastery! 📡 Integrating REST & SOAP APIs for user forms, Salesforce tracking, and backend case creation. 🏗️" },
        { name: "SQL/PLSQL", level: 70, category: "Database", icon: "🗄️", desc: "Master of relational realms! 🗃️ Complex queries, joins, stored procedures, and database optimization with Oracle SQL Developer. ✅" },
        { name: "Material UI", level: 85, category: "Frontend", icon: "🎯", desc: "Google's design system in my toolkit! 🧩 Pre-built components, theming, and responsive layouts — shipping polished UIs at blazing speed. 🔥" },
        { name: "Jest", level: 75, category: "Tools", icon: "🧪", desc: "Testing champion! ✅ Unit tests, snapshot tests, and mocking — I make sure every component works flawlessly before shipping. 🚢" },
    ],

    experience: [
        {
            company: "LTIMindtree",
            role: "Senior Software Engineer",
            period: "Oct 2024 – Present",
            location: "Pune, MH",
            description:
                "Built reusable React components integrated with Sitecore CMS, reducing development effort and improving content scalability while ensuring cross-platform responsiveness. Integrated multiple APIs for user forms, enabling backend case creation and Salesforce query tracking. Developed booking flows with Redux store to maintain data across the lifecycle. Built responsive booking and login pages using React and SCSS.",
            tech: ["React", "Redux", "Sitecore", "SCSS", "Next.js", "TypeScript", "GitHub Copilot"],
        },
        {
            company: "Cognizant",
            role: "Senior Developer",
            period: "Jul 2021 – Oct 2024",
            location: "Pune, MH",
            description:
                "Migrated multiple legacy Siebel UIs to React.js using Micro Frontend Architecture. Developed a responsive website with React.js and Tailwind CSS that allowed clients to modify customer details via a Python REST API, significantly reducing support tickets. Built a 360-degree dashboard consolidating order and customer data into a single-page application. Achieved a 90% reduction in support tickets by deploying a real-time operational solution.",
            tech: ["React", "Tailwind CSS", "JavaScript", "Chart.js", "React Router", "REST API"],
        },
    ],

    projects: [
        {
            title: "ComeBack — Recovery Tracker",
            description:
                "An open-source injury recovery tracker to structure physical therapy protocols, log daily symptoms, and visualize the road to recovery with smart suggestions.",
            tech: ["React", "Next.js", "Typescript", "Antigravity", "Claude"],
            link: "https://comeback-coral.vercel.app/",
            color: "#ff7f50",
        },
        {
            title: "JCOM Platform",
            description:
                "Developed complex Sitecore components using React.js, Redux, HTML, SCSS, and JavaScript. Converted Figma designs into reusable React components ensuring pixel-perfect UI. Migrating legacy React and JavaScript code to Next.js with TypeScript.",
            tech: ["React", "Redux", "SCSS", "Next.js", "TypeScript", "Sitecore"],
            link: "#",
            color: "#6c63ff",
        },
        {
            title: "360 Dashboard",
            description:
                "An interactive dashboard using React and Chart.js, enhancing data visualisation and consolidating multiple systems into a single view. Dynamic UI tables with sorting and filtering, robust authentication, and session management. Achieved 30% reduction in development time.",
            tech: ["React 18", "React Router", "Tailwind CSS", "Chart.js"],
            link: "#",
            color: "#00d4ff",
        },
    ],

    education: {
        degree: "Bachelor of Technology in Computer Science (BTech in CS)",
        institution: "Lakshmi Narain College of Technology Excellence",
        location: "Bhopal (MP), India",
        year: "2021",
    },

    certifications: [
        { name: "GitHub Copilot", issuer: "Microsoft", year: "2025" },
    ],

    socials: [
        { platform: "LinkedIn", url: "https://linkedin.com/in/aaryan-choubey-a5344018b", icon: "linkedin" },
        { platform: "Email", url: "mailto:aaryanchoubey45@gmail.com", icon: "email" },
    ],
};

export default portfolioData;
