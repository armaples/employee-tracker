// imports + variables
const express = require('express');
// const inquirer = require('inquirer');
const menu = require('./routes/menu');

const PORT = process.env.PORT || 3000;
const app = express();

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

menu.init();

// app.listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}!`);
});