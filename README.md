# Mortgage Client Side and Server Side Project

This project is a full-stack web application developed as part of an academic course in software engineering. The primary purpose of the application is to assist users in determining the most suitable mortgage option based on their provided data.

## Description

The application consists of both a client-side and server-side component. The client-side interface is built using HTML, CSS, and JavaScript, allowing users to interact with the application through a user-friendly web interface. The server-side component is powered by Node.js and Express, a popular JavaScript runtime and web application framework, respectively.

The application utilizes SQLite as the database management system to store and retrieve user data and mortgage-related information.

EJS (Embedded JavaScript) templating is employed to render dynamic web pages on the server side.

Security features are implemented using bcrypt for password hashing and nodemailer for email verification and password reset functionality.

The application's core functionality involves collecting user inputs such as income, expenses, and desired loan amount, and then analyzing this data to recommend the most suitable mortgage option. The recommendations are based on predefined algorithms and calculations, taking into account factors like interest rates, loan terms, and user preferences.

With its user-friendly interface and robust backend, this project aims to simplify the mortgage selection process for users, providing them with personalized recommendations based on their unique financial situation.

## Technologies

- Node.js
- Express
- EJS
- HTML
- CSS
- JavaScript
- SQLite
- nodemailer
- bcrypt

## Installation

To install and set up the project locally, follow these steps:

1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Install the required dependencies by running the following command:

```bash
npm install