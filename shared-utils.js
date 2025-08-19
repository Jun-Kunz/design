// Shared utilities for Carbonify iframe views

// Bonus toggle functionality
let bonusEnabled = false;

function toggleBonus(enabled) {
  bonusEnabled = enabled;
  const bonusElements = document.querySelectorAll('.bonus-highlight, .total-sum-bonus, .bonus-text, .carbonify-bonus, .value-cell.value-success');
  
  bonusElements.forEach(element => {
    if (enabled) {
      element.style.display = element.classList.contains('bonus-text') ? 'block' : 'inline-block';
      // Add entrance animation
      element.classList.add('bounce-in');
      setTimeout(() => element.classList.remove('bounce-in'), 300);
    } else {
      element.style.display = 'none';
    }
  });
}

// Mobile toggle functionality
let mobileEnabled = false;

function toggleMobile(enabled) {
  mobileEnabled = enabled;
  const mainContainer = document.querySelector('.main-container');
  
  if (enabled) {
    mainContainer.classList.add('mobile-view');
    // Add entrance animation for mobile view
    mainContainer.classList.add('slide-in');
    setTimeout(() => mainContainer.classList.remove('slide-in'), 250);
  } else {
    mainContainer.classList.remove('mobile-view');
    // Add exit animation
    mainContainer.classList.add('fade-in');
    setTimeout(() => mainContainer.classList.remove('fade-in'), 250);
  }
}

// Message handling for parent-iframe communication
function setupMessageHandling() {
  window.addEventListener('message', (event) => {
    if (event.data.type === 'toggleBonus') {
      toggleBonus(event.data.enabled);
    } else if (event.data.type === 'toggleMobile') {
      toggleMobile(event.data.enabled);
    } else if (event.data.type === 'requestBonusState') {
      // Send current bonus state to parent
      parent.postMessage({
        type: 'bonusState',
        enabled: bonusEnabled
      }, '*');
    } else if (event.data.type === 'requestMobileState') {
      // Send current mobile state to parent
      parent.postMessage({
        type: 'mobileState',
        enabled: mobileEnabled
      }, '*');
    }
  });
}

// Initialize bonus state and request from parent
function initializeBonusState() {
  // Hide bonus by default immediately
  toggleBonus(false);
  
  // Request initial bonus state from parent
  parent.postMessage({
    type: 'requestBonusState'
  }, '*');
  
  // Fallback: if no response received within 1 second, ensure bonus is hidden
  setTimeout(() => {
    if (bonusEnabled === undefined) {
      toggleBonus(false);
    }
  }, 1000);
}

// Initialize mobile state and request from parent
function initializeMobileState() {
  // Request initial mobile state from parent
  parent.postMessage({
    type: 'requestMobileState'
  }, '*');
}

// Enhanced toggle option handling with animations
function setupToggleOptions(selector, callback) {
  document.querySelectorAll(selector).forEach((button) => {
    button.addEventListener('click', function () {
      // Add click animation
      this.classList.add('scale-in');
      setTimeout(() => this.classList.remove('scale-in'), 200);
      
      document.querySelectorAll(selector).forEach((btn) => {
        btn.classList.remove('active', 'selected');
        // Add exit animation for deselected buttons
        btn.classList.add('fade-update');
        setTimeout(() => btn.classList.remove('fade-update'), 200);
      });
      
      this.classList.add('active', 'selected');
      
      if (callback) {
        callback(this);
      }
    });
  });
}

// Enhanced active toggle update with animations
function updateActiveToggle(activeButton, selector) {
  document.querySelectorAll(selector).forEach((btn) => {
    if (btn !== activeButton) {
      btn.classList.remove('active', 'selected');
      // Add exit animation
      btn.classList.add('fade-update');
      setTimeout(() => btn.classList.remove('fade-update'), 200);
    }
  });
  
  activeButton.classList.add('active', 'selected');
  // Add entrance animation
  activeButton.classList.add('bounce-in');
  setTimeout(() => activeButton.classList.remove('bounce-in'), 300);
}

// Enhanced fade update effect with improved animations
function addFadeEffect(elements) {
  elements.forEach((el) => {
    el.classList.add('fade-update');
    // Add subtle scale effect
    el.style.transform = 'scale(0.98)';
  });
}

function removeFadeEffect(elements) {
  elements.forEach((el) => {
    el.classList.remove('fade-update');
    el.classList.add('slide-in');
    el.style.transform = 'scale(1)';
  });
  
  // Clean up animation classes
  setTimeout(() => {
    elements.forEach((el) => el.classList.remove('slide-in'));
  }, 250);
}

