
$(document).ready(function(){
	loadCart();
	displayCart();
//JQUERY//
$("#addtocart").click(function(){
	alert ("1 item added to cart");
	addItemToCart();
	$ ("#cart-length").html("You have " + cart.length + " items in your cart.");
	displayCart();
});

$ ("#show-cart").on("click", ".delete-item", function(){
            var name = $(this). attr("data-name");
			removeItemFromCartAll(name);
			displayCart();	
		});
$ ("#clear-cart").click (function(){
	console.log("hellpo");
	clearCart();
	displayCart();
})
$("#select-pack").change(function(){
	if ($("#select-pack").val() == "1 roll") {
                $("#flavors").prop("disabled", true);
                $("#flavors").selected("Maple Apple Pecan");
                            } 
                else {
                $("#flavors").prop("disabled", false);
            }
})

$("#flavors").change(function () {
      if($("#flavors option:selected").length > 2) {
      	//$("#flavors").prop("disabled", true);
      	alert ("Please select only two flavors!");
      	
          
      }
  });


//**********************************//
//Shopping CART Functions//

var cart = [];

//**** CONSTRUCTOR for item ****//
function Item(){
	var name = $(".title").text();
	var quantity = $("#quantity option:selected").text();
	var size = $("#select-pack option:selected").text();
	var flavors = $("#flavors option:selected").text();
	var price = $("#price").text();
	this.name = name;
	this.price = price;
	this.quantity = quantity;
	this.size = size;
	this.flavors = flavors;
};

//**** FUNCTION to add item to cart ****//
function addItemToCart(){
	
	//increase the quantity of the item in case same item is added//
	/*for (var i in cart){
		if ((cart[i].name === name) && (cart[i].size === size) && (cart[i].flavors === flavors){
			cart[i].quantity += quantity;
			return;
		}
	}*/
	//push new item to cart//
	var item  = new Item ();
	cart.push(item);
	console.log (cart);
	//console.log (cart.length);
	saveCart();

}

//**** FUNCTION to remove one type of item entirely from cart ****//
function removeItemFromCartAll(name){
	for (var i in cart){
		if (cart[i].name === name){
			cart.splice (i,1); //remove the entire item from the cart//
			break; //quit the loop//
		}
	}
	saveCart();

}

//**** FUNCTION to clear cart ****//
function clearCart(){
	cart = [];
	saveCart();
}

//**** FUNCTION to return the total number of items in the cart ****//
function quantityCart(){
	var totalQuantity = 0;
	for (var i in cart){
		totalQuantity += cart[i].quantity;
	}
	return totalQuantity;
}

//**** FUNCTION to return the total price of all the items in the cart ****//
function totalPrice(){
	var totalPrice = 0;
	for (var i in cart){
		totalPrice += cart[i].price;
	}
	return totalPrice;
}

//**** FUNCTION to save items in cart on local storage ****//
function saveCart(){
	localStorage.setItem("shoppingCart", JSON.stringify(cart));
}

//**** FUNCTION to load items in cart stored on local storage ****//
function loadCart(){
	cart = JSON.parse(localStorage.getItem("shoppingCart"));
}
loadCart();

//**** FUNCTION to display cart in html document//
function displayCart() {
			var output = " ";
			for (var i in cart) {
				if (cart[i].size === "1 roll"){
				output += "<li>"  + "  " + cart[i].name + ", " +" Price: " + cart[i].price + ", "
				+ " Pack Size:  " + cart[i].size + ", "+ " Qunantity:  " + cart[i].quantity  
				+ "<button class = 'delete-item' data-name = '"+ cart[i].name+"'> X </button>"
				+ "</li>";
			}
			else{
				output += "<li>"  + "  " + cart[i].name + ", " +" Price: " + cart[i].price + ", "
				+ " Pack Size:  " + cart[i].size + ", "+ " Qunantity:  " + cart[i].quantity + ", "  
				+ " Added Flavors:  "+ cart[i].flavors + "  "
				+ "<button class = 'delete-item' data-name = '"+ cart[i].name+"'> X </button>"
				+ "</li>";
			}
			}
			$("#show-cart").html(output);
		}

		


});














