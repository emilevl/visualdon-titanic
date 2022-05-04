import * as d3 from 'd3';
import titanic from '../../data/titanic.csv';

import { getTotalScroll, setTotalScroll } from '../index.js';
import { step5 } from './luckyNumbers.js';

setTotalScroll(20000);

d3.select("body")
    .append("div")
    .attr('id', 'graph')

let margin = { top: 10, right: 20, bottom: 30, left: 50 },
    width = window.innerWidth,
    height = window.innerHeight;
let step = 0;

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

// set the cx and cy for each passenger
titanic.forEach((passenger, i) => {
    passenger.cx = (i % 50) * 20 + (((width - (49 * 20))) / 2);
    passenger.cy = Math.floor(i / 50) * 20 + (((height - (26 * 20))) / 4)
})
// Create all passengers
let cx = 0
let cy = 0

// Connaître la largeur de la zone de points
// let lastpoint = 49 * 20 + (((width - (49 * 20))) / 2);
// let prempoint = (((width - (49 * 20))) / 2);
// let diff = lastpoint - prempoint;
// console.log('LA DIFF : ' + diff);

for (let i = 0; i < compteurPassengers; i++) {
    //center the circles to the width and height
    cx = (i % 50) * 20 + (((width - (49 * 20))) / 2);
    // console.log(cx);

    cy = Math.floor(i / 50) * 20 + (((height - (26 * 20))) / 4);
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

console.log(firstClassTotal + ' firstClass');
console.log('firstClass : ' + firstClassAlive + ' ont survécu et ' + firstClassDead + ' sont décédés');
console.log(secondClassTotal + ' secondClass');
console.log('secondClass : ' + secondClassAlive + ' ont survécu et ' + secondClassDead + ' sont décédés');
console.log(thirdClassTotal + ' thirdClass');
console.log('thirdClass : ' + thirdClassAlive + ' ont survécu et ' + thirdClassDead + ' sont décédés');
console.log(undefinedClass + ' undefinedClass');

export function animate() {
    
    // regarder si l'intervalle a été déjà démarré
    if (getTotalScroll() < 500) {
        console.log('transparent');
        d3.select('#titre-desc').html('Le grand départ');
        d3.select('#p-desc').html('Entre le 10 et le 12 avril 1912 , 1310 personnes embarque sur le Titanic à Southampton, Cherbourg puis Queenstown. Le bâteau quitte le Vieux-Continent direction les Amériques et, pour la plupart de ces passagers, le Rêve américain.')
        step = 0;
        step0();
    } else if (getTotalScroll() >= 500 && getTotalScroll() < 2000) {
        console.log('STEP 1');
        step = 1;
        step1();
    } else if (getTotalScroll() >= 2000 && getTotalScroll() < 3500) {
        console.log('STEP 2');
        d3.select('#titre-desc').html('Une nuit en enfer');
        d3.select('#p-desc').html('Dans la nuit du 14 au 15 avril 1912, le Titanic heurte un iceberg et coule en à peine quelques heures. <br>Parmis tous les passagers, seulement ' + compteurPassengersSurvived + ' ont survécu. Les autres - que voici - meurent et se reveront jamais la surface. Bousculades, mort de froid ou de noyade, tout le monde peut être touché.')
        step = 2;
        step2();
    } else if (getTotalScroll() >= 3500 && getTotalScroll() < 4250) {
        console.log('STEP 3a');
        d3.select('#titre-desc').html('Priorité aux femmes et aux enfants… mais surtout aux riches !');
        d3.select('#p-desc').html('Parmis les morts, la tendance est claire : <br>Voici la répartition des premières, deuxièmes et troisièmes classes.<br>')
        step = 3;
        step3a();
    } else if (getTotalScroll() >= 4250 && getTotalScroll() < 5000) {
        console.log('STEP 3b');
        d3.select('#p-desc').html("Parmis les morts, la tendance est claire : <br>Voici la répartition des premières, deuxièmes et troisièmes classes.<br>Alors qu'un tiers des premières classes ont trouvé la mort, le taux de décès en deuxième classe est d'environs cinquante pourcents.")
        step = 3;
        step3b();
    } else if (getTotalScroll() >= 5000 && getTotalScroll() < 5750) {
        console.log('STEP 3b');
        d3.select('#p-desc').html("Parmis les morts, la tendance est claire : <br>Voici la répartition des premières, deuxièmes et troisièmes classes.<br>Alors qu'un tiers des premières classes ont trouvé la mort, le taux de décès en deuxième classe est d'environs cinquante pourcents. <br>Quant au troisièmes classes, à peine une personne sur 6 n'avait de chance de survie.")
        step = 3;
        step3c();
    } else if (getTotalScroll() >= 5750 && getTotalScroll() < 7250) {
        console.log('STEP 4');
        d3.select('#titre-desc').html('Et si tout était écrit ?');
        d3.select('#p-desc').html("Chacun des passagers a embarqué sur le titanic grâce à un billet. Ce dernier contient une suite de sept caractères alphanumériques.")
        step = 4;
        step4();
    } else if (getTotalScroll() >= 7250 && getTotalScroll() < 9750) {
        console.log('STEP 5');
        d3.select('#titre-desc').html('Caractère porte malheur');
        d3.select('#p-desc').html("Voici les caractères ayant le plus apporté la mort au propriétaire du billet")        
        if (d3.select('#cloud').classed('hidden')) {
            // d3.select('#cloud').attr('class', 'visible');
            d3.select('#cloud').classed('hidden', false);
        }
        step = 5;
        step5();
    }


    if (step !== 5) {
        if (!d3.select('#cloud').classed('hidden')) {
            // d3.select('#cloud').attr('class', 'visible');
            d3.select('#cloud').classed('hidden', true);
        }
    }
}

// // Mettre en pause
// function stop() {
//     clearInterval(nIntervId);
//     nIntervId = null;
// }

let allCircles = svg1.selectAll('circle')
    .data(titanic)
let nbDead = 0;
let nbAlive = 0;

// Step 0
function step0() {

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

    // titanic.forEach((passenger, i) => { 
    //     passenger.cx = (i % 50) * 20 + 10
    //     passenger.cy = Math.floor(i / 50) * 20 + 10
    //     let cx = 0
    //     let cy = 0
    // })

    allCircles.enter()
        .merge(allCircles)
        .transition(d3.transition()
            .duration(500)
            .ease(d3.easeLinear))
        // .attr('cx', (i % 50) * 20 + (((width - (49 * 20)))/2))
        // .attr('cy', cy)
        .attr('fill', 'white')
        .attr('opacity', 1.0)
        .attr('cx', (d, i) => {
            return d.cx
        })
        .attr('cy', (d, i) => {
            return d.cy;
        })
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
        .attr('fill', 'white')
        .attr('cx', (d, i) => {
            return d.cx
        })
        // .attr('cx', (i % 50) * 20 + (((width - (49 * 20)))/2))
        .attr('cy', function (d, i) {
            // sort with survived first
            // return titanicSurvivedSort[i].cx
            if (d.survived === 1) {
                return -500;
            } else {
                // keep same cy
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


//Step 3a
function step3a() {

    let indexFirstClass = 0;
    let indexSecondClass = 0;
    let indexThirdClass = 0;
    let position;

    allCircles.enter()
        .merge(allCircles)
        .transition(d3.transition()
            .duration(500)
            .ease(d3.easeLinear))
        // .attr('opacity', function (d) {
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
                    return '#99A2D0'
                } else {
                    return 'white';
                }
            } else {
                return 'white';
            }
        })
        .attr('cx', (d, i) => {
            // 16
            // console.log();
            if (d.pclass === 1) {
                position = ((indexFirstClass % 16) * 20 + (((width - (49 * 20))) / 2))
                indexFirstClass++;
            } else if (d.pclass === 2) {
                position = ((indexSecondClass % 16) * 20 + (((width - (49 * 20))) / 2)) + 320 + 20
                indexSecondClass++;
            } else {
                position = ((indexThirdClass % 16) * 20 + (((width - (49 * 20))) / 2)) + 640 + 40
                indexThirdClass++;
            }
            return position;
        })
        .attr('cy', (d, i) => {
            if (d.survived === 1) {
                return -500;
            } else {
                // keep same cy
                return d.cy;
            }
        })
}

//Step 3b
function step3b() {

    let indexFirstClass = 0;
    let indexSecondClass = 0;
    let indexThirdClass = 0;
    let position;

    allCircles.enter()
        .merge(allCircles)
        .transition(d3.transition()
            .duration(500)
            .ease(d3.easeLinear))
        .attr('fill', function (d) {
            if (d.survived !== 1) {
                if (d.pclass === 1) {
                    return '#587fcc';
                } else if (d.pclass === 2) {
                    return '#99A2D0'
                } else {
                    return 'white';
                }
            } else {
                return 'white';
            }
        })
        .attr('cx', (d, i) => {
            // 16
            // console.log();
            if (d.pclass === 1) {
                position = -500
                indexFirstClass++;
            } else if (d.pclass === 2) {
                position = ((indexSecondClass % 16) * 20 + (((width - (49 * 20))) / 2)) + 320 + 20
                indexSecondClass++;
            } else {
                position = ((indexThirdClass % 16) * 20 + (((width - (49 * 20))) / 2)) + 640 + 40
                indexThirdClass++;
            }
            return position;
        })
        .attr('cy', function (d, i) {
            if (d.survived === 1) {
                return -500;
            } else {
                // keep same cy
                return d.cy;
            }
        })
}

// Step 3c
function step3c() {

    let indexFirstClass = 0;
    let indexSecondClass = 0;
    let indexThirdClass = 0;
    let position;

    allCircles.enter()
        .merge(allCircles)
        .transition(d3.transition()
            .duration(500)
            .ease(d3.easeLinear))
        .attr('fill', function (d) {
            // console.log(d.survived);
            if (d.survived !== 1) {
                if (d.pclass === 1) {
                    return '#587fcc';
                } else if (d.pclass === 2) {
                    return '#99A2D0'
                } else {
                    return 'white';
                }
            } else {
                return 'white';
            }
        })
        .attr('cx', (d, i) => {
            // 16
            // console.log();
            if (d.pclass === 1) {
                position = -500
                indexFirstClass++;
            } else if (d.pclass === 2) {
                position = -500
                indexSecondClass++;
            } else {
                position = ((indexThirdClass % 16) * 20 + (((width - (49 * 20))) / 2)) + 640 + 40
                indexThirdClass++;
            }
            return position;
        })
        .attr('cy', function (d, i) {
            // sort with survived first
            // return titanicSurvivedSort[i].cx
            if (d.survived === 1) {
                return -500;
            } else {
                // keep same cy
                return d.cy;
            }
        })
}

// Step4
function step4() {
    allCircles.enter()
        .merge(allCircles)
        .transition(d3.transition()
            .duration(500)
            .ease(d3.easeLinear))
        .attr('opacity', 0)
}

animate()