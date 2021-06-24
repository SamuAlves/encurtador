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

con.connect(function(error){
	if(error){
		console.log("Database connection failed");
	}
})

app.get("/",function(request,response){
	response.json(
        {
            message: "Bem vindo a api de encurtamento e consulta de links"
        }
    )})

app.post("/api/encurtar",async(request,response)=>{
        let idunico = Math.random().toString(36).replace(/[^a-z0-9]/gi,'').substr(2,10);
        let sql = `INSERT INTO links(urllongo,urlcurto) VALUES('${request.body.urllongo}','www.samu.el/${idunico}')`;
        con.query(sql, async (error, result) => {
            if (error) {
                response.status(500).json({
                    status: "Erro",
                    message: "Algo deu Errado"
                });
            } else {
                response.status(200).json({
                    status: "ok",
                    urlencurtado: idunico
                });
            }
        })
    });

    
    





app.listen(5000);