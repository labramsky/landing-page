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

const createSectionNavLink = (section) => {
    const navLink = document.createElement("a");
    navLink.className = "menu__link";
    navLink.textContent = section.dataset.nav;
    navLink.dataset.section = section.dataset.nav;
    return navLink;
}

const getElementPosition = (element) => {
    let rect = element.getBoundingClientRect(),
    scrollTop = window.scrollY || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, bottom: rect.height + rect.top + scrollTop }
}

const setSectionPositionData = (section) => {
    const offset = 150;
    for (section of sections) {
        let sectionPosition = getElementPosition(section);
        section.dataset.top = sectionPosition.top - offset;
        section.dataset.bottom = sectionPosition.bottom - offset;
    }
}

const isSectionInViewport = (section, scrollY) => {
    return (scrollY > section.dataset.top && scrollY < section.dataset.bottom);
}

const getSelectedLinkSection = (linkText) => {
    return document.querySelector(`[data-nav='${linkText}']`);
}

const getSectionNavLink = (section) => {
    return document.querySelector(`[data-section='${section.dataset.nav}']`);
}

const scrollToSection = (section) => {
    section.scrollIntoView({ behavior: "smooth" });
}

const addActiveClass = (...elements) => {
    for (const element of elements) {
        element.classList.add("active");
    }
}

const removeActiveClass = (...elements) => {
    for (const element of elements) {
        element.classList.remove("active");
    }
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

const setUpSectionNav = () => {
    buildNav();
    setSectionPositionData();
}

const makeSectionInViewActive = () => {
    let scrollY = window.scrollY;
    for (section of sections) {
        const sectionNavLink = getSectionNavLink(section);
        if (isSectionInViewport(section, scrollY)) {
            addActiveClass(section, sectionNavLink);
        } else {
            removeActiveClass(section, sectionNavLink);
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

window.addEventListener('DOMContentLoaded', setUpSectionNav); 
navList.addEventListener('click', scrollToSelectedLinkSection);
window.addEventListener('scroll', makeSectionInViewActive, { passive: true }); 
