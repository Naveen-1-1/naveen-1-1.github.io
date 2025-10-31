/**
* Modern Portfolio JavaScript
* Handles all interactions and animations
*/

(function() {
  "use strict";

  // ============================================
  // HEADER TOGGLE (Mobile)
  // ============================================
  const headerToggleBtn = document.querySelector('.header-toggle');
  const header = document.querySelector('#header');

  function headerToggle() {
    header.classList.toggle('header-show');
    const icon = headerToggleBtn.querySelector('i');
    if (icon.classList.contains('bi-list')) {
      icon.classList.remove('bi-list');
      icon.classList.add('bi-x');
    } else {
      icon.classList.remove('bi-x');
      icon.classList.add('bi-list');
    }
  }

  if (headerToggleBtn) {
    headerToggleBtn.addEventListener('click', headerToggle);
  }

  // Close mobile nav on link click
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (header.classList.contains('header-show')) {
        headerToggle();
      }
    });
  });

  // ============================================
  // PRELOADER
  // ============================================
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
          preloader.style.display = 'none';
        }, 300);
      }, 500);
    });
  }

  // ============================================
  // SCROLL TO TOP BUTTON
  // ============================================
  const scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      if (window.scrollY > 100) {
        scrollTop.classList.add('active');
      } else {
        scrollTop.classList.remove('active');
      }
    }
  }

  if (scrollTop) {
    scrollTop.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  // ============================================
  // ANIMATION ON SCROLL (AOS)
  // ============================================
  function aosInit() {
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 600,
        easing: 'ease-out-cubic',
        once: true,
        mirror: false,
        offset: 100
      });
    }
  }
  window.addEventListener('load', aosInit);

  // ============================================
  // TYPED.JS INITIALIZATION
  // ============================================
  const selectTyped = document.querySelector('.typed');
  if (selectTyped && typeof Typed !== 'undefined') {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    if (typed_strings) {
      typed_strings = typed_strings.split(',');
      new Typed('.typed', {
        strings: typed_strings,
        loop: true,
        typeSpeed: 80,
        backSpeed: 50,
        backDelay: 2000,
        startDelay: 500
      });
    }
  }

  // ============================================
  // SKILLS ANIMATION
  // ============================================
  function animateSkills() {
    const skillsSection = document.querySelector('.skills');
    if (!skillsSection) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBars = entry.target.querySelectorAll('.skill-progress');
          progressBars.forEach(bar => {
            const progress = bar.getAttribute('data-progress');
            bar.style.width = progress + '%';
          });
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.5
    });

    observer.observe(skillsSection);
  }

  window.addEventListener('load', animateSkills);

  // ============================================
  // GLIGHTBOX (Image Lightbox)
  // ============================================
  if (typeof GLightbox !== 'undefined') {
    const lightbox = GLightbox({
      selector: '.glightbox',
      touchNavigation: true,
      loop: true,
      autoplayVideos: true
    });
  }

  // ============================================
  // PORTFOLIO ISOTOPE AND FILTER
  // ============================================
  window.addEventListener('load', () => {
    const portfolioContainer = document.querySelector('.portfolio-container');
    
    if (portfolioContainer && typeof Isotope !== 'undefined' && typeof imagesLoaded !== 'undefined') {
      // Initialize Isotope
      imagesLoaded(portfolioContainer, function() {
        const isotope = new Isotope(portfolioContainer, {
          itemSelector: '.portfolio-item',
          layoutMode: 'fitRows',
          transitionDuration: '0.5s'
        });

        // Filter buttons
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
          button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter items
            isotope.arrange({
              filter: filterValue
            });
          });
        });
      });
    }
  });

  // ============================================
  // NAVIGATION ACTIVE STATE ON SCROLL
  // ============================================
  let navmenulinks = document.querySelectorAll('.navmenu a[href^="#"]');

  function navmenuScrollspy() {
    let position = window.scrollY + 200;
    
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a').forEach(link => {
          link.classList.remove('active');
        });
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    });
  }

  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

  // ============================================
  // SMOOTH SCROLL FOR HASH LINKS
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      
      // Don't prevent default for toggle dropdowns or empty hashes
      if (href === '#' || this.classList.contains('toggle-dropdown')) {
        return;
      }
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerOffset = 0;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============================================
  // FORM SUBMISSION (Enhanced)
  // ============================================
  const contactForm = document.querySelector('.contact-form');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const formData = new FormData(this);
      const loading = this.querySelector('.loading');
      const errorMessage = this.querySelector('.error-message');
      const sentMessage = this.querySelector('.sent-message');
      
      // Hide all messages
      loading.style.display = 'none';
      errorMessage.style.display = 'none';
      sentMessage.style.display = 'none';
      
      // Show loading
      loading.style.display = 'block';
      
      // Simulate form submission (replace with actual AJAX call)
      setTimeout(() => {
        loading.style.display = 'none';
        sentMessage.style.display = 'block';
        
        // Reset form
        this.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          sentMessage.style.display = 'none';
        }, 5000);
      }, 2000);
      
      // Uncomment below for actual form submission
      /*
      fetch(this.action, {
        method: 'POST',
        body: formData
      })
      .then(response => response.text())
      .then(data => {
        loading.style.display = 'none';
        sentMessage.style.display = 'block';
        this.reset();
        setTimeout(() => {
          sentMessage.style.display = 'none';
        }, 5000);
      })
      .catch(error => {
        loading.style.display = 'none';
        errorMessage.textContent = 'An error occurred. Please try again.';
        errorMessage.style.display = 'block';
      });
      */
    });
  }

  // ============================================
  // COUNTER ANIMATION FOR STATS
  // ============================================
  function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = counter.textContent;
          const targetNum = parseInt(target.replace(/[^0-9]/g, ''));
          const suffix = target.replace(/[0-9]/g, '');
          
          if (!isNaN(targetNum)) {
            animateCounter(counter, targetNum, suffix, 2000);
            observer.unobserve(counter);
          }
        }
      });
    }, {
      threshold: 0.5
    });

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(element, target, suffix, duration) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(start) + suffix;
      }
    }, 16);
  }

  window.addEventListener('load', animateCounters);

  // ============================================
  // PARALLAX EFFECT FOR HERO
  // ============================================
  function parallaxEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallax = hero.querySelector('.hero-bg');
      if (parallax) {
        parallax.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    });
  }

  parallaxEffect();

  // ============================================
  // ADD HOVER EFFECT TO CARDS
  // ============================================
  function addCardTilt() {
    const cards = document.querySelectorAll('.portfolio-card, .skill-category, .resume-item');
    
    cards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transition = 'transform 0.3s ease';
      });
      
      card.addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
      });
    });
  }

  window.addEventListener('load', addCardTilt);

  // ============================================
  // LAZY LOADING FOR IMAGES
  // ============================================
  function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          observer.unobserve(img);
        }
      });
    });

    images.forEach(img => imageObserver.observe(img));
  }

  lazyLoadImages();

  // ============================================
  // HANDLE PAGE LOAD HASH
  // ============================================
  window.addEventListener('load', function() {
    if (window.location.hash) {
      const target = document.querySelector(window.location.hash);
      if (target) {
        setTimeout(() => {
          const headerOffset = 0;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  // ============================================
  // PERFORMANCE: DEBOUNCE SCROLL EVENTS
  // ============================================
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Apply debounce to expensive scroll handlers
  const debouncedScrollSpy = debounce(navmenuScrollspy, 50);
  document.addEventListener('scroll', debouncedScrollSpy);

  // ============================================
  // INITIALIZE SWIPER FOR PORTFOLIO DETAILS
  // ============================================
  function initPortfolioSwiper() {
    const swiperEl = document.querySelector('.project-gallery .swiper');
    if (swiperEl && typeof Swiper !== 'undefined') {
      const configEl = swiperEl.querySelector('.swiper-config');
      if (configEl) {
        const config = JSON.parse(configEl.textContent);
        new Swiper(swiperEl, config);
      }
    }
  }

  // ============================================
  // INITIALIZE EVERYTHING ON LOAD
  // ============================================
  window.addEventListener('load', function() {
    initPortfolioSwiper();
    console.log('Portfolio loaded successfully! 🚀');
  });

})();
