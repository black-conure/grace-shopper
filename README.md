	
  
  Graceful-Venues is an interactive web application allowing users to rent specialized spaces for small amounts of time.  This e-commerce website was built using Node.JS, React, Redux, Express, Sequelize, PostgreSQL, payment integration with Stripe, and styled using Semantic.UI-React.  
  
  The web app allows both users and guests to add different items to their cart.  User carts are stored on the PostGres database, and guest carts persist in local storage.  Upon checkout, a “isCart” value is switched to false and a purchase price and order date are generated.  Upon adding an item to a cart, a new cart is created.  A guest cart will be merged into a user cart when the user signs up or logs in, so users will not need to re-add items from their guest cart when logging in.

Users are able to update their personal information, email address, and passwords by utilizing the user profile page.  Users who change their email will use the updated email address to log into the application in the future.  Users can also view their order history on their profile page.  

	

The most challenging aspects of this project were: 
	Persistent guest carts
	Merging a guest cart into a user cart upon log in
	Schema Design - how to store the cart (as a separate table or with a boolean)
	Redux Store Design - how to store cart and user data

Future Goals:
	Dynamic items in cart icon (changes upon adding and removing from cart)
	Guest checkout
	Email Confirmation
	Admin users and privileges
	Scheduling and Calendar view
	User can upload their own spaces for rent and manage their rentals

