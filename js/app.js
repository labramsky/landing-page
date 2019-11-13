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

const start = performance.now();

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
const sectionIsInViewport = (section) => {
	const bounds = section.getBoundingClientRect();
    if (
        bounds.top >= 0 &&
        bounds.left >= 0 &&
        bounds.bottom <= (window.innerHeight || window.outerHeight) && 
        bounds.right <= (window.innerWidth || window.outerHeight)
    ) {
        return true;
    } 
    return false;
}

const toggleActiveClass = (section) => {
    section.classList.toggle("active");
}

const scrollToSelectedLinkSection = (linkText) => {
    const selectedSection = document.querySelector(`[data-nav='${linkText}']`);
    selectedSection.scrollIntoView({behavior: "smooth"});
}

const createSectionNavLink = (section) => {
    const navLink = document.createElement("a");
    navLink.className = "menu__link";
    navLink.textContent = section.dataset.nav;
    return navLink;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the nav
const buildNav = () => {
    for (section of sections) {
        const navListItem = document.createElement("li");
        const navLink = createSectionNavLink(section);
        navListItem.appendChild(navLink);
        navList.appendChild(navListItem);
    }
    return navList;
}

// Add class 'active' to section when near top of viewport
const scrolledToSectionHandler = () => {
    for (section of sections) {
        if (sectionIsInViewport(section)) {
            toggleActiveClass(section);
        }
    }
}

// Scroll to anchor ID using scrollTO event
const clickedNavLinkHandler = (event) => {
    event.preventDefault();
    let link = event.target.closest('a');
    if (link) {
        scrollToSelectedLinkSection(link.textContent);
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
window.addEventListener('load', buildNav);

// Scroll to section on link click
navList.addEventListener('click', clickedNavLinkHandler);

// Set sections as active
window.addEventListener('scroll', scrolledToSectionHandler);


const end = performance.now();
console.log("This code took: ", (end - start), "miliseconds."); 

// Performance log:
// Nov 12 at 3pm - with buildNav() called directly with no event: 0.6 - 1.0 miliseconds avg 
// Nov 12 at 3pm - with window.addEvent(buildNav): 0.2 - 0.4 miliseconds avg