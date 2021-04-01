# Final Project: Fullstack Recipe App

## Scope

For my fimal project, I would like to rework the recipe app from my first project into a fullstack application that uses React Native for the front end, and Node.js and Express for the back end.

The app will use API calls to retrieve recipe information based on the user's ingredients. The user will have the option to add recipes to their 'cookbook', which they can then reference later.

For this functionality, I want to use a PostgreSQL database that will store user profile information as well as favorite recipe's. This should fit on four tables: the user, the user's profile, pantry, and the user's recipes (cookbook).

### ERD:

<img src="./public/Recipe_ERD.png" />

## User Stories:

As a user...

- I want to sign up and log in to the app
- upon logging in for the first time, I want to be prompted to input the ingredients I have on-hand
- I want to be able to update my ingredients whenever needed
- I want to be able to save recipes to, and remove them from, my favorites
- I want an easy-to-use, minimalist UI

## Wireframes:

Log-In/Sign Up Screen:

<img src="./public/login.png" width="200"/>

Welcome Screen:

<img src="./public/welcome_pantry.png" width="200" />

Suggestions Home Screen:

<img src="./public/suggested_recipes.png" width="200" />

Navbar:

<img src="./public/hamburger_navbar.png" width="200" />

Cookbook Index:

<img src="./public/cookbook_index.png" width="200" />

Cookbook Show Page:

<img src="./public/cookbook_show.png" width="200" />

Profile:

<img src="./public/profile.png" width="200" />
