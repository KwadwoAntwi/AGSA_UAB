/* =========================
   AGSA WEBSITE JAVASCRIPT
   Hero Carousel Version
========================= */


/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");

    const menuIsOpen = navLinks.classList.contains("show");

    menuToggle.textContent = menuIsOpen ? "×" : "☰";
    menuToggle.setAttribute(
      "aria-label",
      menuIsOpen ? "Close navigation menu" : "Open navigation menu"
    );
  });
}


// Close mobile menu when a nav link is clicked
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    if (!navLinks || !menuToggle) return;

    navLinks.classList.remove("show");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});


/* =========================
   HERO SLIDER / CAROUSEL
========================= */

const heroSlides = document.querySelectorAll(".hero-slide");
const sliderDots = document.querySelectorAll(".slider-dot");
const prevSlideBtn = document.getElementById("prevSlide");
const nextSlideBtn = document.getElementById("nextSlide");
const heroSlider = document.querySelector(".hero-slider");

let currentSlide = 0;
let slideInterval;

const autoSlideDelay = 6000;

function showSlide(slideIndex) {
  if (!heroSlides.length) return;

  if (slideIndex >= heroSlides.length) {
    currentSlide = 0;
  } else if (slideIndex < 0) {
    currentSlide = heroSlides.length - 1;
  } else {
    currentSlide = slideIndex;
  }

  heroSlides.forEach((slide) => {
    slide.classList.remove("active");
  });

  sliderDots.forEach((dot) => {
    dot.classList.remove("active");
  });

  heroSlides[currentSlide].classList.add("active");

  if (sliderDots[currentSlide]) {
    sliderDots[currentSlide].classList.add("active");
  }
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  showSlide(currentSlide - 1);
}

function startAutoSlide() {
  stopAutoSlide();

  slideInterval = setInterval(() => {
    nextSlide();
  }, autoSlideDelay);
}

function stopAutoSlide() {
  if (slideInterval) {
    clearInterval(slideInterval);
  }
}


// Next and previous buttons
if (nextSlideBtn) {
  nextSlideBtn.addEventListener("click", () => {
    nextSlide();
    startAutoSlide();
  });
}

if (prevSlideBtn) {
  prevSlideBtn.addEventListener("click", () => {
    prevSlide();
    startAutoSlide();
  });
}


// Dot navigation
sliderDots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const selectedSlide = Number(dot.getAttribute("data-slide"));

    showSlide(selectedSlide);
    startAutoSlide();
  });
});


// Pause carousel when mouse is over hero section
if (heroSlider) {
  heroSlider.addEventListener("mouseenter", stopAutoSlide);
  heroSlider.addEventListener("mouseleave", startAutoSlide);
}


// Keyboard controls for slider
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextSlide();
    startAutoSlide();
  }

  if (event.key === "ArrowLeft") {
    prevSlide();
    startAutoSlide();
  }
});


// Swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

if (heroSlider) {
  heroSlider.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].screenX;
  });

  heroSlider.addEventListener("touchend", (event) => {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
  });
}

function handleSwipe() {
  const swipeDistance = touchStartX - touchEndX;
  const minimumSwipeDistance = 60;

  if (swipeDistance > minimumSwipeDistance) {
    nextSlide();
    startAutoSlide();
  }

  if (swipeDistance < -minimumSwipeDistance) {
    prevSlide();
    startAutoSlide();
  }
}


// Start carousel
showSlide(currentSlide);
startAutoSlide();


/* =========================
   EVENT FILTER BUTTONS
========================= */

const filterButtons = document.querySelectorAll(".filter-btn");
const eventCards = document.querySelectorAll(".event-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedCategory = button.getAttribute("data-filter");

    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
    });

    button.classList.add("active");

    eventCards.forEach((card) => {
      const cardCategory = card.getAttribute("data-category");

      if (selectedCategory === "all" || selectedCategory === cardCategory) {
        card.style.display = "flex";
      } else {
        card.style.display = "none";
      }
    });
  });
});


/* =========================
   EVENT DETAILS MODAL
========================= */

const eventButtons = document.querySelectorAll(".event-btn");
const eventModal = document.getElementById("eventModal");
const modalClose = document.getElementById("modalClose");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");

