var navMain = document.querySelector(".top-navigation");
var navToggle = document.querySelector(".page-header__button");
var header = document.querySelector(".page-header");
var about = document.querySelector(".page-header--noindex");

navMain.classList.remove("top-navigation--nojs");

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("top-navigation--closed")) {
    navMain.classList.remove("top-navigation--closed");
    navMain.classList.add("top-navigation--opened");
    header.classList.remove("page-header--closed");
    header.classList.add("page-header--opened");
		about.classList.remove("page-header--closed");
		about.classList.add("page-header--opened");
  } else {
    navMain.classList.add("top-navigation--closed");
    navMain.classList.remove("top-navigation--opened");
    header.classList.add("page-header--closed");
    header.classList.remove("page-header--opened");
		about.classList.add("page-header--closed");
		about.classList.remove("page-header--opened");
  }
});