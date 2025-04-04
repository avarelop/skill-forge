const express = require("express");
const router = require('./routers/index.router')

const { errorHandler, boomErrorHandler } = require("./handlers/error.handler");

const app = express();
const port = 3000;

app.use(express.json());
app.use(boomErrorHandler);
app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Health check endpoint.');
});

router(app);
app.listen(port);
