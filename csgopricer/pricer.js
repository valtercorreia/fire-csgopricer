document.body.style.border = "5px solid green";

//Retrieves the inventory for the user

var userid = document.URL.split("/")[4];

var xreq = new XMLHttpRequest();
xreq.open("GET", "http://steamcommunity.com/id/" + userid + "/inventory/json/730/2", false);
xreq.send();


//Parses the inventory json

if(xreq.status == 200){
	var json_invetory = JSON.parse(xreq.responseText);

	var inv_info = json_invetory.rgDescriptions;

	for(var item in inv_info){

		var item_market_hash = inv_info[item].market_hash_name;

		console.log(item_market_hash);

		xreq.open("GET", "http://steamcommunity.com/market/priceoverview/?currency=1&appid=730&market_hash_name=" + item_market_hash, false);
		xreq.send();

		if(xreq.status == 200){
			var json_prices = JSON.parse(xreq.responseText);

			var item_price = json_prices.lowest_price;

			console.log(item_price);
		}

	}
}

//console.log(json);