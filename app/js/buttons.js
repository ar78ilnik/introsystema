/*var articles = document.getElementsByClassName("article");
var slogans = document.getElementsByClassName("slogan__link");
var i=0;
slogans.classList("slogan__link")[i].onclick = function () {
    articles.classList("article")[i].style.display = "block";
}*/

document.querySelectorAll('.slogan__link').forEach(i => i.onclick = event => {
    let a = event.currentTarget.getAttribute('data-href')
    document.querySelectorAll('article').forEach(i => i.style.display = 'none')
    document.querySelector(a).closest('article').style.display = 'block'
})