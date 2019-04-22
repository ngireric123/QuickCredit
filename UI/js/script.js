// function to trigger the toggle
function togle_nav_func() {
  const elem = document.getElementById('togle_nav');
  if (elem.currentStyle) {
    displayStyle = elem.currentStyle.display;
  } else if (window.getComputedStyle) {
    displayStyle = window.getComputedStyle(elem, null).getPropertyValue('display');
  }
  if (displayStyle === 'none') {
    elem.style.display = 'block';
  } else {
    elem.style.display = 'none';
  }
}

// modal 1
var modal = document.getElementById('myModal');

var btn = document.getElementById("myBtn");

var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
}

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
  if (event.target == modal2) {
    modal2.style.display = "none";
  }
  if (event.target == modal3) {
    modal3.style.display = "none";
  }
  if (event.target == modal4) {
    modal4.style.display = "none";
  }

}

//modal2

var modal2 = document.getElementById('myModal2');

var btn2 = document.getElementById("myBtn2");

var span2 = document.getElementsByClassName("close")[1];

btn2.onclick = function () {
  modal2.style.display = "block";
}

span2.onclick = function () {
  modal2.style.display = "none";
}

//Modal 3
var modal3 = document.getElementById('myModal3');

var btn3 = document.getElementById("myBtn3");

var span3 = document.getElementsByClassName("close")[2];

btn3.onclick = function () {
  modal.style.display = "none";
  modal3.style.display = "block";
}

span3.onclick = function () {
  modal3.style.display = "none";
}

//Modal 4

var modal4 = document.getElementById('myModal4');

var btn4 = document.getElementById("myBtn4");

var span4 = document.getElementsByClassName("close")[3];

btn4.onclick = function () {
  modal4.style.display = "block";
}

span4.onclick = function () {
  modal4.style.display = "none";
}
