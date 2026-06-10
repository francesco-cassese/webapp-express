import express from "express";

const App = express();
const PORT = process.env.PORT || 3000;

App.use(express.json());

console.log('Ciao porco');

App.listen(PORT);