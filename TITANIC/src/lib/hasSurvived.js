import * as d3 from 'd3';
import titanic from '../../data/titanic.csv';

import { getTotalScroll, setTotalScroll } from '../index.js';

setTotalScroll(20000);
console.log("SCROOOOLLLL: " + getTotalScroll());

// console.log('The test has survived');

d3.select("body")
    .append("div")
    .attr('id', 'graph')

let margin = { top: 10, right: 20, bottom: 30, left: 50 },
    width = window.innerWidth,
    height = window.innerHeight;

// let svg = d3.select("#graph")
//     .append("svg")
//     .attr("width", width + margin.left + margin.right)
//     .attr("height", height + margin.top + margin.bottom)
//     .append("g")
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.select('.step').append('div').attr('id', 'description').append('h1').attr('id', 'titre').text("L'entier des passagers")

let compteurPassengers = 0
let compteurPassengersSurvived = 0
let compteurPassengersDead = 0
titanic.forEach(passenger => {
    if (passenger.survived) {
        // console.log('Un survivant');
        compteurPassengers += 1;
        compteurPassengersSurvived += 1;
    } else if (!passenger.survived) {
        // console.log('Un mort');
        compteurPassengers += 1;
        compteurPassengersDead += 1;
    }
});

// console.log('Au total il y a ' + compteurPassengers + ' passagers…');
// console.log(compteurPassengersSurvived + ' passagers ont survécu.');
// console.log(compteurPassengersDead + ' passagers sont morts.');

d3.select('#sections').append('section')
    .attr('class', 'step')
    .attr('id', 'step1')
    .attr('flex-direction', 'column')

let svg1 = d3.select('#step1')
    .append('svg')
    .attr('id', 'svg-allPassengers')
    // .attr("transform", "translate(" + margin.left + ", 0)")
    .attr("width", width)
    .attr("height", height);

// Create all passengers
let cx = 0
let cy = 0
for (let i = 0; i < compteurPassengers; i++) {
    //center the circles to the width and height
    console.log(width)
    cx = (i % 50) * 20 + (((width - (49 * 20)))/2);
    // console.log(cx);

    cy = Math.floor(i / 50) * 20 + height/10;
    // console.log(cy);

    svg1.append('circle')
        .attr('class', 'circles-passengers')
        .attr('id', 'circle' + i)
        .attr('cx', cx)
        .attr('cy', cy)
        .attr('r', 5)
        .attr('fill', 'transparent')
        .attr('opacity', '0.0')
}
d3.select('#svg-allPassengers').attr("width", cx * 6).attr("height", cy + 10)

// // Pour survivants vs morts :
// let svg2 = d3.select('#step1')
//     .append('svg')
//     .attr('id', 'svg-PassDeadAndSurv')
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

// let cx2 = 0
// let cy2 = 0
// for (let j = 0; j <= compteurPassengers; j++) {
//     cx2 = (j % 50) * 20 + 10
//     // console.log(cx2);

//     cy2 = Math.floor(j / 50) * 20 + 10
//     // console.log(cy2);


//     if (j >= compteurPassengersSurvived) {
//         svg2.append('circle')
//             .attr('class', 'circles-passengers')
//             .attr('cx', cx2)
//             .attr('cy', cy2)
//             .attr('r', 5)
//             .attr('fill', 'red')
//     } else {
//         svg2.append('circle')
//             .attr('class', 'circles-passengers')
//             .attr('cx', cx2)
//             .attr('cy', cy2)
//             .attr('r', 5)
//             .attr('fill', 'blue')
//     }
// }
// d3.select('#svg-PassDeadAndSurv').attr("width", cx2 * 5).attr("height", cy2 + 10)

// Get numbers of everything Pour survivants vs morts par classe:
let firstClassTotal = 0;
let firstClassAlive = 0;
let firstClassDead = 0;
let secondClassTotal = 0;
let secondClassAlive = 0;
let secondClassDead = 0;
let thirdClassTotal = 0;
let thirdClassAlive = 0;
let thirdClassDead = 0;
let undefinedClass = 0;
titanic.forEach(passenger => {
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
});
// // console.log(firstClassTotal + ' firstClass');
// // console.log('firstClass : ' + firstClassAlive + ' ont survécu et ' + firstClassDead + ' sont décédés');
// // console.log(secondClassTotal + ' secondClass');
// // console.log('secondClass : ' + secondClassAlive + ' ont survécu et ' + secondClassDead + ' sont décédés');
// // console.log(thirdClassTotal + ' thirdClass');
// // console.log('thirdClass : ' + thirdClassAlive + ' ont survécu et ' + thirdClassDead + ' sont décédés');
// // console.log(undefinedClass + ' undefinedClass');

