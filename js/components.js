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

// Compute the relative base path based on how deep the current page is.
// Root pages → '' | blog/Cryptography/ → '../../'
// Derived from the stylesheet href to work correctly under any protocol (http, file://).
function getBasePath() {
    const stylesheet = document.querySelector('link[href*="style.css"]');
    if (!stylesheet) return '';
    const depth = (stylesheet.getAttribute('href').match(/\.\.\//g) || []).length;
    return '../'.repeat(depth);
}

function getCurrentPage() {
    return window.location.pathname.split('/').pop() || 'index.html';
}

function buildHeader() {
    const currentPage = getCurrentPage();
    const basePath = getBasePath();
    const inBlog = window.location.pathname.includes('/blog/');

    const navItems = NAV_LINKS.map(link => {
        const isActive = link.href === currentPage || (inBlog && link.href === 'blog.html');
        const activeAttr = isActive ? ' class="active"' : '';
        return `<a href="${basePath}${link.href}"${activeAttr}>${link.label}</a>`;
    }).join('\n                ');

    return `
        <div class="logo"><a href="${basePath}index.html">🛡️ Jacob Jewitt</a></div>
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
    const basePath = getBasePath();

    const socialIcons = SOCIAL_LINKS.map(link =>
        `<a href="${link.href}"><i class="${link.icon}"></i></a>`
    ).join('\n                    ');

    const quickLinks = NAV_LINKS.map(link =>
        `<li><a href="${basePath}${link.href}">${link.label}</a></li>`
    ).join('\n                    ');

    return `
        <div class="footer-container">
            <div class="footer-cta">
                <h3>Let's Connect</h3>
                <p>Feel free to reach out to collaborate on a project or just to say hello!</p>
                <a href="${basePath}contact.html" class="btn">Contact Me</a>
            </div>
            <div class="footer-links">
                <h3>Quick Links</h3>
                <ul>
                    ${quickLinks}
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
