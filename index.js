const express = require("express");
const mysql = require("mysql");
const con = mysql.createConnection({
	host:"localhost",
	user:"samuel",
	password:"196500",
	database:"encurtador"
});
const app = express();
app.use(express.json());