// Enhanced feature update with staggered animations
function updateFeatures(featureList, features) {
  // Fade out current features with staggered timing
  const currentFeatures = featureList.querySelectorAll('.feature-item');
  currentFeatures.forEach((item, index) => {
    setTimeout(() => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(-10px) scale(0.95)';
    }, index * 30);
  });

  setTimeout(() => {
    featureList.innerHTML = '';

    features.forEach((feature, index) => {
      const li = document.createElement('li');
      li.className = 'feature-item';
      li.style.opacity = '0';
      li.style.transform = 'translateY(20px) scale(0.9)';

      li.innerHTML = `
        <div class="feature-icon">
          <svg class="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"/>
          </svg>
        </div>
        <span>${feature}</span>
      `;

      featureList.appendChild(li);

      // Staggered animate in with enhanced effects
      setTimeout(() => {
        li.style.opacity = '1';
        li.style.transform = 'translateY(0) scale(1)';
        li.style.transition = 'all 300ms cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        
        // Add subtle entrance effect
        li.classList.add('bounce-in');
        setTimeout(() => li.classList.remove('bounce-in'), 300);
      }, index * 50 + 100);
    });
  }, 200);
}

// Enhanced vehicle class options with better descriptions
const VEHICLE_CLASS_OPTIONS = [
  { value: 'M1', label: 'PKW (Klasse M1) - Personenkraftwagen bis 3,5t' },
  { value: 'M3', label: 'Busse (Klasse M3) - Busse über 8 Sitzplätze' },
  { value: 'N1', label: 'Leichtes Nutzfahrzeug (Klasse N1) - Nutzfahrzeuge bis 3,5t' },
  { value: 'N2', label: 'Schweres Nutzfahrzeug (Klasse N2) - Nutzfahrzeuge 3,5t - 12t' },
  { value: 'N3', label: 'Schweres Nutzfahrzeug (Klasse N3) - Nutzfahrzeuge über 12t' }
];

function createVehicleDropdown(containerId, selectedValue = 'M1') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  VEHICLE_CLASS_OPTIONS.forEach(option => {
    const optionElement = document.createElement('option');
    optionElement.value = option.value;
    optionElement.textContent = option.label;
    optionElement.selected = option.value === selectedValue;
    container.appendChild(optionElement);
  });
  
  // Add change animation
  container.addEventListener('change', function() {
    this.classList.add('scale-in');
    setTimeout(() => this.classList.remove('scale-in'), 200);
  });
}

// Enhanced year options with better styling
const YEAR_OPTIONS = [
  { value: '2025', label: 'Nur 2025' },
  { value: 'both', label: '2025 & 2026' },
  { value: '2026', label: 'Nur 2026' }
];

function createYearSelector(containerId, selectedValue = 'both') {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  container.innerHTML = '';
  
  YEAR_OPTIONS.forEach(option => {
    const chip = document.createElement('div');
    chip.className = `year-chip ${option.value === selectedValue ? 'selected' : ''}`;
    chip.dataset.year = option.value;
    chip.textContent = option.label;
    
    // Add click handler with animations
    chip.addEventListener('click', function() {
      // Remove selection from all chips
      container.querySelectorAll('.year-chip').forEach(c => {
        c.classList.remove('selected');
        c.classList.add('fade-update');
        setTimeout(() => c.classList.remove('fade-update'), 200);
      });
      
      // Select this chip
      this.classList.add('selected');
      this.classList.add('bounce-in');
      setTimeout(() => this.classList.remove('bounce-in'), 300);
      
      // Trigger year change callback if provided
      if (window.onYearChange) {
        window.onYearChange(option.value);
      }
    });
    
    container.appendChild(chip);
  });
}

// Enhanced CTA button text update with animations
function updateCTAText(buttonId, text) {
  const button = document.getElementById(buttonId);
  if (button) {
    const textSpan = button.querySelector('span') || button;
    
    // Add update animation
    button.classList.add('fade-update');
    setTimeout(() => {
      textSpan.textContent = text;
      button.classList.remove('fade-update');
      button.classList.add('bounce-in');
      setTimeout(() => button.classList.remove('bounce-in'), 300);
    }, 200);
  }
}

// Enhanced keyboard navigation with visual feedback
function setupKeyboardNavigation(buttons, currentIndex = 0) {
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      
      let newIndex = currentIndex;
      if (e.key === 'ArrowLeft' && currentIndex > 0) {
        newIndex = currentIndex - 1;
      } else if (e.key === 'ArrowRight' && currentIndex < buttons.length - 1) {
        newIndex = currentIndex + 1;
      }
      
      if (newIndex !== currentIndex) {
        // Add visual feedback for navigation
        buttons[currentIndex].classList.add('fade-update');
        setTimeout(() => buttons[currentIndex].classList.remove('fade-update'), 200);
        
        buttons[newIndex].click();
        currentIndex = newIndex;
        
        // Add entrance animation for new selection
        buttons[currentIndex].classList.add('bounce-in');
        setTimeout(() => buttons[currentIndex].classList.remove('bounce-in'), 300);
      }
    }
  });
}

