
  **Where to add JavaScript**

  Create a file called script.js in the project root (e.g., /home/ktec/Projects/3csnewwebsite/script.js) and include it just
  before the closing </body> tag in every HTML file:

    <!-- Before </body> -->
    <script src="script.js"></script>
    </body>

  Add the line to index.html, about.html, contact.html, solutions.html, partners.html, promotions.html, and
  trading.html (you can copy‑paste the same block).

  ---

  **What to improve with JavaScript**

  Below are practical, high‑impact enhancements you can implement in script.js. Each includes a brief description and a
  ready‑to‑copy code snippet.

  ---

  1. Form validation & AJAX submission
  *Problem:* The contact form currently does nothing on submit (onsubmit="return false;").
  *Solution:* Validate required fields, show inline errors, and submit via fetch() to a backend endpoint (or a service like
  Formspree). Show a success/error message without reloading the page.

    // script.js – Contact form handling
    document.addEventListener('DOMContentLoaded', () => {
      const form = document.querySelector('.contact-form');
      if (!form) return;

      form.addEventListener('submit', async e => {
        e.preventDefault();
        // Clear previous errors
        form.querySelectorAll('.error').forEach(el => el.remove());
        form.querySelectorAll('.success').forEach(el => el.remove());

        // Simple validation
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();
        let valid = true;

        if (!name) { showError(form.name, 'Name is required'); valid = false; }
        if (!email) { showError(form.email, 'Email is required'); valid = false; }
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError(form.email, 'Enter a valid email'); valid = false; }
        if (!message) { showError(form.message, 'Message is required'); valid = false; }

        if (!valid) return;

        // Disable button & show loading
        const btn = form.querySelector('button[type="submit"]');
        btn.disabled = true;
        btn.textContent = 'Sending…';

        try {
          // Replace with your actual endpoint
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, message })
          });

          if (!response.ok) throw new Error(`Server error ${response.status}`);

          // Success
          form.reset();
          showSuccess(form, 'Thanks! We’ll get back to you within one business day.');
        } catch (err) {
          showError(form, err.message || 'Could not send message. Try again later.');
        } finally {
          btn.disabled = false;
          btn.textContent = 'Send Message';
        }
      });

      function showError(input, msg) {
        const err = document.createElement('div');
        err.className = 'error';
        err.style.color = '#e30613';
        err.style.fontSize = '0.875rem';
        err.style.marginTop = '0.25rem';
        err.textContent = msg;
        input.parentNode.appendChild(err);
      }

      function showError(container, msg) {
        const err = document.createElement('div');
        err.className = 'error';
        err.style.color = '#e30613';
        err.style.fontSize = '0.875rem';
        err.style.marginTop = '0.5rem';
        err.style.gridColumn = '1 / -1';
        err.textContent = msg;
        container.appendChild(err);
      }

      function showSuccess(container, msg) {
        const suc = document.createElement('div');
        suc.className = 'success';
        suc.style.color = '#2ecc71';
        suc.style.fontSize = '0.875rem';
        suc.style.marginTop = '0.5rem';
        suc.style.gridColumn = '1 / -1';
        suc.textContent = msg;
        container.appendChild(suc);
      }
    });

  **CSS tip:** Add .error and .success styles to main.css if you want consistent spacing/colors.

  ---

  2. Mobile menu enhancement
  *Problem:* The hamburger menu works via a hidden checkbox, but tapping a link doesn’t close the menu, and the body can still
  scroll.
  *Solution:* Add a small script that toggles a class on <body> to lock scroll and closes the menu when a nav link is clicked.

    // script.js – Mobile menu
    document.addEventListener('DOMContentLoaded', () => {
      const toggle = document.getElementById('nav-toggle');
      const nav = document.querySelector('.navbar');
      const body = document.body;

      if (!toggle) return;

      toggle.addEventListener('change', () => {
        body.classList.toggle('menu-open', toggle.checked);
      });

      // Close menu when a link is clicked
      document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
          if (toggle.checked) {
            toggle.checked = false;
            body.classList.remove('menu-open');
          }
        });
      });
    });

  Add to main.css:

    body.menu-open { overflow: hidden; }

  ---

  3. Smooth scrolling for anchor links
  *Problem:* Jumping to sections feels abrupt.
  *Solution:* Intercept clicks on internal anchors and animate scroll.

    // script.js – Smooth scroll
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
          const target = document.querySelector(anchor.getAttribute('href'));
          if (target) {
            e.preventDefault();
            window.scrollTo({
              top: target.offsetTop - 80, // adjust for fixed header
              behavior: 'smooth'
            });
          }
        });
      });
    });

  ---

  4. Auto‑play hero slider (with pause on hover)
  *Problem:* The hero slider relies on radio buttons; users must click arrows/dots to change slides.
  *Solution:* Add a timer that advances slides every 5 s, pausing on hover.

    // script.js – Hero auto‑play
    document.addEventListener('DOMContentLoaded', () => {
      const slides = document.querySelectorAll('.slides input[type="radio"]');
      if (slides.length === 0) return;

      let current = 0;
      const interval = 5000;
      let timer;

      function showSlide(index) {
        slides[current].checked = false;
        current = (index + slides.length) % slides.length;
        slides[current].checked = true;
      }

      function start() {
        stop();
        timer = setInterval(() => showSlide(current + 1), interval);
      }
      function stop() { clearInterval(timer); }

      // Manual controls reset timer
      document.querySelectorAll('.arrows label, .dots label').forEach(lbl => {
        lbl.addEventListener('click', () => { start(); });
      });

      const hero = document.querySelector('.hero');
      if (hero) {
        hero.addEventListener('mouseenter', stop);
        hero.addEventListener('mouseleave', start);
      }

      start();
    });

  ---

  5. Lazy‑load images (Intersection Observer)
  *Problem:* All images load immediately, impacting initial load time.
  *Solution:* Observe images and load them when they enter the viewport.

    // script.js – Lazy loading
    document.addEventListener('DOMContentLoaded', () => {
      const images = document.querySelectorAll('img[data-src], img.loading-lazy');
      if (!('IntersectionObserver' in window)) {
        // Fallback: set src directly
        images.forEach(img => {
          if (img.dataset.src) img.src = img.dataset.src;
        });
        return;
      }

      const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            img.classList.remove('loading-lazy');
            obs.unobserve(img);
          }
        });
      });

      images.forEach(img => observer.observe(img));
    });

  Add data-src="actual-image-url.jpg" to each <img> you want lazy‑loaded (remove the src attribute temporarily, or keep a
  low‑quality placeholder).

  ---

  6. Scroll‑to‑top button
  *Problem:* Long pages make it tedious to return to the top.
  *Solution:* Add a button that appears after scrolling down and smoothly scrolls to top.

    <!-- Place this just before </body> in each HTML file -->
    <button id="top-btn" aria-label="Back to top" title="Back to top">
      <i class="fa-solid fa-arrow-up"></i>
    </button>

    // script.js – Scroll-to-top
    document.addEventListener('DOMContentLoaded', () => {
      const btn = document.getElementById('top-btn');
      if (!btn) return;

      const showThreshold = 300;

      function toggleBtn() {
        btn.style.display = (window.scrollY > showThreshold) ? 'flex' : 'none';
      }

      btn.addEventListener('click', e => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });

      window.addEventListener('scroll', toggleBtn);
      toggleBtn(); // initial state
    });

  Add basic styling to main.css:

    #top-btn {
      position: fixed;
      right: 1.5rem;
      bottom: 1.5rem;
      width: 3.5rem;
      height: 3.5rem;
      background: #e30613;
      color: #fff;
      border: none;
      border-radius: 50%;
      display: none;
      align-items: center;
      justify-content: center;
      font-size: 1.25rem;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      z-index: 1000;
      cursor: pointer;
    }
    #top-btn:hover { background: #c00512; }

  ---

  7. Simple search filter (for product cards)
  *Problem:* Users may want to quickly find a product/service.
  *Solution:* Add a search input in the navbar that filters visible product cards on the **Products** section (or any section with
  .product-card).

    <!-- Inside the navbar, after the search button -->
    <input type="text" id="nav-search" placeholder="Search products…" class="nav-search">

    // script.js – Search filter
    document.addEventListener('DOMContentLoaded', () => {
      const search = document.getElementById('nav-search');
      if (!search) return;

      search.addEventListener('input', e => {
        const term = e.target.value.toLowerCase().trim();
        document.querySelectorAll('.product-card').forEach(card => {
          const text = card.textContent.toLowerCase();
          card.style.display = text.includes(term) ? '' : 'none';
        });
      });
    });

  Add a bit of style to make the input look nice (e.g., width: 180px; padding: 0.3rem; border-radius: 4px;).

  ---

  8. Dynamic year in footer
  *Problem:* The footer shows a static year (“© 2026”).
  *Solution:* Auto‑update the year.

    // script.js – Dynamic year
    document.addEventListener('DOMContentLoaded', () => {
      const yearEl = document.querySelector('.footer-bottom p');
      if (yearEl) {
        const now = new Date();
        yearEl.innerHTML = yearEl.innerHTML.replace(/\d{4}/, now.getFullYear());
      }
    });

  ---

  Next steps

  1. **Create script.js** and paste the snippets you want (you can start with a few and add more later).
  2. **Add the <script src="script.js"></script> line** before </body> in every HTML file.
  3. **Test locally** (open each page in a browser, check console for errors, verify functionality).
  4. **Optional:** Bundle/minify the script for production (e.g., with esbuild or terser) if the file grows.

  These improvements will make the site more interactive, accessible, and performant without requiring a major redesign. Let me know
  if you’d like me to generate the actual script.js file or help integrate any of the snippets!
  
  
  
  ///COPILOT
  
  Key Improvements & Where to Add Them:

