/* Small progressive enhancements for the static site. */
document.addEventListener("DOMContentLoaded", () => {
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    const destination = link.getAttribute("href");
    if (destination === currentPage || (currentPage === "index.html" && destination === "#top")) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  const menuToggle = document.querySelector(".nav-toggle");
  const menuButton = document.querySelector(".nav-toggle-label");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && menuButton && navMenu) {
    menuButton.setAttribute("role", "button");
    menuButton.setAttribute("tabindex", "0");
    menuButton.setAttribute("aria-controls", "site-navigation");
    navMenu.id = "site-navigation";

    const syncMenuState = () => menuButton.setAttribute("aria-expanded", String(menuToggle.checked));
    syncMenuState();
    menuToggle.addEventListener("change", syncMenuState);
    menuButton.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        menuToggle.checked = !menuToggle.checked;
        menuToggle.dispatchEvent(new Event("change"));
      }
    });
    navMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      if (window.matchMedia("(max-width: 768px)").matches) {
        menuToggle.checked = false;
        menuToggle.dispatchEvent(new Event("change"));
      }
    }));
  }

  const hero = document.querySelector(".hero");
  const slideInputs = [...document.querySelectorAll('input[name="slide"]')];
  if (hero && slideInputs.length > 1 && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    let timer;
    const start = () => {
      clearInterval(timer);
      timer = window.setInterval(() => {
        const current = slideInputs.findIndex((input) => input.checked);
        slideInputs[(current + 1) % slideInputs.length].click();
      }, 6500);
    };
    const pause = () => clearInterval(timer);
    ["mouseenter", "focusin", "touchstart"].forEach((event) => hero.addEventListener(event, pause, { passive: true }));
    ["mouseleave", "focusout"].forEach((event) => hero.addEventListener(event, start));
    hero.querySelectorAll(".arrow, .dot").forEach((control) => control.addEventListener("click", start));
    start();
  }

  document.querySelectorAll(".search-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const existing = document.querySelector(".site-search");
      if (existing) return existing.querySelector("input").focus();
      const search = document.createElement("form");
      search.className = "site-search";
      search.innerHTML = '<label class="sr-only" for="site-search-input">Search this page</label><input id="site-search-input" type="search" placeholder="Search this page"><button type="button" aria-label="Close search">×</button>';
      button.parentElement.append(search);
      const input = search.querySelector("input");
      input.focus();
      search.addEventListener("submit", (event) => {
        event.preventDefault();
        const query = input.value.trim().toLowerCase();
        const target = [...document.querySelectorAll("main h1, main h2, main h3, main p")]
          .find((element) => element.textContent.toLowerCase().includes(query));
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "center" });
          target.classList.add("search-match");
          window.setTimeout(() => target.classList.remove("search-match"), 1800);
        } else if (query) {
          input.setCustomValidity("No matching content found on this page.");
          input.reportValidity();
        }
      });
      input.addEventListener("input", () => input.setCustomValidity(""));
      search.querySelector("button").addEventListener("click", () => search.remove());
    });
  });

  document.querySelectorAll(".contact-form").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      const name = form.querySelector("#name")?.value.trim() || "Website visitor";
      const company = form.querySelector("#company")?.value.trim() || "Not provided";
      const email = form.querySelector("#email")?.value.trim() || "Not provided";
      const message = form.querySelector("#message")?.value.trim() || "Not provided";
      const subject = encodeURIComponent(`Website enquiry from ${name}`);
      const body = encodeURIComponent(`Name: ${name}\nCompany: ${company}\nEmail: ${email}\n\nProject details:\n${message}`);
      window.location.href = `mailto:info@3csbusiness.co.ke?subject=${subject}&body=${body}`;
      const note = document.createElement("p");
      note.className = "form-status";
      note.setAttribute("role", "status");
      note.textContent = "Your email app is opening with your enquiry ready to send.";
      form.querySelector(".form-status")?.remove();
      form.append(note);
    });
  });

  const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const number = entry.target;
      const target = Number(number.textContent.replace(/[^0-9]/g, ""));
      const started = performance.now();
      const duration = 1000;
      const update = (time) => {
        const progress = Math.min((time - started) / duration, 1);
        number.textContent = Math.round(target * (1 - Math.pow(1 - progress, 3))).toLocaleString();
        if (progress < 1) requestAnimationFrame(update);
      };
      number.textContent = "0";
      requestAnimationFrame(update);
      observer.unobserve(number);
    });
  }, { threshold: 0.6 });
  document.querySelectorAll(".stat-box h2").forEach((number) => statObserver.observe(number));
});
