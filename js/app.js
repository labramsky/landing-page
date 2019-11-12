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


/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// Build the nav
const buildNav = (navList, sections) => {
    for (section of sections) {
        const listItem = document.createElement("li");
        const listItemLink = document.createElement("a");
        listItemLink.className = "menu__link";
        listItemLink.textContent = section.dataset.nav;
        listItem.appendChild(listItemLink);
        navList.appendChild(listItem);
    }
    // console.log('new nav list: ', navList);
    return navList;
}

// Add class 'active' to section when near top of viewport
const sectionIsInViewport = (sectionId) => {
    const section = document.getElementById(sectionId);
	var rect = section.getBoundingClientRect();
    if (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || window.outerHeight) && 
        rect.right <= (window.innerWidth || window.outerHeight)
    ) {
        // console.log("section " + section.id + " is in viewport!");
        section.classList.add("active");
    } else {
        section.classList.remove("active");
    }
}

// Scroll to anchor ID using scrollTO event
const scrollToSection = (navList) => {
    for (navListItem of navList.childNodes) {
        const link = navListItem.firstElementChild;
        link.addEventListener('click', function(event) {
            const selectedSection = document.querySelector("[data-nav='" + link.textContent +"'");
            selectedSection.scrollIntoView({behavior: "smooth"});
        });
    }
}


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav(navList, sections);

// Scroll to section on link click
scrollToSection(navList);

// Set sections as active
window.addEventListener('scroll', function(e) {
    for (section of sections) {
        sectionIsInViewport(section.id)
    }
});


