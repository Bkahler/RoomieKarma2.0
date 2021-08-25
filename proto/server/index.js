const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const { buildRoutes } = require('./routes.js')

const routes = buildRoutes();
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

app.listen(4000, ()=>{
  console.log('POSTs service listening on 4000')
})
