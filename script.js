'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};


 btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// selecting elements

// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const selection = document.querySelector('.header');
// console.log(selection);
// const selectionAll = document.querySelectorAll('.section');
// console.log(selectionAll);

// const selection1 = document.getElementById('section--1');
// console.log(selection1);
// const allButton = document.getElementsByTagName('button');
// console.log(allButton);
// console.log(document.getElementsByClassName('btn'));

// creating and inserting elements
//.insertAdjacentHTML
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'we collect cookie to improve the user experience';
//message.innerHTML = 'we collect cookie to improve the user experience. <button class = "btn btn--close--cookie">Got it!!</button> '

const header = document.querySelector('.header');
 header.prepend(message);
// header.append(message.cloneNode(true));
// header.before(message);
// header.after(message);

// delete elements
// document.querySelector('.btn--close--cookie')
// .addEventListener('click',function(){
//  // message.remove()
//  message.parentElement.removeChild(message);
// });



btnScrollTo.addEventListener('click',function(e){
//   const s1Cords = section1.getBoundingClientRect();
//   // console.log(s1Cords);
//   // console.log(e.target.getBoundingClientRect());
//   // console.log('Current scroll (X/Y)',pageXOffset,pageYOffset);
// console.log('height/width viewport' , document.documentElement.clientHeight,
// document.documentElement.clientWidth);

//scrolling
// window.scrollTo(s1Cords.left + window.pageXOffset,s1Cords.top + window.pageYOffset);

// window.scrollTo({
//   left: s1Cords.left + window.pageXOffset,
//   top: s1Cords.top + window.pageYOffset,
//   behavior: 'smooth',
// })
 section1.scrollIntoView({behavior : 'smooth'});

})

document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
// console.log(e.target);

if(e.target.classList.contains('nav__link')){
  const id = e.target.getAttribute('href');
  document.querySelector(id).scrollIntoView({behavior : 'smooth'});
  console.log("Link");
}
})
// Tap components
const tabs = document.querySelectorAll('.operations__tab');
const tapsContainer = document.querySelector('.operations__tab-container');
const tapsContent = document.querySelectorAll('.operations__content');

// tabs.forEach(t => t.addEventListener('click', () =>
//  console.log('TAP')))

tapsContainer.addEventListener('click', function(e){
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  // guard clause
  if(!clicked) return;

  // tap active
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

 // tap content
 tapsContent.forEach(t => t.classList.remove('operations__content--active'))
 document.querySelector(`.operations__content--${clicked.dataset.tab}`)
 .classList.add('operations__content--active');


} )

// Menu fade animation
const nav = document.querySelector('.nav');
const handelHover =  function(e ){
  //console.log(this);
  if (e.target.classList.contains('nav__link')){
    const link = e.target;
    //console.log(link);
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    //console.log(link.closest('.nav'));
    const logo = link.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    } )
    logo.style.opacity = this;
  }
}
// nav.addEventListener('mouseover', function(e){
//   handelHover(e, 0.5);
// })
// nav.addEventListener('mouseout', function(e){
//   handelHover(e, 1);
// })

nav.addEventListener('mouseover', handelHover.bind(0.5));
nav.addEventListener('mouseout', handelHover.bind(1));


// sticky navigation

// const intialCord = section1.getBoundingClientRect();
// console.log(intialCord);
// window.addEventListener('scroll', function(){
//   console.log(window.scrollY);
//   if (window.scrollY > intialCord.top) nav.classList.add('sticky')
//   else nav.classList.remove('sticky');
// })

// const obserCallback = function(entries){
//    entries.forEach(entry => {
//      console.log(entry);
//    })
// };
// const obserOpt = {
//     root : null,
//     threshold : [0 , 0.2],
// }

// const oberver = new IntersectionObserver(obserCallback, obserOpt);

// oberver.observe(section1);
//const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);
const stickyNav = function(entries){
      const [entry] = entries;
     // console.log(entry);
      if(!entry.isIntersecting) nav.classList.add('sticky')
      else nav.classList.remove('sticky');
}

const headerObserver = new IntersectionObserver(stickyNav,{
  root : null,
  threshold : 0,
  rootMargin: `-${navHeight}px`
})
headerObserver.observe(header);

// Reaveal section 
const allSection = document.querySelectorAll('.section');
const revealSection = function(entries, observer){
  const [entry] = entries;
  //console.log(entry);
  if(!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);

}

const sectionObserver = new IntersectionObserver(revealSection , {
  root : null,
  threshold : 0.15,
});
allSection.forEach(function(section){
  //section.classList.add('section--hidden');
  sectionObserver.observe(section);
})

// lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');
//console.log(imgTargets);

