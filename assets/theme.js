/**
 * Theme JavaScript
 * Handles all interactive features
 */

class ThemeApp {
  constructor() {
    this.init();
  }

  init() {
    this.initMobileMenu();
    this.initDarkMode();
    this.initCartDrawer();
    this.initQuickView();
    this.initSmoothScroll();
    this.initAnimations();
  }

  /**
   * Mobile Menu
   */
  initMobileMenu() {
    const menuToggle = document.getElementById("mobileMenuToggle");
    const menuClose = document.getElementById("mobileMenuClose");
    const menu = document.getElementById("mobileMenu");
    const overlay = document.getElementById("modal-overlay");

    if (!menuToggle || !menu) return;

    const openMenu = () => {
      menu.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeMenu = () => {
      menu.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    };

    menuToggle.addEventListener("click", openMenu);
    if (menuClose) menuClose.addEventListener("click", closeMenu);
    overlay.addEventListener("click", closeMenu);
  }

  /**
   * Dark Mode Toggle
   */
  initDarkMode() {
    if (!window.theme.settings.enableDarkMode) return;

    const toggle = document.getElementById("darkModeToggle");
    if (!toggle) return;

    // Check for saved preference or default to light mode
    const currentTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);

    toggle.addEventListener("click", () => {
      const theme = document.documentElement.getAttribute("data-theme");
      const newTheme = theme === "light" ? "dark" : "light";

      document.documentElement.setAttribute("data-theme", newTheme);
      localStorage.setItem("theme", newTheme);

      // Add transition effect
      document.documentElement.style.transition =
        "background-color 0.3s ease, color 0.3s ease";
      setTimeout(() => {
        document.documentElement.style.transition = "";
      }, 300);
    });
  }

  /**
   * Cart Drawer
   */
  initCartDrawer() {
    if (!window.theme.settings.enableAjaxCart) return;

    const cartToggle = document.getElementById("cartToggle");
    const cartDrawer = document.getElementById("cartDrawer");
    const cartClose = document.getElementById("cartDrawerClose");
    const overlay = document.getElementById("modal-overlay");

    if (!cartToggle || !cartDrawer) return;

    const openCart = () => {
      cartDrawer.classList.add("active");
      overlay.classList.add("active");
      document.body.style.overflow = "hidden";
    };

    const closeCart = () => {
      cartDrawer.classList.remove("active");
      overlay.classList.remove("active");
      document.body.style.overflow = "";
    };

    cartToggle.addEventListener("click", openCart);
    if (cartClose) cartClose.addEventListener("click", closeCart);

    // Close on overlay click
    overlay.addEventListener("click", () => {
      closeCart();
      // Also close mobile menu if open
      const menu = document.getElementById("mobileMenu");
      if (menu) menu.classList.remove("active");
    });

    // Handle add to cart
    this.initAddToCart();
  }

  /**
   * Add to Cart Functionality
   */
  initAddToCart() {
    document.addEventListener("submit", async (e) => {
      if (e.target.matches('form[action*="/cart/add"]')) {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const submitButton = form.querySelector('[type="submit"]');

        // Disable button and show loading state
        if (submitButton) {
          submitButton.disabled = true;
          submitButton.textContent = "Adicionando...";
        }

        try {
          const response = await fetch(window.theme.routes.cart_add_url, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) throw new Error("Erro ao adicionar ao carrinho");

          const data = await response.json();

          // Update cart count
          this.updateCartCount();

          // Open cart drawer
          const cartDrawer = document.getElementById("cartDrawer");
          const overlay = document.getElementById("modal-overlay");
          if (cartDrawer) {
            cartDrawer.classList.add("active");
            overlay.classList.add("active");
            document.body.style.overflow = "hidden";
          }

          // Refresh cart contents
          await this.refreshCart();

          // Show success message
          this.showNotification("Produto adicionado ao carrinho!", "success");
        } catch (error) {
          console.error("Error:", error);
          this.showNotification("Erro ao adicionar produto", "error");
        } finally {
          // Reset button
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = window.theme.strings.addToCart;
          }
        }
      }
    });
  }

  /**
   * Update Cart Count
   */
  async updateCartCount() {
    try {
      const response = await fetch("/cart.js");
      const cart = await response.json();
      const countElement = document.getElementById("cartCount");
      if (countElement) {
        countElement.textContent = cart.item_count;
      }
    } catch (error) {
      console.error("Error updating cart count:", error);
    }
  }

  /**
   * Refresh Cart Contents
   */
  async refreshCart() {
    try {
      const response = await fetch("/cart?view=drawer");
      const html = await response.text();
      const cartDrawer = document.getElementById("cartDrawer");
      if (cartDrawer) {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const newContent = doc.querySelector(".cart-drawer__content");
        const currentContent = cartDrawer.querySelector(
          ".cart-drawer__content",
        );
        if (newContent && currentContent) {
          currentContent.innerHTML = newContent.innerHTML;
        }
      }
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  }

  /**
   * Quick View Modal
   */
  initQuickView() {
    if (!window.theme.settings.enableQuickView) return;

    document.addEventListener("click", async (e) => {
      const quickViewBtn = e.target.closest(".quick-view-btn");
      if (!quickViewBtn) return;

      e.preventDefault();
      const handle = quickViewBtn.dataset.productHandle;
      if (!handle) return;

      try {
        const response = await fetch(`/products/${handle}?view=quick-view`);
        const html = await response.text();

        this.showModal(html);
      } catch (error) {
        console.error("Error loading quick view:", error);
      }
    });
  }

  /**
   * Show Modal
   */
  showModal(content) {
    const modal = document.createElement("div");
    modal.className = "modal active";
    modal.innerHTML = `
      <div class="modal__content">
        <button class="modal__close" aria-label="Fechar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>
        <div class="modal__body">
          ${content}
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    document.getElementById("modal-overlay").classList.add("active");
    document.body.style.overflow = "hidden";

    // Close modal
    const closeModal = () => {
      modal.remove();
      document.getElementById("modal-overlay").classList.remove("active");
      document.body.style.overflow = "";
    };

    modal.querySelector(".modal__close").addEventListener("click", closeModal);
    document
      .getElementById("modal-overlay")
      .addEventListener("click", closeModal);
  }

  /**
   * Smooth Scroll
   */
  initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        if (href === "#") return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      });
    });
  }

  /**
   * Scroll Animations
   */
  initAnimations() {
    if (!window.theme.settings.enableAnimations) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    document.querySelectorAll(".card, .section").forEach((el) => {
      observer.observe(el);
    });
  }

  /**
   * Show Notification
   */
  showNotification(message, type = "info") {
    const notification = document.createElement("div");
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: ${type === "success" ? "#10b981" : "#ef4444"};
      color: white;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.2);
      z-index: 9999;
      animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => new ThemeApp());
} else {
  new ThemeApp();
}

// Export for use in other scripts
window.ThemeApp = ThemeApp;
