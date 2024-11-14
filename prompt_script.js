import {animateText} from './typingAnimation.js';


const now = new Date(); 
const YES_BUTTON = document.getElementById('yes');
const NO_BUTTON = document.getElementById('no');
const container = document.getElementById('button-container');

var no_counter = 0;
var yes_counter = 0;



NO_BUTTON.addEventListener("mouseover", () => {
    no_counter++;
    if(yes_counter == 1) {
        
        MOVE_NO_BUTTON();
    }
});
NO_BUTTON.addEventListener("click", () => {
    no_counter++;
    if(yes_counter < 1) {
        const h1 = document.querySelector('p');
        h1.innerHTML = "Just answer my questions😢";
    } else {
        
        MOVE_NO_BUTTON();
    }
});

YES_BUTTON.addEventListener("click", () => {
    yes_counter++;
    const h1 = document.querySelector('p');
    if(yes_counter !=2) {
        animateText();
        h1.innerHTML = '';
    }
    if(yes_counter == 2) {
            
        var templateParams = {
            no_counter: no_counter,
            date:now,
        }
        sendMail(templateParams);
        
    }
});


function MOVE_NO_BUTTON() {
    
    const elementWidth = NO_BUTTON.clientWidth;
    const elementHeight = NO_BUTTON.clientHeight;

    
    let rect = container.getBoundingClientRect();
    let containerWidth = rect.width;
    let containerHeight = rect.height;
    let containerLeft = rect.left;
    let containerTop = rect.top;

    NO_BUTTON.style.top = '0';
    NO_BUTTON.style.left = '0';
    
    const randomX = Math.floor(Math.random() * (containerWidth - elementWidth));
    const randomY = Math.floor(Math.random() * (containerHeight - elementHeight));

    
    NO_BUTTON.style.position = "absolute";
    NO_BUTTON.style.transition = "0.5s";
    NO_BUTTON.style.transform = `translate(${randomX}px, ${randomY}px)`;
}



function sendMail(templateParams) {
    emailjs.init("qdgMdvi_O2FqLjFWl");
    emailjs.send("service_e32ozyg","template_48vtsef",templateParams).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
          window.location.href = "referral_page.html";
        },
        (error) => {
          console.log('FAILED...', error);
        },
      );
}