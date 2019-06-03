# AutoMart
[![Build Status](https://travis-ci.org/kazungusafari/AUTOMART.svg?branch=feature)](https://travis-ci.org/kazungusafari/AUTOMART)
![Coverage Status](https://coveralls.io/repos/github/kazungusafari/AUTOMART/badge.svg?branch=feature)](https://coveralls.io/github/kazungusafari/AUTOMART?branch=feature)
[![Maintainability](https://api.codeclimate.com/v1/badges/c4b809acd8c65de039bc/maintainability)](https://codeclimate.com/github/kazungusafari/AUTOMART/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/c4b809acd8c65de039bc/test_coverage)](https://codeclimate.com/github/kazungusafari/AUTOMART/test_coverage)

Auto Mart is an online marketplace for automobiles of diverse makes, model or body type. With Auto Mart, users can sell their cars or buy from trusted dealerships or private sellers.

# Features

## Core Features
- User can sign up.
- User can sign in.
- User (seller) can post a car sale advertisement.
- User (buyer) can make a purchase order.
- User (buyer) can update the price of his/her purchase order.
- User (seller) can mark his/her posted AD as sold.
- User (seller) can update the price of his/her posted AD.
- User can view a specific car.
- User can view all unsold cars.
- User can view all unsold cars within a price range.
- Admin can delete a posted AD record.
- Admin can view all posted ads whether sold or unsold.

## Extra Features

- User can reset password.
- User can view all cars of a specific body type.
- User can flag/report a posted AD as fraudulent.
- User can view all unsold cars of a specific make (manufacturer).
- User can view all used unsold cars.
- User can view all new unsold cars.


## Links
- UI Templates can be found [here]( https://kazungusafari.github.io/AUTOMART/UI/login.html)
- APIs are hosted on Heroku [here](https://cheki.herokuapp.com)
- API documentation can be found [here](https://cheki.herokuapp.com/docs)
- This project is managed with Pivotal Tracker [here](https://www.pivotaltracker.com/n/projects/2346662)


# Getting Started
To have this application running on your computer, follow the following steps



### Prerequisites
- You need to have [Node.js](nodejs.org) installed 


### Installing
- Clone or download this repository using `https://github.com/kazungusafari/AUTOMART.git`
- Run `npm install` to install all the application's dependencies
- Set the following environment variables in your `.env` file:

    - `PORT` - An Integer specifying the PORT your application will run on.
  
    - `SECRET_KEY` - A random string used for generation authorization tokens.
  
    - `APPLICATION_URL` - It should be formated thus:  http(s)://(host)(:port)(TLD)/api/v1 
       Example:

 ```
    http://localhost:8000/api/v1 or https://cheki.herokuapp.com/api/v1

 ```
    
    
 
### Running The Tests

#### Testing Locally
- Run `npm run test`



#### Testing With Postman
- Install [Postman](https://getpostman.com).
- View the api endpoints [here](cheki.herokuapp.com/docs).
   
	 
   
## Built With
- [Node.Js](https://nodejs.org)
- [ExpressJs](https://expressjs.com)



### Testing Tools
- [Mocha](https://www.npmjs.com/package/mocha)
- [Chai](https://www.npmjs.com/package/chai)
- [nyc](https://www.npmjs.com/package/nyc)
- [Istanbul](https://www.npmjs.com/package/istanbul



### Coding Style
- [AirBnB](https://github.com/airbnb/javascript)



## Author
- [Kazungu Safari](https://github.com/kazungusafari)
