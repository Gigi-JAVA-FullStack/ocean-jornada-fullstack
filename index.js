require('dotenv').config()
console.log(process.env) // remove this after you've confirmed it is working

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongodb = require('mongodb');

//mongodb+srv://GigiSimas:Wz15BBTah9r3O8IE@cluster0.nd0y1mg.mongodb.net
//const DB_URL = "mongodb://127.0.0.1:27017";
const DB_URL = "mongodb+srv://GigiSimas:Wz15BBTah9r3O8IE@cluster0.nd0y1mg.mongodb.net";
const DB_NAME = "ocean-bancodados-aula3";

//Toda vez que declaramos uma funcao, precisamos chamar ela... no final... ultima linha...
async function main(){

//Conexao com o banco de dados -> Injecoes de dependencia com o MongoDB
const { MongoClient, ObjectId } = require('mongodb');
console.log("Conectando com BD.");
const client = await MongoClient.connect(DB_URL);
const db = client.db(DB_NAME);
const collection = db.collection("itens");
console.log("BD conectado com sucesso.")

// O que vier no BODY eh JSON (requisicao -> req)
app.use(express.json());
// Endpoinnt / 

app.get('/', function (req, res){
    res.send('Hello, world!');
});

//Endpoint /oi

app.get('/oi', function(req, res){
    res.send('Oi, mundo!')
})

//Criar lista de string (informacoes)
const itens = ['Rick Sanchez', 'Morty Smith', 'Summer Smith'];
//Index 0,1,2....todos os valores sao do tipo text

// CRUD -> da lista de informacoes

//CREATE , READ [GET], endPoint readAll -> 
app.get('/item', async function(req, res){
    const documentos = await collection.find().toArray();
    res.send(documentos);
});

// Endpoint Read Single by ID -> [GET] /item/:id -> depois da barra/ tudo vira PARAMS
app.get('/item/:id', async function(req, res){
    const id = req.params.id;
    const item = await collection.findOne({ _id: new ObjectId(id)});
    res.send(item);
});

//CREATE, [POST]// Endpoint Create -> [POST] /item
app.post('/item', async function(req, res){
    //console.log(req.body);
    const item = req.body;
    await collection.insertOne(item)
    res.send(item);
});

//Endpoint UPDATE -> [PUT] /item/:id
app.put("/item/:id", async function (req, res){
    const id = req.params.id;
    const body = req.body;
    await collection.updateOne(
        { _id: new ObjectId(id) },
        { $set: body }
    );
//Tudo que comeca com $ eh uma operacao, Mongo
    //console.log(id, body);
    res.send(body);

});

//Endpoint [DELETE] -> /item/:id
//exercicio adicionar, 



app.post('/item/')

app.listen(3000);
}

//Metodo -> declaracao para chamar uma funcao
main();
