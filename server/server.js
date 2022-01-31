const express = require("express"),
    // require("dotenv").config();
    // const path = require("path"),
    //   publicPath = path.join(__dirname, "..", "public"),
    PORT = 8080,
    {
        getData,
    } = require('./serverUtils');

app = express();

app.use(express.json());

// app.use(express.static(publicPath));


app.get('/movies', (req, res) => {
    getData(req, res, 'movies');
});

app.get('/tvShows', (req, res) => {
    getData(req, res, 'tvShows');

});

app.get('/users', (req, res) => {
    getData(req, res, "users");
    // res.send(users)
});


app.listen(PORT, () => {
    console.log(`app is Listening on port ${PORT}`);
})