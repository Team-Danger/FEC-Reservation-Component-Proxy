const express = require('express');
const path = require('path');
const morgan = require('morgan');
const httpProxy = require("http-proxy");
const cors = require("cors");

const app = express();
const PORT = 8080;
const public = path.resolve(__dirname, '..', 'client', 'dist');
const proxy = httpProxy.createProxyServer({});

const descriptionModule = 'http://localhost:3000';
const reserveModule = 'http://localhost:3001';
const reviewsModule = 'http://localhost:3002';

app.all(cors());
app.use('/:moduleID', express.static(public));


app.all('/:moduleID/main.js', (req, res) => {
  proxy.web(req, res, { target: descriptionModule });
});

app.get('/api/description/:id', (req, res) => {
  proxy.web(req, res, { target: descriptionModule });
});



app.all('/:moduleID/reservation-bundle.js', (req, res) => {
  proxy.web(req, res, { target: reserveModule });
});

app.get('/api/reservation/:id', (req, res) => {
  proxy.web(req, res, { target: reserveModule });
});



app.all('/:moduleID/bundle.js', (req, res) => {
  proxy.web(req, res, { target: reviewsModule });
});

app.get('/api/reviews/:id', (req, res) => {
  proxy.web(req, res, { target: reviewsModule });
});



app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));