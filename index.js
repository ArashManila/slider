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


let createPaginationButton = (id) => {
  const PaginationButton = document.createElement("div");
  PaginationButton.className = "pagination-button";
  PaginationButton.id = `${id}`;
  document.querySelector(".pagination").appendChild(PaginationButton);
  paginations.push(PaginationButton);
};

function initSlider  () {
  const img = document.createElement("img");
  img.alt = "";
  img.src = "./Images/" + images[0];
  img.id = `pic-${0}`;

  SliderPlace.append(img);
  SlideGeneration(images.length - 1, false, true);
  SlideGeneration(1, true, true);
  AddPagination();
};

function AddPagination  () {
  for (let i = 0; i < images.length; i++) createPaginationButton(i);
  
  paginations[0].classList.add("active");

  paginations.forEach((circle, index) => {
    circle.addEventListener("click", () => {
      ChangeSlide(index);
    });
  });
};

function SlideGeneration (ind, flag){
  let index = ind;
  if (index > images.length - 1) index = 0;
  else if (index == 0 && flag === false) index = 0;
  else if (index + 1 === 0 && flag === false) index = images.length - 1;

  const img = document.createElement("img");
  img.alt = "";
  img.src = "./Images/" + images[index];
  img.id = `pic-${index}`;

  if (flag) {
    SliderPlace.append(img);
  } else {
    SliderPlace.prepend(img);
  }
};

function ChangeSlide (index) {
  if (index !== activeImage) {
    RemoveActivePagination(activeImage);

    let PrevImage = activeImage === 0 ? images.length - 1 : activeImage - 1;
    let NextImage = activeImage === images.length - 1 ? 0 : activeImage + 1;

    document.querySelector(`#pic-${PrevImage}`).remove();
    document.querySelector(`#pic-${activeImage}`).remove();
    document.querySelector(`#pic-${NextImage}`).remove();

    activeImage = index;

    SlideGeneration(index, true, false);
    SlideGeneration(index - 1, false, false);
    SlideGeneration(index + 1, true, false);

    ToggleActivePagination();
  }
};

function nextSlide(){

    activeImage++;
    if (activeImage >= images.length) activeImage = 0;
    RemoveActivePagination(images.length - 1);

    document.querySelector(".slider-line img").remove();
    SlideGeneration(activeImage + 1, true, false);

    ToggleActivePagination();
    if (activeImage != 0) RemoveActivePagination(activeImage - 1);
  
};

function prevSlide () {
    activeImage--;
    if (activeImage < 0) activeImage = images.length - 1;
    if (activeImage - 1 < 0) activeImage = 0;
    RemoveActivePagination(0);

    document.querySelector(".slider-line img:last-child").remove();
    SlideGeneration(activeImage - 1, false, false);

    ToggleActivePagination();
    if (activeImage != images.length - 1) RemoveActivePagination(activeImage + 1);
  
};

function ToggleActivePagination (){
  paginations[activeImage].classList.add("active");
};

function RemoveActivePagination (ind){
  paginations[ind].classList.remove("active");
};

initSlider();

document.querySelector(".next-button").addEventListener("click", nextSlide);
document.querySelector(".prev-button").addEventListener("click", prevSlide);
