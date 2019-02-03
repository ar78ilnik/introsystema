"use strict";
var navMain = document.querySelector(".top-navigation");
var navToggle = document.querySelector(".page-header__button");
var noindex = document.querySelector(".page-header--noindex");

navMain.classList.remove("top-navigation--nojs");

navToggle.addEventListener("click", function() {
  if (navMain.classList.contains("top-navigation--closed")) {
    navMain.classList.remove("top-navigation--closed");
    navMain.classList.add("top-navigation--opened");
		noindex.classList.remove("page-header--closed-noindex");
		noindex.classList.add("page-header--opened-noindex");
  } else {
    navMain.classList.add("top-navigation--closed");
    navMain.classList.remove("top-navigation--opened");
		noindex.classList.remove("page-header--opened-noindex");
    noindex.classList.add("page-header--closed-noindex");
  }
});