async function getCurrentPrice() {
	const data = await $.getJSON();
	return {
		
	}
}



//function to add a stock to an empty stock slot
const addStock = (slotNum) => {
	let input = document.getElementById("search-bar").value;
	let call = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + input + "&apikey=TQEYVSSUFEDJAQU5";
	
	$.getJSON(call)
	.done(function(data){
		let price = data["Global Quote"]["05. price"];
		let symbol = data["Global Quote"]["01. symbol"];
		
		let slotID = "slot" + slotNum;
		document.getElementById(slotID).querySelector("#symbol").innerHTML = symbol;
		document.getElementById(slotID).querySelector("#price").innerHTML = price;
		
		slot[slotNum - 1] = symbol;
		
	});
};


//function to delete a stock and empty a stock slot
const deleteStock = (slotNum) => {
	slot[slotNum - 1] = "";
	
	let slotID = "slot" + slotNum;
	document.getElementById(slotID).querySelector("#symbol").innerHTML = "Empty";
	document.getElementById(slotID).querySelector("#price").innerHTML = "Empty";
};
	

//function to update a stock slot with a new stock 
const updateStock = (slotNum) => {
	let input = document.getElementById("search-bar").value;
	let call = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + input + "&apikey=TQEYVSSUFEDJAQU5";
	
	$.getJSON(call)
	.done(function(data){
		let price = data["Global Quote"]["05. price"];
		let symbol = data["Global Quote"]["01. symbol"];
		
		let slotID = "slot" + slotNum;
		document.getElementById(slotID).querySelector("#symbol").innerHTML = symbol;
		document.getElementById(slotID).querySelector("#price").innerHTML = price;
		
		//PUT WAY TO ASSIGN SYMBOL TO CORRECT STOCK VAR HERE
		
	});
};


const storageInput = document.querySelector('.storage');
const text = document.querySelector('.text');
const button = document.querySelector('.`addStock`');
const storedInput = localStorage.getItem('slot1');

//////////////////////////////////////////////////////////
//Search Function

document.getElementById("search-stock").addEventListener("submit", function(event) {
	event.preventDefault();
	const symbol = document.getElementById("search-bar").value;
	fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${symbol}&apikey=3C7FVRDGXUUJAQIO`)
	  .then(response => response.json())
	  .then(data => {
		if (data.bestMatches.length > 0) {
		  alert(`${symbol} is a valid stock symbol!`);
		} else {
		  alert(`${symbol} is not a valid stock symbol.`);
		}
	  });
  });


//////////////////////////////////////////////////////////


const BASE_URL = "https://www.alphavantage.co/query?apikey=3C7FVRDGXUUJAQIO&function=TIME_SERIES_MONTHLY_ADJUSTED&datatype=json&symbol=";
API = { get };


function get(url) {
	return fetch(url)
	.then(response => response.json())
	.then(data => formatData(data))
	.then(result => {
		chart.innerText = "";
		new ApexCharts(document.querySelector("#chart"), options).render();
	});
}

function formatData(stockData)
{
	options.title.text = stockData["Meta Data"]["2. Symbol"];
	let solution = [];
	Object.entries(stockData["Monthly Adjusted Time Series"]).forEach(
	([month, monthlyPrices]) => {
	let obj = {};
	obj.x = new Date(month);
	let prices = [];
	prices.push(monthlyPrices["1. open"]);
	prices.push(monthlyPrices["2. high"]);
	prices.push(monthlyPrices["3. low"]);
	prices.push(monthlyPrices["4. close"]);
	obj.y = prices;
	solution.push(obj);
	},
	);
	options.series[0].data = solution.sort((a, b) => a.x - b.x);
}

const chart = document.querySelector("#chart");


let options = {
	chart: {
	type: "candlestick",
	},
	series: [
	{
	data: [],
	},
	],
	title: {
	text: "",
	align: "center",
	},
	xaxis: {
	type: "datetime",
	},
	yaxis: {
	tooltip: {
	enabled: true,
	},
	},
	};


const graph = (slotNum) => 
{
	let slotID = "slot" + slotNum;
	slotID.addEventListener("#information", handleInformation);
}


function handleInformation() {
	event.preventDefault();
	let slotID = "slot" + slotNum;
	let symbol = document.getElementById(slotID).querySelector("#symbol").innerHTML;		
	slot[slotNum - 1] = symbol
	API.get(`${BASE_URL}${symbol}`);
}


/*const graph = (slotNum) => {

	let input = document.getElementById("search-bar").value;
	let call = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + input + "&apikey=TQEYVSSUFEDJAQU5";
	
	$.getJSON(call)
	.done(function(data){
		let price = data["Global Quote"]["05. price"];
		let symbol = data["Global Quote"]["01. symbol"];
		
		let slotID = "slot" + slotNum;
		document.getElementById(slotID).querySelector("#symbol").innerHTML = symbol;
		document.getElementById(slotID).querySelector("#price").innerHTML = price;
		
		slot[slotNum - 1] = symbol;
	});
};
*/

//set local storage
let slot = ["slot1", "slot2", "slot3", "slot4", "slot5", "slot6", "slot7", "slot8", "slot9", "slot10"];
localStorage.setItem('slot', JSON.stringify(slot));

//get local storage

//get 
const slotLocalStorage = localstorage.getItem('slot');
if (slotLocalStorage && slotLocalStorage.length)
{
    const localStorageValue = JSON.parse(slotLocalSlot) 
}

