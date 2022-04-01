import * as d3 from 'd3';
import titanic from '../data/titanic.csv';

const ticketNumbers = new Array();
titanic.forEach(elm => {
    const ticket = elm.ticket
    console.log(ticket)
    let letters = ticket.match(/[a-zA-Z0-9]/g)
    console.log(letters)
  });