1. Carousel Automation (Hero Section)

• What: Auto-rotate slides every 5 seconds instead of manual clicks only
• Where: Create  main.js  to handle slide transitions
• Impact: Better UX, increases time on page

2. Form Validation & Submission (Contact Forms)

• What: Client-side validation + send emails via EmailJS/Formspree
• Where: Add to  main.js  for both index.html and contact.html
• Impact: Instant feedback, actual email delivery

3. Mobile Navigation (Hamburger Menu)

• What: Smooth animations, click-outside to close, prevent body scroll when open
• Where: Enhance existing checkbox toggle with JS
• Impact: Better mobile UX

4. Search Functionality

• What: Search products/sections on-page, filter results in real-time
• Where: Hook up the search button (line 86 in index.html)
• Impact: Better discoverability

5. Stat Counter Animation (Stats Section)

• What: Numbers animate upward when section scrolls into view
• Where: Add Intersection Observer for stats-section
• Impact: More engaging, professional feel

6. Smooth Scroll Anchors

• What: Smooth scrolling to sections, active nav highlighting
• Where: Enhance CSS scroll-behavior with JS detection
• Impact: Better navigation feedback

7. Dark Mode Toggle (Optional)

• What: Theme switcher stored in localStorage
• Where: Add toggle button + dark CSS variants
• Impact: Accessibility + modern feel

────────────────────

Which would you like me to implement first? I recommend starting with:

1. Form validation & submission (high impact, user-facing)
2. Carousel auto-rotation (improves hero section)
3. Stat animations (visual polish)
