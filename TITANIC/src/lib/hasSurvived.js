import * as d3 from 'd3';
import titanic from '../../data/titanic.csv';
import { toggleScroll, getTotalScroll, setTotalScroll, stepGap, scroll } from '../index.js';
import { step5, getTicketWithMostOccurences, getSixBiggestNumber, nbOccurences } from './luckyNumbers.js';
setTotalScroll(20000);

d3.select("body")
    .append("div")
    .attr('id', 'graph')

const winner = getTicketWithMostOccurences(getSixBiggestNumber(nbOccurences));
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

let brokenBoat = d3.select('#broken-boat');
let brokenRight = d3.select('#broken-right');
let brokenLeft = d3.select('#broken-left');
let topButton = d3.select('#topButton');
let body = d3.select('body');

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

    // Hide the cloud if needed
    if (!d3.select('#cloud').classed('hidden')) {
        d3.select('#cloud').classed('hidden', true);
    }
    d3.select('#bigText h1').classed('hidden', true);
    d3.select('#bigText p').classed('hidden', true);
    d3.select('#div-description').classed('hidden', false);


    // document.getElementById('box').style.background  = "linear-gradient(180deg, rgba(0, 81, 181, 1) 0%, rgba(0, 40, 175, 1) 50%, rgba(0, 0, 100, 1) 100%) no-repeat;";
    if (getTotalScroll() > stepGap && scroll == false) {
        // console.log("total scroll", getTotalScroll());
        document.getElementById('box').style.background  = "hsl(224.57,100%, " + (34 - 1.2* getTotalScroll() / stepGap)+ "%)";
        // document.getElementById('box').style.backgroundColor  = "red";
        // document.getElementById('box').style.background  = "red";
    }else {
        document.getElementById('box').style.background  = "hsl(213.15,100%,35.49%)";
    }
    if (getTotalScroll() < stepGap) {
        console.log('transparent');
        d3.select('#titre-desc').html('Le grand départ');
        d3.select('#p-desc').html('Entre le 10 et le 12 avril 1912, 1310 personnes embarquent sur le Titanic à Southampton, Cherbourg puis Queenstown. Le bâteau quitte le Vieux-Continent direction les Amériques et, pour la plupart de ces passagers, le Rêve américain.')
        step0();
        document.getElementById('box').style.background
    } else if (getTotalScroll() >= stepGap && getTotalScroll() < stepGap * 2) {
        console.log('STEP 1');
        step1();
    } else if (getTotalScroll() >= stepGap * 2 && getTotalScroll() < stepGap * 3) {
        console.log('STEP 2');
        d3.select('#titre-desc').html('Une nuit en enfer');
        d3.select('#p-desc').html('Dans la nuit du 14 au 15 avril 1912, le Titanic heurte un iceberg et coule en à peine quelques heures. <br>Parmis tous les passagers, seulement ' + compteurPassengersSurvived + ' ont survécu. Les autres - <strong>que voici</strong> - meurent et ne reverront jamais la surface. Bousculades, morts de froid ou de noyade, tout le monde peut être touché.')
        step2();
    } else if (getTotalScroll() >= stepGap * 3 && getTotalScroll() < stepGap * 4) {
        console.log('STEP 3a');
        d3.select('#titre-desc').html('Priorité aux femmes et aux enfants… mais surtout aux riches !');
        d3.select('#p-desc').html('Parmis les morts, la tendance est claire : <br>Voici la répartition des premières (gauche), deuxièmes (milieu) et troisièmes (droite) classes, proportionnellement.<br>')
        step3a();
    } else if (getTotalScroll() >= stepGap * 4 && getTotalScroll() < stepGap * 5) {
        console.log('STEP 3b');
        d3.select('#p-desc').html("Parmis les morts, la tendance est claire : <br>Voici la répartition des premières, deuxièmes et troisièmes classes.<br>Alors qu'un tiers des premières classes ont trouvé la mort, le taux de décès en deuxième classe est d'environ 50%.")
        step3b();
    } else if (getTotalScroll() >= stepGap * 5 && getTotalScroll() < stepGap * 6) {
        console.log('STEP 3b');
        d3.select('#p-desc').html("Parmis les morts, la tendance est claire :"
            + "<br>Voici la répartition des premières, deuxièmes et troisièmes classes."
            + "<br>Alors qu'un tiers des premières classes ont trouvé la mort, le taux de décès en deuxième classe est d'environ 50%."
            + "<br>Quant aux troisièmes classes, à peine une personne sur 6 avait une chance de survie.")
        step3c();
    } else if (getTotalScroll() >= stepGap * 6 && getTotalScroll() < stepGap * 7) {
        console.log('STEP 4');

        d3.select('#bigText h1').classed('hidden', false);
        d3.select('#bigText h1').text('Et si tout était écrit ?');
        d3.select('#titre-desc').html('Et si tout était écrit ?');
        d3.select('#p-desc').html("Chacun des passagers a embarqué sur le titanic grâce à un billet. Ce dernier contient une suite de sept caractères alphanumériques.")
        toggleSvg(false);
    } else if (getTotalScroll() >= stepGap * 7 && getTotalScroll() < stepGap * 8) {
        console.log('STEP 5');
        d3.select('#titre-desc').html('Caractères porte malheur');
        d3.select('#p-desc').html("Voici les caractères ayant le plus apporté la mort au propriétaire du billet")
        if (d3.select('#cloud').classed('hidden')) {
            // d3.select('#cloud').attr('class', 'visible');
            d3.select('#cloud').classed('hidden', false);
        }
        toggleSvg(false);
        step5();
    } else if (getTotalScroll() >= stepGap * 8 && getTotalScroll() < stepGap * 9) {
        console.log('STEP 6a');
        d3.select('#titre-desc').html('Le malheureux élu');
        d3.select('#p-desc').html("Le passager possédant le plus de chiffres 'portes-malheurs'.")
        toggleSvg(true);
        step6a();
    } else if (getTotalScroll() >= stepGap * 9 && getTotalScroll() < stepGap * 10) {
        console.log('STEP 6b');
        d3.select('#div-description').classed('hidden', true);
        d3.select('#bigText h1').classed('hidden', false);
        d3.select('#bigText h1').text("Pour l'un d'eux, mourir sur le titanic était une évidence...");
        d3.select('#titre-desc').html('Le malheureux élu');
        d3.select('#p-desc').html("Le passager possédant le plus de chiffres 'portes-malheurs'.")
        step6b();
    } else if (getTotalScroll() >= stepGap * 10 && getTotalScroll() < stepGap * 11) {
        console.log('STEP 6b');
        d3.select('#div-description').classed('hidden', true);
        d3.select('#bigText h1').classed('hidden', false);
        d3.select('#bigText p').classed('hidden', false);
        d3.select('#bigText h1').text("Mr. Matti Rintamaki");
        console.log(winner)
        d3.select('#bigText p').html("M. Matti est né en 1877, en Finlande. "
            + "Il est mort en 1912, à l'âge de " + winner.age + " ans, dans la nuit du 14 au 15 avril 1912. "
            + "En dédommagement, sa femme a reçu (seulement) 375£.");
        d3.select('#titre-desc').html('Le malheureux élu');
        d3.select('#p-desc').html("Le passager possédant le plus de chiffres 'portes-malheurs'.")
        step6b();
    } else if (getTotalScroll() >= stepGap * 11 && getTotalScroll() < stepGap * 12) {
        console.log('STEP 7');
        d3.select('#div-description').classed('hidden', true);
        d3.select('#div-button').classed('hidden', true);
        step7();
    } else if (getTotalScroll() >= stepGap * 12 && getTotalScroll() < stepGap * 13) {
        console.log('STEP 8');
        d3.select('#titre-desc').html('')
        d3.select('#p-desc').html('')
        d3.select('#div-button').classed('hidden', false);
        step8();
    }
}

