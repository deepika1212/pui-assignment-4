	$(document).ready(function(){
	loadCart();
		displayCart();
		var cart = [];

		function loadCart(){
			cart = JSON.parse(localStorage.getItem("shoppingCart"));
		}

		function saveCart(){
	localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

		function displayCart() {
			var output = " ";
			for (var i in cart) {
				output += "<li>" + cart[i].name + ", " +" Price: " + cart[i].price + ", "
				+ " Pack Size:  " + cart[i].size + ", "+ " Qunantity:  " + cart[i].quantity + ", "  
				+ " Flavours Chosen:  " + cart[i].flavors + "  "
				+ "<button class = 'delete-item'> Remove Item </button>" 
				+ "</li>";
			}
			$("#show-cart").html(output);
		}
		$ ("#show-cart").on("click", ".delete-item", function(){
			$(this).parent('li').remove();
			//console.log("delete-item");
			//alert ("1 item deleted");
			//console.log(cart.length);
			
			//saveCart();
			//return false;
			//console.log(cart.length);
			
			displayCart();
			

		});


			});