const loadImg = function(entries, observer){
    const [entry] = entries;
    if(!entry.isIntersecting) return;
    //console.log(entry);
// replace src with data-src
entry.target.src = entry.target.dataset.src;

entry.target.addEventListener('load',function(){
  entry.target.classList.remove('lazy-img');
})
observer.unobserve(entry.target);
}
const imgObserver = new IntersectionObserver(loadImg, {
  root : null,
  threshold : 0,
  rootMargin : '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));

// slider

const slide = function(){
let slideCount = 0;
const slides = document.querySelectorAll('.slide');
const slider = document.querySelector('.slider');
const rightBtn = document.querySelector('.slider__btn--right')
const leftBtn = document.querySelector('.slider__btn--left')
const dotsContainer = document.querySelector('.dots');

const goToSlide = function(slide){
  slides.forEach((s , i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`))
}

// next slide
const nextSlide = function(){
  if (slideCount ===  slides.length -1){
    slideCount = 0;
  } else {
    slideCount++;
  }
 
 // console.log('test');
goToSlide(slideCount);
activateDots(slideCount)
}

//previous slide
const previSlide = function(){
  if (slideCount === 0){
    slideCount = slides.length -1;
  } else {
    slideCount--;
  }
goToSlide(slideCount);
activateDots(slideCount)
}

rightBtn.addEventListener('click', nextSlide);
leftBtn.addEventListener('click',previSlide);


document.addEventListener('keydown', function(e){
  //console.log(e);
  if (e.key === 'ArrowRight') nextSlide();
  e.key === 'ArrowLeft' && previSlide();
}) 


const activateDots = function(slide){
  document.querySelectorAll('.dots__dot').forEach((dot) => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}

const createDots = function(){
  slides.forEach(function(_, i){
        dotsContainer.insertAdjacentHTML('beforeend', 
        `<button class="dots__dot" data-slide=${i}></button>`);

  })
}
const intial = function(){

  createDots();
  activateDots(0);
  goToSlide(0);
}
intial();


dotsContainer.addEventListener('click', function(e){
  if (e.target.classList.contains('dots__dot')) {
    const {slide} = e.target.dataset;
    goToSlide(slide);
    activateDots(slide)
  }
})}

slide();




document.addEventListener('DOMContentLoaded', function(e){
  console.log('HTML parsed and DOM tree built!',e);
})

window.addEventListener('load', function(e){
  console.log('Page fully loaded', e);
})

// window.addEventListener('beforeunload', function(e){
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';

// })
// Styles
// message.style.backgroundColor = '#37383d';
// //message.style.height = '120%';

// console.log(message.style.backgroundColor);
// console.log(message.style.height);

// console.log(getComputedStyle(message).color);
// console.log(getComputedStyle(message).height);
// console.log('test');

// message.style.height = Number.parseFloat(getComputedStyle(message).height ) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'black');

//attribute
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);
// logo.alt = "minimalist design ";
// console.log(logo.alt);

// //non - standard
// console.log(logo.designer);
// console.log(logo.getAttribute('designer'));
// logo.setAttribute('company','Bankist');

// console.log(logo.src);
// console.log(logo.getAttribute('src'));

// const link = document.querySelector('.nav__link--btn');
// console.log(link.href);
// console.log(link.getAttribute('href'));

// //data-attribute
// console.log(logo.dataset.versionShakti);

// // classes
// logo.classList.add('c');
// logo.classList.remove('c');
// logo.classList.toggle('c');
// logo.classList.contains('c');

// //dont use
// logo.className = 'shaki';



// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter',function(){
//   alert('I like javaScript');
// });

// h1.onmouseenter = function(){
//   alert('Old way to do this');
// }

// const alertH1 = function(){
//   alert('I like javaScript');
//   // h1.removeEventListener('mouseenter', alertH1);
// }

// h1.addEventListener('mouseenter', alertH1);
// setTimeout(() => h1.removeEventListener('mouseenter',alertH1), 5000);


//rgb(255,255,255)
// const randomInt  = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0,255)},${randomInt(0, 255)})`
// console.log(randomColor());

// document.querySelector('.nav__link').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('Link', e.target, e.currentTarget);
//  //e.stopPropagation();
// console.log(e.target === this);

// })

// document.querySelector('.nav__links').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('continer', e.target, e.currentTarget);
//   console.log(e.target === this);
// })

// document.querySelector('.nav').addEventListener('click',function(e){
//   this.style.backgroundColor = randomColor();
//   console.log('nav', e.target);
// }, true)


// document.querySelectorAll('.nav__link').forEach(function(el){
//   el.addEventListener('click', function(e){
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({behavior : 'smooth'});
//     console.log('LINK');
//   })
// })

//  const h1 = document.querySelector('h1');
   
//  //Going downward : child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = "red"
// h1.lastElementChild.style.color = "blue"

// // Going upwards : parents
// console.log(h1.parentNode); 
// console.log(h1.parentElement);
// h1.closest('.header').style.background = 'var(--color-secondary-darker)'

// h1.closest('h1').style.background = 'var(--color-primary-opacity)'

// // Going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
// [...h1.parentElement.children].forEach(function(el){
//   if (el !== h1) el.style.transform = 'scale(0.5)';
// });



