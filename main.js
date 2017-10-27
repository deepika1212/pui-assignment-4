	

$(document).ready(function(){
		loadCart();
		displayCart();
		loadWishList();
		displayWishList();
	//JQUERY//
	$("#addtocart").click(function(){
		alert ("1 item added to cart");
		var name = $(this). attr("data-name2");
	    var size = $(this). attr("data-size2");
	    var flavors = $(this). attr("data-flavors2");
		addItemToCart();
		$ ("#cart-length").html("You have " + cart.length + " items in your cart.");
		displayCart();
	});

	$("#saveToWishList").click(function(){
		console.log("wishlist"); 
		alert ("1 item added to wishlist");
		addItemToWishList();
		//$ ("#wishlist-length").html("You have " + wishlist.length + " items in your wishlist.");
		displayWishList();
	});

	$ ("#show-cart").on("click", ".delete-item", function(){
		console.log ("check");
	            var name = $(this). attr("data-name");
	            var size = $(this). attr("data-size");
	            var flavors = $(this). attr("data-flavors");
	            removeItemFromCartAll(name, size, flavors);
				displayCart();	
			});

	$ ("#show-wishlist").on("click", ".delete-item", function(){
		console.log ("check");
	            var name = $(this). attr("data-name");
	            var size = $(this). attr("data-size");
	            var flavors = $(this). attr("data-flavors");
	            removeItemFromWishlistAll(name, size, flavors);
				displayWishList();	
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
	var wishlist = [];


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
		for (var i in cart){
			if (cart[i].name === name){
				if (cart[i].size === size){
					if (cart[i].flavors === flavors){
						cart[i].quantity += quantity;
				return;

					}
				}
			}
				
		}

		//push new item to cart//
		var item  = new Item();
		cart.push(item);
		console.log (cart);
		//console.log (cart.length);
		saveCart();

	}



	//**** FUNCTION to add item to wishlist ****//
	function addItemToWishList(){

		console.log(wishlist);
//increase the quantity of the item in case same item is added//
		for (var i in wishlist){
			if (wishlist[i].name === name){
				if (wishlist[i].size === size){
					if (wishlist[i].flavors === flavors){
						wishlist[i].quantity += quantity;
				return;

					}
				}
			}
				
		}
		if (wishlist === null){
			wishlist = [];
		}
		//push new item to wishlist//
		var item  = new Item ();
		console.log(wishlist);
		console.log(item);
		wishlist.push(item);
		saveWishList();
	}



	//**** FUNCTION to remove one type of item entirely from cart ****//
	function removeItemFromCartAll(name, size, flavors){
		for (var i in cart){
			if (cart[i].name === name){
				if (cart[i].size === size){
					if (cart[i].flavors === flavors){
				cart.splice (i,1); //remove the entire item from the cart//
				break; //quit the loop//
			}
		}
	}
}
		saveCart();

	}

	function removeItemFromWishlistAll(name, size, flavors){
		for (var i in wishlist){
			if (wishlist[i].name === name){
				if (wishlist[i].size === size){
					if (wishlist[i].flavors === flavors){
				wishlist.splice (i,1); //remove the entire item from the cart//
				break; //quit the loop//
			}
		}
	}
}
		saveWishList();

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

	//**** FUNCTION to save items in wishlist on local storage ****//
	function saveWishList(){
		localStorage.setItem("myWishlist", JSON.stringify(wishlist));
	}

	//**** FUNCTION to load items in wishlist stored on local storage ****//
	function loadWishList(){
		wishlist = JSON.parse(localStorage.getItem("myWishlist"));
	}
	loadWishList();

	//**** FUNCTION to display cart in html document//
	function displayCart() {
				var output = " ";
				for (var i in cart) {
					if (cart[i].size === "1 roll"){
					output += "<li>"  + "  " + cart[i].name + ", " +" Price: " + cart[i].price + ", "
					+ " Pack Size:  " + cart[i].size + ", "+ " Qunantity:  " + cart[i].quantity + ", " + "Added Flavors: NA" 
					+ "<button class = 'delete-item' data-name = '"+ cart[i].name+"' data-size = '"+ cart[i].size+"' data-flavors = '"+ cart[i].flavors+"'> X </button>"
					+ "</li>";
				}
				else{
					output += "<li>"  + "  " + cart[i].name + ", " +" Price: " + cart[i].price + ", "
					+ " Pack Size:  " + cart[i].size + ", "+ " Qunantity:  " + cart[i].quantity + ", "  
					+ " Added Flavors:  "+ cart[i].flavors + "  "
					+ "<button class = 'delete-item' data-name = '"+ cart[i].name+"' data-size = '"+ cart[i].size+"' data-flavors = '"+ cart[i].flavors+"'> X </button>"
					+ "</li>";
				}
				}
				$("#show-cart").html(output);
			}

	//**** FUNCTION to display wishlist on cart page//
	function displayWishList() {
				var result = " ";
				for (var i in wishlist) {
					if (wishlist[i].size === "1 roll"){
					result += "<li>"  + "  " + wishlist[i].name + ", " +" Price: " + wishlist[i].price + ", "
					+ " Pack Size:  " + wishlist[i].size + ", "+ " Qunantity:  " + wishlist[i].quantity + ", " + "Added Flavors: NA" 
					+ "<button class = 'delete-item' data-name = '"+ wishlist[i].name+"' data-size = '"+ wishlist[i].size+"' data-flavors = '"+ wishlist[i].flavors+"'> X </button>"
					+ "</li>";
				}
				else{
					result += "<li>"  + "  " + wishlist[i].name + ", " +" Price: " + wishlist[i].price + ", "
					+ " Pack Size:  " + wishlist[i].size + ", "+ " Qunantity:  " + wishlist[i].quantity + ", "  
					+ " Added Flavors:  "+ wishlist[i].flavors + "  "
					+ "<button class = 'delete-item' data-name = '"+ wishlist[i].name+"' data-size = '"+ wishlist[i].size+"' data-flavors = '"+ wishlist[i].flavors+"'> X </button>"
					+ "</li>";
				}
				}
				$("#show-wishlist").html(result);
			}

			


	});