// let svg3 = d3.select('#step1')
//     .append('svg')
//     .attr('id', 'svg-PassDeadAndSurvByClass')
//     .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
// let cx3 = 0
// let cy3 = 0
// for (let k = 0; k <= compteurPassengers; k++) {
//     cx3 = (k % 50) * 20 + 10
//     cy3 = Math.floor(k / 50) * 20 + 10

//     if (k < compteurPassengersSurvived) {
//         if (k < firstClassAlive) {
//             svg3.append('circle')
//                 .attr('class', 'circles-passengers')
//                 .attr('cx', cx3)
//                 .attr('cy', cy3)
//                 .attr('r', 5)
//                 .attr('fill', 'gold')
//                 .attr('opacity', '1')
//         } else if (firstClassAlive <= k && k < firstClassAlive + secondClassAlive) {
//             svg3.append('circle')
//                 .attr('class', 'circles-passengers')
//                 .attr('cx', cx3)
//                 .attr('cy', cy3)
//                 .attr('r', 5)
//                 .attr('fill', 'silver')
//                 .attr('opacity', '0.75')
//         } else if (firstClassAlive + secondClassAlive <= k) {
//             svg3.append('circle')
//                 .attr('class', 'circles-passengers')
//                 .attr('cx', cx3)
//                 .attr('cy', cy3)
//                 .attr('r', 5)
//                 .attr('fill', '#CD7F32')
//                 .attr('opacity', '0.25')
//         }
//     } else {
//         if (k < compteurPassengersSurvived + firstClassDead) {
//             svg3.append('circle')
//                 .attr('class', 'circles-passengers')
//                 .attr('cx', cx3)
//                 .attr('cy', cy3)
//                 .attr('r', 5)
//                 .attr('fill', 'red')
//                 .attr('opacity', '1')
//         } else if (compteurPassengersSurvived + firstClassDead <= k && k < compteurPassengersSurvived + firstClassDead + secondClassDead) {
//             svg3.append('circle')
//                 .attr('class', 'circles-passengers')
//                 .attr('cx', cx3)
//                 .attr('cy', cy3)
//                 .attr('r', 5)
//                 .attr('fill', 'orange')
//                 .attr('opacity', '1')
//         } else if (compteurPassengersSurvived + firstClassDead + secondClassDead <= k) {
//             svg3.append('circle')
//                 .attr('class', 'circles-passengers')
//                 .attr('cx', cx3)
//                 .attr('cy', cy3)
//                 .attr('r', 5)
//                 .attr('fill', 'yellow')
//                 .attr('opacity', '1')
//         }
//     }
// }
// d3.select('#svg-PassDeadAndSurvByClass').attr("width", cx3 * 5).attr("height", cy3 + 10)

console.log('totalScroll DANS hasSurvived : ' + getTotalScroll());

// // Variable où on stocke l'id de notre intervalle
// let nIntervId;



export function animate() {
    // regarder si l'intervalle a été déjà démarré
    if (getTotalScroll() < 100) {
        console.log('transparent');
        d3.select('#titre').text('STEP 0 : INTRODUCTION')
        step0();
    }else if (getTotalScroll() > 100 && getTotalScroll() < 1000) {
        console.log('STEP 1');
        d3.select('#titre').text('STEP 1 : EVERYONE')
        step1();
    }else if (getTotalScroll() >= 1000 && getTotalScroll() < 1500) {
        console.log('STEP 2');
        d3.select('#titre').text('STEP 2 : DEADS')
        step2();
    }else if (getTotalScroll() >= 1500 && getTotalScroll() < 2000) {
        console.log('STEP 3');
        d3.select('#titre').text('STEP 3 : DEADS BY CLASS')
        step3();
    }
    // else if (getTotalScroll() >= 2000 && getTotalScroll() < 2500) {
    //     console.log('STEP 4');
    //     d3.select('#titre').text('STEP 4 : SURVIVORS BY CLASS')
    //     step4();
    // }else if (getTotalScroll() >= 2500 && getTotalScroll() < 3000) {
    //     console.log('STEP 5');
    //     d3.select('#titre').text('STEP 5 : SURVIVORS BY CLASS')
    //     step5();
    // }
}

// // Mettre en pause
// function stop() {
//     clearInterval(nIntervId);
//     nIntervId = null;
// }

// Step 0
function step0() {

    titanic.forEach((passenger, i) => { 
        passenger.cx = (i % 50) * 20 + 10
        passenger.cy = Math.floor(i / 50) * 20 + 10
        let cx = 0
        let cy = 0
    })

    let allCircles = svg1.selectAll('circle')
        .data(titanic)
    let nbDead = 0;
    let nbAlive = 0;
    allCircles.enter()
        .merge(allCircles)
        .transition(d3.transition()
            .duration(500)
            .ease(d3.easeLinear))
            .attr('fill', 'transparent')
            .attr('opacity', 1.0)
}

