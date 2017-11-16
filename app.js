'use strict';


var arrStores = []; //storing my store data into an array
var openHours = ['6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM']; //the hours each store is open

function Store(location, minCust, maxCust, avgCookiePerCust) { //Cookie store constructor function
  this.location = location; // Store name
  this.minCust = minCust; // Min customers in 1 hour
  this.maxCust = maxCust; // Max customers in 1 hour
  this.avgCookiePerCust = avgCookiePerCust; //average number of cookies a customer buys at this location
  this.avgCookiePerHour = 0; // function generated number taking a random number between maxCust and minCust and multiplying it by average cookie per customer
  this.hourlySales = []; // an hourly list of sales in that given hour
  this.totalSalesPerStore = 0; //Total cookie sales in a day per store will be set here
  arrStores.push(this);//creating an array of my instantiated objects
  this.findHourlySales();
  this.findTotalSalesPerStore();
};

//defining my methods
Store.prototype.findAvgCookiePerHour = function() { //Will use rng() and average cookie per customer to find average cookies sold per hour
  for (var i = 0; i < arrStores.length; i++) {
    var randomNumber = rng(this.maxCust, this.minCust); //assigning a var to my stores random generated customer per hour
    this.avgCookiePerHour = Math.round(randomNumber * this.avgCookiePerCust); //arithmitic to find a random number of cookies sold in an hour
  }
  return this.avgCookiePerHour; //update value of arrStores
};

Store.prototype.findHourlySales = function() {//assign a number of sales per hour the store is open
  for (var j = 0; j < openHours.length; j++) { //loop through total hours open within each store to create a value for the hourlySales array
    this.findAvgCookiePerHour();
    this.hourlySales[j] = Math.round(this.avgCookiePerHour); //use findAvgCookiePerHour() to update hourlySales array and round to nearest integer
  }
  return this.hourlySales;
};

Store.prototype.findTotalSalesPerStore = function() { //function to add the total number of sales made at each store in a day.
  var totalSalesPerStore = this.hourlySales.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;}); //something I found online to add all the integers in an array
  this.totalSalesPerStore = totalSalesPerStore; //updating each objects value for total sales in a day
  return this.totalSalesPerStore;
};

//instantiating my objects with hard data

var firstPike = new Store('1st and Pike', 23, 65, 6.3);
var seaTac = new Store('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Store('Seattle Center', 11, 23, 3.7);
var capitalHill = new Store('Capital Hill', 20, 38, 2.3);
var alki = new Store('Alki', 20, 38, 4.6);




function rng(min, max) { //helper function to find a random number
  return Math.floor(Math.random() * (max - min)) + min;
};

function buildTableHead() { //building out the header (top line) for my table
  var theadEl = document.createElement('thead'); //create <thead> element
  var headRow = buildTableRow('', openHours, 'Totals'); //create table header row with arguments
  theadEl.appendChild(headRow); //attach the data to table
  return theadEl;
}

function buildTableBody() { //Fill out the rest of the table with data
  var tbodyEl = document.createElement('tbody'); //create <tbody> element

  for(var i = 0; i < arrStores.length; i++) { //looping through my Stores object to store data for table
    var bodyRow = buildTableRow(arrStores[i].location, arrStores[i].hourlySales, arrStores[i].totalSalesPerStore);
    tbodyEl.appendChild(bodyRow); //attach the data to the table
  }
  return tbodyEl;
}

function buildTableRow(yAxisHeader, data, yAxisFooter) { //generic function to build a table row, has 3 parameters for the pieces of data needed to fill out chart
  var trEl = document.createElement('tr'); //create a new <tr> element
  var tdElFirst = document.createElement('td'); //create a new <td> element i.e. data for new row
  tdElFirst.textContent = yAxisHeader; //first parameter, assigns this as the first value on the left of  the table
  trEl.appendChild(tdElFirst); //attach new data to table

  for (var i = 0; i < data.length; i++) { //looping through array of data to populate content for table
    var tdElSecond = document.createElement('td'); //making a new cell for each piece of data in my array
    tdElSecond.textContent = data[i]; //filling that cell with value from array[i]
    trEl.appendChild(tdElSecond); //attach second cell to table
  }
  var tdElThird = document.createElement('td'); //create new <td> element
  tdElThird.textContent = yAxisFooter; //the last datatype for table
  trEl.appendChild(tdElThird); //attach to table

  return trEl;
}

function buildTable() { //find my table id, and create the header and body of table with all data
  var tableEl = document.getElementById('store_table'); //grabbing my table from index.html
  tableEl.appendChild(buildTableHead()); //attach my table header to the table
  tableEl.appendChild(buildTableBody()); //attach the rest pf my table data to the table
};

buildTable(); //inoke function to build my table

formEl.addEventListener('submit', pushSubmit); //event listener, when i push submit, invoke pushSubmit()

var formEl = document.getElementById('input_store_data'); //grab my <form> element

function pushSubmit(event) { //do thid when I push the submit button
  event.preventDefault(); //prevent default action of button press (clearing the page)
  var storeDataInput = {}; //assign an empty object to store data
  storeDataInput.location = event.target.location.value; //add a location key:pair
  storeDataInput.minCust = parseInt(event.target.mincust.value); //add a minCust key:pair and convert string input into a number
  storeDataInput.maxCust = parseInt(event.target.maxcust.value);//add a maxCust key:pair and convert string input into a number
  storeDataInput.avgCookiePerCust = parseInt(event.target.cookiespercust.value);//add a avgCookiePerCust key:pair and convert string input into a number
  console.log('my input data', storeDataInput);

  var newStore = new Store(storeDataInput.location, storeDataInput.minCust, storeDataInput.maxCust, storeDataInput.avgCookiePerCust); //instantiate dynamically created object
  console.log(newStore);
  addTableRow(newStore.location, newStore.hourlySales, newStore.totalSalesPerStore); // add new row to table based on new object data
}

function addTableRow(location, hourlySales, totalSales) { //function similar to buildTableRow(), but built specifically for adding a row dynamiccally made with inputs
  var table = document.getElementById('store_table'); //get my table from HTML
  var trEl = document.createElement('tr'); //create a new row
  table.appendChild(trEl); //add the row to the table
  var tdElFirst = document.createElement('td'); //create a new cell
  tdElFirst.textContent = location; //assign a value to that cell
  trEl.appendChild(tdElFirst); //attach the cell

  for (var i = 0; i < openHours.length; i++) { //loop through hourly sales to find all data I need to display
    var tdElSecond = document.createElement('td'); //create a new cell
    tdElSecond.textContent = hourlySales[i]; //assign data as text content
    trEl.appendChild(tdElSecond); //attach to table
  }
  var tdElThird = document.createElement('td'); //create a new cell
  tdElThird.textContent = totalSales; //make the value total sales for the day
  trEl.appendChild(tdElThird); //attach to table

  return trEl;
};
