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
const InfiniteSwordCount = document.getElementById('infinite-sword-count__nb');

//Boite de la valeur RGB dans la balise de score

const rgbScoreValue = document.getElementById("rgb-score-value");

var showRGB = false;

/* Ne pas oublier que le 0 est inclu */
/* max est le nombre de possibilités */
function  getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


/******************************/
/*  SCROLL (la bordure tmtc)  */
/******************************/

const navBar = document.getElementById("nav-bar")
const navButtons = document.getElementsByClassName("nav-button");

Array.prototype.forEach.call(navButtons, function(item) {
  item.addEventListener("click", function() {
    if (item.id === "top-button")
    {
      navBar.style.borderColor = "transparent";
      navBar.style.backgroundColor = "transparent"
    }
    else if (item.id === "mini-jeux-ancre")
    {
      navBar.style.borderColor = "#000";
      navBar.style.backgroundColor = "rgba(0, 0, 0, 0.3)"
    }
    else if (item.id === "draw-canvas-ancre")
    {
      navBar.style.borderColor = "transparent";
      navBar.style.backgroundColor = "transparent"
    }
  })
});

/************/
/* BONJSOIR */
/************/

window.addEventListener("load", function() {
  let h = new Date().getHours();

  if(h >= 19 || h < 5)
    document.getElementById("bonjsoir").innerHTML = "Bonsoir !";
  else
    document.getElementById("bonjsoir").innerHTML = "Bonjour !";
});


/*******************/
/* COLOR TILES YAY */
/*******************/


/* Remplir l'écran */

const tile = document.getElementById("OGTile");
const header = document.getElementById("header");

window.addEventListener("load", function() {
  let newTile = tile.cloneNode(true);
  let headerHeight = header.offsetHeight;

  while ((newTile.offsetTop < header.offsetHeight))
  {
    newTile = tile.cloneNode(true);
    header.append(newTile);
  }
});
var allTiles = document.getElementsByClassName("color-tile");

/* Changer la couleur */

function ep_changeTileColor(tile, e)
{
  let r = getRandomInt(256);
  let g = getRandomInt(256);
  let b = getRandomInt(256);

  tile.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}

/* Effacer (remettre noir) */

function ep_tile_erase() {
  Array.prototype.forEach.call(allTiles, function(tile) {
    if (tile.style.backgroundColor != "#000000")
      tile.style.backgroundColor = "#000000";
  });
}


/***************************************/
/*  OUVERTURE/FERMETURE DES MINI JEUX  */
/***************************************/

var boolFirstDisplayIS = false;

function  hide_mini_jeux() {
  Array.prototype.forEach.call(miniJeux, function(item) {
    if (item.classList.contains("mini-jeux-show")) {
      item.classList.replace("mini-jeux-show", "mini-jeux-hide");
    }
  });
}

