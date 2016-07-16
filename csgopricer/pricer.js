//document.body.style.border = "5px solid green";

//Retrieves the inventory for the user

var x = document.getElementsByClassName("itemHolder");

var userid = document.URL.split("/")[4];

var xreq = new XMLHttpRequest();
xreq.open("GET", "http://steamcommunity.com/id/" + userid + "/inventory/json/730/2", false);
xreq.send();


//Parses the inventory json

if(xreq.status == 200){
	var slot_idx = 0

	var json_invetory = JSON.parse(xreq.responseText);

	var rgInventory = json_invetory.rgInventory;

	var rgDescriptions = json_invetory.rgDescriptions;

	for(var item in rgInventory){

		var description_id = rgInventory[item].classid + "_" + rgInventory[item].instanceid;

		var item_market_hash = rgDescriptions[description_id].market_hash_name;

		// Returns item price from market
		xreq.open("GET", "http://steamcommunity.com/market/priceoverview/?currency=1&appid=730&market_hash_name=" + item_market_hash, false);
		xreq.send();

		if(xreq.status == 200){
			var json_prices = JSON.parse(xreq.responseText);

			var item_price = json_prices.lowest_price;

			slot_idx++;

			//Creates a new div that encapsulates the price

			var price_elem = document.createElement("div")
			price_elem.style.position = "absolute";
			price_elem.style.bottom = "15px";
			price_elem.style.height = "14px";
			price_elem.style.width = "100%";
			price_elem.style.backgroundColor = "#ff0000";
			price_elem.style.color = "#ffffff";
			var price_text = document.createTextNode(item_price);

			price_elem.appendChild(price_text);

			var tmp = document.getElementById("item730_2_" + rgInventory[item].id)

			//Adds the price to the page
			tmp.insertBefore(price_elem, tmp[1]);

		}
	}

	
}
