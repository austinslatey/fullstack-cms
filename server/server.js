const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewPArser: true, useCreateIndex: true, useUnifiedTopology: true });
app.listen(port, () => { console.log();
});

