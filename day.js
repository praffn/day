const screenScore = document.querySelector('[data-screen-score]')
const screenDate = document.querySelector('[data-screen-date]');
const buttons = Array.from(document.querySelectorAll('[data-button]'));

const FROM_DATE = new Date(2017, 1, 1, 0, 0, 0, 0);
const TO_DATE = new Date(2017, 12, 31, 23, 59, 59, 0);

let score = 0;
let currentDate = null;

function randDate(fromDate, toDate) {
  const from = fromDate.getTime();
  const to = toDate.getTime();
  return new Date(from + Math.random() * (to - from))
}

function play() {
  currentDate = randDate(FROM_DATE, TO_DATE);
  const date = currentDate.getDate();
  const month = getMonthName(currentDate.getMonth());
  const year = currentDate.getFullYear();
  if (year != 2017) {
    play();
    return;
  }
  screenDate.innerHTML = `${month} ${date}, ${year}`;
  screenScore.innerHTML = "" + score;
}

function dayNameToDayNum(dayName) {
  switch (dayName.toLowerCase()) {
    case 'sun': return 0;
    case 'mon': return 1;
    case 'tue': return 2;
    case 'wed': return 3;
    case 'thu': return 4;
    case 'fri': return 5;
    case 'sat': return 6;
    default: throw new Error();
  }
}

function getMonthName(month) {
  switch (month) {
    case 0: return 'Jan';
    case 1: return 'Feb';
    case 2: return 'Mar';
    case 3: return 'Apr';
    case 4: return 'May';
    case 5: return 'Jun';
    case 6: return 'Jul';
    case 7: return 'Aug';
    case 8: return 'Sep';
    case 9: return 'Oct';
    case 10: return 'Nov';
    case 11: return 'Dec';
    default: throw new Error();
  }
}

play();

function guess(day) {
  if (currentDate.getDay() == day) {
    score++;
    play();
  }
}

function trigger(pl) {
  if (pl == 'idk') {
    play();
    return;
  }
  guess(dayNameToDayNum(pl));
}

buttons.forEach(button => {
  const attr = button.getAttribute('data-button');
  button.addEventListener('click', () => {
    trigger(attr);
  })
})
