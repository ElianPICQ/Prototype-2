"use strict";

/* JavaScript Prototype 1 */

/* Sliders des mini-jeux */

//Icones de mini-jeux + mini-jeux (HTMLCollection)
const miniJeuxIcones = document.getElementsByClassName('icone');
const miniJeux = document.getElementsByClassName('mini-jeu');

//Boites des mini-jeux
const shifumiContainer = document.getElementById('shifumi');
const swordContainer = document.getElementById('sword-container');
const uselessButton = document.getElementById('useless-button');
const colorEditor = document.getElementById('color-editor');

//Boites des boites "scores" s'affichant apres après été update
const displayInfiniteSwordCount = document.getElementById('infinite-sword-count');
const displayNbClics = document.getElementById('useless-clics');
const displayShifumiScore = document.getElementById('shifumi-score');
const displayRgbScore = document.getElementById("rgb-score");

//Boite ciblée des scores à incrémenter
//const InfiniteSwordCount = document.getElementById('infinite-sword-count__nb');

//Boite de la valeur RGB dans la balise de score

const rgbScoreValue = document.getElementById("rgb-score-value");

var showRGB = false;

function  hide_mini_jeux() {
  Array.prototype.forEach.call(miniJeux, function(item) {
    if (item.classList.contains("mini-jeux-show")) {
      item.classList.replace("mini-jeux-show", "mini-jeux-hide");
    }
  });
}

Array.prototype.forEach.call(miniJeuxIcones, function(icone) {
  //On vérifie, 1 par 1, quelle élément (class="mini-jeu") est cliqué
  icone.addEventListener("click", function() {

    //On affiche les scores si nécéssaire (et pas déjà fait)
/*    if (displayNbClics.classList.contains("hide-bloc") && clics > 0)
      displayNbClics.classList.replace("hide-bloc", "show-bloc");
    if (displayShifumiScore.classList.contains("hide-bloc") && (userScore > 0 || botScore > 0))
      displayShifumiScore.classList.replace("hide-bloc", "show-bloc");
    if (displayInfiniteSwordCount.classList.contains("hide-bloc") && bladeCount > 0)
      displayInfiniteSwordCount.classList.replace("hide-bloc", "show-bloc");
    if (displayRgbScore.classList.contains("hide-bloc") && showRGB == true)
      displayRgbScore.classList.replace("hide-bloc", "show-bloc");
*/

    //On ouvre ou ferme les mini-jeux
    switch(icone.id) {
      case 'shifumi-icone':
        if (shifumiContainer.classList.contains("mini-jeux-show"))
          shifumiContainer.classList.replace("mini-jeux-show", "mini-jeux-hide");
        else if (shifumiContainer.classList.contains("mini-jeux-hide")) {
          hide_mini_jeux();
          shifumiContainer.classList.replace("mini-jeux-hide", "mini-jeux-show");
        }
        break;

      case 'infinite-sword-icone':
        if (swordContainer.classList.contains("mini-jeux-show")) {
 //         InfiniteSwordCount.innerHTML = bladeCount;
          swordContainer.classList.replace("mini-jeux-show", "mini-jeux-hide");
        }
        else if (swordContainer.classList.contains("mini-jeux-hide")) {
          hide_mini_jeux();
          swordContainer.classList.replace("mini-jeux-hide", "mini-jeux-show");
        }
        break;

      case 'useless-button-icone':
        if (uselessButton.classList.contains("mini-jeux-show"))
          uselessButton.classList.replace("mini-jeux-show", "mini-jeux-hide");
        else if (uselessButton.classList.contains("mini-jeux-hide")) {
          hide_mini_jeux();
          uselessButton.classList.replace("mini-jeux-hide", "mini-jeux-show");
        }
        break;

      case 'color-editor-icone':
        if (colorEditor.classList.contains("mini-jeux-show"))
          colorEditor.classList.replace("mini-jeux-show", "mini-jeux-hide");
        else if (colorEditor.classList.contains("mini-jeux-hide")) {
          hide_mini_jeux();
          colorEditor.classList.replace("mini-jeux-hide", "mini-jeux-show");
        }
        break;
    }
  });
});



/****************************/
/*  JAVASCRIPT FOR SHIFUMI  */
/****************************/