//Step 1
function step1() {

    let cx2 = 0
    let cy2 = 0

    titanic.forEach((passenger, i) => { 
        passenger.cx = (i % 50) * 20 + 10
        passenger.cy = Math.floor(i / 50) * 20 + 10
        let cx = 0
        let cy = 0
    })

    let allCircles = svg1.selectAll('circle')
        .data(titanic)
    let nbDead = 0;
    let nbAlive = 0;
    allCircles.enter()
        .merge(allCircles)
        .transition(d3.transition()
            .duration(500)
            .ease(d3.easeLinear))
            .attr('fill', 'white')
            .attr('opacity', 1.0)
}

// // Fonction de mise à jour du graphique
function step2() {
    // PREMIER ESSAI
    // svg1.selectAll('circle')
    //     .transition(d3.transition()
    //     .duration(500)
    //     .ease(d3.easeLinear)).attr('fill', 'red')
    // ()
    // const titanicSurvivedSort = titanic.sort((a, b) => {
    //     // sort with survived first
    //     if (a.survived === b.survived) {
    //         return 0
    //     } else if (a.survived) {
    //         return -1
    //     } else {
    //         return 1
    //     }
    // })
    titanic.forEach((passenger, i) => { 
        passenger.cx = (i % 50) * 20 + 10
        passenger.cy = Math.floor(i / 50) * 20 + 10
        // cx2 = (j % 50) * 20 + 10
        // console.log(cx2);

        // cy2 = Math.floor(j / 50) * 20 + 10
        // console.log(cy2);
    })
    let cx = 0
    let cy = 0

    let allCircles = svg1.selectAll('circle')
        .data(titanic)
    let nbDead = 0;
    let nbAlive = 0;
    allCircles.enter()
        .merge(allCircles)
        .transition(d3.transition()
            .duration(1000)
            .ease(d3.easeLinear))
            // .attr('fill', function(d) {
            //     // console.log(d.survived);
            //     if (d.survived === 1) {
            //         nbAlive++;
            //         return "transparent"
            //     } else {
            //         nbDead++;
            //         return 'white'
            //     }
            // })
            .attr('opacity', 1.0)
            .attr('cy', function(d, i) {
                // sort with survived first
                // return titanicSurvivedSort[i].cx
                if (d.survived === 1) {
                    return -500;
                }else {
                    // keep same cx
                    return d.cy;
                }
            })

            //     if (d.survived === 1) {
            //         cx = (i % 50) * 20 + 10
            //     } else {
            //         cx = (50 - i % 50) * 20 + 10
            //     }
            //     return cx
            // })

            //     cx = (i % 50) * 20 + 10
            //     console.log('cx ' + cx);
            //     return d.cx
            // })
            // .attr('cy', function(d, i) {
                // return titanicSurvivedSort[i].cy
                // Sort with survived = 1 first
            //     if (d.survived === 1) {
            //         cy = Math.floor(i / 50) * 20 + 10
            //     } else {
            //         cy = (50 - Math.floor(i / 50)) * 20 + 10
            //     }
            //     return cy
            // })
            //     cy = Math.floor(i / 50) * 20 + 10
            //     console.log('cy ' + cy);
            //     return d.cy
                
            // })
            // console.log('nbAlive : ' + nbAlive);
            // console.log('nbDead : ' + nbDead);

}


//Step 3
function step3() {

    titanic.forEach((passenger, i) => { 
        passenger.cx = (i % 50) * 20 + 10
        passenger.cy = Math.floor(i / 50) * 20 + 10
        let cx = 0
        let cy = 0
    })

    let allCircles = svg1.selectAll('circle')
        .data(titanic)
    let nbDead = 0;
    let nbAlive = 0;
    allCircles.enter()
        .merge(allCircles)
        .transition(d3.transition()
            .duration(500)
            .ease(d3.easeLinear))
            .attr('opacity', function(d) {
                // console.log(d.survived);
                if (d.survived === 0) {
                    return d.pclass /3;
                } 
            })
            .attr('cx', function(d, i) {
                // sort with survived first
                console.log(d.pclass);
                return titanic[i].cx
                // Sort with survived = 1 first

                if (d.pclass == 1) {
                    cx = (i % 50) * 20 + 10
                } else {
                    cx = (50 - i % 50) * 20 + 10
                }
                return cx
            })

            //     cx = (i % 50) * 20 + 10
            //     console.log('cx ' + cx);
            //     return d.cx
            // })
            .attr('cy', function(d, i) {
                return titanic[i].cy
                // Sort with survived = 1 first
                if (d.survived === 1) {
                    cy = Math.floor(i / 50) * 20 + 10
                } else {
                    cy = (50 - Math.floor(i / 50)) * 20 + 10
                }
                return cy
            })
            //     cy = Math.floor(i / 50) * 20 + 10
            //     console.log('cy ' + cy);
            //     return d.cy
                
            // })
}
animate()