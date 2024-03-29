"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.animate = animate;

var d3 = _interopRequireWildcard(require("d3"));

var _titanic = _interopRequireDefault(require("../../data/titanic.csv"));

var _index = require("../index.js");

var _luckyNumbers = require("./luckyNumbers.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(0, _index.setTotalScroll)(20000);
d3.select("body").append("div").attr('id', 'graph');
var winner = (0, _luckyNumbers.getTicketWithMostOccurences)((0, _luckyNumbers.getSixBiggestNumber)(_luckyNumbers.nbOccurences));
var margin = {
  top: 10,
  right: 20,
  bottom: 30,
  left: 50
},
    width = window.innerWidth,
    height = window.innerHeight;
var step = 0;
var goUpBtnShown = false;
var compteurPassengers = 0;
var compteurPassengersSurvived = 0;
var compteurPassengersDead = 0;

_titanic["default"].forEach(function (passenger) {
  if (passenger.survived) {
    // console.log('Un survivant');
    compteurPassengers += 1;
    compteurPassengersSurvived += 1;
  } else if (!passenger.survived) {
    // console.log('Un mort');
    compteurPassengers += 1;
    compteurPassengersDead += 1;
  }
}); // console.log('Au total il y a ' + compteurPassengers + ' passagers…');
// console.log(compteurPassengersSurvived + ' passagers ont survécu.');
// console.log(compteurPassengersDead + ' passagers sont morts.');


d3.select('#sections').append('section').attr('class', 'step').attr('id', 'step1').attr('flex-direction', 'column');
var svg1 = d3.select('#step1').append('svg').attr('id', 'svg-allPassengers') // .attr("transform", "translate(" + margin.left + ", 0)")
.attr("width", width).attr("height", height);
var brokenBoat = d3.select('#broken-boat');
var brokenRight = d3.select('#broken-right');
var brokenLeft = d3.select('#broken-left');
var topButton = d3.select('#topButton');
var body = d3.select('body'); // set the cx and cy for each passenger

_titanic["default"].forEach(function (passenger, i) {
  passenger.cx = i % 50 * 20 + (width - 49 * 20) / 2;
  passenger.cy = Math.floor(i / 50) * 20 + (height - 26 * 20) / 4;
}); // Create all passengers


var cx = 0;
var cy = 0; // Connaître la largeur de la zone de points
// let lastpoint = 49 * 20 + (((width - (49 * 20))) / 2);
// let prempoint = (((width - (49 * 20))) / 2);
// let diff = lastpoint - prempoint;
// console.log('LA DIFF : ' + diff);

for (var i = 0; i < compteurPassengers; i++) {
  //center the circles to the width and height
  cx = i % 50 * 20 + (width - 49 * 20) / 2; // console.log(cx);

  cy = Math.floor(i / 50) * 20 + (height - 26 * 20) / 4; // console.log(cy);

  svg1.append('circle').attr('class', 'circles-passengers').attr('id', 'circle' + i).attr('cx', cx).attr('cy', cy).attr('r', 5).attr('fill', 'transparent').attr('opacity', '0.0');
}

d3.select('#svg-allPassengers').attr("width", cx * 6).attr("height", cy + 10); // Get numbers of everything Pour survivants vs morts par classe:

var firstClassTotal = 0;
var firstClassAlive = 0;
var firstClassDead = 0;
var secondClassTotal = 0;
var secondClassAlive = 0;
var secondClassDead = 0;
var thirdClassTotal = 0;
var thirdClassAlive = 0;
var thirdClassDead = 0;
var undefinedClass = 0; // Calculate all the passenger numbers

_titanic["default"].forEach(function (passenger) {
  if (passenger.pclass === 1) {
    firstClassTotal++;

    if (passenger.survived) {
      firstClassAlive++;
    } else {
      firstClassDead++;
    }
  } else if (passenger.pclass === 2) {
    secondClassTotal++;

    if (passenger.survived) {
      secondClassAlive++;
    } else {
      secondClassDead++;
    }
  } else if (passenger.pclass === 3) {
    thirdClassTotal++;

    if (passenger.survived) {
      thirdClassAlive++;
    } else {
      thirdClassDead++;
    }
  } else {
    // console.log('Classe indéfinie');
    undefinedClass++;
  }
}); // TESTS DE VERIFICATION DES CHIFFRES
// console.log(firstClassTotal + ' firstClass');
// console.log('firstClass : ' + firstClassAlive + ' ont survécu et ' + firstClassDead + ' sont décédés');
// console.log(secondClassTotal + ' secondClass');
// console.log('secondClass : ' + secondClassAlive + ' ont survécu et ' + secondClassDead + ' sont décédés');
// console.log(thirdClassTotal + ' thirdClass');
// console.log('thirdClass : ' + thirdClassAlive + ' ont survécu et ' + thirdClassDead + ' sont décédés');
// console.log(undefinedClass + ' undefinedClass');
//////////// THE BIG ANIMATION FUNCTION: ALL STEPS ARE TESTED HERE AND THEN CALLED IN THE NEXT STEP ///////////////


function animate() {
  // console.log("total scroll", getTotalScroll());
  // Hide the cloud if needed
  if (!d3.select('#cloud').classed('hidden')) {
    d3.select('#cloud').classed('hidden', true);
  }

  d3.select('#bigText h1').classed('hidden', true);
  d3.select('#bigText p').classed('hidden', true);
  d3.select('#div-description').classed('hidden', false); // Trying to change the background gradient.
  // document.getElementById('box').style.background  = "linear-gradient(180deg, rgba(0, 81, 181, 1) 0%, rgba(0, 40, 175, 1) 50%, rgba(0, 0, 100, 1) 100%) no-repeat;";
  // CONDITIONS WITH ALL STEPS, FROM ALL PASSENGERS TO THE LAST UNLUCKY ONE.

  if ((0, _index.getTotalScroll)() > _index.stepGap && _index.scroll == false) {
    document.getElementById('box').style.background = "hsl(224.57,100%, " + (34 - 1.2 * (0, _index.getTotalScroll)() / _index.stepGap) + "%)"; // document.getElementById('box').style.backgroundColor  = "red";
    // document.getElementById('box').style.background  = "red";
  } else {
    document.getElementById('box').style.background = "hsl(213.15,100%,35.49%)";
  } //  Step zero: the story


  if ((0, _index.getTotalScroll)() < _index.stepGap) {
    // console.log('transparent');
    d3.select('#titre-desc').html('Le grand départ');
    d3.select('#p-desc').html("Entre le 10 et le 12 avril 1912, 1310 passagers embarquent sur le Titanic à Southampton, Cherbourg puis Queenstown. Le bâteau quitte le Vieux-Continent direction les Amériques et, pour la plupart d'entre eux, le Rêve américain.");
    step0();
    document.getElementById('box').style.background; // 1st step: the passengers
  } else if ((0, _index.getTotalScroll)() >= _index.stepGap && (0, _index.getTotalScroll)() < _index.stepGap * 2) {
    // console.log('STEP 1: The Titanic');
    d3.select('#titre-desc').html('Le grand départ');
    d3.select('#p-desc').html("Entre le 10 et le 12 avril 1912, 1310 passagers embarquent sur le Titanic à Southampton, Cherbourg puis Queenstown. Le bâteau quitte le Vieux-Continent direction les Amériques et, pour la plupart d'entre eux, le Rêve américain.");
    step1(); // 2nd step: the passengers who didn't survive
  } else if ((0, _index.getTotalScroll)() >= _index.stepGap * 2 && (0, _index.getTotalScroll)() < _index.stepGap * 3) {
    // console.log('STEP 2: The death of the Titanic');
    d3.select('#titre-desc').html('Une nuit en enfer');
    d3.select('#p-desc').html('Dans la nuit du 14 au 15 avril 1912, le Titanic heurte un iceberg et coule en à peine quelques heures. <br>Parmis tous les passagers, seulement ' + compteurPassengersSurvived + ' ont survécu. Les autres - <strong>que voici</strong> - meurent et ne reverront jamais la surface. Bousculades, morts de froid ou de noyade, tout le monde peut être touché.');
    step2(); // 3rd step (a): Death ordered by class
  } else if ((0, _index.getTotalScroll)() >= _index.stepGap * 3 && (0, _index.getTotalScroll)() < _index.stepGap * 4) {
    // console.log('STEP 3a: Class separation');
    d3.select('#titre-desc').html('Priorité aux femmes et aux enfants… mais surtout aux riches !');
    d3.select('#p-desc').html('Parmis les morts, la tendance est claire : <br>Voici la répartition des premières – à gauche, deuxièmes – au centre – et troisièmes – à droite – classes, proportionnellement. <br>');
    step3a(); // 3rd step (b): Death ordered by class, removing the first class
  } else if ((0, _index.getTotalScroll)() >= _index.stepGap * 4 && (0, _index.getTotalScroll)() < _index.stepGap * 5) {
    // console.log('STEP 3b: Removing first class');
    d3.select('#titre-desc').html('Priorité aux femmes et aux enfants… mais surtout aux riches !');
    d3.select('#p-desc').html("Parmis les morts, la tendance est claire : <br>Voici la répartition des premières – à gauche, deuxièmes – au centre – et troisièmes – à droite – classes, proportionnellement. Alors qu'un tiers des premières classes ont trouvé la mort, le taux de décès en deuxième classe est d'environ 50%.");
    step3b(); // 3rd step (c): Death ordered by class, removing the second class
  } else if ((0, _index.getTotalScroll)() >= _index.stepGap * 5 && (0, _index.getTotalScroll)() < _index.stepGap * 6) {
    // console.log('STEP 3b: Removing 2nd class');
    d3.select('#titre-desc').html('Priorité aux femmes et aux enfants… mais surtout aux riches !');
    d3.select('#p-desc').html("Parmis les morts, la tendance est claire :" + "<br>Voici la répartition des premières – à gauche, deuxièmes – au centre – et troisièmes – à droite – classes, proportionnellement. " + "Alors qu'un tiers des premières classes ont trouvé la mort, le taux de décès en deuxième classe est d'environ 50%." + " Quant aux troisièmes classes, à peine une personne sur 6 avait une chance de survie.");
    step3c(); // 4th step: the unlucky characters
  } else if ((0, _index.getTotalScroll)() >= _index.stepGap * 6 && (0, _index.getTotalScroll)() < _index.stepGap * 7) {
    //console.log('STEP 4: Text: Et si tout était écrit?');
    d3.select('#bigText h1').classed('hidden', false);
    d3.select('#bigText h1').text('Et si tout était écrit ?');
    d3.select('#titre-desc').html('<br>');
    d3.select('#p-desc').html("Chacun des passagers a embarqué sur le titanic grâce à un billet. Ce dernier contient une suite de sept caractères alphanumériques.");
    toggleSvg(false); // 5th step: the unlucky characters
  } else if ((0, _index.getTotalScroll)() >= _index.stepGap * 7 && (0, _index.getTotalScroll)() < _index.stepGap * 8) {
    // console.log('STEP 5: Unlucky characters');
    d3.select('#titre-desc').html('Caractères porte-malheurs');
    d3.select('#p-desc').html("Voici les caractères ayant le plus apporté la mort au propriétaire du billet");

    if (d3.select('#cloud').classed('hidden')) {
      // d3.select('#cloud').attr('class', 'visible');
      d3.select('#cloud').classed('hidden', false);
    }

    toggleSvg(false);
    (0, _luckyNumbers.step5)(); // 6th step: the unlucky one
  } else if ((0, _index.getTotalScroll)() >= _index.stepGap * 8 && (0, _index.getTotalScroll)() < _index.stepGap * 9) {
    //console.log('STEP 6a: The unlucky one');
    d3.select('#titre-desc').html('Le malheureux élu');
    d3.select('#p-desc').html("Revenons à nos passagers de troisième classe.");
    toggleSvg(true);
    step6a(); // 6th step: the unlucky one
  } else if ((0, _index.getTotalScroll)() >= _index.stepGap * 9 && (0, _index.getTotalScroll)() < _index.stepGap * 10) {
    //console.log('STEP 6b: Title: The unlucky one');
    d3.select('#div-description').classed('hidden', true);
    d3.select('#bigText h1').classed('hidden', false);
    d3.select('#bigText h1').html("Pour l'un d'eux, mourir sur le titanic était une évidence...");
    d3.select('#titre-desc').html('');
    d3.select('#p-desc').html("");
    step6b(); // 7th step: the unlucky one
  } else if ((0, _index.getTotalScroll)() >= _index.stepGap * 10 && (0, _index.getTotalScroll)() < _index.stepGap * 11) {
    // console.log('STEP 6b: Describing the unlucky one');
    d3.select('#div-description').classed('hidden', true);
    d3.select('#bigText h1').classed('hidden', false);
    d3.select('#bigText p').classed('hidden', false);
    d3.select('#bigText h1').html("Mr. Matti Rintamaki");
    console.log(winner);
    d3.select('#bigText p').html("M. Matti est né en 1877, en Finlande. " + "Il est mort à l'âge de " + winner.age + " ans, dans la nuit du 14 au 15 avril 1912, suite au naufrage du Titanic. " + "Matti laisse derrière lui sa femme, Maria Sofia, née Mäki, et ses 9 enfants. Son corps n'a jamais été retrouvé." + "<br>" + "<br>Sa femme intente un procès civil pour homicide involontaire de la compagnie du Titanic. " + "En dédommagement, elle a reçu 375£ ce qui représentait environs 6 ans de salaire de son époux. À titre de comparaison, cela représenterait environs 55'000 francs suisses aujourd'hui. " + "<br>" + "<br>Il avait le billet numéro 3101273.");
    d3.select('#titre-desc').html('Le malheureux élu');
    d3.select('#p-desc').html("Le passager possédant le plus de chiffres 'portes-malheurs'.");
    d3.select('#div-button').classed('hidden', true);
    step6b();
    goUpBtnShown = false; // 7th step: ENDING
  } else if ((0, _index.getTotalScroll)() >= _index.stepGap * 11 && (0, _index.getTotalScroll)() < _index.stepGap * 12) {
    console.log('STEP 7');
    d3.select('#div-description').classed('hidden', true);
    d3.select('#titre-desc').html('');
    d3.select('#p-desc').html('');

    if (!goUpBtnShown) {
      goUpBtnShown = true;
      setTimeout(function () {
        d3.select('#div-button').classed('hidden', false);
      }, 2000);
    }

    step7();
  }
}

topButton.on("click", function () {
  window.scrollTo(0, 0);
  window.location.reload();
}); // // Mettre en pause
// function stop() {
//     clearInterval(nIntervId);
//     nIntervId = null;
// }

var allCircles = svg1.selectAll('circle').data(_titanic["default"]);
var nbDead = 0;
var nbAlive = 0;

function toggleSvg(show) {
  if (show) {
    allCircles.enter().merge(allCircles).transition(d3.transition().duration(500).ease(d3.easeLinear)).attr('opacity', 1);
  } else {
    allCircles.enter().merge(allCircles).transition(d3.transition().duration(500).ease(d3.easeLinear)).attr('opacity', 0);
  }
} // Step 0


function step0() {
  allCircles.enter().merge(allCircles).transition(d3.transition().duration(500).ease(d3.easeLinear)).attr('fill', 'transparent').attr('opacity', 1.0);
} //Step 1: Show every passengers


function step1() {
  // titanic.forEach((passenger, i) => { 
  //     passenger.cx = (i % 50) * 20 + 10
  //     passenger.cy = Math.floor(i / 50) * 20 + 10
  //     let cx = 0
  //     let cy = 0
  // })
  allCircles.enter().merge(allCircles).transition(d3.transition().duration(500).ease(d3.easeLinear)) // .attr('cx', (i % 50) * 20 + (((width - (49 * 20)))/2))
  // .attr('cy', cy)
  .attr('fill', 'white').attr('opacity', 1.0).attr('cx', function (d, i) {
    return d.cx;
  }).attr('cy', function (d, i) {
    return d.cy;
  });
} // Step 2: Show passengers who survived


function step2() {
  allCircles.enter().merge(allCircles).transition(d3.transition().duration(1000).ease(d3.easeLinear)).attr('opacity', 1.0).attr('fill', 'white').attr('cx', function (d, i) {
    return d.cx;
  }).attr('cy', function (d, i) {
    // show only passengers who died
    if (d.survived === 1) {
      return -500;
    } else {
      // keep same cy
      return d.cy;
    }
  });
} //Step 3a: Differentiate between first, second and third class


function step3a() {
  var indexFirstClass = 0;
  var indexSecondClass = 0;
  var indexThirdClass = 0;
  var position;
  allCircles.enter().merge(allCircles).transition(d3.transition().duration(500).ease(d3.easeLinear)) // .attr('opacity', function (d) {
  //     // console.log(d.survived);
  //     if (d.survived === 0) {
  //         return d.pclass / 3;
  //     }
  // })
  .attr('fill', function (d) {
    // console.log(d.survived);
    if (d.survived !== 1) {
      if (d.pclass === 1) {
        return '#587fcc';
      } else if (d.pclass === 2) {
        return '#99A2D0';
      } else {
        return 'white';
      }
    } else {
      return 'white';
    }
  }).attr('cx', function (d, i) {
    // 16
    // console.log();
    if (d.pclass === 1) {
      position = indexFirstClass % 16 * 20 + (width - 49 * 20) / 2;
      indexFirstClass++;
    } else if (d.pclass === 2) {
      position = indexSecondClass % 16 * 20 + (width - 49 * 20) / 2 + 320 + 20;
      indexSecondClass++;
    } else {
      position = indexThirdClass % 16 * 20 + (width - 49 * 20) / 2 + 640 + 40;
      indexThirdClass++;
    }

    return position;
  }).attr('cy', function (d, i) {
    if (d.survived === 1) {
      return -500;
    } else {
      // keep same cy
      return d.cy;
    }
  });
} //Step 3b: Remove 1st class


function step3b() {
  var indexFirstClass = 0;
  var indexSecondClass = 0;
  var indexThirdClass = 0;
  var position;
  allCircles.enter().merge(allCircles).transition(d3.transition().duration(500).ease(d3.easeLinear)).attr('fill', function (d) {
    if (d.survived !== 1) {
      if (d.pclass === 1) {
        return '#587fcc';
      } else if (d.pclass === 2) {
        return '#99A2D0';
      } else {
        return 'white';
      }
    } else {
      return 'white';
    }
  }).attr('cx', function (d, i) {
    // 16
    // console.log();
    if (d.pclass === 1) {
      position = -500;
      indexFirstClass++;
    } else if (d.pclass === 2) {
      position = indexSecondClass % 16 * 20 + (width - 49 * 20) / 2 + 320 + 20;
      indexSecondClass++;
    } else {
      position = indexThirdClass % 16 * 20 + (width - 49 * 20) / 2 + 640 + 40;
      indexThirdClass++;
    }

    return position;
  }).attr('cy', function (d, i) {
    if (d.survived === 1) {
      return -500;
    } else {
      // keep same cy
      return d.cy;
    }
  });
} // Step 3c: Remove 2nd class


function step3c() {
  var indexFirstClass = 0;
  var indexSecondClass = 0;
  var indexThirdClass = 0;
  var position;
  allCircles.enter().merge(allCircles).transition(d3.transition().duration(500).ease(d3.easeLinear)).attr('opacity', 1.0).attr('fill', function (d) {
    // console.log(d.survived);
    if (d.survived !== 1) {
      if (d.pclass === 1) {
        return '#587fcc';
      } else if (d.pclass === 2) {
        return '#99A2D0';
      } else {
        return 'white';
      }
    } else {
      return 'white';
    }
  }).attr('cx', function (d, i) {
    // 16
    // console.log();
    if (d.pclass === 1) {
      position = -500;
      indexFirstClass++;
    } else if (d.pclass === 2) {
      position = -500;
      indexSecondClass++;
    } else {
      position = indexThirdClass % 16 * 20 + (width - 49 * 20) / 2 + 640 + 40;
      indexThirdClass++;
    }

    return position;
  }).attr('cy', function (d, i) {
    // sort with survived first
    // return titanicSurvivedSort[i].cx
    if (d.survived === 1) {
      return -500;
    } else {
      // keep same cy
      return d.cy;
    }
  });
} // Step6a: Show just the passengers who's dead on 3rd class.


function step6a() {
  var indexFirstClass = 0;
  var indexSecondClass = 0;
  var indexThirdClass = 0;
  var position;
  allCircles.enter().merge(allCircles).transition(d3.transition().duration(500).ease(d3.easeLinear)).attr('opacity', 1.0).attr('fill', function (d) {
    // console.log(d.survived);
    if (d.survived !== 1) {
      if (d.pclass === 1) {
        return '#587fcc';
      } else if (d.pclass === 2) {
        return '#99A2D0';
      } else {
        return 'white';
      }
    } else {
      return 'white';
    }
  }).attr('cx', function (d, i) {
    // 16
    // console.log();
    if (d.pclass === 1) {
      position = -500;
      indexFirstClass++;
    } else if (d.pclass === 2) {
      position = -500;
      indexSecondClass++;
    } else {
      position = indexThirdClass % 16 * 20 + (width - 49 * 20) / 2 + 640 + 40;
      indexThirdClass++;
    }

    return position;
  }).attr('cy', function (d, i) {
    // sort with survived first
    // return titanicSurvivedSort[i].cx
    if (d.survived === 1) {
      return -500;
    } else {
      // keep same cy
      return d.cy;
    }
  }).attr('r', 5);
} // Step6b: Show only the passenger who's dead with the 3rd class.


function step6b() {
  var indexFirstClass = 0;
  var indexSecondClass = 0;
  var indexThirdClass = 0;
  var position;
  allCircles.enter().merge(allCircles).transition(d3.transition().duration(700).ease(d3.easeCubicIn)).attr('opacity', 1.0) // .attr('fill', function (d) {
  //     // console.log(d.survived);
  //     if (d == winner) {
  //         console.log("THE WINNER", d);
  //         return 'white'
  //     }else {
  //         return 'transparent';
  //     }
  // })
  .attr('r', function (d, i) {
    if (d == winner) {
      return 30;
    } else {
      return 5;
    }
  }).attr('cx', function (d, i) {
    if (d.pclass === 1) {
      position = -500;
      indexFirstClass++;
    } else if (d.pclass === 2) {
      position = -500;
      indexSecondClass++;
    } else {
      if (d != winner) {
        position = width + 500;
      } else position = width / 2; // position = ((indexThirdClass % 16) * 20 + (((width - (49 * 20))) / 2)) + 640 + 40


      indexThirdClass++;
    }

    return position;
  }).attr('cy', function (d, i) {
    if (d.survived === 1) {
      return -500;
    } else {
      // keep same cy
      if (d != winner) {
        return d.cy;
      } else return height / 4;
    }
  });
} // Step6b: Show only the passenger who's dead with the 3rd class.


function step7() {
  var indexFirstClass = 0;
  var indexSecondClass = 0;
  var indexThirdClass = 0;
  var position;
  allCircles.enter().merge(allCircles).transition(d3.transition().duration(1500).ease(d3.easeLinear)).attr('opacity', 0.0).attr('r', function (d, i) {
    if (d == winner) {
      return 30;
    } else {
      return 5;
    }
  }).attr('cx', function (d, i) {
    if (d.pclass === 1) {
      position = -500;
      indexFirstClass++;
    } else if (d.pclass === 2) {
      position = -500;
      indexSecondClass++;
    } else {
      if (d != winner) {
        position = width + 500;
      } else position = width / 2; // position = ((indexThirdClass % 16) * 20 + (((width - (49 * 20))) / 2)) + 640 + 40


      indexThirdClass++;
    }

    return position;
  }).attr('cy', function (d, i) {
    if (d.survived === 1) {
      return -500;
    } else {
      // keep same cy
      if (d != winner) {
        return d.cy;
      } else return height + 100;
    }
  });
}

animate();