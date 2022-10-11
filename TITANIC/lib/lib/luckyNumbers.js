"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSixBiggestNumber = getSixBiggestNumber;
exports.getTicketValues = getTicketValues;
exports.getTicketWithMostOccurences = getTicketWithMostOccurences;
exports.nbOccurences = void 0;
exports.step5 = step5;

var d3 = _interopRequireWildcard(require("d3"));

var cloud = _interopRequireWildcard(require("d3-cloud"));

var _titanic = _interopRequireDefault(require("../../data/titanic.csv"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

// const counts = {};
var ticketNumbers = new Array();

var deadPassengers = _titanic["default"].filter(function (elm) {
  return !elm.survived;
});

var nbOccurences = {}; // Définition des marges

exports.nbOccurences = nbOccurences;
var margin = {
  top: 20,
  right: 10,
  bottom: 60,
  left: 60
};
var width = window.innerWidth,
    height = window.innerHeight;

function step5() {
  // d3.select('#problematique').enter()
  //     .merge(d3.select('#problematique'))
  //     .transition(d3.transition()
  //         .duration(500)
  //         .ease(d3.easeLinear))
  //     .attr('class', 'hidden')
  // ^ Ca fonctionne pas… :(
  d3.select('#problematique').attr('class', 'hidden'); // AJOUTER DE QUOI MONTRER LA MOSAÏQUE DE CHIFFRE.
  // show the cloud
  // d3.select('#cloud').attr('class', 'hidden');
} //console.log(deadPassengers);


getTicketValues(deadPassengers);
ticketNumbers.sort();
var uniqueElm = ticketNumbers.filter(onlyUnique); // console.log(uniqueElm)

for (var _i = 0, _ticketNumbers = ticketNumbers; _i < _ticketNumbers.length; _i++) {
  var num = _ticketNumbers[_i];
  nbOccurences[num] = nbOccurences[num] ? nbOccurences[num] + 1 : 1;
}

function getSixBiggestNumber(data) {
  var sorted = Object.keys(data).sort(function (a, b) {
    return data[b] - data[a];
  });
  return sorted.slice(0, 6);
} // console.log('6 biggest numbers:', getSixBiggestNumber(nbOccurences));


console.log(smallestValue(ticketNumbers)); // function that calculates a number to return between 11 and 300

function calculateSize(number) {
  // const max = d3.max(biggestValue(nbOccurences));
  // const min = d3.min(smallestValue(nbOccurences));
  var scale = (0, d3.scaleLinear)().domain([1, 300]).range([40, 300]);
  return scale(number);
} // array.forEach(element => {
// });
// console.log(ticketNumbers);
// console.log(uniqueElm.map(function(d) {
//     return {text: d, size: nbOccurences[`${d}`]};
//   }));
// console.log(nbOccurences);


console.log("SIZE" + uniqueElm.length);
var layout = cloud().size([width, height]).words(uniqueElm.map(function (d) {
  console.log(nbOccurences["".concat(d)]);
  return {
    text: d,
    size: nbOccurences[d] * 500 / width
  };
})).padding(5).rotate(0).font("Impact").fontSize(function (d) {
  return calculateSize(d.size);
}).on("end", draw);
layout.start(); // ____________________ FUNCTIONS __________________________________
// function get the ticket with the most occurences of sixBiggestNumber

function getTicketWithMostOccurences(biggestNumbers) {
  var winner = [];
  var winnerNb = 0;
  deadPassengers.forEach(function (passenger) {
    if (passenger.ticket !== null && passenger.ticket !== undefined) {
      var ticket = passenger.ticket.toString().split(''); // console.log(ticket);

      var n = 0;
      ticket.forEach(function (letter) {
        switch (letter) {
          case biggestNumbers[0]:
            n++;

          case biggestNumbers[1]:
            n++;

          case biggestNumbers[2]:
            n++;

          case biggestNumbers[3]:
            n++;

          case biggestNumbers[4]:
            n++;

          case biggestNumbers[5]:
            n++;

          case biggestNumbers[6]:
            n++;
            break;
        }
      });

      if (n > winnerNb) {
        winner = passenger;
        winnerNb = n;
      }
    } // check if the ticket contains most occurences of the six biggest numbers
    // if (ticket.contains(biggestNumbers[0]) && ticket.contains(biggestNumbers[1]) && ticket.contains(biggestNumbers[2]) && ticket.contains(biggestNumbers[3]) && ticket.contains(biggestNumbers[4]) && ticket.contains(biggestNumbers[5])) {
    //     winner = passenger.ticket;
    // }

  });
  return winner;
} // console.log("nbOccurence", deadPassengers);
// console.log("Winner: ", getTicketWithMostOccurences(getSixBiggestNumber(nbOccurences)));


function getTicketValues(data) {
  data.forEach(function (elm) {
    var ticket = elm.ticket; //console.log(ticket)

    var newData = [];

    if (typeof ticket === 'string') {
      newData = ticket.match(/[a-zA-Z0-9]/g);
      newData = upperCaseAll(newData);
    } else if (Number.isInteger(ticket)) {
      newData = numberToArray(ticket);
    }

    addDataToArray(newData, ticketNumbers);
  }); //console.log(ticketNumbers);
  // return ticketNumbers;
}

function numberToArray(number) {
  var array = number.toString().split(""); //stringify the number, then make each digit an item in an array

  return array; //convert all the items back into numbers
}

function addDataToArray(data, arrayToPush) {
  data.forEach(function (elm) {
    arrayToPush.push(elm);
  });
}

function upperCaseAll(data) {
  data.forEach(function (elm, index) {
    data[index] = elm.toUpperCase();
  });
  return data;
}

function onlyUnique(value, index, self) {
  return self.indexOf(value) == index;
} // // console.log(smallestValue(Object.values(nbOccurences)));
// console.log(nbOccurences);
// Function from the d3-cloud git


function draw(words) {
  d3.select("#step1").append("svg").attr('id', 'cloud').attr("width", width).attr("height", height).style("fill", "white").append("g").style('width', width).style('height', height).attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")").selectAll("text").data(words).enter().append("text").style("font-size", function (d) {
    return d.size + "px";
  }).style("font-family", "Impact").attr("text-anchor", "middle").attr("transform", function (d) {
    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
  }).text(function (d) {
    return d.text;
  }); // hide the cloud

  d3.select('#cloud').attr('class', 'hidden');
} // ___________________________ GRAPHIQUE ________________________________
// console.log(smallestValue(life, 2021));


var body = d3.select("body"); // Création du graph de base
// d3.select("#step2")
//     .append("div")
//     .attr('id', 'graph')
// let svg = d3.select("#graph")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
// Axe X, en fonction du revenu
// let x = d3.scaleLinear()
//     .domain([0, 1200])
//     .range([0, width]);
// Axe Y, en fonction de l'âge
// let y = d3.scalePow()
//     .domain([0, 1200])
//     .range([ height, 0]);
// La taille des bulles --> Log permet de limiter la différence trop élevée des bulles
// let z = d3.scaleSqrt()
//     .domain([smallestValue(Object.values(nbOccurences)), biggestValue(Object.values(nbOccurences))])
//     .range([5, 60]);
// svg.append("g")
//     .call(d3.axisLeft(y));
// svg.append("g")
//     .attr("transform", "translate(0," + height + ")")
//     .call(d3.axisBottom(x))
//     .selectAll("text")
// .attr("transform", "translate(-2,10)")
// Add dots
// svg.append('g')
//     .selectAll("dot")
//     .data(Object.values(nbOccurences))
//     .enter()
//     .append("circle")
//     .attr("cx", (d) => x(d))
//     .attr("r", 10)
//     .style("fill", `#${Math.floor(Math.random() * 16777215).toString(16)}`)
//     .style("opacity", "0.7")
//     .attr("stroke", "black")
// svg.selectAll("circle").data(Object.values(nbOccurences)).join()
//     .attr("cy", (d) => y(d));
// svg.selectAll("circle").data(Object.values(nbOccurences)).join()
//     .attr("cy", (d) => y(d));
// svg.selectAll("circle").data(Object.values(nbOccurences)).join()
//     .attr("r", (d) => z(d));

function biggestValue(data) {
  var biggestValue = 0;
  var number;
  data.forEach(function (value) {
    number = value;
    if (number > biggestValue && typeof number !== 'undefined' && typeof number !== 'null') biggestValue = number;
  });
  return biggestValue;
}

function smallestValue(data) {
  var smallestValue = 0;
  var number;
  data.forEach(function (value, index) {
    number = value;

    if (number < smallestValue && typeof number !== 'undefined' && number !== null || index == 0) {
      smallestValue = number;
    }
  });
  return smallestValue;
}

function strToNumber(str) {
  var SI = typeof str === 'string' || str instanceof String ? str.slice(-1) : str; // Extraire la partie numérique

  var number = typeof str === 'string' || str instanceof String ? parseFloat(str.slice(0, -1)) : str; // Selon la valeur SI, multiplier par la puissance

  switch (SI) {
    case 'M':
      {
        return number * Math.pow(10, 6);
        break;
      }

    case 'B':
      {
        return number * Math.pow(10, 9);
        break;
      }

    case 'k':
      {
        return number * Math.pow(10, 3);
        break;
      }

    default:
      {
        return number;
        break;
      }
  }
}

function tabStrToInt(tab) {
  tab.forEach(function (elm) {
    for (var i = 1800; i < 2050; i++) {
      var number = strToNumber(elm[i]);

      if (typeof number === 'undefined' || number === null && _typeof(elm[i + 1]) !== undefined && elm[i + 1] !== null) {
        number = (elm[i - 1] + elm[i + 1]) / 2;
      }

      elm[i] = number;
    }
  });
}