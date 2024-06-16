// Assume you have the rating value stored in a variable named 'ratingValue'
// Function to update the star rating display based on the rating value
const ratingValue = 3.7;

function updateStarRating(ratingValue) {
    const starRating = document.getElementById('starRating');
    const staticStars = starRating.querySelectorAll('.static-star');

    // Calculate the integer part of the rating
    const integerPart = Math.floor(ratingValue);

    // Calculate the percentage fill for the last star
    const decimalPart = ratingValue - integerPart;
    const percentageFill = Math.round(decimalPart * 100); // Round to nearest integer

    // Loop through static stars and update their appearance based on the rating value
    staticStars.forEach((star, index) => {
        if (index < integerPart) {
            star.classList.add('filled-star');
        } else if (index === integerPart && decimalPart !== 0) {
            star.classList.add('half-filled-star');
            star.style.width = percentageFill + '%'; // Set width for the last star
        } else {
            star.classList.remove('filled-star');
            star.classList.remove('half-filled-star');
        }
    });
}

updateStarRating(ratingValue);

// Initialize the Bootstrap carousel plugin when the document is ready
$(document).ready(function () {
    $('.carousel').carousel();
});

// This part of the code is assumed to handle the slider functionality
var container = document.getElementById('slider-container');
var slider = document.getElementById('slider');
var slides = document.getElementsByClassName('slide').length;
var leftButtons = document.querySelectorAll('.fas.fa-chevron-left'); // For left button
var rightButtons = document.querySelectorAll('.fas.fa-chevron-right'); // For right button

var currentPosition = 0;
var currentMargin = 0;
var slidesPerPage = 0;
var slidesCount = slides - slidesPerPage;
var containerWidth = container.offsetWidth;
var prevKeyActive = false;
var nextKeyActive = true;

window.addEventListener("resize", checkWidth);

function checkWidth() {
    containerWidth = container.offsetWidth;
    setParams(containerWidth);
}

function setParams(w) {
    if (w < 551) {
        slidesPerPage = 1;
    } else {
        if (w < 901) {
            slidesPerPage = 2;
        } else {
            if (w < 1101) {
                slidesPerPage = 3;
            } else {
                slidesPerPage = 4;
            }
        }
    }
    slidesCount = slides - slidesPerPage;
    if (currentPosition > slidesCount) {
        currentPosition -= slidesPerPage;
    };
    currentMargin = -currentPosition * (100 / slidesPerPage);
    slider.style.marginLeft = currentMargin + '%';
    if (currentPosition > 0) {
        leftButtons.forEach(button => button.classList.remove('inactive'));
    }
    if (currentPosition < slidesCount) {
        rightButtons.forEach(button => button.classList.remove('inactive'));
    }
    if (currentPosition >= slidesCount) {
        rightButtons.forEach(button => button.classList.add('inactive'));
    }
    // Event listener assignment for the buttons
    leftButtons.forEach(button => button.addEventListener('click', slideRight));
    rightButtons.forEach(button => button.addEventListener('click', slideLeft));
}

setParams();

function slideRight() {
    if (currentPosition < slidesCount) {
        slider.style.marginLeft = currentMargin - (100 / slidesPerPage) + '%';
        currentMargin -= (100 / slidesPerPage);
        currentPosition++;
    };
    if (currentPosition === slidesCount) {
        rightButtons.forEach(button => button.classList.add('inactive'));
    }
    if (currentPosition > 0) {
        leftButtons.forEach(button => button.classList.remove('inactive'));
    }
}

function slideLeft() {
    if (currentPosition > 0) {
        slider.style.marginLeft = currentMargin + (100 / slidesPerPage) + '%';
        currentMargin += (100 / slidesPerPage);
        currentPosition--;
    };
    if (currentPosition === 0) {
        leftButtons.forEach(button => button.classList.add('inactive'));
    }
    if (currentPosition < slidesCount) {
        rightButtons.forEach(button => button.classList.remove('inactive'));
    }
}
