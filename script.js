
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle");
  const navigation = document.querySelector("#primary-navigation");
  const menuStatus = document.querySelector("#menu-status");
  const currentYear = document.querySelector("#current-year");

  // Keep the footer year up to date.
  if (currentYear) {
    currentYear.textContent = String(new Date().getFullYear());
  }

  // Stop safely if the navigation elements are missing.
  if (!menuToggle || !navigation) {
    return;
  }

  const navLinks = navigation.querySelectorAll("a");

  function setMenuOpen(isOpen) {
    navigation.classList.toggle("is-open", isOpen);

    menuToggle.setAttribute(
      "aria-expanded",
      String(isOpen)
    );

    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    if (menuStatus) {
      menuStatus.textContent = isOpen
        ? "Navigation menu opened"
        : "Navigation menu closed";
    }
  }

  // Toggle the mobile navigation.
  menuToggle.addEventListener("click", () => {
    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    setMenuOpen(!isOpen);
  });

  // Close the menu after a visitor selects a navigation link.
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      setMenuOpen(false);
    });
  });

  // Allow visitors to close the menu using Escape.
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuToggle.getAttribute("aria-expanded") === "true"
    ) {
      setMenuOpen(false);
      menuToggle.focus();
    }
  });

  // Close the mobile menu when clicking outside it.
  document.addEventListener("click", (event) => {
    const clickedInsideNavigation =
      navigation.contains(event.target);

    const clickedToggle =
      menuToggle.contains(event.target);

    const isOpen =
      menuToggle.getAttribute("aria-expanded") === "true";

    if (
      isOpen &&
      !clickedInsideNavigation &&
      !clickedToggle
    ) {
      setMenuOpen(false);
    }
  });

  // Reset the menu when moving to the desktop layout.
  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) {
      setMenuOpen(false);
    }
  });
});
