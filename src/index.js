// const express = require('express')  // -> CommonJS
import express from 'express'; // -> ES Module
import open from 'open'; // ESM일 경우

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

open('http://localhost:3000');