topButton.on("click", function () {
    window.scrollTo(0, 0)
    window.location.reload();
})

// // Mettre en pause
// function stop() {
//     clearInterval(nIntervId);
//     nIntervId = null;
// }

let allCircles = svg1.selectAll('circle')
    .data(titanic)
let nbDead = 0;
let nbAlive = 0;

function toggleSvg(show) {
    if (show) {
        allCircles.enter()
            .merge(allCircles)
            .transition(d3.transition()
                .duration(500)
                .ease(d3.easeLinear))
            .attr('opacity', 1)
    } else {
        allCircles.enter()
            .merge(allCircles)
            .transition(d3.transition()
                .duration(500)
                .ease(d3.easeLinear))
            .attr('opacity', 0)
    }

}

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

//Step 1: Show every passengers
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

// Step 2: Show passengers who survived
function step2() {

    allCircles.enter()
        .merge(allCircles)
        .transition(d3.transition()
            .duration(1000)
            .ease(d3.easeLinear))
        .attr('opacity', 1.0)
        .attr('fill', 'white')
        .attr('cx', (d, i) => {
            return d.cx
        })
        .attr('cy', function (d, i) {
            // show only passengers who died
            if (d.survived === 1) {
                return -500;
            } else {
                // keep same cy
                return d.cy;
            }
        })
}


