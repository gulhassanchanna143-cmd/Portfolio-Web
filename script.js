// ===== Mobile menu =====
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
  navLinks.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
}

navToggle.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close the menu after choosing a link
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

// Close the menu with the Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeMenu();
});

// ===== Highlight the current section in the menu =====
const sections = document.querySelectorAll("main section[id]");
const menuLinks = document.querySelectorAll(".nav-links a");

function setActiveLink() {
  const scrollPos = window.scrollY + 120;
  let currentId = "";

  sections.forEach(function (section) {
    if (scrollPos >= section.offsetTop) {
      currentId = section.id;
    }
  });

  menuLinks.forEach(function (link) {
    const isActive = link.getAttribute("href") === "#" + currentId;
    link.classList.toggle("active", isActive && !link.classList.contains("nav-cta"));
  });
}

window.addEventListener("scroll", setActiveLink);
setActiveLink();

// ===== Footer year =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Contact form =====
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

function showError(fieldId, message) {
  const input = document.getElementById(fieldId);
  document.getElementById(fieldId + "Error").textContent = message;
  input.parentElement.classList.toggle("invalid", message !== "");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let valid = true;

  showError("name", "");
  showError("email", "");
  showError("message", "");
  statusEl.textContent = "";

  if (name === "") {
    showError("name", "Enter your name.");
    valid = false;
  }
  if (!emailPattern.test(email)) {
    showError("email", "Enter a valid email address.");
    valid = false;
  }
  if (message.length < 10) {
    showError("message", "Write a message of at least 10 characters.");
    valid = false;
  }
  if (!valid) return;

  // Opens the visitor's email app with the message filled in
  const subject = encodeURIComponent("Portfolio message from " + name);
  const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");
  window.location.href =
    "mailto:gulhassanchanna143@gmail.com?subject=" + subject + "&body=" + body;

  statusEl.textContent = "Your email app is opening with your message.";
  form.reset();
});
