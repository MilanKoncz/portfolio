export interface Project {
    title: string;
    description: string;
    image: string;
    technologies: string[];
    github: string;
    live: string;
    color: string; // tailwind gradient: from-*-500 to-*-600
}

export const projects: Project[] = [
    {
        title: 'E-Commerce Platform',
        description:
            'A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product management, shopping cart, and payment integration.',
        image:
            'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=1470&q=80',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
        github: 'https://github.com',
        live: 'https://example.com',
        color: 'from-blue-500 to-blue-600',
    },
    {
        title: 'Task Management App',
        description:
            'A collaborative task management application with real-time updates, team workspaces, and progress tracking. Built with React, TypeScript, and Firebase.',
        image:
            'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?auto=format&fit=crop&w=1632&q=80',
        technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS'],
        github: 'https://github.com',
        live: 'https://example.com',
        color: 'from-purple-500 to-purple-600',
    },
    {
        title: 'AI-Powered Chat Application',
        description:
            'A modern chat application with AI integration for automated responses and content moderation. Features include real-time messaging, file sharing, and user presence.',
        image:
            'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1470&q=80',
        technologies: ['Next.js', 'OpenAI', 'WebSocket', 'PostgreSQL'],
        github: 'https://github.com',
        live: 'https://example.com',
        color: 'from-green-500 to-green-600',
    },
];
