/**
 * CountUp.js - Vanilla JavaScript number animation library
 * Optimized for euro amounts and THG premium displays
 */

class CountUp {
  constructor(element, options = {}) {
    this.element = typeof element === 'string' ? document.querySelector(element) : element;
    
    // Prevent double initialization
    if (this.element && this.element.countupInstance) {
      console.log('CountUp already initialized for this element, destroying previous instance');
      this.element.countupInstance.destroy();
    }
    
    this.options = {
      startVal: 0,
      endVal: 0,
      duration: 2.0,
      decimalPlaces: 0,
      useEasing: true,
      useGrouping: true,
      separator: '.',
      decimal: ',',
      prefix: '€',
      suffix: '',
      enableScrollSpy: false,
      scrollSpyDelay: 200,
      scrollSpyOnce: true,
      ...options
    };
    
    this.startTime = null;
    this.rAF = null;
    this.countDown = this.options.startVal > this.options.endVal;
    this.printValue = this.printValue.bind(this);
    this.count = this.options.startVal;
    
    if (this.element) {
      // Store instance on element to prevent double initialization
      this.element.countupInstance = this;
      this.init();
    }
  }

  init() {
    if (this.options.enableScrollSpy) {
      if (!this.scrollSpy) {
        this.scrollSpy = this.handleScroll();
      }
    } else {
      this.start();
    }
  }

  start() {
    if (this.rAF) {
      cancelAnimationFrame(this.rAF);
    }
    this.startTime = null;
    this.count = this.options.startVal;
    this.rAF = requestAnimationFrame(this.printValue);
  }

  printValue(timestamp) {
    if (!this.startTime) {
      this.startTime = timestamp;
    }

    const progress = Math.min((timestamp - this.startTime) / (this.options.duration * 1000), 1);
    
    let easedProgress = progress;
    if (this.options.useEasing) {
      easedProgress = this.easeOutExpo(progress);
    }

    this.count = this.options.startVal + (easedProgress * (this.options.endVal - this.options.startVal));

    if (this.countDown && this.count < this.options.endVal) {
      this.count = this.options.endVal;
    } else if (!this.countDown && this.count > this.options.endVal) {
      this.count = this.options.endVal;
    }

    this.element.textContent = this.formatNumber(this.count);

    if (progress < 1) {
      this.rAF = requestAnimationFrame(this.printValue);
    }
  }

  formatNumber(num) {
    let formatted = '';
    
    if (this.options.prefix !== undefined && this.options.prefix !== '') {
      formatted += this.options.prefix;
    }
    
    // Format the number with proper grouping and decimals
    const numStr = num.toFixed(this.options.decimalPlaces);
    const parts = numStr.split('.');
    
    if (this.options.useGrouping) {
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, this.options.separator);
    }
    
    formatted += parts.join(this.options.decimal);
    
    if (this.options.suffix) {
      formatted += this.options.suffix;
    }
    
    return formatted;
  }

  easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  handleScroll() {
    let triggered = false;
    
    const checkIfInView = () => {
      if (!this.element) return;
      
      const rect = this.element.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      
      if (isInView && !triggered) {
        triggered = true;
        console.log('CountUp scroll spy triggered for:', this.element.textContent);
        setTimeout(() => this.start(), this.options.scrollSpyDelay);
        
        if (this.options.scrollSpyOnce) {
          window.removeEventListener('scroll', checkIfInView);
        }
      }
    };
    
    window.addEventListener('scroll', checkIfInView);
    // Check immediately in case element is already in view
    checkIfInView();
    
    return checkIfInView;
  }

  update(newEndVal) {
    this.options.endVal = newEndVal;
    this.start();
  }

  destroy() {
    if (this.rAF) {
      cancelAnimationFrame(this.rAF);
    }
    if (this.scrollSpy) {
      window.removeEventListener('scroll', this.scrollSpy);
    }
    if (this.element && this.element.countupInstance === this) {
      delete this.element.countupInstance;
    }
  }
}

// Auto-initialize countup elements with data attributes
document.addEventListener('DOMContentLoaded', function() {
  // Prevent multiple initializations
  if (window.countupInitialized) {
    console.log('CountUp: Already initialized, skipping...');
    return;
  }
  window.countupInitialized = true;
  
  console.log('CountUp: DOMContentLoaded, looking for elements with data-countup');
  
  // Find all elements with data-countup attribute
  const countupElements = document.querySelectorAll('[data-countup]');
  console.log('CountUp: Found', countupElements.length, 'elements with data-countup');
  
  countupElements.forEach((element, index) => {
    const options = {
      startVal: parseFloat(element.dataset.startVal || 0),
      endVal: parseFloat(element.dataset.endVal || 0),
      duration: parseFloat(element.dataset.duration || 2.0),
      decimalPlaces: parseInt(element.dataset.decimalPlaces || 0),
      prefix: element.dataset.prefix !== undefined ? element.dataset.prefix : '€',
      suffix: element.dataset.suffix || '',
      enableScrollSpy: element.dataset.scrollSpy === 'true',
      scrollSpyDelay: parseInt(element.dataset.scrollSpyDelay || 200)
    };
    
    console.log('CountUp: Initializing element', index, 'with options:', options);
    new CountUp(element, options);
  });
});

// Global function for manual initialization
window.initCountUp = function(selector, options) {
  return new CountUp(selector, options);
};

// Function to initialize countup for dynamically created elements
window.initCountUpForElement = function(element) {
  if (!element || !element.dataset.countup) return null;
  
  const options = {
    startVal: parseFloat(element.dataset.startVal || 0),
    endVal: parseFloat(element.dataset.endVal || 0),
    duration: parseFloat(element.dataset.duration || 2.0),
    decimalPlaces: parseInt(element.dataset.decimalPlaces || 0),
          prefix: element.dataset.prefix !== undefined ? element.dataset.prefix : '€',
    suffix: element.dataset.suffix || '',
    enableScrollSpy: element.dataset.scrollSpy === 'true',
    scrollSpyDelay: parseInt(element.dataset.scrollSpyDelay || 200)
  };
  
  console.log('CountUp: Manually initializing element with options:', options);
  return new CountUp(element, options);
};

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
  module.exports = CountUp;
}
