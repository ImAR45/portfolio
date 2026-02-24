const portfolioData = {
    name: "John Doe",
    title: "Frontend Developer",
    bio: "Passionate frontend developer with 5+ years of experience crafting beautiful, performant, and accessible web applications. I love turning complex problems into simple, elegant solutions. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sketching UI concepts.",
    resumeUrl: "/resume.pdf",

    skills: [
        { name: "React", level: 95, category: "Frontend", icon: "⚛️" },
        { name: "JavaScript", level: 92, category: "Languages", icon: "🟨" },
        { name: "TypeScript", level: 88, category: "Languages", icon: "🔷" },
        { name: "CSS/SASS", level: 90, category: "Frontend", icon: "🎨" },
        { name: "Next.js", level: 85, category: "Frontend", icon: "▲" },
        { name: "Node.js", level: 80, category: "Backend", icon: "🟢" },
        { name: "Git", level: 88, category: "Tools", icon: "📦" },
        { name: "Figma", level: 75, category: "Design", icon: "🖌️" },
        { name: "REST APIs", level: 90, category: "Backend", icon: "🔗" },
        { name: "MongoDB", level: 78, category: "Database", icon: "🍃" },
        { name: "Tailwind CSS", level: 92, category: "Frontend", icon: "💨" },
        { name: "Redux", level: 85, category: "Frontend", icon: "🔄" },
    ],

    experience: [
        {
            company: "TechNova Inc.",
            role: "Senior Frontend Developer",
            period: "Jan 2023 – Present",
            description:
                "Leading the frontend architecture for a SaaS platform serving 50K+ users. Built a component library from scratch, improved page load times by 40%, and mentored a team of 4 junior developers.",
            tech: ["React", "TypeScript", "Next.js", "Redux"],
        },
        {
            company: "PixelCraft Studios",
            role: "Frontend Developer",
            period: "Jun 2021 – Dec 2022",
            description:
                "Developed interactive web experiences for clients including e-commerce platforms, dashboards, and marketing sites. Implemented responsive designs and smooth animations.",
            tech: ["React", "JavaScript", "SASS", "GSAP"],
        },
        {
            company: "WebSphere Solutions",
            role: "Junior Frontend Developer",
            period: "Mar 2020 – May 2021",
            description:
                "Started my professional journey building landing pages and fixing UI bugs. Grew into developing full features independently and learned modern frontend workflows.",
            tech: ["HTML", "CSS", "JavaScript", "jQuery"],
        },
    ],

    projects: [
        {
            title: "TaskFlow Pro",
            description:
                "A Kanban-style project management app with real-time collaboration, drag-and-drop tasks, and team analytics dashboard.",
            tech: ["React", "Node.js", "Socket.io", "MongoDB"],
            link: "https://github.com/johndoe/taskflow",
            color: "#6c63ff",
        },
        {
            title: "WeatherVerse",
            description:
                "Beautiful weather app with 3D animated backgrounds that change based on current conditions. Uses geolocation and has a 5-day forecast.",
            tech: ["React", "Three.js", "OpenWeather API"],
            link: "https://github.com/johndoe/weatherverse",
            color: "#00d4ff",
        },
        {
            title: "DevBlog Engine",
            description:
                "A markdown-powered blog platform with syntax highlighting, SEO optimization, RSS feed, and a custom CMS for easy content management.",
            tech: ["Next.js", "MDX", "Tailwind", "Vercel"],
            link: "https://github.com/johndoe/devblog",
            color: "#e94560",
        },
        {
            title: "CryptoTracker",
            description:
                "Real-time cryptocurrency tracking dashboard with price alerts, portfolio management, and interactive charts showing historical data.",
            tech: ["React", "Redux", "Chart.js", "CoinGecko API"],
            link: "https://github.com/johndoe/cryptotracker",
            color: "#16c60c",
        },
    ],

    socials: [
        { platform: "GitHub", url: "https://github.com/johndoe", icon: "github" },
        {
            platform: "LinkedIn",
            url: "https://linkedin.com/in/johndoe",
            icon: "linkedin",
        },
        { platform: "Twitter", url: "https://twitter.com/johndoe", icon: "twitter" },
        { platform: "Email", url: "mailto:john@example.com", icon: "email" },
    ],
};

export default portfolioData;
