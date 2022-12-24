const express = require('express');
const app = express();
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const PDFMerger = require('pdf-merger-js');
const { mergePdfs } = require('./merge');

const port = 3000;

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "templates/index.html"));
});

app.post('/merge', upload.array('pdfs', 12), async function (req, res, next) {
    let nameArray = [];
    for (let file of req.files) {
        nameArray.push(path.join(__dirname, file.path));
    }
    let d = await mergePdfs(...nameArray);
    // req.files is array of `pdfs` files
    // req.body will contain the text fields, if there were any
    // res.send({ data: req.files })
    res.redirect(`http://localhost:3000/static/merged${d}.pdf`)
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});