import * as d3 from 'd3';
import { scaleLinear } from 'd3';
import titanic from '../data/titanic.csv';

const counts = {};
const ticketNumbers = new Array()
const deadPassengers = titanic.filter(elm => !elm.survived)

//console.log(deadPassengers);
getTicketValues(deadPassengers);

for (const num of ticketNumbers) {
    counts[num] = counts[num] ? counts[num] + 1 : 1;
  }


//console.log("Nombre de W: " + counts['5']);
ticketNumbers.sort();
console.log(ticketNumbers)


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
    return ticketNumbers;
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