//Step 3a: Differentiate between first, second and third class
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

//Step 3b: Remove 1st class
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

// Step 3c: Remove 2nd class
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
        .attr('opacity', 1.0)
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

// Step6a: Show just the passengers who's dead on 3rd class.
function step6a() {
    let indexFirstClass = 0;
    let indexSecondClass = 0;
    let indexThirdClass = 0;
    let position;

    allCircles.enter()
        .merge(allCircles)
        .transition(d3.transition()
            .duration(500)
            .ease(d3.easeLinear))
        .attr('opacity', 1.0)
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
        .attr('r', 5)
}

// Step6b: Show only the passenger who's dead with the 3rd class.
function step6b() {
    let indexFirstClass = 0;
    let indexSecondClass = 0;
    let indexThirdClass = 0;
    let position;

    allCircles.enter()
        .merge(allCircles)
        .transition(d3.transition()
            .duration(700)
            .ease(d3.easeCubicIn))
        .attr('opacity', 1.0)
        // .attr('fill', function (d) {
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
        })
        .attr('cx', (d, i) => {
            if (d.pclass === 1) {
                position = -500
                indexFirstClass++;
            } else if (d.pclass === 2) {
                position = -500
                indexSecondClass++;
            } else {
                if (d != winner) {
                    position = width + 500;
                } else
                    position = width / 2;
                // position = ((indexThirdClass % 16) * 20 + (((width - (49 * 20))) / 2)) + 640 + 40
                indexThirdClass++;
            }
            return position;
        })
        .attr('cy', function (d, i) {
            if (d.survived === 1) {
                return -500;
            } else {
                // keep same cy
                if (d != winner) {
                    return d.cy
                } else
                    return height / 4;
            }

        })
}

// Step6b: Show only the passenger who's dead with the 3rd class.
function step7() {
    let indexFirstClass = 0;
    let indexSecondClass = 0;
    let indexThirdClass = 0;
    let position;

    allCircles.enter()
        .merge(allCircles)
        .transition(d3.transition()
            .duration(1500)
            .ease(d3.easeLinear))
        .attr('opacity', 0.0)
        .attr('r', function (d, i) {
            if (d == winner) {
                return 30;
            } else {
                return 5;
            }
        })
        .attr('cx', (d, i) => {
            if (d.pclass === 1) {
                position = -500
                indexFirstClass++;
            } else if (d.pclass === 2) {
                position = -500
                indexSecondClass++;
            } else {
                if (d != winner) {
                    position = width + 500;
                } else
                    position = width / 2;
                // position = ((indexThirdClass % 16) * 20 + (((width - (49 * 20))) / 2)) + 640 + 40
                indexThirdClass++;
            }
            return position;
        })
        .attr('cy', function (d, i) {
            if (d.survived === 1) {
                return -500;
            } else {
                // keep same cy
                if (d != winner) {
                    return d.cy
                } else
                    return height + 100;
            }

        })
}

// Le Titanic coule au fond de l'océan
function step8() {
    //
}

animate()