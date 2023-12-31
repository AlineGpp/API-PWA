const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes');
const bodyParser = require('body-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cors());

app.use(routes);

app.listen(process.env.PORT || 3002, () => {
    console.log("Servidor rodando na porta 3002");
});