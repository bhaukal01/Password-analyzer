const express = require('express');
const path = require('path');
const app = express();

app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/static', express.static(path.join(__dirname, 'static')));

//view engine definition
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//routes definition
const analyzeRouter = require('./routes/analyze');
app.use('/', analyzeRouter);


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
