/* ============================================
     JAVASCRIPT ЛОГИКА ЗА ТЪРСАЧКА НА АКУМУЛАТОРИ
     ============================================ */

// База данни с акумулатори
// Замени тези данни с твоите реални данни от Excel
let batteriesData = [
  // VARTA
  { id: 1, brand: 'VARTA', model: 'Blue Dynamic D24', capacity: 60, cca: 540, polarity: 'D', voltage: 12, price: 145.00, dimensions: '232x173x225' },
  { id: 2, brand: 'VARTA', model: 'Blue Dynamic D47', capacity: 70, cca: 600, polarity: 'D', voltage: 12, price: 165.00, dimensions: '278x175x190' },
  { id: 3, brand: 'VARTA', model: 'Blue Dynamic D15', capacity: 44, cca: 440, polarity: 'D', voltage: 12, price: 105.00, dimensions: '207x175x190' },
  { id: 4, brand: 'VARTA', model: 'Silver Dynamic D21', capacity: 74, cca: 750, polarity: 'D', voltage: 12, price: 205.00, dimensions: '278x175x190' },
  
  // BOSCH
  { id: 5, brand: 'BOSCH', model: 'S4 005', capacity: 55, cca: 480, polarity: 'D', voltage: 12, price: 125.00, dimensions: '207x175x190' },
  { id: 6, brand: 'BOSCH', model: 'S5 007', capacity: 74, cca: 680, polarity: 'D', voltage: 12, price: 185.00, dimensions: '278x175x190' },
  { id: 7, brand: 'BOSCH', model: 'S3 002', capacity: 60, cca: 540, polarity: 'D', voltage: 12, price: 95.00, dimensions: '232x173x225' },
  { id: 8, brand: 'BOSCH', model: 'S5 010', capacity: 110, cca: 920, polarity: 'D', voltage: 12, price: 295.00, dimensions: '394x175x190' },
  
  // EXIDE
  { id: 9, brand: 'EXIDE', model: 'Premium EA640', capacity: 60, cca: 550, polarity: 'D', voltage: 12, price: 135.00, dimensions: '242x175x190' },
  { id: 10, brand: 'EXIDE', model: 'Premium EA755', capacity: 75, cca: 680, polarity: 'D', voltage: 12, price: 175.00, dimensions: '278x175x190' },
  { id: 11, brand: 'EXIDE', model: 'Start-Stop EFB', capacity: 70, cca: 600, polarity: 'D', voltage: 12, price: 195.00, dimensions: '278x175x190' },
  
  // OPTIMA
  { id: 12, brand: 'OPTIMA', model: 'Yellow Top 35', capacity: 52, cca: 620, polarity: 'D', voltage: 12, price: 245.00, dimensions: '237x129x227' },
  { id: 13, brand: 'OPTIMA', model: 'Red Top 34', capacity: 50, cca: 720, polarity: 'D', voltage: 12, price: 195.00, dimensions: '237x129x227' },
  { id: 14, brand: 'OPTIMA', model: 'Blue Top 34', capacity: 50, cca: 750, polarity: 'D', voltage: 12, price: 215.00, dimensions: '237x129x227' },
  
  // MOLL
  { id: 15, brand: 'MOLL', model: 'M3 Plus 70Ah', capacity: 70, cca: 600, polarity: 'D', voltage: 12, price: 210.00, dimensions: '278x175x190' },
  { id: 16, brand: 'MOLL', model: 'M3 Plus 62Ah', capacity: 62, cca: 550, polarity: 'D', voltage: 12, price: 185.00, dimensions: '242x175x190' },
  { id: 17, brand: 'MOLL', model: 'M3 Plus 80Ah', capacity: 80, cca: 720, polarity: 'D', voltage: 12, price: 255.00, dimensions: '315x175x190' },
  
  // BANNER
  { id: 18, brand: 'BANNER', model: 'Running Bull', capacity: 80, cca: 720, polarity: 'D', voltage: 12, price: 235.00, dimensions: '315x175x190' },
  { id: 19, brand: 'BANNER', model: 'Power Bull', capacity: 70, cca: 600, polarity: 'D', voltage: 12, price: 175.00, dimensions: '278x175x190' },
  
  // TAB
  { id: 20, brand: 'TAB', model: 'Polar S D', capacity: 55, cca: 480, polarity: 'D', voltage: 12, price: 95.00, dimensions: '207x175x190' },
  { id: 21, brand: 'TAB', model: 'Polar S D', capacity: 65, cca: 520, polarity: 'D', voltage: 12, price: 115.00, dimensions: '242x175x190' },
  { id: 22, brand: 'TAB', model: 'Polar S D', capacity: 75, cca: 680, polarity: 'D', voltage: 12, price: 145.00, dimensions: '278x175x190' },
  
  // MONBAT
  { id: 23, brand: 'MONBAT', model: 'Premium', capacity: 60, cca: 500, polarity: 'D', voltage: 12, price: 99.00, dimensions: '232x173x225' },
  { id: 24, brand: 'MONBAT', model: 'Premium', capacity: 74, cca: 680, polarity: 'D', voltage: 12, price: 139.00, dimensions: '278x175x190' },
  
  // CENTRA
  { id: 25, brand: 'CENTRA', model: 'Futura CF', capacity: 74, cca: 680, polarity: 'D', voltage: 12, price: 155.00, dimensions: '278x175x190' },
  { id: 26, brand: 'CENTRA', model: 'Premium', capacity: 60, cca: 540, polarity: 'D', voltage: 12, price: 125.00, dimensions: '242x175x190' },
  
  // DELPHI
  { id: 27, brand: 'DELPHI', model: 'MaxGard', capacity: 70, cca: 600, polarity: 'D', voltage: 12, price: 155.00, dimensions: '278x175x190' },
  { id: 28, brand: 'DELPHI', model: 'MaxGard', capacity: 55, cca: 480, polarity: 'D', voltage: 12, price: 115.00, dimensions: '207x175x190' },
];

