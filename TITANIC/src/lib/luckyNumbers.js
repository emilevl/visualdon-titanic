import * as d3 from 'd3';
import * as cloud from 'd3-cloud';
import { scaleLinear } from 'd3';
import titanic from '../../data/titanic.csv';

// const counts = {};
const ticketNumbers = new Array()
const deadPassengers = titanic.filter(elm => !elm.survived)
const nbOccurences = {}

// Définition des marges

const margin = {top: 20, right: 10, bottom: 60, left: 60};
const width = window.innerWidth,
height = window.innerHeight;

export function step5() {
    // d3.select('#problematique').enter()
    //     .merge(d3.select('#problematique'))
    //     .transition(d3.transition()
    //         .duration(500)
    //         .ease(d3.easeLinear))
    //     .attr('class', 'hidden')
    // ^ Ca fonctionne pas… :(
    d3.select('#problematique').attr('class', 'hidden')

    // AJOUTER DE QUOI MONTRER LA MOSAÏQUE DE CHIFFRE.
    // show the cloud
    
    // d3.select('#cloud').attr('class', 'hidden');
}

//console.log(deadPassengers);

getTicketValues(deadPassengers);

ticketNumbers.sort();

const uniqueElm = ticketNumbers.filter(onlyUnique);

// console.log(uniqueElm)
for (const num of ticketNumbers) {
    nbOccurences[num] = nbOccurences[num] ? nbOccurences[num] + 1 : 1;
}

function getSixBiggestNumber(data) {
    const sorted = Object.keys(data).sort((a, b) => data[b] - data[a]);
    return sorted.slice(0, 6);
}

// console.log('6 biggest numbers:', getSixBiggestNumber(nbOccurences));
console.log(smallestValue(ticketNumbers));

// function that calculates a number to return between 11 and 300
function calculateSize(number) {
    // const max = d3.max(biggestValue(nbOccurences));
    // const min = d3.min(smallestValue(nbOccurences));
    const scale = scaleLinear()
        .domain([1, 300])
        .range([75, 300]);
    return scale(number); 
}

// array.forEach(element => {
    
// });

// console.log(ticketNumbers);
// console.log(uniqueElm.map(function(d) {
//     return {text: d, size: nbOccurences[`${d}`]};
//   }));
// console.log(nbOccurences);
console.log("SIZE" + uniqueElm.length)
var layout = cloud()
    .size([width, height])
    .words(uniqueElm.map(function(d) {
        console.log(nbOccurences[`${d}`])
      return {text: d, size: nbOccurences[d] * 500/width};
    }))
    .padding(5)
    .rotate(0)
    .font("Impact")
    .fontSize(function(d) { return calculateSize(d.size); })
    .on("end", draw);

layout.start();

// ____________________ FUNCTIONS __________________________________

// function get the ticket with the most occurences of sixBiggestNumber
function getTicketWithMostOccurences(biggestNumbers) { 
    let winner =  [];
    let winnerNb = 0;
    deadPassengers.forEach(passenger => {
        if (passenger.ticket !== null && passenger.ticket !== undefined) {
            const ticket = passenger.ticket.toString().split('');
            // console.log(ticket);
            let n = 0;
            ticket.forEach(letter => {
                switch(letter) {
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
                })
                if (n > winnerNb) {
                    winner = passenger;
                    winnerNb = n;
                }
            }

            

        
            // check if the ticket contains most occurences of the six biggest numbers
            // if (ticket.contains(biggestNumbers[0]) && ticket.contains(biggestNumbers[1]) && ticket.contains(biggestNumbers[2]) && ticket.contains(biggestNumbers[3]) && ticket.contains(biggestNumbers[4]) && ticket.contains(biggestNumbers[5])) {
            //     winner = passenger.ticket;
            // }
    });
    return winner;
}

// console.log("nbOccurence", deadPassengers);
console.log("Winner: ", getTicketWithMostOccurences(getSixBiggestNumber(nbOccurences)));


function getTicketValues(data){
    data.forEach(elm => {
        const ticket = elm.ticket
        //console.log(ticket)
        let newData = [];
        if (typeof ticket === 'string'){
            newData = ticket.match(/[a-zA-Z0-9]/g)
            newData = upperCaseAll(newData);
        }else if (Number.isInteger(ticket) ) {
            newData = numberToArray(ticket);
        }
        addDataToArray(newData, ticketNumbers);
    });
    //console.log(ticketNumbers);
    // return ticketNumbers;
}


function numberToArray(number) {
    let array = number.toString().split("");//stringify the number, then make each digit an item in an array
    return array;//convert all the items back into numbers
}

function addDataToArray(data, arrayToPush) {
    data.forEach (elm => {
        arrayToPush.push(elm);
    })
}

function upperCaseAll(data) {
    data.forEach((elm, index) => {
        data[index] = elm.toUpperCase();
    })
    return data;
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) == index;
}

// // console.log(smallestValue(Object.values(nbOccurences)));
// console.log(nbOccurences);
  

// Function from the d3-cloud git
function draw(words) {
    d3.select("#step1").append("svg")
        .attr('id', 'cloud')
        .attr("width", width)
        .attr("height", height)
        .style("fill", "white")
      .append("g")
        .style('width', width)
        .style('height', height)
        .attr("transform", "translate(" + layout.size()[0] / 2 + "," + layout.size()[1] / 2 + ")")
      .selectAll("text")
        .data(words)
      .enter().append("text")
        .style("font-size", function(d) { return d.size  + "px"; })
        .style("font-family", "Impact")
        .attr("text-anchor", "middle")
        .attr("transform", function(d) {
          return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
        })
        .text(function(d) { return d.text; });

        // hide the cloud
        d3.select('#cloud').attr('class', 'hidden');
  }
  



// ___________________________ GRAPHIQUE ________________________________
// console.log(smallestValue(life, 2021));
const body = d3.select("body");


// Création du graph de base
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



function biggestValue (data) {
    let biggestValue = 0;
    let number;
    data.forEach(value => {
        number = value;
        if (number > biggestValue && typeof number !== 'undefined' && typeof number !== 'null')
            biggestValue = number;
    });
    return biggestValue;
}

function smallestValue (data) {
    let smallestValue = 0;
    let number;
    data.forEach((value, index) => {
        number = value;
        if ((number < smallestValue && typeof number !== 'undefined' && number !== null) || index == 0) {
            smallestValue = number;
        }
    });
    return smallestValue;
}

function strToNumber(str) {
    let SI = typeof str === 'string' ||str instanceof String ? str.slice(-1) : str;
    
    // Extraire la partie numérique
    let number = typeof str === 'string' || str instanceof String ? parseFloat(str.slice(0,-1)) : str;
    
   // Selon la valeur SI, multiplier par la puissance
    switch (SI) {
        case 'M': {
            return number * Math.pow(10, 6);
            break;
        }
        case 'B': {
            return number * Math.pow(10, 9);
            break;
        }
        case 'k': {
            return number * Math.pow(10, 3);
            break;
        }
        default: {
            return number;
            break;
        }
    }
}

function tabStrToInt(tab) {
    tab.forEach(elm => {
        for (let i = 1800; i < 2050; i++) {
            let number = strToNumber(elm[i]);
            
            if (typeof number === 'undefined' || number === null && (typeof elm[i+1] !== undefined && elm[i+1] !== null)) {
                number = (elm[i-1] + elm[i+1]) / 2;
            }
            elm[i] = number;   
        }
    });
}