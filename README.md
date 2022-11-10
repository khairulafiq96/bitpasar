# bitPasar
## An e-commerce site with direct cryptocurrency payment

# Demo Video
***Click the image and the video will open in a new tab***
[![Watch the video](https://i9.ytimg.com/vi_webp/Ivbu0vCx9CU/sddefault.webp?v=636d4c51&sqp=CLSbtZsG&rs=AOn4CLCyJgu1kfdJLw40lZPZQdcjt7m9OA)](https://youtu.be/Ivbu0vCx9CU)


# Description
### Main Features of the application :
- User
  - buy products with ethereum
  - view advertisements
  - manage purchases
  - manage account
- Merchants 
  - advertise products/assets
  - manage products/assets
  - manage shipments of the product

# Developed with
- Frontend : ReactJs, Redux, TailwindCSS, Web3Modal
- Backend : Python, Flask, PostgreSQL
- Deployed to : Heroku, Firebase (Storage)

# Challenges Faced
- Refactoring code to implement new library
> I had to refactor most of the components of the app. This is due to the mistake of implementing ethers instead of web3modal wallet. In the future, i should consider directly which library to use in order to implement a mobile solution.
- Design Challenges
> Web2 must be implemented, therefore a mutable database was implemented which is against the decentralization ethos. Future enhancements should be indepedent of centralized methods of storing/hosting data. 
- Technical Skills
> Development time was increased when implementing a new library. Some time (1 day to 1 week) is required to configure and implement the library onto the code. I have faced this challenge when trying to implement TailwindCSS, Web3Modal, Firebase & JEST

# Table of Contents
- [Requirements](#requirements)
  * [Objectives](#objectives)
  * [End user scope](#end-user-scope)
  * [Software development requirements](#software-development-requirements)
  * [End user software requirements](#end-user-software-requirements)
  * [Footnotes](#footnotes)
- [Design](#design)
  * [Software Design](#software-design)
  * [Interface design](#interface-design)
- [Testing](#testing)
  * [Testing methods](#testing-methods)
- [Deployment](#deployment)
  * [Heroku](#heroku)
  * [CI CD](#ci-cd)
- [How to run the app](#how-to-run-the-app)

# Requirements
## Objectives
- To validate cryptocurrency as a legitimate medium of exchange (Completed)
- To provide anonymity to the users and merchants
- To implement blockchain technology on :
  - Merchants Validity
  - Content Moderation
  - Site Monetization
  - (More to come...)

## End user scope
  - Non-wallet users
  - Wallet users
    - Buyers
    - Merchants

## Software development requirements
Software required to start the development of the application
- Frontend
  - node : v16.15.1
  - npm :  8.11.0
  - Visual Studio Code *Any text editor would be fine
- Backend
  - Python :  3.10.5
  - Postgresql PostgresSQL 14
  - PgAdmin 4
- External Accesses
  - obtain projectId for web3modal @ https://cloud.walletconnect.com/sign-in
  - obtain the initializeConfig for firebase storage settings

## End user software requirements
Software required for the end user to enable crypto payment
- Modern Browser ( Chrome )
- Wallets
  - Browser : Metamask
  - Mobile : Rainbow, Trust Wallet

## Footnotes 
- User is not required to register their account to conduct payment. Only connecting to their wallet is sufficient.
- Once the user registered their account, the user is able to have features as the merchant.
- The registration process allows their data to be stored in the database, therefore the forms are filled in automatically

# Design
## Software Design
![Software design](https://raw.githubusercontent.com/khairulafiq96/Repo_Media/master/bitPasar/readme/softwaredesign.JPG)

## Interface design
***This is the initial interface design of the app, changes were conducted during the development***
-  Development flow indicated in number in red

![interface design](https://raw.githubusercontent.com/khairulafiq96/Repo_Media/master/bitPasar/readme/uidesign.jpg)


# Testing
## Testing methods
> Manual end-to-end testing method is implemented. Currently, I'm learning about React testing library & JEST to implement automated unit and integration testing.

# Deployment
## Heroku
- Frontend
  - ReactJs
    > Heroku provides the buildpack files therefore no further configuration is required
- Backend
  - Python
     > additional files (Procfile & Gunicorn) are required for the deployment to Heroku
  - PostgresQL
    > No additional configuration is required. The database from local are copied directly to the heroku postgreSQL

## CI CD
- Manual deployment in the Heroku dynos as I'm currently testing the DEV branch
- Further enhancements should implement the automated test scripts before deploying the branch

# How to run the app
> Make sure all of the software development requirements are installed & obtained access [Software development requirements](#software-development-requirements)

Install the dependencies
> npm i

Run the application
> npm start