Array.prototype.forEach.call(miniJeuxIcones, function(icone) {
  //On vérifie, 1 par 1, quel élément (class="mini-jeu") est cliqué
  icone.addEventListener("click", function() {


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
          swordContainer.classList.replace("mini-jeux-show", "mini-jeux-hide");
        }
        else if (swordContainer.classList.contains("mini-jeux-hide")) {
          hide_mini_jeux();
          boolFirstDisplayIS = true;
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
const displayUserScore = document.getElementById('display-user-score');
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
  displayUserScore.innerHTML = userScore;
  displayMyScore.innerHTML = botScore;

  if (displayShifumiScore.classList.contains("hide-bloc") && (userScore > 0 || botScore > 0))
      displayShifumiScore.classList.replace("hide-bloc", "show-bloc");
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
var plurielInfiniteSword = document.getElementById("infinite-sword-count__addword");
var boolPlurielInfiniteSword = false;

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
    //On met un 's' à "ajouté" à partir de 2 morceaux de lames
    if (boolPlurielInfiniteSword === false && bladeCount > 1)
      plurielInfiniteSword.innerHTML = "ajoutés";
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

  InfiniteSwordCount.innerHTML = bladeCount;

//  Cassé car si l'écran est grand (hauteur), l'observer aura deja ajouté des morceaux de lame
  if (displayInfiniteSwordCount.classList.contains("hide-bloc") && bladeCount > 0 && boolFirstDisplayIS == true)
      displayInfiniteSwordCount.classList.replace("hide-bloc", "show-bloc");
}



/*********************************/
/* JAVASCRIPT FOR USELESS BUTTON */
/*********************************/

const uselessBtn = document.getElementById('useless-button__btn');
var   txtIndex = -1;

const nbClics = document.getElementById('useless-clics__nb');
var   clics = 0;

var   txtBtn = [
  'ça va?',             //0
  'en fait',            //1
  'je m\'en fiche',     //2
  'déso pas déso...',   //3
  'sinon',              //4
  'quoi de neuf?',      //5
  'ah',                 //6
  'on me dit à l\'oreillette',      //7
  'que ça aussi je m\'en fiche',    //8
  'BREF',                           //9
  'On va s\'arrêter là',            //10
  'ça devient lassant.',            //11
  'Allez ciao!',                    //12
  '',
  'Arrête',       //14
  '',
  'Arrête de cliquer stp',   //16
  '',
  'ARRETE',       //18
  '',
  'Bon',          //20
  'Et hop !',     //21
  'Içi?',         //22
  'Peut-être là?',//23
  'Raté',         //24
  'Je suis là',   //25
  'à gauche',     //26
  'en bas',       //27
  'non plus',     //28
  'peut etre?',   //29
  'je crois en toi',    //30
  'tu peux le faire',   //31
  'toujours pas',       //32
  'on continue ?',      //33
  'c\'etait rhétorique',//34
  'non',   //35
  'non',   //36
  'non',   //37
  'non',   //38
  'oui?',  //39
  'non',   //40
  'BON',    //41
  '',
  'Je te le condède...',        //43
  'Tu es tenace',               //44
  'mais t\'as pas mieux à faire ?',                             //45
  'Si tu t\'ennuie tant t\'as qu\'à finir les autres jeux',     //46
];

var lastClic = 0;
var RPusellesClics = 0;
var boolChangeUslTxt = true;

function  big_button_and_text() {
  uselessBtn.style.width = "100%";
  uselessBtn.style.height = "100%";
  uselessBtn.style.backgroundColor = "#621111";
  uselessButton.style.backgroundColor = "#17bfaf"
  uselessBtn.style.fontSize = "2000%"
}

function  uslBtn_back_to_normal() {
  uselessBtn.style.fontSize = "1.2em";
  uselessBtn.style.minWidth = "175px";
  uselessBtn.style.minHeight = "75px"
  uselessBtn.style.top = "";
  uselessBtn.style.left = "";
}

function  pause_in_text() {
  if(txtIndex == 13 || txtIndex == 15 || txtIndex == 17 || txtIndex == 19 || txtIndex == 42)
    return 1;
  return 0;
}

function  restart_text() {
  if (RPusellesClics == 5 || RPusellesClics == 9 || RPusellesClics == 15 || RPusellesClics == 20 || RPusellesClics == 40)
    return 1;
  return 0;
}

// Main loop event

uselessBtn.addEventListener("mouseup", function(e) {
  clics++;
  nbClics.innerHTML = clics;

//  Empêche de changer le texte trop vite
  var nowClic = new Date();
  if (nowClic - lastClic < 1 && txtIndex < 32)
    return;
  lastClic = nowClic;

//  Faut il changer le texte?
  if (pause_in_text())
  {
    boolChangeUslTxt = false;
    RPusellesClics++;
  }

// On autorise le changement de texte apres passage(s) à vide
  if (restart_text())
    boolChangeUslTxt = true;

//  Changer le texte quand nécessaire
  if(txtIndex < txtBtn.length - 1 && boolChangeUslTxt)
  {
    txtIndex++;
    uselessBtn.innerHTML = txtBtn[txtIndex];
  }

// On centre le bouton
  if (RPusellesClics == 40)
   uslBtn_back_to_normal()

//  Gros BON enervé?
  if (txtIndex == 41)
    big_button_and_text();

//  Bouton change de taille apres le BON (si dessus)
  if (42 == txtIndex)
  {
    uselessBtn.style.width = Math.floor(10 + Math.random() * 100) + "px";
    uselessBtn.style.height = Math.floor(10 + Math.random() * 100) + "px";
    uselessBtn.style.minHeight = "10px";
  }

//  On met le bouton à un endroit au pif
  if (20 < txtIndex && txtIndex < 43) {
    uselessBtn.style.top = Math.floor(Math.random() * (uselessButton.offsetHeight - uselessBtn.offsetHeight)) + "px";
    uselessBtn.style.left = Math.floor(Math.random() * (uselessButton.offsetWidth - uselessBtn.offsetWidth)) + "px";
  }

  if (displayNbClics.classList.contains("hide-bloc") && clics > 0)
    displayNbClics.classList.replace("hide-bloc", "show-bloc");
});





/***************************/
/* JAVASCRIPT COLOR EDITOR */
/***************************/

const rgbButton = document.getElementById("rgb-button");
const rgbCanvas = document.getElementById("rgb-canvas");

const rgbDisplayValue = document.getElementById("rgb-value");

const colors = ["red", "green", "blue"];

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

  displayRgbScore.style.backgroundColor = rgbCanvas.style.backgroundColor;
  rgbScoreValue.innerHTML = rgbCanvas.style.backgroundColor;

  if (displayRgbScore.classList.contains("hide-bloc") && showRGB == true)
      displayRgbScore.classList.replace("hide-bloc", "show-bloc");
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

  displayRgbScore.style.backgroundColor = rgbCanvas.style.backgroundColor;
  rgbScoreValue.innerHTML = rgbCanvas.style.backgroundColor;

  if (displayRgbScore.classList.contains("hide-bloc") && showRGB == true)
      displayRgbScore.classList.replace("hide-bloc", "show-bloc");
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

  displayRgbScore.style.backgroundColor = rgbCanvas.style.backgroundColor;
  rgbScoreValue.innerHTML = rgbCanvas.style.backgroundColor;

  if (displayRgbScore.classList.contains("hide-bloc") && showRGB == true)
      displayRgbScore.classList.replace("hide-bloc", "show-bloc");
}


/***************************/
/* Le Canvas pour dessiner */
/***************************/

const canvas = document.getElementById("canvas-painting");
const toolbar = document.getElementById("canvas-toolbar");

// Contexte. Ou ce qui va dessiner

const ctx = canvas.getContext("2d");


// On definit la taille du canvas en JS
// car un width: 100% en CSS a un effet de zoom
var canvasOffsetX = canvas.offsetLeft;
var canvasOffsetY = canvas.offsetTop;

window.addEventListener("load", ep_resizeCanvas);
window.addEventListener("resize", ep_resizeCanvas);

function ep_resizeCanvas() {
  canvasOffsetX = canvas.offsetLeft;
  canvasOffsetY = canvas.offsetTop;
  canvas.width = window.innerWidth - canvasOffsetX;
  canvas.height = window.innerHeight;
}

let isPainting = false;
let lineWidth = 5;

// Boutons Toolbar

toolbar.addEventListener("click", e => {
  if (e.target.id === "clear-canvas")
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

let colorBuff;
let isGomme = false;

toolbar.addEventListener("change", e => {

  switch(e.target.id) {
    case "couleur":
      if (isGomme)
        colorBuff = e.target.value;
      else
        ctx.strokeStyle = e.target.value;
      console.log(colorBuff);
      break;

    case "line-width":
      lineWidth = e.target.value;
      break;

    case "draw-canvas__gomme":
      isGomme = true;
      colorBuff = ctx.strokeStyle;
      ctx.strokeStyle = "#ffffff";
      ctx.lineCap = "round";
      break;

    case "draw-canvas__roundpen":
      if (isGomme === true) {
        ctx.strokeStyle = colorBuff;
        isGomme = false;
      }
      ctx.lineCap = "round";
      break;

    case "draw-canvas__buttpen":
      if (isGomme === true) {
        ctx.strokeStyle = colorBuff;
        isGomme = false;
      }
      ctx.lineCap = "butt";
      break;
    }
});

var drawRadio = document.getElementsByName("pen-type");
let drawRadioLength = drawRadio.length;

// Interactions canvas (dessiner quoi)

function  draw(e) {
  if (!isPainting)
    return;

  for (var i = 0; i < drawRadioLength; i++) {
    if (drawRadio[i].checked)
      ctx.lineCap = drawRadio[i].value;
  }
  ctx.lineWidth = lineWidth;
  //Sans la soustraction, le trait serait 100px vers la droite (toolbar)
  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY);
  ctx.stroke();
}

canvas.addEventListener("mousedown", (e) => {
  isPainting = true;
  draw(e);
});

canvas.addEventListener("mouseup", (e) => {
  isPainting = false;
  //Nécessaire pour que le dessin reste affiché ?
  ctx.stroke() 
  //Sans ça, dessiner un 2e trait aura pour conséquence
  //de lier la fin du 1er trait avec le début du 2e
  ctx.beginPath() 
});

canvas.addEventListener("mousemove", draw);

