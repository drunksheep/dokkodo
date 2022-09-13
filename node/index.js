const express = require('express');
const app = express();
const cors = require('cors')
const getImages = require('./lib/getImages');

app.use(cors('*'));
app.options('*', cors());
app.use(express.json({ type: '*/*', limit: "50mb" }));

const port = process.env.port || 5001;
const router = express.Router();

router.get('/', async (req, res) => {
    res.send('base');
});

router.post('/images', async (req, res) => {
    const requestBody = req.body;
    const url = requestBody.url;
    
    res.send( await getImages(url) );
});

app.use('/', router);
app.use('/images', express.static(__dirname + '/images'));

app.listen(port);
