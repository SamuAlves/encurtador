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
		console.log("Erro na conexão do banco de dados");
	}
})

app.get("/",function(request,response){
	response.json(
        {
            message: "Bem vindo a api de encurtamento e consulta de links"
        }
    )})

app.post("/api/encurtar",async(request,response) => {
        let idunico = Math.random().toString(36).replace(/[^a-z0-9]/gi,'').substr(2,10);
        let sql = `INSERT INTO links(urllongo,urlcurto) VALUES('${request.body.urllongo}','${idunico}')`;
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

app.get("/api/buscatotal",async(request,response) => {
        let sql = `SELECT * FROM links`;
        con.query(sql,async(error,result) => {
            if(error){
                response.status(500).json({
                    status:"Erro",
                    message:"Algo deu Errado"
                });
            } else {
                response.status(200).json(result);
            }
        })
    });
  
app.get("/:urlencurtado",async (request,response) => {
        let urlencurtado = request.params.urlencurtado;
        let sql = `SELECT * FROM links WHERE urlcurto='${urlencurtado}' LIMIT 1`;
        con.query(sql,async(error,result) => {
            if(error){
                response.status(500).json({
                    status:"Erro",
                    message:"Algo deu Errado"
                });
            } else {
                        response.status(200).json(result);
                    }
                })
            
        }
    ,);

app.get("/data/:consultadata",async(request,response) =>{
        let consultadata = parseInt(request.params.consultadata);
        let sql = `SELECT * FROM links WHERE data=${consultadata}`;
        con.query(sql,async(error,result) =>{
            if(error){
                response.status(500).json({
                    status:"Erro",
                    message:"Algo Deu Errado"
                });
            } else {
                        response.status(200).json(result);
                    }
                })
            
        }
    ,);


app.listen(5000);