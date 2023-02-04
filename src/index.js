const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const express = require("express");
const bodyParser = require("body-parser");
const randomUser = require("./services/api");

// Definindo o Express e a porta do app:
const app = express();
const port = 3001;

/* Configuração:
    * Add Helmet para melhorar a segurança da app;
    * Usando o BodyParser para Objetos JSON;
    * Desabilitando CORS para todas requisições;
    * Add Morgan para termos Log das resquisições HTTP.
*/
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(morgan('combined'));

// Rota principal:
app.get("/", (req, res)=>{
    res.send("Server On")
})

// Rota para gerar usuário:
app.get("/users", (req, res)=>{
    // Quantidade de usuário:
    const userAmount = 10;

    // Consumindo API externa para gerar a quantidade solicitada de usuário:
    randomUser.get(`api/?results=${userAmount}`).then((item)=>{
        let users = [];
        for(let index=0; index<userAmount; index++){
            let response = item.data.results[index]
            let obj = {
                name: response.name.first,
                lastName: response.name.last,
                age: response.dob.age,
                city: response.location.city,
                email: response.email,
                cell: response.cell,
                username: response.login.username,
                password: response.login.password
            };
            users.push(obj)
        }
        res.send(users);
    }).catch((error)=>{
        console.log(error)
        res.send("Ops! Estamos em manutenção...")
    })
})

// Executando API:
app.listen(port, ()=>{
    console.log(`Servidor sendo executado na porta: ${port}`)
})

