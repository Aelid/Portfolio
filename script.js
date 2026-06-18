document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     SCROLL REVEAL
  ========================= */
  const elements = document.querySelectorAll("section, .card, .cv-card, .contact-card, .projects-slider-section, .project-card-tabs");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.15
  });

  elements.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });

  /* =========================
     HEADER SCROLL EFFECT
  ========================= */

  const header = document.querySelector(".header");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 20) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

});

const emailLink = document.getElementById("copyEmail");
const toast = document.getElementById("copyToast");

if (emailLink) {
  emailLink.addEventListener("click", (e) => {
    e.preventDefault();

    navigator.clipboard.writeText("behalluigi@gmail.com");

    toast.classList.add("show");

    setTimeout(() => {
      toast.classList.remove("show");
    }, 2000);
  });
}

const projectsTranslations = {
  fr: [
    {
      title: "Kanap",
      tech: "HTML • CSS • JavaScript",
      description: "Site e-commerce permettant de consulter des produits, personnaliser ses achats et gérer un panier avant validation de commande.",
      image: "images/projects/kanapimg.png"
    },
    {
      title: "Piiquante",
      tech: "Node.js • Vue.js • MongoDB",
      description: "API backend sécurisée avec authentification, gestion d’images et base de données MongoDB.",
      image: "images/projects/hotsauce.png"
    },
    {
      title: "Groupomania",
      tech: "React • API REST • Responsive",
      description: "Réseau social interne d’entreprise permettant aux utilisateurs de publier, consulter et interagir avec des articles au sein d’une plateforme privée.",
      image: "images/projects/Groupo.png"
    }
  ],
  en: [
    {
      title: "Kanap",
      tech: "HTML • CSS • JavaScript",
      description: "E-commerce website allowing users to browse products, customize their purchases and manage a cart before order confirmation.",
      image: "images/projects/kanapimg.png"
    },
    {
      title: "Piiquante",
      tech: "Node.js • Express • MongoDB",
      description: "Secure backend API with authentication, image management and a MongoDB database.",
      image: "images/projects/hotsauce.png"
    },
    {
      title: "Groupomania",
      tech: "React • REST API • Responsive",
      description: "Internal company social network allowing users to publish, view and interact with articles within a private platform.",
      image: "images/projects/Groupo.png"
    }
  ]
};

let currentProject = 0;

const projectImage = document.getElementById("projectImage");
const projectTech = document.getElementById("projectTech");
const projectTitle = document.getElementById("projectTitle");
const projectDescription = document.getElementById("projectDescription");

function updateProject() {
    const slide = document.querySelector(".project-slide");

    slide.classList.add("fade");

    setTimeout(()=> { 
  const project = projectsTranslations[getCurrentLanguage()][currentProject];

  projectImage.src = project.image;
  projectImage.alt = project.title;
  projectTech.textContent = project.tech;
  projectTitle.textContent = project.title;
  projectDescription.textContent = project.description;

  slide.classList.remove("fade");
    }, 250);
}
if (projectImage&& projectTech && projectTitle && projectDescription) {
    updateProject();


document.querySelector(".next").addEventListener("click", () => {
  currentProject = (currentProject + 1) % projectsTranslations[getCurrentLanguage()].length;
  updateProject();
});

document.querySelector(".prev").addEventListener("click", () => {
  currentProject = (currentProject - 1 + projectsTranslations[getCurrentLanguage()].length) % projectsTranslations[getCurrentLanguage()].length;
  updateProject();
});
}

  document.querySelectorAll(".tab-btn").forEach((button) => {
  button.addEventListener("click", () => {
    const project = button.dataset.project;
    const tab = button.dataset.tab;

    document
      .querySelectorAll(`.tab-btn[data-project="${project}"]`)
      .forEach((btn) => btn.classList.remove("active"));

    document
      .querySelectorAll(`[id^="${project}-"]`)
      .forEach((content) => content.classList.remove("active"));

    button.classList.add("active");
    document.getElementById(`${project}-${tab}`).classList.add("active");
  });
});

function getCurrentLanguage() {
  return localStorage.getItem("language") || "fr";
}

function setLanguage(lang) {
  localStorage.setItem("language", lang);
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-key]").forEach(element => {
    const key = element.dataset.key;

    if (translations[lang] && translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-html-key]").forEach(element => {
    const key = element.dataset.htmlKey;

    if (translations[lang] && translations[lang][key]) {
      element.innerHTML = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-placeholder-key]").forEach(element => {
    const key = element.dataset.placeholderKey;

    if (translations[lang] && translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });

  if (projectImage && projectTech && projectTitle && projectDescription) {
    updateProject();
  }
}

document.getElementById("fr-btn")?.addEventListener("click", () => {
  setLanguage("fr");
});

document.getElementById("en-btn")?.addEventListener("click", () => {
  setLanguage("en");
});

const savedLanguage = localStorage.getItem("language") || "fr";
setLanguage(savedLanguage);

/* =========================
   EMAILJS CONTACT FORM
========================= */

emailjs.init({
  publicKey: "nljndhCbMNX6jF_um"
});

const contactForm = document.getElementById("contact-form");

if (contactForm) {

  contactForm.addEventListener("submit", function (e) {

    e.preventDefault();

    emailjs.sendForm(
      "service_sjzqsjs",
      "template_4zerdyi",
      this
    )
    .then(() => {

      alert("Message envoyé avec succès !");
      contactForm.reset();

    })
    .catch((error) => {

      console.error("EmailJS Error:", error);
      alert("Erreur lors de l'envoi du message.");

    });

  });

}