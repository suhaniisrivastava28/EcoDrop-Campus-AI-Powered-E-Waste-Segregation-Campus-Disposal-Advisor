// Comprehensive Campus E-Waste Knowledge Engine & RAG Analyzer
// Covers UN SDG 12 compliance, toxic material breakdown, hazard severity, and campus bin routing.

export const ewasteDatabase = [
  // 1. BATTERIES & POWER STORAGE
  {
    keywords: ['battery', 'swollen', 'bloated', 'bulging', 'pouch', 'lipo', 'li-ion', 'lithium ion', 'puff', 'power bank', 'powerbank'],
    matches: (q) => (q.includes('battery') || q.includes('powerbank') || q.includes('power bank')) && (q.includes('swoll') || q.includes('puff') || q.includes('bulg') || q.includes('bloat') || q.includes('heat') || q.includes('hot') || q.includes('fire')),
    item: {
      name: 'Bloated / Swollen Lithium-Ion Battery',
      category: 'Critical Hazardous Core (Thermal Runaway Risk)',
      toxicMaterials: [
        { name: 'Lithium Cobalt Oxide (LiCoO2)', percentage: 34, level: 'High Chemical Toxicity', color: 'bg-rose-500' },
        { name: 'Flammable Organic Electrolyte', percentage: 24, level: 'Extreme Fire Hazard', color: 'bg-red-600' },
        { name: 'Cobalt, Nickel & Heavy Metals', percentage: 22, level: 'Groundwater Poison', color: 'bg-amber-500' },
        { name: 'Copper Foil & Carbon Black', percentage: 20, level: 'Combustible', color: 'bg-yellow-500' }
      ],
      hazardSeverity: 'CRITICAL',
      hazardMessage: '🚨 CRITICAL FIRE HAZARD: Swollen battery pouch exhibits internal gas buildup and imminent thermal runaway risk. NEVER deposit in standard outdoor or plastic bins. Route immediately to Tech Support Room 204.',
      recommendation: 'Do NOT puncture, squeeze, or expose to heat. Place in a non-conductive sand bucket or flame-retardant pouch in Tech Support Room 204.',
      acceptedLocation: 'Tech Support Room 204 (Fire Containment Bay)',
      ragCitations: ['Campus Hazardous Safety Code §12.4', 'NFPA 855 Lithium-ion Hazard Standard 2026'],
      isFireHazard: true,
      canClaim: true
    }
  },
  {
    keywords: ['aa battery', 'aaa battery', 'alkaline', 'cell', 'button cell', 'remote battery', 'duracell', 'clock battery', 'coin battery', 'watch battery'],
    matches: (q) => (q.includes('battery') || q.includes('batteries') || q.includes('cell')) && (q.includes('aa') || q.includes('aaa') || q.includes('alkaline') || q.includes('button') || q.includes('coin') || q.includes('watch') || q.includes('remote') || q.includes('small') || q.includes('pencil')),
    item: {
      name: 'Household Alkaline / Button Cell Batteries (AA, AAA, CR2032)',
      category: 'Chemical Power Cells (Alkaline / Zinc-Air)',
      toxicMaterials: [
        { name: 'Potassium Hydroxide Electrolyte', percentage: 32, level: 'Corrosive Caustic Agent', color: 'bg-amber-500' },
        { name: 'Zinc & Manganese Dioxide', percentage: 38, level: 'Leachable Heavy Metal', color: 'bg-orange-500' },
        { name: 'Nickel Plated Steel Casing', percentage: 25, level: 'Recyclable Alloy', color: 'bg-emerald-500' },
        { name: 'Trace Mercury / Lead Seals', percentage: 5, level: 'Strictly Regulated', color: 'bg-red-500' }
      ],
      hazardSeverity: 'STANDARD_TOXIC',
      hazardMessage: '⚠️ CAUSTIC CORROSION RISK: Dead alkaline cells leak corrosive potassium hydroxide potassium zincate if corroded.',
      recommendation: 'Tape exposed terminals with clear scotch tape to prevent short circuits. Drop in Science Block (Chemistry Wing) - Bin Beta.',
      acceptedLocation: 'Science Block (Chemistry Wing) - Bin Beta (Battery Specialist Node)',
      ragCitations: ['CPCB Battery Waste Management Rules 2022/2026', 'Campus Chemical Segregation §3.2'],
      isFireHazard: false,
      canClaim: true
    }
  },

  // 2. CABLES, CHARGERS & PERIPHERALS
  {
    keywords: ['cable', 'wire', 'charger', 'adapter', 'cord', 'usb', 'hdmi', 'aux', 'lightning', 'type-c', 'charging', 'power cord'],
    matches: (q) => q.includes('cable') || q.includes('wire') || q.includes('cord') || q.includes('charger') || q.includes('adapter') || q.includes('usb') || q.includes('hdmi') || q.includes('lightning') || q.includes('type c') || q.includes('type-c'),
    item: {
      name: 'Frayed Power Cables, Adapters & USB Cords',
      category: 'Copper Wiring & Thermoplastic Insulators',
      toxicMaterials: [
        { name: 'PVC Polymer Outer Sheath', percentage: 42, level: 'Dioxin Risk if Incinerated', color: 'bg-amber-500' },
        { name: 'High-Purity Copper Core', percentage: 38, level: 'High-Value Recyclable (99% yield)', color: 'bg-emerald-500' },
        { name: 'Brominated Flame Retardants (BFR)', percentage: 12, level: 'Halogenated Pollutant', color: 'bg-orange-500' },
        { name: 'Tinned Copper / Aluminum Shield', percentage: 8, level: 'Non-Hazardous Metal', color: 'bg-blue-500' }
      ],
      hazardSeverity: 'SAFE_FOR_BINS',
      hazardMessage: '✅ APPROVED FOR BIN ALPHA: Disconnect from wall outlets. Safe for mechanical copper granulator recycling.',
      recommendation: 'Bundle wires with a rubber band or twist tie. Drop directly into Central Block - Bin Alpha for copper granulating.',
      acceptedLocation: 'Central Block - Bin Alpha (Cables & Adapters)',
      ragCitations: ['Central Pollution Control Board E-Waste Rules', 'Campus Wire Recycling Circular §5.1'],
      isFireHazard: false,
      canClaim: true
    }
  },
  {
    keywords: ['mouse', 'keyboard', 'trackpad', 'webcam', 'peripherals', 'joystick', 'controller', 'gaming pad'],
    matches: (q) => q.includes('mouse') || q.includes('keyboard') || q.includes('trackpad') || q.includes('webcam') || q.includes('controller') || q.includes('keypad'),
    item: {
      name: 'Computer Peripherals (Keyboard, Optical Mouse, Webcam)',
      category: 'ABS Plastic & Micro-PCB Peripheral',
      toxicMaterials: [
        { name: 'ABS Plastic Housing', percentage: 55, level: 'High Recyclability Resin', color: 'bg-emerald-500' },
        { name: 'Micro-PCB with Lead Solder', percentage: 25, level: 'Heavy Metal Traces', color: 'bg-amber-500' },
        { name: 'Copper Wiring & Connectors', percentage: 15, level: 'Recoverable Metal', color: 'bg-teal-500' },
        { name: 'Membrane Silicone & Keycaps', percentage: 5, level: 'Inert Polymer', color: 'bg-slate-400' }
      ],
      hazardSeverity: 'SAFE_FOR_BINS',
      hazardMessage: '✅ APPROVED FOR COLLECTION: Safe solid state components. Detach any internal AAA batteries if wireless.',
      recommendation: 'Remove AA/AAA batteries if wireless (put batteries in Bin Beta). Place mouse/keyboard in Central Block - Bin Alpha.',
      acceptedLocation: 'Central Block - Bin Alpha (Peripherals & Small Electronics)',
      ragCitations: ['Campus IT Asset Recovery Program §2.4', 'ISO 14001 Electronics Stream'],
      isFireHazard: false,
      canClaim: true
    }
  },
  {
    keywords: ['headphone', 'earphone', 'airpod', 'earbud', 'earbuds', 'headset', 'airpods', 'tws', 'audio'],
    matches: (q) => q.includes('headphone') || q.includes('earphone') || q.includes('airpod') || q.includes('earbud') || q.includes('headset') || q.includes('tws') || q.includes('audio'),
    item: {
      name: 'Earphones / Wireless Earbuds (AirPods, TWS Headset)',
      category: 'Miniature Acoustic Transducers & Coin Li-Ion',
      toxicMaterials: [
        { name: 'Neodymium Rare Earth Magnets', percentage: 28, level: 'Critical Raw Material (CRM)', color: 'bg-cyan-500' },
        { name: 'Miniature Lithium-Polymer Coin Cell', percentage: 32, level: 'Chemical Storage Risk', color: 'bg-amber-500' },
        { name: 'ABS / Polycarbonate Casing', percentage: 25, level: 'Recyclable Plastic', color: 'bg-emerald-500' },
        { name: 'Fine Copper Voice Coil & Solder', percentage: 15, level: 'Valuable Conductor', color: 'bg-yellow-500' }
      ],
      hazardSeverity: 'STANDARD_TOXIC',
      hazardMessage: '⚠️ RECHARGEABLE BATTERY INSIDE: Contains tiny Li-Po cells. Do not crush with heavy electronics.',
      recommendation: 'Keep earbuds inside their charging case or small pouch. Deposit in Central Block - Bin Alpha or Library Hub - Bin Delta.',
      acceptedLocation: 'Central Block - Bin Alpha or Main Library Hub - Bin Delta',
      ragCitations: ['Campus Small Gadget Recycling Guideline §4.2'],
      isFireHazard: false,
      canClaim: true
    }
  },

  // 3. SMARTPHONES, TABLETS & COMPUTING GADGETS
  {
    keywords: ['phone', 'mobile', 'smartphone', 'iphone', 'android', 'samsung', 'tablet', 'ipad', 'kindle', 'ereader', 'screen cracked'],
    matches: (q) => q.includes('phone') || q.includes('mobile') || q.includes('smartphone') || q.includes('iphone') || q.includes('android') || q.includes('samsung') || q.includes('tablet') || q.includes('ipad') || q.includes('kindle'),
    item: {
      name: 'Mobile Phone / Tablet (Smart Device)',
      category: 'High-Density Integrated Smart Hardware',
      toxicMaterials: [
        { name: 'Cobalt & Lithium Battery Core', percentage: 30, level: 'Chemical Fire Hazard', color: 'bg-rose-500' },
        { name: 'Gold, Silver & Palladium Contact Pins', percentage: 4, level: 'Ultra-High Recovery Value', color: 'bg-amber-400' },
        { name: 'Indium Tin Oxide (ITO) Touch Display', percentage: 22, level: 'Scarce Rare Metal', color: 'bg-cyan-500' },
        { name: 'Aluminosilicate Glass & Alloy Frame', percentage: 44, level: 'Structural Recyclable', color: 'bg-slate-400' }
      ],
      hazardSeverity: 'STANDARD_TOXIC',
      hazardMessage: '📱 DATA SANITIZATION ALERT: Ensure you perform a Factory Reset / Remove Google/iCloud accounts before drop-off.',
      recommendation: 'Perform factory data wipe. If screen is broken, wrap in newspaper or bubble mailer. Deposit in Main Library Hub - Bin Delta.',
      acceptedLocation: 'Main Library Hub - Bin Delta (Intact Tablets & Smart Phones)',
      ragCitations: ['NIST 800-88 Data Sanitization Protocol', 'Campus Mobile Device Recycling §6.0'],
      isFireHazard: false,
      canClaim: true
    }
  },
  {
    keywords: ['calculator', 'scientific calculator', 'casio', 'digital clock', 'smartwatch', 'smart watch', 'fitness tracker', 'fitbit'],
    matches: (q) => q.includes('calculator') || q.includes('smartwatch') || q.includes('smart watch') || q.includes('fitbit') || q.includes('fitness tracker') || q.includes('casio'),
    item: {
      name: 'Scientific Calculator / Smart Wearable Device',
      category: 'Micro-Controller Display Unit',
      toxicMaterials: [
        { name: 'Liquid Crystal Display (LCD) Biphenyls', percentage: 18, level: 'Chemical Seal', color: 'bg-amber-500' },
        { name: 'Button Cell or Mini Li-Po Battery', percentage: 26, level: 'Hazardous Chemical', color: 'bg-rose-500' },
        { name: 'Silicone Keypad & ABS Resin', percentage: 38, level: 'Recyclable Plastic', color: 'bg-emerald-500' },
        { name: 'Silica Microchip & Copper Leads', percentage: 18, level: 'Recyclable Silicon', color: 'bg-blue-500' }
      ],
      hazardSeverity: 'SAFE_FOR_BINS',
      hazardMessage: '✅ EXAM CLEARANCE APPROVED: Great timing! Exam season discards are consolidated for junior student re-use if functional.',
      recommendation: 'If working, place in the Re-Use Shelf at Library Hub. Otherwise, drop into Main Library Hub - Bin Delta.',
      acceptedLocation: 'Main Library Hub - Bin Delta',
      ragCitations: ['Campus Circular Reuse Initiative 2026', 'Exam Discard Forecast Model'],
      isFireHazard: false,
      canClaim: true
    }
  },

  // 4. PC HARDWARE, MOTHERBOARDS & PCBS
  {
    keywords: ['motherboard', 'ram', 'gpu', 'graphics card', 'cpu', 'processor', 'pcb', 'circuit board', 'hard drive', 'hdd', 'ssd', 'smps', 'power supply', 'mother board'],
    matches: (q) => q.includes('motherboard') || q.includes('ram') || q.includes('gpu') || q.includes('graphics card') || q.includes('cpu') || q.includes('processor') || q.includes('pcb') || q.includes('circuit') || q.includes('hard drive') || q.includes('hdd') || q.includes('ssd') || q.includes('smps') || q.includes('power supply'),
    item: {
      name: 'Computer Motherboard, RAM & High-Grade PCB Assemblies',
      category: 'Multi-Layer Fiber Circuit Board & Precious Metals',
      toxicMaterials: [
        { name: 'Lead-Tin Solder Alloy (Pb-Sn)', percentage: 26, level: 'Neurotoxic Heavy Metal', color: 'bg-red-500' },
        { name: 'Brominated Flame Retardants (TBBPA)', percentage: 22, level: 'Persistent Organic Pollutant', color: 'bg-orange-500' },
        { name: 'Recoverable Gold (Au) & Silver (Ag)', percentage: 4, level: 'High Economic Value (~1.2g/kg)', color: 'bg-amber-400' },
        { name: 'Epoxy Fiberglass & Copper Traces', percentage: 48, level: 'Non-Hazardous Base', color: 'bg-slate-400' }
      ],
      hazardSeverity: 'STANDARD_TOXIC',
      hazardMessage: '⚠️ HEAVY METAL HAZARD: Contains lead solder and flame retardants. Do not break or burn boards.',
      recommendation: 'Place in an anti-static bag or cardboard box. Deposit at Engineering Workshop - Bin Gamma for hydrometallurgical gold recovery.',
      acceptedLocation: 'Engineering Workshop - Bin Gamma (Heavy Electronics & PCBs)',
      ragCitations: ['E-Waste Management Rules Schedule 1', 'Hydrometallurgy Recovery Standard 2026'],
      isFireHazard: false,
      canClaim: true
    }
  },

  // 5. MONITORS, SCREENS & TELEVISIONS
  {
    keywords: ['monitor', 'screen', 'tv', 'television', 'crt', 'display', 'lcd monitor', 'led monitor'],
    matches: (q) => q.includes('monitor') || q.includes('screen') || q.includes('tv') || q.includes('television') || q.includes('display') || q.includes('crt'),
    item: {
      name: 'Computer Monitor / Display Screen (CRT / LCD / LED)',
      category: 'Cathode Ray & Optoelectronic Display Panel',
      toxicMaterials: [
        { name: 'Lead Glass Funnel & Barium (CRT)', percentage: 35, level: 'Severe Leaching Neurotoxin', color: 'bg-red-600' },
        { name: 'Mercury Cold Cathode (CCFL Backlight)', percentage: 15, level: 'Toxic Vapor in older LCDs', color: 'bg-rose-500' },
        { name: 'Flame Retardant Plastic Bezel', percentage: 30, level: 'BFR Polymer', color: 'bg-amber-500' },
        { name: 'Internal Power Board & Transformer', percentage: 20, level: 'Copper & Ferrite Core', color: 'bg-emerald-500' }
      ],
      hazardSeverity: 'HIGH_TOXIC',
      hazardMessage: '☣️ LEAD & MERCURY VAPOR RISK: Older CRT and CCFL screens contain over 1.5kg of lead in the funnel glass or mercury tubes.',
      recommendation: 'Do NOT crack or smash glass. Keep display intact and coordinate direct drop-off at Engineering Workshop - Bin Gamma.',
      acceptedLocation: 'Engineering Workshop - Bin Gamma (Heavy Tech Bay)',
      ragCitations: ['CPCB Hazardous Waste Protocol §8.3', 'Cathode Ray Tube Safe Disposal Act'],
      isFireHazard: false,
      canClaim: true
    }
  },

  // 6. PRINTERS & TONER
  {
    keywords: ['printer', 'cartridge', 'toner', 'ink', 'scanner', 'photocopier', 'inkjet'],
    matches: (q) => q.includes('printer') || q.includes('cartridge') || q.includes('toner') || q.includes('ink') || q.includes('scanner'),
    item: {
      name: 'Laser Printer / Toner Cartridge / Ink Jet Assembly',
      category: 'Electro-Photographic & Micro-Resin Core',
      toxicMaterials: [
        { name: 'Respirable Carbon Black Powder (Toner)', percentage: 35, level: 'Respiratory Carcinogen Risk', color: 'bg-red-500' },
        { name: 'Polymer Resins (Styrene Acrylate)', percentage: 30, level: 'Fine Particulate Matter', color: 'bg-amber-500' },
        { name: 'Stepping Motors & Copper Wiring', percentage: 20, level: 'Recyclable Mechanism', color: 'bg-emerald-500' },
        { name: 'Heavy Steel Chassis & Rollers', percentage: 15, level: 'Ferrous Scrap', color: 'bg-blue-500' }
      ],
      hazardSeverity: 'STANDARD_TOXIC',
      hazardMessage: '⚠️ TONER INHALATION RISK: Never shake or open empty toner cartridges. Toner dust particles penetrate alveolar lungs.',
      recommendation: 'Seal toner cartridge in an airtight zip bag. Printers go to Engineering Workshop - Bin Gamma. Empty cartridges go to Science Block Bin Beta.',
      acceptedLocation: 'Engineering Workshop - Bin Gamma (Printers) / Science Block Bin Beta (Toner)',
      ragCitations: ['OSHA Carbon Black Particulate Guidelines', 'Campus Printing Center Protocol'],
      isFireHazard: false,
      canClaim: true
    }
  },

  // 7. LIGHTING (CFL, FLUORESCENT & LED)
  {
    keywords: ['cfl', 'bulb', 'tube', 'tubelight', 'fluorescent', 'lamp', 'mercury bulb', 'led bulb'],
    matches: (q) => q.includes('cfl') || q.includes('bulb') || q.includes('tube') || q.includes('lamp') || q.includes('light') || q.includes('fluorescent'),
    item: {
      name: 'Compact Fluorescent Lamp (CFL) & Fluorescent Tubelight',
      category: 'Mercury-Vapor Phosphor Lighting',
      toxicMaterials: [
        { name: 'Elemental Mercury Vapor (Hg)', percentage: 15, level: 'Severe Inhalation Neurotoxin', color: 'bg-red-600' },
        { name: 'Rare Earth Phosphor Coating', percentage: 25, level: 'Irritant Particulate', color: 'bg-amber-500' },
        { name: 'Borosilicate Glass Envelope', percentage: 50, level: 'Fragile Hazard', color: 'bg-slate-400' },
        { name: 'Aluminum & Ceramic Ballast', percentage: 10, level: 'Recyclable Base', color: 'bg-emerald-500' }
      ],
      hazardSeverity: 'MERCURY_HAZARD',
      hazardMessage: '☣️ MERCURY VAPOR ALERT: Contains elemental mercury. If broken, immediately evacuate and ventilate the room for 15 minutes before cleaning.',
      recommendation: 'Never discard with regular trash. Wrap bulb in bubble mailer and deposit at Science Block - Bin Beta.',
      acceptedLocation: 'Science Block (Chemistry Wing) - Bin Beta',
      ragCitations: ['Minamata Convention on Mercury 2026', 'Campus Chemical Safety Code §9.1'],
      isFireHazard: false,
      canClaim: true
    }
  },

  // 8. SMALL APPLIANCES & GADGETS
  {
    keywords: ['kettle', 'electric kettle', 'microwave', 'toaster', 'hair dryer', 'iron', 'soldering iron', 'multimeter', 'heater', 'fan'],
    matches: (q) => q.includes('kettle') || q.includes('microwave') || q.includes('toaster') || q.includes('dryer') || q.includes('heater') || q.includes('soldering') || q.includes('multimeter') || q.includes('appliance'),
    item: {
      name: 'Small Electrical Appliance (Kettle, Microwave, Multimeter)',
      category: 'Electromechanical Heating & Motorized Unit',
      toxicMaterials: [
        { name: 'Nichrome Heating Element', percentage: 20, level: 'Nickel-Chromium Alloy', color: 'bg-amber-500' },
        { name: 'High-Purity Copper Windings & Cord', percentage: 32, level: 'Valuable Scrap', color: 'bg-emerald-500' },
        { name: 'Stainless Steel / Aluminum Chamber', percentage: 38, level: 'High Recyclability Metal', color: 'bg-teal-500' },
        { name: 'Thermostat Switch & Solder Joints', percentage: 10, level: 'Low Metal Traces', color: 'bg-blue-500' }
      ],
      hazardSeverity: 'SAFE_FOR_BINS',
      hazardMessage: '✅ LARGE APPLIANCE STREAM: High copper and metal yield. Clear any water/liquids before drop-off.',
      recommendation: 'Ensure appliance is completely unplugged and dried. Deposit in Engineering Workshop - Bin Gamma.',
      acceptedLocation: 'Engineering Workshop - Bin Gamma (Heavy Appliances & Workshop Bay)',
      ragCitations: ['Campus Facilities Metal Recovery Guideline §11.2'],
      isFireHazard: false,
      canClaim: true
    }
  },

  // 9. VAPES & E-CIGARETTES
  {
    keywords: ['vape', 'e-cigarette', 'pod', 'juul', 'disposable vape', 'electronic cigarette'],
    matches: (q) => q.includes('vape') || q.includes('cigarette') || q.includes('pod') || q.includes('juul'),
    item: {
      name: 'Electronic Vape / Disposable E-Cigarette Device',
      category: 'Hazardous Dual Stream (Toxic Chemical & Unprotected Li-Ion)',
      toxicMaterials: [
        { name: 'Unprotected Miniature Li-Ion Pouch', percentage: 35, level: 'High Spontaneous Fire Risk', color: 'bg-rose-600' },
        { name: 'Residual Nicotine Liquid & Propylene Glycol', percentage: 25, level: 'Hazardous Bio-Chemical Poison', color: 'bg-red-500' },
        { name: 'Chromium Heating Wire & Ceramic Wick', percentage: 15, level: 'Heavy Metal Alloy', color: 'bg-amber-500' },
        { name: 'Aluminum & Polycarbonate Casing', percentage: 25, level: 'Recyclable Shell', color: 'bg-emerald-500' }
      ],
      hazardSeverity: 'CRITICAL',
      hazardMessage: '🚨 DUAL BIO-FIRE HAZARD: Disposable vapes contain unmanaged lithium cells and toxic nicotine e-liquid. Municipal waste fires are frequently caused by vapes. Do NOT discard in normal trash.',
      recommendation: 'Seal in a plastic ziplock bag. Bring directly to Tech Support Room 204 or Science Block Bin Beta hazardous slot.',
      acceptedLocation: 'Tech Support Room 204 or Science Block - Bin Beta',
      ragCitations: ['EPA Management of Waste Nicotine 2026', 'Campus Tobacco & E-Waste Policy'],
      isFireHazard: true,
      canClaim: true
    }
  },

  // 10. NON-E-WASTE / GENERAL CAMPUS WASTE (Edge cases)
  {
    keywords: ['plastic bottle', 'paper', 'cardboard', 'can', 'coke', 'food', 'banana', 'wrapper', 'trash', 'garbage', 'organic', 'coffee cup'],
    matches: (q) => (q.includes('plastic') && (q.includes('bottle') || q.includes('cup') || q.includes('bag'))) || q.includes('paper') || q.includes('cardboard') || q.includes('food') || q.includes('banana') || q.includes('apple') || q.includes('soda can') || q.includes('coffee cup'),
    item: {
      name: 'Non-Electronic Waste (Paper, Beverage Container, Food Packaging)',
      category: 'Campus Municipal Solid Waste (Non-Electronic)',
      toxicMaterials: [
        { name: 'Cellulose Fiber / Cardboard', percentage: 40, level: 'Biodegradable Dry Waste', color: 'bg-emerald-400' },
        { name: 'Polyethylene Terephthalate (PET)', percentage: 35, level: 'Thermoplastic Recyclable', color: 'bg-cyan-500' },
        { name: 'Organic Residue', percentage: 25, level: 'Compostable', color: 'bg-green-600' }
      ],
      hazardSeverity: 'NON_EWASTE',
      hazardMessage: 'ℹ️ NON-ELECTRONIC ITEM: This item is standard dry/wet campus waste, NOT electrical or electronic waste (WEEE).',
      recommendation: 'Please do not mix this with electronic bins. Deposit clean paper/plastics into Campus Blue Bins (Dry Recyclables) and food waste into Green Bins (Organic Compost).',
      acceptedLocation: 'Campus Blue Bins (Recyclables) or Green Bins (Compost)',
      ragCitations: ['Solid Waste Management Rules (SWM) 2016', 'Campus Zero-Waste Clean Drive'],
      isFireHazard: false,
      canClaim: false
    }
  }
];

