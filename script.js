lucide.createIcons();
const skillCards = document.querySelectorAll(".skill-card");
const projectCards = document.querySelectorAll(".project-card");
const fadeUps = document.querySelectorAll(".group");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.2 }
);
skillCards.forEach((card) => observer.observe(card));

projectCards.forEach((card) => observer.observe(card));
fadeUps.forEach((el) => observer.observe(el));

const backToTopBtn = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.remove("hidden");
    backToTopBtn.classList.add("flex", "items-center", "justify-center");
  } else {
    backToTopBtn.classList.add("hidden");
    backToTopBtn.classList.remove("flex");
  }
});

backToTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

(function () {
  emailjs.init("E4QYE_TmBoS8aSEwX"); // your EmailJS public key (ok in frontend)
})();

const form = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = {
    from_name: document.getElementById("name").value,
    from_email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  formMessage.classList.remove("hidden");
  formMessage.textContent = "Sending...";

  // Send the main email to you (your template id)
  emailjs
    .send("service_8t6na9a", "template_22iudmk", formData)
    .then((res) => {
      // THEN send auto-reply to the user
      // IMPORTANT: replace 'template_autoreply_xxx' with your Auto-Reply template id
      // and make sure the auto-reply template expects variables `to_name` and `to_email`
      return emailjs.send("service_8t6na9a", "template_nblpfgb", {
        to_email: formData.from_email, // 👈 this goes to user
        from_name: formData.from_name,
        subject: formData.subject,
        message: formData.message,
      });
    })
    .then((res2) => {
      formMessage.textContent =
        " Message sent successfully! Check your inbox for confirmation.";
      form.reset();
      setTimeout(() => formMessage.classList.add("hidden"), 6000);
    })
    .catch((err) => {
      console.error("EmailJS error:", err);
      formMessage.textContent = "Something went wrong. Please try again later.";
      formMessage.classList.remove("text-green-400");
      formMessage.classList.add("text-red-400");
    });
});
