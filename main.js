// Data for projects and skills
const projects = [
    {
        title: "Cosmic Crusaders",
        description: "A space-themed action RPG with stunning visuals and an intricate storyline. Developed using Unreal Engine.",
        image: "/api/placeholder/400/300",
        tags: ["Unreal Engine", "C++", "3D Modeling"]
    },
    {
        title: "Puzzle Paradise",
        description: "A mobile puzzle game that challenges players' logical thinking. Built with Unity for iOS and Android.",
        image: "/api/placeholder/400/300",
        tags: ["Unity", "C#", "Mobile Development"]
    }
];

const skills = ["Unity", "Unreal Engine", "C#", "C++", "3D Modeling", "Game Design", "AI Programming", "Mobile Development"];

// Function to create project elements
function createProjectElement(project) {
    const projectDiv = document.createElement('div');
    projectDiv.className = 'project';
    projectDiv.innerHTML = `
        <img src="${project.image}" alt="${project.title}">
        <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
                ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
            </div>
        </div>
    `;
    return projectDiv;
}

// Function to create skill elements
function createSkillElement(skill) {
    const skillSpan = document.createElement('span');
    skillSpan.className = 'skill';
    skillSpan.textContent = skill;
    return skillSpan;
}

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const contactForm = document.getElementById('contact-form');
    const projectsContainer = document.getElementById('projects-container');
    const skillsContainer = document.getElementById('skills-container');

    // Populate projects
    projects.forEach(project => {
        const projectElement = createProjectElement(project);
        projectsContainer.appendChild(projectElement);

        // Add pop animation on hover
        projectElement.addEventListener('mouseenter', () => {
            projectElement.style.animation = 'pop 0.3s ease';
        });
        projectElement.addEventListener('animationend', () => {
            projectElement.style.animation = '';
        });
    });

    // Populate skills
    skills.forEach(skill => {
        skillsContainer.appendChild(createSkillElement(skill));
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            targetElement.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Contact form submission (for demonstration purposes)
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // In a real application, you would send this data to a server
        console.log('Form submitted:', { name, email, message });
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });

    // Fade in sections on scroll
    const sections = document.querySelectorAll('section');
    const fadeInSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(fadeInSection, {
        root: null,
        threshold: 0.1
    });

    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});