var userScore = 0;
var botScore = 0;
//const displayUserScore = document.getElementById('display-user-score');
const displayMyScore = document.getElementById('display-my-score');
const resultatMancheShifumi = document.getElementById('shifumi-results-display');
const displayUserChoice = document.getElementById('user-choice');
const displayMyChoice = document.getElementById('my-choice');

document.getElementById('shifumi-box').addEventListener('submit', function(event) {
  event.preventDefault();
  var botChoice = Math.floor(Math.random() * 3);

  if (document.getElementById('pierre__input').checked) {
    displayUserChoice.style.backgroundImage = "url(img/pierre.png)";
    
    switch ((botChoice + 1) % 3) {
      case 0:
        userScore++;
        displayMyChoice.style.backgroundImage = "url(img/ciseaux.png)";
        resultatMancheShifumi.style.color = "green";
        resultatMancheShifumi.innerHTML = "Victoire !";
        break;
      case 1:
        displayMyChoice.style.backgroundImage = "url(img/pierre.png)";
        resultatMancheShifumi.style.color = "black";
        resultatMancheShifumi.innerHTML = "Egalité";
        break;
      case 2:
        botScore++;
        displayMyChoice.style.backgroundImage = "url(img/feuille.png)";
        resultatMancheShifumi.style.color = "red";
        resultatMancheShifumi.innerHTML = "Défaite...";
        break
    }
  }
  
  if (document.getElementById('feuille__input').checked) {
    displayUserChoice.style.backgroundImage = "url(img/feuille.png)";
    
    switch ((botChoice + 1) % 3) {
      case 0:
        botScore++;
        displayMyChoice.style.backgroundImage = "url(img/ciseaux.png)";
        resultatMancheShifumi.style.color = "red";
        resultatMancheShifumi.innerHTML = "Défaite...";
        break;
      case 1:
        userScore++
        displayMyChoice.style.backgroundImage = "url(img/pierre.png)";
        resultatMancheShifumi.style.color = "green";
        resultatMancheShifumi.innerHTML = "Victoire !";
        break;
      case 2:
        displayMyChoice.style.backgroundImage = "url(img/feuille.png)";
        resultatMancheShifumi.style.color = "black";
        resultatMancheShifumi.innerHTML = "Egalité";
        break;
    }
  }
  
  if (document.getElementById('ciseaux__input').checked) {
    displayUserChoice.style.backgroundImage = "url(img/ciseaux.png)";
    
    switch ((botChoice + 1) % 3) {
      case 0:
        displayMyChoice.style.backgroundImage = "url(img/ciseaux.png)";
        resultatMancheShifumi.style.color = "black";
        resultatMancheShifumi.innerHTML = "Egalité...";
        break;
      case 1:
        botScore++;
        displayMyChoice.style.backgroundImage = "url(img/pierre.png)";
        resultatMancheShifumi.style.color = "red";
        resultatMancheShifumi.innerHTML = "Défaite...";
        break;
      case 2:
        userScore++;
        displayMyChoice.style.backgroundImage = "url(img/feuille.png)";
        resultatMancheShifumi.style.color = "green";
        resultatMancheShifumi.innerHTML = "Victoire !";
        break;
    }
  }
//  displayUserScore.innerHTML = userScore;
//  displayMyScore.innerHTML = botScore;

});




/***********************************/
/*  JAVASCRIPT FOR INFINITE SWORD  */
/***********************************/

const swordSheath = document.getElementById('fourreau')
const sword = document.getElementById('sword');
const blade = document.getElementById('sword__blade');
const tip = document.getElementById('sword__tip');
var toTheTip = 1001; // Il faut ajouter 1000 lames pour arriver au bout
var bladeCount = 0;

/* On créé l'observer de nom "observer" */

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      addBlade(entry);
    }
  })
}, {
  rootMargin: "0px 0px 200% 0px"
});



/* Puis on indique l'élément à observer */

observer.observe(blade);

