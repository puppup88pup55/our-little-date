
// ==================================
// 💜 OUR LITTLE PURPLE DATE
// ==================================

// ===== PAGE 1 : INVITATION =====

const yesButton = document.querySelector('.btn.yes');
const noButton = document.querySelector('.btn.no');

const invitePage = document.querySelector('.invite');
const datePage = document.getElementById('datePage');
const placePage = document.getElementById('placePage');

let noClicks = 0;
let dodgeCount = 0;
let lastDodge = 0;

const maxClicks = 5;


// 💜 กด YES
yesButton.addEventListener('click', () => {

  invitePage.classList.add('is-hidden');
  datePage.classList.remove('is-hidden');

  renderCalendar();
  window.scrollTo(0, 0);

});


// 🫣 ปุ่ม No หลบ 80px
function dodgeNoButton(force = false) {

  if (noClicks >= maxClicks) return;

  const now = Date.now();

  if (!force && now - lastDodge < 350) {
    return;
  }

  lastDodge = now;
  dodgeCount++;

  const x = dodgeCount % 2 === 0 ? -80 : 80;
  const y = dodgeCount % 2 === 0 ? -20 : 20;

  noButton.style.setProperty('--move-x', x + 'px');
  noButton.style.setProperty('--move-y', y + 'px');

}


// 🖱️ 10% ของครั้งที่เมาส์เข้าปุ่มจะไม่หลบ
noButton.addEventListener('pointerenter', event => {

  if (event.pointerType !== 'mouse') return;

  if (Math.random() < 0.10) return;

  dodgeNoButton();

});


// 💕 กด No แล้วเล็กลง
noButton.addEventListener('click', event => {

  event.preventDefault();

  noClicks++;

  const noScale = Math.max(0.2, 1 - noClicks * 0.16);
  const yesScale = 1 + noClicks * 0.3;

  noButton.style.setProperty('--no-scale', noScale);
  yesButton.style.setProperty('--yes-scale', yesScale);

  if (noClicks >= maxClicks) {

    noButton.style.display = 'none';
    yesButton.classList.add('full-screen');
    yesButton.innerHTML = 'ไปเดทกันเถอะ! 💜 ♡';

    return;
  }

  dodgeNoButton(true);

});


// ===== PAGE 2 : CALENDAR =====

const monthTitle = document.getElementById('monthTitle');
const calendarDays = document.getElementById('calendarDays');

const prevMonth = document.getElementById('prevMonth');
const nextMonth = document.getElementById('nextMonth');

const pickedDate = document.getElementById('pickedDate');
const confirmDate = document.getElementById('confirmDate');

const backButton = document.getElementById('backToInvite');

const displayYear = 2026;
const displayMonth = 11;

const allowedStart = new Date(2026, 11, 3);
const allowedEnd = new Date(2026, 11, 8);

let selectedDate = null;

const thaiDateFormat = new Intl.DateTimeFormat('th-TH', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric'
});

prevMonth.style.display = 'none';
nextMonth.style.display = 'none';

document.querySelector('.calendar-header')
  .style.justifyContent = 'center';


// 📅 สร้างปฏิทิน
function renderCalendar() {

  const firstDay = new Date(
    displayYear,
    displayMonth,
    1
  );

  monthTitle.textContent =
    new Intl.DateTimeFormat('th-TH', {
      month: 'long',
      year: 'numeric'
    }).format(firstDay);

  calendarDays.innerHTML = '';

  const startDay = (firstDay.getDay() + 6) % 7;

  const totalDays = new Date(
    displayYear,
    displayMonth + 1,
    0
  ).getDate();

  for (let i = 0; i < startDay; i++) {
    calendarDays.appendChild(
      document.createElement('span')
    );
  }

  for (let day = 1; day <= totalDays; day++) {

    const date = new Date(2026, 11, day);
    const button = document.createElement('button');

    button.type = 'button';
    button.className = 'day';
    button.textContent = day;

    const isAllowed =
      date >= allowedStart &&
      date <= allowedEnd;

    button.disabled = !isAllowed;

    const isSelected =
      selectedDate &&
      date.getTime() === selectedDate.getTime();

    if (isSelected) {
      button.classList.add('selected');
    }

    button.setAttribute(
      'aria-pressed',
      String(Boolean(isSelected))
    );

    button.setAttribute(
      'aria-label',
      thaiDateFormat.format(date)
    );

    button.addEventListener('click', () => {

      if (!isAllowed) return;

      selectedDate = date;

      pickedDate.textContent =
        '💜 ' + thaiDateFormat.format(date);

      confirmDate.disabled = false;
      renderCalendar();

    });

    calendarDays.appendChild(button);

  }

}


