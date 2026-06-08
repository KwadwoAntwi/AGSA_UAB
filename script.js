/* =========================
   AGSA WEBSITE JAVASCRIPT
========================= */


/* =========================
   MOBILE NAVIGATION
========================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");

  if (navLinks.classList.contains("show")) {
    menuToggle.textContent = "×";
    menuToggle.setAttribute("aria-label", "Close navigation menu");
  } else {
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  }
});


// Close mobile menu when a nav link is clicked
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("show");
    menuToggle.textContent = "☰";
    menuToggle.setAttribute("aria-label", "Open navigation menu");
  });
});


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
  "AGSA Games Day": {
    title: "AGSA Games Day",
    text:
      "Join us for a fun day of soccer, volleyball, games, food, friendly competition, and community. Transport and food will be provided. Come ready to play, laugh, and maybe pretend you are not competitive."
  },

  "Graduate Student Mixer": {
    title: "Graduate Student Mixer",
    text:
      "A relaxed social gathering for graduate students to meet, connect, share experiences, and build friendships across departments."
  },

  "Cultural Night": {
    title: "Cultural Night",
    text:
      "A celebration of African culture through food, music, fashion, storytelling, dance, and community."
  }
};

eventButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const eventName = button.getAttribute("data-event");
    const selectedEvent = eventDetails[eventName];

    if (selectedEvent) {
      modalTitle.textContent = selectedEvent.title;
      modalText.textContent = selectedEvent.text;
    } else {
      modalTitle.textContent = "Event Details";
      modalText.textContent = "More details about this event will be shared soon.";
    }

    eventModal.classList.add("show");
    eventModal.setAttribute("aria-hidden", "false");
  });
});

modalClose.addEventListener("click", closeEventModal);

eventModal.addEventListener("click", (event) => {
  if (event.target === eventModal) {
    closeEventModal();
  }
});

function closeEventModal() {
  eventModal.classList.remove("show");
  eventModal.setAttribute("aria-hidden", "true");
}


/* =========================
   POLL FORM
========================= */

const pollForm = document.getElementById("pollForm");
const pollResult = document.getElementById("pollResult");

pollForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const selectedGame = document.querySelector('input[name="game"]:checked');

  if (!selectedGame) {
    pollResult.textContent = "Please choose a game first. We know decisions are hard, but still.";
    return;
  }

  pollResult.textContent = `Your vote for ${selectedGame.value} has been submitted. Excellent choice. Probably.`;

  pollForm.reset();
});


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

    modalImage.src = imageSource;
    imageModal.classList.add("show");
    imageModal.setAttribute("aria-hidden", "false");
  });
});

imageModalClose.addEventListener("click", closeImageModal);

imageModal.addEventListener("click", (event) => {
  if (event.target === imageModal) {
    closeImageModal();
  }
});

function closeImageModal() {
  imageModal.classList.remove("show");
  imageModal.setAttribute("aria-hidden", "true");
  modalImage.src = "";
}


/* =========================
   FAQ ACCORDION
========================= */

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question.addEventListener("click", () => {
    const isOpen = item.classList.contains("active");

    faqItems.forEach((faq) => {
      faq.classList.remove("active");
      faq.querySelector(".faq-question span").textContent = "+";
    });

    if (!isOpen) {
      item.classList.add("active");
      question.querySelector("span").textContent = "−";
    }
  });
});


/* =========================
   CONTACT FORM
========================= */

const contactForm = document.getElementById("contactForm");

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

window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((link) => {
    link.classList.remove("active-link");

    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active-link");
    }
  });
});