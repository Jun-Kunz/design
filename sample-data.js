// Centralized sample data for all views
// Updated to match backend format with activeConfigurations and productOptions

window.CARBONIFY_SAMPLE_DATA = {
  years: [
    { id: '2025', label: '2025' },
    { id: 'both', label: '2025 & 2026' },
    { id: '2026', label: '2026' }
  ],

  // Vehicle class conversion factors based on M1 base price
  vehicleClassFactors: {
    'M1': 1,      // PKW - base price
    'M3': 36,     // Busse
    'N1': 1.5,    // Leichtes Nutzfahrzeug
    'N2': 10.3,   // Schweres Nutzfahrzeug
    'N3': 16.7    // Schweres Nutzfahrzeug
  },

  vehicleTypes: [
    { 
      id: 'M1', 
      label: 'PKW (Klasse M1)', 
      image: 'BaseProdWebsite_files/PKW.webp',
      description: 'Personenkraftwagen bis 3,5t'
    },
    { 
      id: 'M3', 
      label: 'Busse (Klasse M3)', 
      image: 'BaseProdWebsite_files/PKW.webp',
      description: 'Busse über 8 Sitzplätze'
    },
    { 
      id: 'N1', 
      label: 'Leichtes Nutzfahrzeug (Klasse N1)', 
      image: 'BaseProdWebsite_files/PKW.webp',
      description: 'Nutzfahrzeuge bis 3,5t'
    },
    { 
      id: 'N2', 
      label: 'Schweres Nutzfahrzeug (Klasse N2)', 
      image: 'BaseProdWebsite_files/PKW.webp',
      description: 'Nutzfahrzeuge 3,5t - 12t'
    },
    { 
      id: 'N3', 
      label: 'Schweres Nutzfahrzeug (Klasse N3)', 
      image: 'BaseProdWebsite_files/PKW.webp',
      description: 'Nutzfahrzeuge über 12t'
    }
  ],

  // Backend format: activeConfigurations with productOptions
  activeConfigurations: {
    "2025": {
      "version": "2025-08-17T06:45:00.000Z",
      "defaultProductOption": "INSTANT",
      "promotedProductOption": "INSTANT",
      "productOptions": [
        {
          "key": "INSTANT",
          "name": "Express",
          "subtext": "Auszahlung{BREAK}innerhalb einer Woche",
          "uspPoints": {},
          "prices": {
            "M1": 70,
            "L1e": 70,
            "N1": 105,
            "N2": 700,
            "N3": 1100,
            "M3": 2500,
            "Andere": 70,
            "L3e-A2": 70,
            "L3e-A1": 70,
            "L3e-B": 70,
            "L4e-B": 70,
            "L6e": 70,
            "L4e-A1": 70,
            "L7e": 70,
            "L4e": 70,
            "L5e": 70,
            "L2e": 70,
            "L3e": 70
          }
        },
        {
          "key": "STANDARD",
          "name": "Klassik",
          "subtext": "Auszahlung{BREAK}nach UBA-Bestätigung",
          "uspPoints": {},
          "prices": {
            "M1": 90,
            "L1e": 90,
            "N1": 135,
            "N2": 900,
            "N3": 1500,
            "M3": 3200,
            "Andere": 90,
            "L3e-A2": 90,
            "L3e-A1": 90,
            "L3e-B": 90,
            "L4e-B": 90,
            "L6e": 90,
            "L4e-A1": 90,
            "L7e": 90,
            "L4e": 90,
            "L5e": 90,
            "L2e": 90,
            "L3e": 90
          }
        }
      ]
    },
    "2026": {
      "version": "2025-08-17T06:45:00.000Z",
      "defaultProductOption": "INSTANT",
      "promotedProductOption": "INSTANT",
      "productOptions": [
        {
          "key": "INSTANT",
          "name": "Express",
          "subtext": "Auszahlung{BREAK}innerhalb einer Woche",
          "uspPoints": {},
          "prices": {
            "M1": 75,
            "L1e": 75,
            "N1": 113,
            "N2": 750,
            "N3": 1175,
            "M3": 2625,
            "Andere": 75,
            "L3e-A2": 75,
            "L3e-A1": 75,
            "L3e-B": 75,
            "L4e-B": 75,
            "L6e": 75,
            "L4e-A1": 75,
            "L7e": 75,
            "L4e": 75,
            "L5e": 75,
            "L2e": 75,
            "L3e": 75
          }
        },
        {
          "key": "STANDARD",
          "name": "Klassik",
          "subtext": "Auszahlung{BREAK}nach UBA-Bestätigung",
          "uspPoints": {},
          "prices": {
            "M1": 95,
            "L1e": 95,
            "N1": 143,
            "N2": 945,
            "N3": 1575,
            "M3": 3360,
            "Andere": 95,
            "L3e-A2": 95,
            "L3e-A1": 95,
            "L3e-B": 95,
            "L4e-B": 95,
            "L6e": 95,
            "L4e-A1": 95,
            "L7e": 95,
            "L4e": 95,
            "L5e": 95,
            "L2e": 95,
            "L3e": 95
          }
        },
        {
          "key": "BONUS",
          "name": "Bonus",
          "subtext": "Nur für 2026{BREAK}mit Zusatzbonus",
          "uspPoints": {},
          "prices": {
            "M1": 110,
            "L1e": 110,
            "N1": 165,
            "N2": 1100,
            "N3": 1800,
            "M3": 3850,
            "Andere": 110,
            "L3e-A2": 110,
            "L3e-A1": 110,
            "L3e-B": 110,
            "L4e-B": 110,
            "L6e": 110,
            "L4e-A1": 110,
            "L7e": 110,
            "L4e": 110,
            "L5e": 110,
            "L2e": 110,
            "L3e": 110
          }
        }
      ]
    },
    "both": {
      "version": "2025-08-17T06:45:00.000Z",
      "defaultProductOption": "INSTANT",
      "promotedProductOption": "INSTANT",
      "productOptions": [
        {
          "key": "INSTANT",
          "name": "Express",
          "subtext": "Auszahlung{BREAK}innerhalb einer Woche",
          "uspPoints": {},
          "prices": {
            "M1": 145,
            "L1e": 145,
            "N1": 218,
            "N2": 1450,
            "N3": 2275,
            "M3": 5125,
            "Andere": 145,
            "L3e-A2": 145,
            "L3e-A1": 145,
            "L3e-B": 145,
            "L4e-B": 145,
            "L6e": 145,
            "L4e-A1": 145,
            "L7e": 145,
            "L4e": 145,
            "L5e": 145,
            "L2e": 145,
            "L3e": 145
          }
        },
        {
          "key": "STANDARD",
          "name": "Klassik",
          "subtext": "Auszahlung{BREAK}nach UBA-Bestätigung",
          "uspPoints": {},
          "prices": {
            "M1": 185,
            "L1e": 185,
            "N1": 278,
            "N2": 1845,
            "N3": 3075,
            "M3": 6560,
            "Andere": 185,
            "L3e-A2": 185,
            "L3e-A1": 185,
            "L3e-B": 185,
            "L4e-B": 185,
            "L6e": 185,
            "L4e-A1": 185,
            "L7e": 185,
            "L4e": 185,
            "L5e": 185,
            "L2e": 185,
            "L3e": 185
          }
        }
      ]
    }
  },

  plans: {
    klassik: {
      name: 'Klassik',
      description: 'Etwas Wartezeit, höchste THG-Prämie',
      bonus: 30,
      features: [
        'Auszahlung unmittelbar nach Zertifizierung durch das Umweltbundesamt',
        'Das Geld ist innerhalb von 3-5 Monaten auf deinem Konto',
        'Fokus auf höchstmögliche THG-Prämie'
      ],
      payoutTiming: {
        title: 'Auszahlungszeitraum',
        details: '4-16 Wochen nach UBA-Zertifizierung',
        process: [
          'Einreichung der Antragsunterlagen',
          'UBA-Zertifizierung (2-8 Wochen)',
          'Auszahlung der THG-Prämie (2-8 Wochen)',
          'Gesamtzeitraum: 4-16 Wochen'
        ]
      }
    },
    express: {
      name: 'Express',
      description: 'Die richtige Wahl für alle die es schnell wollen',
      bonus: 30,
      features: [
        'Sofortauszahlung vor Zertifizierung durch das Umweltbundesamt',
        'Das Geld ist innerhalb einer Woche auf deinem Konto',
        'Fokus auf schnellstmögliche Auszahlung der THG-Prämie'
      ],
      payoutTiming: {
        title: 'Auszahlungszeitraum',
        details: '24 Stunden - 2 Wochen',
        process: [
          'Sofortige Antragsbearbeitung',
          'Direkte Auszahlung ohne UBA-Zertifizierung',
          'Garantierte Sofortauszahlung',
          'Gesamtzeitraum: 24h - 2 Wochen'
        ]
      }
    },
    bonus: {
      name: 'Bonus',
      description: 'Nur für 2026 - Höchste Prämie mit Zusatzbonus',
      bonus: 50,
      features: [
        'Exklusiv für 2026 verfügbar',
        'Höchste THG-Prämie aller Pläne',
        'Zusätzlicher 50€ Bonus für 2026',
        'Auszahlung nach UBA-Zertifizierung'
      ],
      payoutTiming: {
        title: 'Auszahlungszeitraum',
        details: '6-20 Wochen nach UBA-Zertifizierung',
        process: [
          'Einreichung der Antragsunterlagen',
          'UBA-Zertifizierung (3-10 Wochen)',
          'Auszahlung der THG-Prämie (3-10 Wochen)',
          'Gesamtzeitraum: 6-20 Wochen'
        ]
      }
    }
  },

  // Updated function to get price from new backend format
  getPrice: function(plan, year, vehicleClass) {
    if (this.activeConfigurations[year] && this.activeConfigurations[year].productOptions) {
      let optionKey;
      if (plan === 'express') {
        optionKey = 'INSTANT';
      } else if (plan === 'klassik') {
        optionKey = 'STANDARD';
      } else if (plan === 'bonus') {
        optionKey = 'BONUS';
      }
      
      const productOption = this.activeConfigurations[year].productOptions.find(option => 
        option.key === optionKey
      );
      
      if (productOption && productOption.prices[vehicleClass]) {
        return productOption.prices[vehicleClass];
      }
    }
    
    // Fallback to old calculation method if backend data not available
    const basePrice = this.basePrices?.[plan]?.[year] || 0;
    const factor = this.vehicleClassFactors[vehicleClass] || 1;
    return Math.round(basePrice * factor);
  },

  // Function to get price range for comparison display
  getPriceRange: function(plan, year) {
    if (this.activeConfigurations[year] && this.activeConfigurations[year].productOptions) {
      let optionKey;
      if (plan === 'express') {
        optionKey = 'INSTANT';
      } else if (plan === 'klassik') {
        optionKey = 'STANDARD';
      } else if (plan === 'bonus') {
        optionKey = 'BONUS';
      }
      
      const productOption = this.activeConfigurations[year].productOptions.find(option => 
        option.key === optionKey
      );
      
      if (productOption && productOption.prices) {
        const prices = Object.values(productOption.prices);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        return `${minPrice}-${maxPrice}`;
      }
    }
    
    // Fallback to old calculation method
    const basePrice = this.basePrices?.[plan]?.[year] || 0;
    const minFactor = Math.min(...Object.values(this.vehicleClassFactors));
    const maxFactor = Math.max(...Object.values(this.vehicleClassFactors));
    const minPrice = Math.round(basePrice * minFactor);
    const maxPrice = Math.round(basePrice * maxFactor);
    return `${minPrice}-${maxPrice}`;
  },

  // Function to get total sum for both years (2025 + 2026 + bonus)
  getTotalSum: function(plan, vehicleClass) {
    // For "both" years, use the combo pricing directly
    if (this.activeConfigurations['both'] && this.activeConfigurations['both'].productOptions) {
      let optionKey;
      if (plan === 'express') {
        optionKey = 'INSTANT';
      } else if (plan === 'klassik') {
        optionKey = 'STANDARD';
      } else if (plan === 'bonus') {
        optionKey = 'BONUS';
      }
      
      const productOption = this.activeConfigurations['both'].productOptions.find(option => 
        option.key === optionKey
      );
      
      if (productOption && productOption.prices[vehicleClass]) {
        return productOption.prices[vehicleClass];
      }
    }
    
    // Fallback to old calculation method if backend data not available
    const price2025 = this.getPrice(plan, '2025', vehicleClass);
    const price2026 = this.getPrice(plan, '2026', vehicleClass);
    const bonus = 30; // 30 euro bonus for both years option
    return price2025 + price2026 + bonus;
  },

  // Helper function to get product option by key
  getProductOption: function(year, key) {
    if (this.activeConfigurations[year] && this.activeConfigurations[year].productOptions) {
      return this.activeConfigurations[year].productOptions.find(option => option.key === key);
    }
    return null;
  },

  // Helper function to get plan key from plan name
  getPlanKey: function(planName) {
    if (planName === 'express') return 'INSTANT';
    if (planName === 'klassik') return 'STANDARD';
    if (planName === 'bonus') return 'BONUS';
    return 'STANDARD'; // fallback
  },

  comparisonRows: [
    { id: 'speed', label: 'Auszahlungsgeschwindigkeit', klassik: '4-16 Wochen', express: '24h-2 Wochen', bonus: '6-20 Wochen' },
    { id: 'price2025', label: 'Prämienhöhe (2025)', klassik: '90-3200', express: '70-2500', bonus: 'N/A' },
    { id: 'price2026', label: 'Prämienhöhe (2026)', klassik: '95-3360', express: '75-2625', bonus: '110-3850' },
    { id: 'priceBoth', label: 'Prämienhöhe (2025+2026)', klassik: '185-6560', express: '145-5125', bonus: 'N/A' },
    { id: 'bonus', label: 'Boni', klassik: '+ 30€ Verivox-Bonus', express: '+ 30€ Verivox-Bonus', bonus: '+ 50€ 2026 Bonus' },
    { id: 'requirements', label: 'Voraussetzungen', klassik: 'UBA-Zertifizierung erforderlich', express: 'Sofortige Garantie', bonus: 'UBA-Zertifizierung erforderlich' }
  ]
};


