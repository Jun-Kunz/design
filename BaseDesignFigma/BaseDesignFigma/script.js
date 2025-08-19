// Enhanced JavaScript for THG-Prämie Comparison
document.addEventListener('DOMContentLoaded', function () {
  initializeTabs();
  initializeCards();
  initializeAccessibility();
  initializeVehicleSelector();
  
  // Initialize pricing display with default values
  const defaultYear = 'both';
  applySampleDataForYear(defaultYear);
  updatePricingDisplay(defaultYear);
});

// Tab functionality
function initializeTabs() {
  const tabButtons = document.querySelectorAll('.tab-button');

  tabButtons.forEach((button) => {
    button.addEventListener('click', function () {
      // Remove active class from all tabs
      tabButtons.forEach((tab) => tab.classList.remove('active'));

      // Add active class to clicked tab
      this.classList.add('active');

      // Get selected year
      const selectedYear = this.dataset.year;
      console.log('Selected year:', selectedYear); // Debug log

      // Update card visibility or content based on selection
      updateCardContent(selectedYear);

      // Update amounts from centralized sample data if present
      applySampleDataForYear(selectedYear);
      updatePricingDisplay(selectedYear);

      // Announce change to screen readers
      announceTabChange(selectedYear);
    });

    // Keyboard navigation
    button.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        navigateTabs(e.key === 'ArrowRight');
      }
    });
  });
}

// Card interactions
function initializeCards() {
  const cards = document.querySelectorAll('.card');
  const ctaButtons = document.querySelectorAll('.cta-button');
  const vehicleDropdown = document.querySelector('.vehicle-dropdown');

  // Add hover effects and analytics tracking
  cards.forEach((card) => {
    card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-4px)';
    });

    card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  // CTA button interactions
  ctaButtons.forEach((button) => {
    button.addEventListener('click', function (e) {
      e.preventDefault();

      const cardTitle = this.closest('.card').querySelector('.card__title').textContent;
      handleCTAClick(cardTitle);

      // Visual feedback
      this.style.transform = 'scale(0.98)';
      setTimeout(() => {
        this.style.transform = '';
      }, 150);
    });
  });

  // Vehicle dropdown functionality
  if (vehicleDropdown) {
    vehicleDropdown.addEventListener('click', function () {
      showVehicleOptions();
    });
  }
}

// Accessibility enhancements
function initializeAccessibility() {
  // Add ARIA labels and roles
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.setAttribute('role', 'article');
    card.setAttribute('aria-labelledby', `card-title-${index}`);

    const title = card.querySelector('.card__title');
    if (title) {
      title.id = `card-title-${index}`;
    }
  });

  // Add keyboard navigation for cards
  cards.forEach((card) => {
    card.setAttribute('tabindex', '0');
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const ctaButton = this.querySelector('.cta-button');
        if (ctaButton) {
          ctaButton.click();
        }
      }
    });
  });

  // Improve focus management
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });

  document.addEventListener('mousedown', function () {
    document.body.classList.remove('keyboard-navigation');
  });
}

// Tab navigation functions
function navigateTabs(forward) {
  const tabs = document.querySelectorAll('.tab-button');
  const currentTab = document.querySelector('.tab-button:focus');
  const currentIndex = Array.from(tabs).indexOf(currentTab);

  let nextIndex;
  if (forward) {
    nextIndex = currentIndex + 1 >= tabs.length ? 0 : currentIndex + 1;
  } else {
    nextIndex = currentIndex - 1 < 0 ? tabs.length - 1 : currentIndex - 1;
  }

  tabs[nextIndex].focus();
  tabs[nextIndex].click();
}

function announceTabChange(selectedYear) {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', 'polite');
  announcement.setAttribute('aria-atomic', 'true');
  announcement.className = 'sr-only';
  announcement.textContent = `Ausgewähltes Jahr: ${selectedYear}`;

  document.body.appendChild(announcement);

  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
}

// Content update functions
function updateCardContent(selectedYear) {
  const cards = document.querySelectorAll('.card');

  // Add smooth transition
  cards.forEach((card) => {
    card.style.opacity = '0.7';
    card.style.transform = 'scale(0.98)';
  });

  setTimeout(() => {
    // Update content based on selected year
    updatePricingDisplay(selectedYear);

    // Restore visual state
    cards.forEach((card) => {
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
    });
  }, 200);
}

