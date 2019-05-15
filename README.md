# QuickCredit [![Build Status](https://travis-ci.org/ngireric123/QuickCredit.svg?branch=develop)](https://travis-ci.org/ngireric123/QuickCredit)    <a href="https://codeclimate.com/github/ngireric123/QuickCredit/maintainability"><img src="https://api.codeclimate.com/v1/badges/7f3e458d461aa92a8206/maintainability" /></a> [![Coverage Status](https://coveralls.io/repos/github/ngireric123/QuickCredit/badge.svg?branch=develop)](https://coveralls.io/github/ngireric123/QuickCredit?branch=develop)


Quick Credit is an online lending platform that provides short term soft loans to individuals. This
helps solve problems of financial inclusion as a way to alleviate poverty and empower low
income earners.               (https://quickcredit-challenge2.herokuapp.com/)


# Getting Started

Install dependencies 
`npm install`

# prerequisites

Make sure you have node installed

# Starting development server 

`npm start`

# Run Tests 

`npm test`

# Deployment

The application template is hosted on github pages https://ngireric123.github.io/QuickCredit/UI/


# Endpoints
### Endpoints to post and patch user

| HTTP Method       | End point                                  |     Action               |
| ------------------|:------------------------------------------:| ------------------------:|
| POST              | /api/v1/auth/signup                        | Create a user account    |
| POST              | /api/v1/auth/login                         | Login                    |
| PATCH             | /api/v1/users/ngireric123@gmail.com/verify | Mark a user as verified  |

### Endpoints to get,create,post and patch loans

| HTTP Method       | End point                                 |     Action                                   |
| ------------------|:-----------------------------------------:| --------------------------------------------:|
| POST              | /api/v1/loans                             | apply for a loan                             |
| GET               | /api/v1/loans                             | view all loan applications                   |
| GET               | /api/v1/loans/1                           | view a specific loan                         |
| GET               | /api/v1/loans?status=approved&repaid=false| view current loans (not fully repaid)        |
| GET               | /api/v1/loans?status=approved&repaid=true | view all repaid loans                        | 
| PATCH             | /api/v1/loans/4                           | approve or reject a client’s loan application|


### Endpoints to get and post loans repayment

| HTTP Method       | End point                 |     Action                              |
| ------------------|:-------------------------:| ---------------------------------------:|
| GET               | /api/v1/loans/1/repayments| view all loan repayment history         |
| POST              | /api/v1/loans/3/repayment | Create a loan repayment record          |


# Author

##### . NGIRABABYEYI Eric  - https://github.com/ngireric123