const eventDetails = {
  "AGSA Hiking Event": {
    title: "AGSA Hiking Event",
    text:
      "Join AGSA for our first event of the semester at Vulcan Trail on Saturday, August 29, 2026, at 8:00 AM. Pickup will be at 7:30 AM at Hill Center. Come ready to walk, connect, take photos, and start the semester with good energy."
  },

  "Graduate Student Mixer": {
    title: "Graduate Student Mixer",
    text:
      "A relaxed social gathering for graduate students to meet new people, reconnect with friends, share experiences, and build community across departments."
  },

  "Cultural Night": {
    title: "Cultural Night",
    text:
      "A celebration of African culture through food, music, fashion, dance, storytelling, language, and community. Come ready to represent, learn, and celebrate."
  }
};

eventButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const eventName = button.getAttribute("data-event");
    const selectedEvent = eventDetails[eventName];

    if (modalTitle && modalText) {
      if (selectedEvent) {
        modalTitle.textContent = selectedEvent.title;
        modalText.textContent = selectedEvent.text;
      } else {
        modalTitle.textContent = "Event Details";
        modalText.textContent = "More details about this event will be shared soon.";
      }
    }

    openEventModal();
  });
});

function openEventModal() {
  if (!eventModal) return;

  eventModal.classList.add("show");
  eventModal.setAttribute("aria-hidden", "false");
}

function closeEventModal() {
  if (!eventModal) return;

  eventModal.classList.remove("show");
  eventModal.setAttribute("aria-hidden", "true");
}

if (modalClose) {
  modalClose.addEventListener("click", closeEventModal);
}

if (eventModal) {
  eventModal.addEventListener("click", (event) => {
    if (event.target === eventModal) {
      closeEventModal();
    }
  });
}




/* =========================
   GALLERY IMAGE MODAL
========================= */

const galleryItems = document.querySelectorAll(".gallery-item");
const imageModal = document.getElementById("imageModal");
const imageModalClose = document.getElementById("imageModalClose");
const modalImage = document.getElementById("modalImage");

galleryItems.forEach((item) => {
  item.addEventListener("click", () => {
    const imageSource = item.getAttribute("data-image");
    const imageAlt = item.querySelector("img")?.getAttribute("alt") || "AGSA gallery image";

    if (modalImage) {
      modalImage.src = imageSource;
      modalImage.alt = imageAlt;
    }

    openImageModal();
  });
});


function openImageModal() {
  if (!imageModal) return;

  imageModal.classList.add("show");
  imageModal.setAttribute("aria-hidden", "false");
}

function closeImageModal() {
  if (!imageModal) return;

  imageModal.classList.remove("show");
  imageModal.setAttribute("aria-hidden", "true");

  if (modalImage) {
    modalImage.src = "";
  }
}

if (imageModalClose) {
  imageModalClose.addEventListener("click", closeImageModal);
}

if (imageModal) {
  imageModal.addEventListener("click", (event) => {
    if (event.target === imageModal) {
      closeImageModal();
    }
  });
}


/* =========================
   POLL FORM
========================= */

const pollForm = document.getElementById("pollForm");
const pollResult = document.getElementById("pollResult");

if (pollForm && pollResult) {
  pollForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const selectedActivity = document.querySelector('input[name="activity"]:checked');

    if (!selectedActivity) {
      pollResult.textContent = "Please choose an activity before submitting your vote.";
      pollResult.classList.add("show");
      return;
    }

    pollResult.textContent = `Thank you! Your vote for "${selectedActivity.value}" has been submitted.`;
    pollResult.classList.add("show");

    pollForm.reset();
  });
}


/* =========================
   FAQ ACCORDION
========================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  const icon = question.querySelector("span");

  question.addEventListener("click", () => {
    const itemIsOpen = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");

      const faqIcon = faq.querySelector(".faq-question span");

      if (faqIcon) {
        faqIcon.textContent = "+";
      }
    });

    if (!itemIsOpen) {
      item.classList.add("active");

      if (icon) {
        icon.textContent = "−";
      }
    }
  });
});


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !message) {
      alert("Please fill out all fields before sending your message.");
      return;
    }

    alert(`Thank you, ${name}! Your message has been received.`);

    contactForm.reset();
  });
}


/* =========================
   CLOSE MODALS WITH ESC KEY
========================= */

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeEventModal();
    closeImageModal();
  }
});


/* =========================
   ACTIVE NAV LINK ON SCROLL
========================= */

const sections = document.querySelectorAll("section[id]");

function updateActiveNavLink() {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active-link");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active-link");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);
window.addEventListener("load", updateActiveNavLink);


/* =========================
   REVEAL ELEMENTS ON SCROLL
========================= */

const revealElements = document.querySelectorAll(
  ".identity-card, .experience-card, .event-card, .gallery-item, .contact-info, .contact-form"
);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.16
  }
);

revealElements.forEach((element) => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});