// Инициализация при зареждане на страницата
document.addEventListener('DOMContentLoaded', function() {
  // Проверка дали елементите съществуват
  const searchInput = document.getElementById('batterySearchInput');
  const ahFilter = document.getElementById('ahFilter');
  const ccaFilter = document.getElementById('ccaFilter');
  const polarityFilter = document.getElementById('polarityFilter');
  const voltageFilter = document.getElementById('voltageFilter');
  const searchBtn = document.getElementById('searchBtn');
  const resetBtn = document.getElementById('resetBtn');
  
  // Ако елементите не съществуват, излизаме
  if (!searchInput || !searchBtn) {
    console.log('Търсачката не е намерена на страницата');
    return;
  }
  
  // Зареждане на всички акумулатори при старт
  displayResults(batteriesData);
  
  // Търсене при клик на бутон
  searchBtn.addEventListener('click', performSearch);
  
  // Нулиране на филтрите
  resetBtn.addEventListener('click', resetFilters);
  
  // Търсене при промяна на филтри
  [ahFilter, ccaFilter, polarityFilter, voltageFilter].forEach(filter => {
    if (filter) {
      filter.addEventListener('change', performSearch);
    }
  });
  
  // Търсене при въвеждане на текст (със забавяне за производителност)
  let debounceTimer;
  searchInput.addEventListener('input', function() {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(performSearch, 300);
  });
  
  console.log('Търсачката за акумулатори е заредена');
});

// Търсене на акумулатори
function performSearch() {
  const searchInput = document.getElementById('batterySearchInput');
  const ahFilter = document.getElementById('ahFilter');
  const ccaFilter = document.getElementById('ccaFilter');
  const polarityFilter = document.getElementById('polarityFilter');
  const voltageFilter = document.getElementById('voltageFilter');
  
  if (!searchInput) return;
  
  const searchTerm = searchInput.value.toLowerCase();
  const ahValue = ahFilter ? ahFilter.value : '';
  const ccaValue = ccaFilter ? ccaFilter.value : '';
  const polarityValue = polarityFilter ? polarityFilter.value : '';
  const voltageValue = voltageFilter ? voltageFilter.value : '';
  
  // Филтриране на акумулаторите
  let filteredBatteries = batteriesData.filter(battery => {
    // Търсене по текст (марка или модел)
    const matchesSearch = !searchTerm || 
      battery.brand.toLowerCase().includes(searchTerm) ||
      battery.model.toLowerCase().includes(searchTerm);
    
    // Филтър по капацитет (Ah)
    const matchesAh = !a
