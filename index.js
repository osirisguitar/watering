'use strict';

const express = require('express');
const app = express();

app.use(express.static('lib/frontend'));

app.listen(6688);