// ===== PAGE 3 : MOVIE & RESTAURANT =====

// ==================================
// 🌷 แก้ชื่อหนังได้ตรงนี้
// ==================================

const movies = [
  {
    id: 'm1',
    name: 'เดอะ ฮังเกอร์เกมส์ รุ่งอรุณเกมล่าเกม',
    desc: 'You, Me & Popcorn ♡',
    emoji: '🎬',
    image: 'https://cdn.majorcineplex.com/uploads/movie/4996/thumb_4996.jpg?181120261809'
  },
  {
    id: 'm2',
    name: 'มหัศจรรย์เวทมนตร์อลเวง',
    desc: 'A movie together ♡',
    emoji: '🍿',
    image: 'https://cdn.majorcineplex.com/uploads/movie/4830/thumb_4830.jpg'
  },
  {
    id: 'm3',
    name: 'คุณยายวรนาฏ',
    desc: 'A Little Cinema Date ♡ ',
    emoji: '🎞️',
    image: 'https://cdn.majorcineplex.com/uploads/movie/5131/thumb_5131.jpg?181120261809'
  }
];


// ==================================
// 🍽️ แก้ชื่อร้านอาหารได้ตรงนี้
// ==================================

const restaurants = [
  {
    id: 'r1',
    name: 'Baiyoke Buffet',
    desc: 'Dinner date ♡',
    emoji: '🍝',
    image: 'https://blog-static.kkday.com/th/blog/wp-content/uploads/Sky-Box-81-Floor-1.webp'
  },
  {
    id: 'r2',
    name: 'Sushiro',
    desc: 'Something delicious ♡',
    emoji: '🍣',
    image: 'https://www.mallbangkok.com/wp-content/uploads/2025/02/sushiro.png'
  },
  {
    id: 'r3',
    name: 'Sanrio Sweet CAFÉ',
    desc: 'A Cozy Café Date ♡',
    emoji: '🍲',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuvhKfcJK3IPec6lT8gvgKYYOCaiqtcR17rOH4CyYln6ZbT8aRozlp5IYZ&s=10'
  }
];


// ตัวแปรเก็บตัวเลือก
let selectedMovie = null;
let selectedRestaurant = null;


// องค์ประกอบหน้าที่ 3
const movieGrid = document.getElementById('movieGrid');

const restaurantGrid =
  document.getElementById('restaurantGrid');

const placeDate = document.getElementById('placeDate');

const placePicked =
  document.getElementById('placePicked');

const confirmPlan =
  document.getElementById('confirmPlan');

const placeResult =
  document.getElementById('placeResult');

const backToDate =
  document.getElementById('backToDate');


// 💜 สร้างการ์ดตัวเลือก
function createCards(items, container, type) {

  container.innerHTML = '';

  items.forEach((item, index) => {

    const card = document.createElement('button');

    card.type = 'button';
    card.className = 'choice-card';
    card.setAttribute('aria-pressed', 'false');

    const art = document.createElement('div');
    art.className =
      'choice-art art-' + ((index % 3) + 1);

    // ถ้าใส่ URL รูป จะใช้รูปนั้น
    // ถ้าไม่มีรูป จะใช้ Emoji
    if (item.image) {

      const img = document.createElement('img');
      img.src = item.image;
      img.alt = item.name;
      img.loading = 'lazy';

      art.appendChild(img);

    } else {

      const emoji = document.createElement('span');
      emoji.className = 'choice-emoji';
      emoji.textContent = item.emoji;

      art.appendChild(emoji);

    }

    const title = document.createElement('strong');
    title.className = 'choice-name';
    title.textContent = item.name;

    const desc = document.createElement('small');
    desc.className = 'choice-desc';
    desc.textContent = item.desc;

    card.appendChild(art);
    card.appendChild(title);
    card.appendChild(desc);

    // กดเลือกรายการ
    card.addEventListener('click', () => {

      if (type === 'movie') {
        selectedMovie = item.id;
      } else {
        selectedRestaurant = item.id;
      }

      // เน้นการ์ดที่เลือก
      container.querySelectorAll('.choice-card')
        .forEach(button => {

          const active = button === card;

          button.classList.toggle('selected', active);

          button.setAttribute(
            'aria-pressed',
            String(active)
          );

        });

      placeResult.classList.add('is-hidden');

      updateChoices();

    });

    container.appendChild(card);

  });

}