function updatePricingDisplay(selectedYear) {
  const pricingGrids = document.querySelectorAll('.pricing-grid');
  const totalSumDisplays = document.querySelectorAll('.total-sum-display');

  // Show/hide pricing grids and total sum displays based on selected year
  pricingGrids.forEach((grid) => {
    if (selectedYear === 'both') {
      grid.style.display = 'none';
    } else {
      grid.style.display = 'grid';
    }
  });

  totalSumDisplays.forEach((totalSum) => {
    if (selectedYear === 'both') {
      totalSum.style.display = 'block';
    } else {
      totalSum.style.display = 'none';
    }
  });
}

// Apply centralized sample data to pricing amounts based on year
function applySampleDataForYear(selectedYear) {
  console.log('applySampleDataForYear called with:', selectedYear); // Debug log
  if (!window.CARBONIFY_SAMPLE_DATA) {
    console.log('No sample data available'); // Debug log
    return;
  }

  const vehicleClass = document.getElementById('vehicleClassSelect')?.value || 'M1';
  const yearKey = selectedYear === 'both' ? '2025' : selectedYear;

  // Klassik card amounts
  const klassik2025 = document.querySelector('.card.card--featured .pricing-item:nth-child(1) .pricing-amount');
  const klassik2026 = document.querySelector('.card.card--featured .pricing-item:nth-child(2) .pricing-amount');
  if (klassik2025) klassik2025.textContent = `€ ${window.CARBONIFY_SAMPLE_DATA.getPrice('klassik', '2025', vehicleClass)}`;
  if (klassik2026) klassik2026.textContent = `€ ${window.CARBONIFY_SAMPLE_DATA.getPrice('klassik', '2026', vehicleClass)}`;

  // Express card amounts
  const express2025 = document.querySelector('.card:not(.card--featured) .pricing-item:nth-child(1) .pricing-amount');
  const express2026 = document.querySelector('.card:not(.card--featured) .pricing-item:nth-child(2) .pricing-amount');
  if (express2025) express2025.textContent = `€ ${window.CARBONIFY_SAMPLE_DATA.getPrice('express', '2025', vehicleClass)}`;
  if (express2026) express2026.textContent = `€ ${window.CARBONIFY_SAMPLE_DATA.getPrice('express', '2026', vehicleClass)}`;

  // Update total sums for both years option
  const klassikTotal = document.querySelector('.card.card--featured .total-amount');
  const expressTotal = document.querySelector('.card:not(.card--featured) .total-amount');
  
  if (klassikTotal) {
    const totalSum = window.CARBONIFY_SAMPLE_DATA.getTotalSum('klassik', vehicleClass);
    klassikTotal.textContent = `€ ${totalSum}`;
  }
  
  if (expressTotal) {
    const totalSum = window.CARBONIFY_SAMPLE_DATA.getTotalSum('express', vehicleClass);
    expressTotal.textContent = `€ ${totalSum}`;
  }

  // Update pricing display based on selected year
  updatePricingDisplay(selectedYear);
}

// CTA and interaction handlers
function handleCTAClick(cardTitle) {
  // Analytics tracking
  if (typeof gtag !== 'undefined') {
    gtag('event', 'cta_click', {
      card_type: cardTitle,
      event_category: 'engagement',
    });
  }

  // Show loading state
  showLoadingState();

  // Simulate form submission or redirect
  setTimeout(() => {
    // Replace with actual form submission or redirect logic
    console.log(`Prämie sichern clicked for: ${cardTitle}`);
    hideLoadingState();

    // Show success message
    showSuccessMessage(cardTitle);
  }, 1500);
}

function showVehicleOptions() {
  // Create modal or dropdown with vehicle options
  const options = [
    { value: 'm1', label: 'PKW (Klasse M1)', premium: '€ 70' },
    { value: 'n1', label: 'Transporter (Klasse N1)', premium: '€ 120' },
    { value: 'l3e', label: 'Motorrad (Klasse L3e)', premium: '€ 45' },
  ];

  const modal = createVehicleModal(options);
  document.body.appendChild(modal);

  // Focus management
  const firstOption = modal.querySelector('button');
  if (firstOption) {
    firstOption.focus();
  }
}

