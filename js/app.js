/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll("section");
const navList = document.querySelector("nav").firstElementChild;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const isSectionInViewport = (section) => {
	const bounds = section.getBoundingClientRect(); 
    if (bounds.top > 0 && bounds.left > 0) {
        return true;
    } 
    return false;
}

const toggleActiveClass = (section) => {
    section.classList.toggle("active");
}

const createSectionNavLink = (section) => {
    const navLink = document.createElement("a");
    navLink.className = "menu__link";
    navLink.textContent = section.dataset.nav;
    return navLink;
}

const getSelectedLinkSection = (linkText) => {
    return selectedSection = document.querySelector(`[data-nav='${linkText}']`);
}

const scrollToSection = (section) => {
    section.scrollIntoView({ behavior: "smooth" });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

const buildNav = () => {
    for (section of sections) {
        const navListItem = document.createElement("li");
        const navLink = createSectionNavLink(section);
        navListItem.appendChild(navLink);
        navList.appendChild(navListItem);
    }
    return navList;
}

const makeSectionInViewActive = () => { 
    for (section of sections) {
        if (isSectionInViewport(section)) {
            toggleActiveClass(section);
        }
    }
}

const scrollToSelectedLinkSection = (event) => {
    event.preventDefault();
    const link = event.target.closest('a');
    if (link) {
        const selectedSection = getSelectedLinkSection(link.textContent);
        scrollToSection(selectedSection);
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

window.addEventListener('DOMContentLoaded', buildNav); 

navList.addEventListener('click', scrollToSelectedLinkSection);

window.addEventListener('scroll', makeSectionInViewActive);