// Enhanced touch gestures with haptic feedback simulation
function setupTouchGestures(buttons, currentIndex = 0) {
  let touchStartX = 0;
  let touchEndX = 0;

  document.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].screenX;
  });

  document.addEventListener('touchend', function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      let newIndex = currentIndex;
      
      if (diff > 0 && currentIndex < buttons.length - 1) {
        // Swipe left - next
        newIndex = currentIndex + 1;
      } else if (diff < 0 && currentIndex > 0) {
        // Swipe right - previous
        newIndex = currentIndex - 1;
      }
      
      if (newIndex !== currentIndex) {
        // Add swipe animation feedback
        buttons[currentIndex].classList.add('fade-update');
        setTimeout(() => buttons[currentIndex].classList.remove('fade-update'), 200);
        
        buttons[newIndex].click();
        currentIndex = newIndex;
        
        // Add entrance animation
        buttons[currentIndex].classList.add('slide-in');
        setTimeout(() => buttons[currentIndex].classList.remove('slide-in'), 250);
      }
    }
  }
}

// New: Enhanced price update animations
function animatePriceUpdate(element, newValue, oldValue) {
  if (!element) return;
  
  // Add update animation
  element.classList.add('fade-update');
  element.style.transform = 'scale(1.05)';
  
  setTimeout(() => {
    element.textContent = newValue;
    element.classList.remove('fade-update');
    element.classList.add('bounce-in');
    element.style.transform = 'scale(1)';
    
    setTimeout(() => element.classList.remove('bounce-in'), 300);
  }, 200);
}

// New: Enhanced loading states
function showLoadingState(container) {
  if (!container) return;
  
  container.classList.add('updating');
  
  // Add loading animation
  const loadingOverlay = document.createElement('div');
  loadingOverlay.className = 'loading-overlay';
  loadingOverlay.innerHTML = `
    <div class="loading-spinner"></div>
    <div class="loading-text">Wird aktualisiert...</div>
  `;
  
  container.appendChild(loadingOverlay);
  
  // Add entrance animation
  loadingOverlay.classList.add('fade-in');
}

function hideLoadingState(container) {
  if (!container) return;
  
  const loadingOverlay = container.querySelector('.loading-overlay');
  if (loadingOverlay) {
    loadingOverlay.classList.add('fade-update');
    setTimeout(() => {
      loadingOverlay.remove();
      container.classList.remove('updating');
    }, 200);
  }
}

// New: Enhanced intersection observer for scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('slide-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  // Observe elements that should animate on scroll
  document.querySelectorAll('.plan-card, .feature-item, .toggle-option, .year-chip').forEach(el => {
    observer.observe(el);
  });
}

// New: Enhanced hover effects
function setupHoverEffects() {
  // Add subtle hover animations to interactive elements
  document.querySelectorAll('.toggle-option, .year-chip, .plan-card, .cta-button').forEach(element => {
    element.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px)';
      this.style.transition = 'transform 200ms ease';
    });
    
    element.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
}

// New: Enhanced focus management for accessibility
function setupFocusManagement() {
  // Add focus indicators and keyboard navigation
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-navigation');
    }
  });
  
  document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
  });
}

// New: Enhanced error handling with user feedback
function showError(message, container) {
  const errorElement = document.createElement('div');
  errorElement.className = 'error-message';
  errorElement.innerHTML = `
    <div class="error-icon">⚠️</div>
    <div class="error-text">${message}</div>
  `;
  
  if (container) {
    container.appendChild(errorElement);
    
    // Add entrance animation
    errorElement.classList.add('bounce-in');
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      errorElement.classList.add('fade-update');
      setTimeout(() => errorElement.remove(), 200);
    }, 5000);
  }
}

// New: Enhanced success feedback
function showSuccess(message, container) {
  const successElement = document.createElement('div');
  successElement.className = 'success-message';
  successElement.innerHTML = `
    <div class="success-icon">✅</div>
    <div class="success-text">${message}</div>
  `;
  
  if (container) {
    container.appendChild(successElement);
    
    // Add entrance animation
    successElement.classList.add('bounce-in');
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
      successElement.classList.add('fade-update');
      setTimeout(() => successElement.remove(), 200);
    }, 3000);
  }
}

// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    toggleBonus,
    toggleMobile,
    setupMessageHandling,
    initializeBonusState,
    initializeMobileState,
    setupToggleOptions,
    updateActiveToggle,
    addFadeEffect,
    removeFadeEffect,
    updateFeatures,
    createVehicleDropdown,
    createYearSelector,
    updateCTAText,
    setupKeyboardNavigation,
    setupTouchGestures,
    animatePriceUpdate,
    showLoadingState,
    hideLoadingState,
    setupScrollAnimations,
    setupHoverEffects,
    setupFocusManagement,
    showError,
    showSuccess,
    VEHICLE_CLASS_OPTIONS,
    YEAR_OPTIONS
  };
}
