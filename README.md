# Landing Page Project

## Table of Contents

* [Overview](#overview)
* [Design Decisions](#designdecisions)

## Overview

I used the starter project's HTML and CSS styling for the Landing Page project, modifying the JavaScript file. The project had three main goals:
<ol>
    <li>Programatically build the navigation bar using the page’s section headers</li>
    <li>Scroll to anchors from navigation using scroll functions</li>
    <li>Add "active" class to section in viewport upon scrolling</li>
</ol>

## Design Decisions

<h2>Navigation Bar</h2>

The main function to build the navigation bar is `buildNav()` which is called once the page is fully loaded. This function creates list elements to build the navigation's unordered list, and uses the helper function `createSectionNavLink()` to create link elements using the sections' data tags. Since there are no images to load in the page, I used the `DOMContentLoaded` event. Using the event along with the keyword `defer` in the HTML `<script>` tag, I can ensure that the DOM elements needed to build the navigation will be exist at the time the function is called. 

<h2>Scroll To Sections</h2>

When a section link is clicked in the navigation, the main function called to scroll to it is `scrollToSelectedLinkSection()`. Since we want to stop the default event on the click, I used `preventDefault()`. This allows a check that a link has been selected, and then it calls `getSelectedLinkSection()`, which returns the selected section. Once we have the section to scroll to, the function calls `scrollToSection()` to scroll to the selected section into the view. 

<h2>Active Section</h2>

A scroll listener calling `makeSectionInViewActive()` is used to keep track of which section is in the view and set it to "`active`." For each section, it checks if its in the view using `isSectionInViewport()` and toggles the `active`" class with `toggleActiveClass()`. If a section is in the viewport, the "`active`" class will be added from its `classList`, otherwise it is removed.