function  addBlade(entry) {
  toTheTip--;

  // On arrête d'observer l'ancienne lame.
  observer.unobserve(entry.target);

  if (toTheTip > 0) {
    bladeCount++;
    // On clone notre lame pour en ajouter une en dessous
    let clonedBlade = blade.cloneNode(true);
    // On ajoute la nouvelle lame à l'épée
    sword.appendChild(clonedBlade);
    // On observe le dernier bout de lame (càd la lame clonée)
    observer.observe(clonedBlade);

  } else {
    let clonedTip = tip.cloneNode(true);
    sword.appendChild(clonedTip);
    clonedTip.classList.remove("hide-sword");
  }
}



/*********************************/
/* JAVASCRIPT FOR USELESS BUTTON */
/*********************************/

const uselessBtn = document.getElementById('useless-button__btn');
var   txtIndex = 0;

const nbClics = document.getElementById('useless-clics__nb');
var   clics = 0;

var   txtBtn = [
  'ça va?',
  'en fait',
  'je m\'en fiche',
  'déso pas déso...',
  'sinon',
  'quoi de neuf?',
  'ah',
  'on me dit à l\'oreillette',
  'que ça aussi je m\'en fiche',
  'BREF',
  'On va s\'arrêter là',
  'ça devient lassant.',
  'Allez ciao!',
  ''
];

uselessBtn.addEventListener("mouseup", function(e) {
  clics++;
//  nbClics.innerHTML = clics;

  if(txtIndex < txtBtn.length) {
    uselessBtn.innerHTML = txtBtn[txtIndex];
    txtIndex++;
  }
});





/***************************/
/* JAVASCRIPT COLOR EDITOR */
/***************************/

const rgbButton = document.getElementById("rgb-button");
const rgbCanvas = document.getElementById("rgb-canvas");

const hslButton = document.getElementById("hsl-button");
const hslCanvas = document.getElementById("hsl-canvas");

const rgbDisplayValue = document.getElementById("rgb-value");

const colors = ["red", "green", "blue"];
const colors2 = ["hue", "sat", "light"];

function  changeR(value) {
  showRGB = true;
  let rgb = window.getComputedStyle(rgbCanvas).backgroundColor;

  let colorArr = rgb.slice(
    rgb.indexOf("(") + 1, 
    rgb.indexOf(")")
  ).split(", ");
  
  let obj = new Object();
  
// Insert the values into obj
  colorArr.forEach((k, i) => {
    obj[colors[i]] = k
  });

  rgbCanvas.style.backgroundColor =
        "rgb(" + value + ',' + obj.green + ',' + obj.blue + ")";

  rgbDisplayValue.innerHTML = rgbCanvas.style.backgroundColor;

//  displayRgbScore.style.backgroundColor = rgbCanvas.style.backgroundColor;
//  rgbScoreValue.innerHTML = rgbCanvas.style.backgroundColor;
}

function  changeG(value) {
  showRGB = true;
  let rgb = window.getComputedStyle(rgbCanvas).backgroundColor;

  let colorArr = rgb.slice(
    rgb.indexOf("(") + 1, 
    rgb.indexOf(")")
  ).split(", ");
  
  let obj = new Object();
  
// Insert the values into obj
  colorArr.forEach((k, i) => {
    obj[colors[i]] = k
  });

  rgbCanvas.style.backgroundColor =
        "rgb(" + obj.red + ',' + value + ',' + obj.blue + ")";

  rgbDisplayValue.innerHTML = rgbCanvas.style.backgroundColor;

//  displayRgbScore.style.backgroundColor = rgbCanvas.style.backgroundColor;
//  rgbScoreValue.innerHTML = rgbCanvas.style.backgroundColor;
}

function  changeB(value) {
  showRGB = true;
  let rgb = window.getComputedStyle(rgbCanvas).backgroundColor;

  let colorArr = rgb.slice(
    rgb.indexOf("(") + 1, 
    rgb.indexOf(")")
  ).split(", ");
  
  let obj = new Object();
  
// Insert the values into obj
  colorArr.forEach((k, i) => {
    obj[colors[i]] = k
  });

  rgbCanvas.style.backgroundColor =
        "rgb(" + obj.red + ',' + obj.green + ',' + value + ")";

  rgbDisplayValue.innerHTML = rgbCanvas.style.backgroundColor;

//  displayRgbScore.style.backgroundColor = rgbCanvas.style.backgroundColor;
//  rgbScoreValue.innerHTML = rgbCanvas.style.backgroundColor;
}