// 💜 อัปเดตสิ่งที่เลือก
function updateChoices() {

  const movie = movies.find(
    item => item.id === selectedMovie
  );

  const restaurant = restaurants.find(
    item => item.id === selectedRestaurant
  );

  confirmPlan.disabled = !(movie && restaurant);

  if (!movie && !restaurant) {
    placePicked.textContent =
      '💜 เลือกหนังและร้านอาหารก่อนนะ';
    return;
  }

  if (!movie) {
    placePicked.textContent =
      '🎬 ยังไม่ได้เลือกหนัง';
    return;
  }

  if (!restaurant) {
    placePicked.textContent =
      '🍽️ ยังไม่ได้เลือกร้านอาหาร';
    return;
  }

  placePicked.textContent =
    '💜 ' + movie.name + ' + ' + restaurant.name;

}


// 🌷 ยืนยันวันที่ → ไปหน้าที่ 3
confirmDate.addEventListener('click', () => {

  if (!selectedDate) return;

  placeDate.textContent =
    '🌷 ' + thaiDateFormat.format(selectedDate);

  datePage.classList.add('is-hidden');
  placePage.classList.remove('is-hidden');

  placeResult.classList.add('is-hidden');

  window.scrollTo(0, 0);

});


// 💌 ยืนยันหนังและร้านอาหาร
confirmPlan.addEventListener('click', () => {

  if (!selectedDate) return;

  const movie = movies.find(
    item => item.id === selectedMovie
  );

  const restaurant = restaurants.find(
    item => item.id === selectedRestaurant
  );

  if (!movie || !restaurant) return;

  placeResult.textContent =
    '💜 IT’S A DATE! ♡\n\n' +
    '📅 ' + thaiDateFormat.format(selectedDate) +
    '\n🎬 หนัง: ' + movie.name +
    '\n🍽️ ร้านอาหาร: ' + restaurant.name +
    '\n\nCan’t wait to see you ♡';

  placeResult.classList.remove('is-hidden');

});


// กลับไปเลือกวันที่
backToDate.addEventListener('click', () => {

  placePage.classList.add('is-hidden');
  datePage.classList.remove('is-hidden');

  window.scrollTo(0, 0);

});


// กลับไปหน้าแรก
backButton.addEventListener('click', () => {

  datePage.classList.add('is-hidden');
  invitePage.classList.remove('is-hidden');

  noClicks = 0;
  dodgeCount = 0;
  lastDodge = 0;

  noButton.style.display = '';

  noButton.style.setProperty('--no-scale', '1');
  noButton.style.setProperty('--move-x', '0px');
  noButton.style.setProperty('--move-y', '0px');

  yesButton.classList.remove('full-screen');

  yesButton.style.setProperty('--yes-scale', '1');

  yesButton.innerHTML =
    'ไปเดทกัน <span>↗</span>';

  window.scrollTo(0, 0);

});


// เริ่มต้นระบบ
createCards(movies, movieGrid, 'movie');

createCards(
  restaurants,
  restaurantGrid,
  'restaurant'
);

renderCalendar();

// ====================================
// 💜 PAGE 4 : DATE CONFIRMED
// ====================================

const successPage =
  document.getElementById('successPage');

const successDate =
  document.getElementById('successDate');

const successMovie =
  document.getElementById('successMovie');

const successRestaurant =
  document.getElementById('successRestaurant');

const editDatePlan =
  document.getElementById('editDatePlan');


// 💌 กดยืนยันแผนเดท → ไปหน้าสำเร็จ
confirmPlan.addEventListener('click', () => {

  // ต้องเลือกครบทุกอย่างก่อน
  if (!selectedDate ||
      !selectedMovie ||
      !selectedRestaurant) {
    return;
  }

  // หาหนังที่เลือก
  const movie = movies.find(
    item => item.id === selectedMovie
  );

  // หาร้านอาหารที่เลือก
  const restaurant = restaurants.find(
    item => item.id === selectedRestaurant
  );

  if (!movie || !restaurant) return;

  // แสดงวันเดท
  successDate.textContent =
    thaiDateFormat.format(selectedDate);

  // แสดงชื่อหนัง
  successMovie.textContent = movie.name;

  // แสดงชื่อร้านอาหาร
  successRestaurant.textContent =
    restaurant.name;

  // ซ่อนหน้าเลือกหนังและร้าน
  placePage.classList.add('is-hidden');

  // เปิดหน้าสำเร็จ
  successPage.classList.remove('is-hidden');

  // เลื่อนขึ้นด้านบน
  window.scrollTo(0, 0);

});


// 🌷 กลับไปเปลี่ยนหนังหรือร้าน
editDatePlan.addEventListener('click', () => {

  successPage.classList.add('is-hidden');

  placePage.classList.remove('is-hidden');

  // ซ่อนข้อความสรุปเก่าของหน้า 3
  placeResult.classList.add('is-hidden');

  window.scrollTo(0, 0);

});
