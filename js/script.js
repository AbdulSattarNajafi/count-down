'use-strict';

const headerTitle = document.querySelector('.countdown__header-title');
const headerText = document.querySelector('.countdown__header-text');
const items = document.querySelectorAll('.countdown__timer-remain');
const copyBtn = document.getElementById('copy-code-btn');
const discountCodeContent = document.getElementById('discount-code');

//Setting Date
const futureDate = new Date('2023-08-31 23:59:00');
const oneHour = 60 * 60 * 1000;

// Discount code
const discountCode = 'Special-15';
discountCodeContent.textContent = discountCode;

//Future Time in ms
const futureTime = futureDate.getTime();

function getRemainingTime() {
    const today = new Date().getTime();
    const t = futureTime - today;
    const oneDay = 24 * 60 * 60 * 1000;
    const oneHour = 60 * 60 * 1000;
    const oneMinute = 60 * 1000;
    const oneSecond = 1000;
    let day = Math.floor(t / oneDay);
    let hour = Math.floor((t % oneDay) / oneHour);
    let minute = Math.floor((t % oneHour) / oneMinute);
    let second = Math.floor((t % oneMinute) / oneSecond);

    const val = [day, hour, minute, second];
    // if value is less than 10 then throw 0 before the value
    function format(item) {
        if (item < 10) {
            return `${item}`;
        } else {
            return item;
        }
    }

    //Displaying in the DOM
    items.forEach(function (item, index) {
        if (t > 1) {
            item.innerHTML = format(val[index]);
        } else {
            item.innerHTML = '00';
        }
    });

    if (t < 1) {
        clearInterval(countdown);
        headerTitle.textContent = 'Sorry this Giveaway Expired.';
        headerTitle.classList.add('expired');
        headerText.textContent = 'This Giveaway has Expired.';
        discountCodeContent.textContent = '';
        copyBtn.disabled = true;
    }
}

//Countdown
let countdown = setInterval(getRemainingTime, 1000);
//invoking the function after interval
getRemainingTime();

// Copy Discount Code
copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(discountCodeContent.textContent);
    copyBtn.classList.add('copied');

    setTimeout(() => {
        copyBtn.classList.remove('copied');
    }, 2000);
});
