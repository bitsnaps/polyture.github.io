//landing page title animation
var textWrapper = document.querySelector('.ml12');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

function loadTitle() {
  anime.timeline({
      loop: false
    })
    .add({
      targets: '.ml12 .letter',
      translateX: [40, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1200,
      delay: (el, i) => 500 + 30 * i
    })

  var textWrapper2 = document.querySelector('.ml13');
  textWrapper2.innerHTML = textWrapper2.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

  anime.timeline({
      loop: false
    })
    .add({
      delay: 1200
    })
    .add({
      targets: '.ml13 .letter',
      translateY: [100, 0],
      translateZ: 0,
      opacity: [0, 1],
      easing: "easeOutExpo",
      duration: 1400,
      delay: (el, i) => 300 + 30 * i
    });
}

//swup js
const swup = new Swup();

loadTitle();

// this event runs for every page view after initial load
swup.on('contentReplaced', loadTitle);

//rellax
var rellax = new Rellax('.rellax');