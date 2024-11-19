const images = [
  "1.jpg",
  "2.jpg",
  "3.jpg",
  "4.jpg",
  "5.jpg",
  "6.jpg",
  "7.jpg",
  "8.jpg",
  "9.jpg",
  "10.jpg",
];
const paginations = [];

let activeImage = 0;

const SliderPlace = document.querySelector(".slider-line");

const widthOffset = document.querySelector(".slider").clientWidth;
SliderPlace.style.width = images.length * widthOffset + "px";
SliderPlace.style.height = widthOffset + "px";
SliderPlace.style.left = images.length !== 1 ? "-" + widthOffset + "px" : 0;

let isAnimationEnd =true;
let createPaginationButton = (id) => {
  const PaginationButton = document.createElement("div");
  PaginationButton.className = "pagination-button";
  PaginationButton.id = `${id}`;
  document.querySelector(".pagination").appendChild(PaginationButton);
  paginations.push(PaginationButton);
};

function initSlider  () {
  const slide = document.createElement("img");
  slide.alt = "";
  slide.src = "./Images/" + images[0];
  slide.id = `pic-${0}`;

  SliderPlace.append(img);
  SlideGeneration(images.length - 1, false, true);
  SlideGeneration(1, true, true);
  AddPagination();
};

function AddPagination  () {
  for (let i = 0; i < images.length; i++) createPaginationButton(i);
  
  paginations[0].classList.add("active");

  paginations.forEach((paginationButton, index) => {
    paginationButton.addEventListener("click", () => {
      if(!isAnimationEnd) return;
      isAnimationEnd=!isAnimationEnd;
      ChangeSlide(index);
    });
  });
};

function SlideGeneration (ind, isNextSlide){
  let index = ind;
  if (index > images.length - 1) index = 0;
  else if (index == 0 && isNextSlide === false) index = 0;
  else if (index + 1 === 0 && isNextSlide === false) index = images.length - 1;

  const slide = document.createElement("img");
  slide.alt = "";
  slide.src = "./Images/" + images[index];
  slide.id = `pic-${index}`;

  if (isNextSlide) {
    SliderPlace.append(img);
  } else {
    SliderPlace.prepend(img);
  }
};

function fadeOutAndRemoveSlide(slideElement, callback) {
  let opacity = 1; 
  let startTime = Date.now(); // Время начала анимации
  
  let fadeOutInterval = setInterval(() => {
    let timeElapsed = Date.now() - startTime; // Время, прошедшее с начала анимации
    opacity = 1 - (timeElapsed / 1000) + 0.35; // Уменьшаем opacity от 1 до 0.35 за 1 секунду
    
    slideElement.style.opacity = opacity; // Применяем новую прозрачность

    if (timeElapsed >= 1000) {
      clearInterval(fadeOutInterval); // Останавливаем анимацию
      if (callback) callback(); 
    }
  }, 20); 
}

function ChangeSlide(index) {
  if (index !== activeImage) {
    RemoveActivePagination(activeImage);
    ToggleActivePagination(index);

    let PrevImage = activeImage === 0 ? images.length - 1 : activeImage - 1;
    let NextImage = activeImage === images.length - 1 ? 0 : activeImage + 1;

    const currentSlide = document.querySelector(`#pic-${activeImage}`);
    
    fadeOutAndRemoveSlide(currentSlide, () => {
      
      document.querySelector(`#pic-${PrevImage}`).remove();
      document.querySelector(`#pic-${activeImage}`).remove();
      document.querySelector(`#pic-${NextImage}`).remove();
      activeImage = index;
      

      SlideGeneration(index, true, false);
      SlideGeneration(index - 1, false, false);
      SlideGeneration(index + 1, true, false);
      isAnimationEnd=true;

    });
  }
};
function nextSlide() {
  if(!isAnimationEnd) return;
  isAnimationEnd=!isAnimationEnd;
  const nextIndex = (activeImage + 1) % images.length;
  ChangeSlide(nextIndex);
}

function prevSlide() {
  if(!isAnimationEnd) return;
  isAnimationEnd=!isAnimationEnd;
  const prevIndex = activeImage === 0 ? images.length - 1 : activeImage - 1;
  ChangeSlide(prevIndex);
}

function ToggleActivePagination (index){
  paginations[index].classList.add("active");
};

function RemoveActivePagination (index){
  paginations[index].classList.remove("active");
};

initSlider();

document.querySelector(".next-button").addEventListener("click", nextSlide);
document.querySelector(".prev-button").addEventListener("click", prevSlide);