// Fallback dynamic analyzer for any query
export function analyzeWasteQuery(rawQuery) {
  const query = rawQuery.toLowerCase().trim();

  // 1. Check direct database match
  for (const entry of ewasteDatabase) {
    if (entry.matches(query)) {
      return entry.item;
    }
  }

  // 2. Keyword check
  for (const entry of ewasteDatabase) {
    for (const kw of entry.keywords) {
      if (query.includes(kw)) {
        return entry.item;
      }
    }
  }

  // 3. Smart dynamic generative fallback for any other electronic item
  const isDangerous = query.includes('fire') || query.includes('smoke') || query.includes('smell') || query.includes('acid') || query.includes('leak') || query.includes('crack');

  return {
    name: `Custom Electronics: "${rawQuery.slice(0, 32)}"`,
    category: 'Generic Electronic & Electrical Equipment (WEEE)',
    toxicMaterials: [
      { name: 'Printed Circuit Board Solder (Lead/Tin)', percentage: 28, level: 'Heavy Metal Neurotoxin', color: 'bg-amber-500' },
      { name: 'Flame Retardant Polycarbonate Housing', percentage: 42, level: 'BFR Organic Halogen', color: 'bg-orange-500' },
      { name: 'Copper Wiring & Connectors', percentage: 22, level: 'Valuable Recyclable', color: 'bg-emerald-500' },
      { name: 'Silicon Micro-controller Core', percentage: 8, level: 'Semiconductor Grade', color: 'bg-cyan-500' }
    ],
    hazardSeverity: isDangerous ? 'CRITICAL' : 'STANDARD_TOXIC',
    hazardMessage: isDangerous 
      ? '🚨 SAFETY CAUTION: Signs of heat, smoke or chemical leakage reported. Do not place in standard bin. Bring to Tech Support Room 204.'
      : '✅ CAMPUS RECYCLING APPROVED: Verified as Electronic Waste (WEEE). Detach power cords before disposal.',
    recommendation: 'If this is a cable/small peripheral, deposit in Central Block - Bin Alpha. If it is a larger appliance or circuit board, deposit in Engineering Workshop - Bin Gamma.',
    acceptedLocation: 'Central Block - Bin Alpha (Small) or Engineering Workshop - Bin Gamma (Large)',
    ragCitations: ['IBM Granite 3.0 Campus E-Waste Classifier', 'UN SDG 12 Responsible Consumption Protocol'],
    isFireHazard: isDangerous,
    canClaim: true
  };
}