function createVehicleModal(options) {
  const modal = document.createElement('div');
  modal.className = 'vehicle-modal';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-labelledby', 'vehicle-modal-title');
  modal.setAttribute('aria-modal', 'true');

  modal.innerHTML = `
        <div class="vehicle-modal__backdrop" aria-hidden="true"></div>
        <div class="vehicle-modal__content">
            <h3 id="vehicle-modal-title">Fahrzeugklasse wählen</h3>
            <div class="vehicle-options">
                ${options
                  .map(
                    (option) => `
                    <button class="vehicle-option" data-value="${option.value}">
                        <span class="vehicle-option__label">${option.label}</span>
                        <span class="vehicle-option__premium">${option.premium}</span>
                    </button>
                `,
                  )
                  .join('')}
            </div>
            <button class="vehicle-modal__close" aria-label="Schließen">×</button>
        </div>
    `;

  // Add event listeners
  modal.addEventListener('click', function (e) {
    if (e.target.classList.contains('vehicle-modal__backdrop') || e.target.classList.contains('vehicle-modal__close')) {
      closeVehicleModal(modal);
    }

    if (e.target.classList.contains('vehicle-option')) {
      selectVehicleOption(e.target.dataset.value, modal);
    }
  });

  // Keyboard navigation
  modal.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeVehicleModal(modal);
    }
  });

  return modal;
}

function closeVehicleModal(modal) {
  modal.style.opacity = '0';
  setTimeout(() => {
    document.body.removeChild(modal);
  }, 200);
}

function selectVehicleOption(value, modal) {
  // Update the vehicle display
  const vehicleType = modal.querySelector(`[data-value="${value}"] .vehicle-option__label`).textContent;
  const vehicleDisplay = document.querySelector('.vehicle-type');
  if (vehicleDisplay) {
    vehicleDisplay.textContent = vehicleType;
  }

  closeVehicleModal(modal);
}

// Loading and success states
function showLoadingState() {
  const buttons = document.querySelectorAll('.cta-button');
  buttons.forEach((button) => {
    button.disabled = true;
    button.innerHTML = `
            <span class="loading-spinner"></span>
            Wird verarbeitet...
        `;
  });
}

function hideLoadingState() {
  const buttons = document.querySelectorAll('.cta-button');
  buttons.forEach((button) => {
    button.disabled = false;
    button.textContent = 'Prämie sichern';
  });
}

function showSuccessMessage(cardTitle) {
  const message = document.createElement('div');
  message.className = 'success-message';
  message.setAttribute('role', 'alert');
  message.innerHTML = `
        <div class="success-message__content">
            <svg class="success-icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
            </svg>
            <span>Erfolgreich! Ihre Anfrage für ${cardTitle} wurde übermittelt.</span>
        </div>
    `;

  document.body.appendChild(message);

  setTimeout(() => {
    message.style.opacity = '0';
    setTimeout(() => {
      document.body.removeChild(message);
    }, 300);
  }, 3000);
}

// Performance optimization
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

// Lazy loading for images
function initializeLazyLoading() {
  const images = document.querySelectorAll('img[loading="lazy"]');

  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src || img.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      });
    });

    images.forEach((img) => imageObserver.observe(img));
  }
}

// Vehicle selector functionality
function initializeVehicleSelector() {
  const vehicleSelect = document.getElementById('vehicleClassSelect');
  if (vehicleSelect) {
    vehicleSelect.addEventListener('change', function() {
      const selectedYear = document.querySelector('.tab-button.active')?.dataset.year || 'both';
      applySampleDataForYear(selectedYear);
    });
  }
}

// Bonus toggle functionality
let bonusEnabled = true;

function toggleBonus(enabled) {
  bonusEnabled = enabled;
  const bonusElements = document.querySelectorAll('.bonus, .bonus-text');
  
  bonusElements.forEach(element => {
    if (enabled) {
      element.style.display = 'block';
    } else {
      element.style.display = 'none';
    }
  });
}

// Listen for messages from parent window
window.addEventListener('message', (event) => {
  if (event.data.type === 'toggleBonus') {
    toggleBonus(event.data.enabled);
  } else if (event.data.type === 'requestBonusState') {
    // Send current bonus state to parent
    parent.postMessage({
      type: 'bonusState',
      enabled: bonusEnabled
    }, '*');
  }
});

// Request initial bonus state from parent
window.addEventListener('load', () => {
  parent.postMessage({
    type: 'requestBonusState'
  }, '*');
});
