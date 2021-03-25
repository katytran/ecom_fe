# Project Brief: EMBECA 

EMBECA is an e-commerce platform that offers personal care and beauty products.

###  Plan

- User:
    - Create, update an account 
    - Login email, oAuth with Facebook and Google
    - Review products
    - Create, update blogs, comments in the beauty review section
    - Stripe payment implementation

- Product:
    - Producy detail page (zoom in feauture, price, brand, ingredients)
    - Product reviews and ratings
    - Product pagination
    - Product search feature
    - Product cart
    - Product categories
    - Search by categories
    - Sort by highest, lowest rating, most helpful 
   
- Admin: 
    - Admin Create, Read, Update, and Delete PRODUCT/ ORDER/ REVIEWS
    - User management
    - Check products as shipped



### Models

- Product
    - Name
    - Description
    - Price
    - Ingredients
    - Category
    - Images
    - Reviews
        - Rating
        - Comment
    - Rating Average
    - NumReviews
    - NumSales
    - CountInStock
    - isDeleted flag
    
- User
    - name
    - email
    - password
    - role (admin or user)
    - isDeleted flag
    
- Order
    - User ID
    - products 
    - shipping
        - address
        - city
        - district
        - ward
        - country
        - postal code
    - total price
    - payment method
    - payment results
    - shipping price
    - isPaid flag
    - paidAt (date)
    - isDeliveredFlag
    - deliveredAt (date)
    - isDeleted flag
  


#### **Week 1: by friday 26 2021 (e-com)
- Homepage, detail product page, checkout page
- User can register and login, oauth implemetation
- User can search for products
- User can filter products by categories, skin type
- User can add products to cart
- User can add products to favorite list
- Only purchase verified user can rate and post review
- User can rate review helpful. 

- Producy detail page (zoom in feauture, price, brand, ingredients)
  - Sort by highest, lowest rating, most helpful 
  
- Checkout Page
    - Stripe implemation

- Admin Create, Read, Update, and Delete PRODUCT/ ORDER/ REVIEWS
- User management

#### **Week 2: social beauty blog site
- Homepage, detail blog page
- User can post a beauty blog
- User can search for blog and QA
- User can filter blogs by most helpful, popular blogs,
- User can reply, react to people's blog
- User can add a blog to saved list

Blog detail page-




- Chat between users
- Chat bot







