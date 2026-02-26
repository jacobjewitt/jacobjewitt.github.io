// components.js - Shared site components (header & footer)
// Edit this file to update the nav or footer across every page.

const NAV_LINKS = [
    { href: 'index.html',    label: 'About Me' },
    { href: 'projects.html', label: 'Projects' },
    { href: 'certs.html',    label: 'Achievements' },
    { href: 'blog.html',     label: 'Blog' },
    { href: 'contact.html',  label: 'Contact' },
];

const SOCIAL_LINKS = [
    { href: 'https://www.linkedin.com/in/jacob-jewitt', icon: 'fab fa-linkedin' },
    { href: 'https://github.com/jacobjewitt',           icon: 'fab fa-github' },
    { href: 'https://tryhackme.com/p/jhj1998',          icon: 'fas fa-terminal' },
];

function getCurrentPage() {
    const page = window.location.pathname.split('/').pop();
    return page || 'index.html';
}

function buildHeader() {
    const currentPage = getCurrentPage();
    const navItems = NAV_LINKS.map(link => {
        const isActive = link.href === currentPage ? ' class="active"' : '';
        return `<a href="${link.href}"${isActive}>${link.label}</a>`;
    }).join('\n                ');

    return `
        <div class="logo"><a href="index.html">🛡️ Jacob Jewitt</a></div>
        <button class="menu-toggle" aria-label="Toggle navigation">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </button>
        <nav class="main-nav">
            ${navItems}
        </nav>`;
}

function buildFooter() {
    const socialIcons = SOCIAL_LINKS.map(link =>
        `<a href="${link.href}"><i class="${link.icon}"></i></a>`
    ).join('\n                    ');

    return `
        <div class="footer-container">
            <div class="footer-cta">
                <h3>Let's Connect</h3>
                <p>Feel free to reach out to collaborate on a project or just to say hello!</p>
                <a href="contact.html" class="btn">Contact Me</a>
            </div>
            <div class="footer-links">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="index.html">About Me</a></li>
                    <li><a href="projects.html">Projects</a></li>
                    <li><a href="blog.html">Blog</a></li>
                    <li><a href="certs.html">Achievements</a></li>
                </ul>
            </div>
            <div class="footer-social">
                <h3>Follow Me</h3>
                <div class="social-icons">
                    ${socialIcons}
                </div>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Jacob Jewitt. All Rights Reserved.</p>
        </div>`;
}

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    if (header) header.innerHTML = buildHeader();

    const footer = document.querySelector('footer.site-footer');
    if (footer) footer.innerHTML = buildFooter();
});
