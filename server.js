'use strict';
const express = require('express')

const morgan = require('morgan');

const { books } = require('./data/books');

const { top50 } = require('./data/top50');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(morgan('dev'));
app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.set('view engine', 'ejs');

// endpoints here

app.get('/topfifty/:number', (req, res) => {
    const number = req.params.number;
    if (top50[number]) {
            res.render('pages/number', {
        title: `Song #${number}`,
        top50:top50[number]
    })
    } else {
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    }

});

app.get('/books/:type', (req, res) => {
    const type = req.params.type;
    let bookType = books.filter(book => book.type === type)
    if (bookType.length > 0) {
        res.render('pages/type', {
            title: `${bookType[0].type}`,
            bookType: bookType
        })
    } else {
        res.render('pages/fourOhFour', {
            title: 'I got nothing',
            path: req.originalUrl
        });
    }
});

app.get('/books', (req, res) => {
    console.log('books')
    res.render('pages/books', {
        title: '25 books you\'ve probably already read',
        books:books
    })
})

app.get('/topfifty', (req, res) => {
    res.render('pages/top50', {
        title: 'Top 50 songs of the year on Spotify', 
        topSongs:top50
    })
});

app.get('/topfifty/popular-artist', (req, res) => {
    let artistCount = {};
    let artistRank = [];
    top50.forEach(song => { 
        let count = 0;
        top50.forEach(duplicate => {
            if (song.artist === duplicate.artist) {
                count += 1
            } 
        });
        artistCount[song.artist] = count;
        //{drake:2}
    })
    Object.values(artistCount).forEach((numCount, id) => {
        const artistName = Object.keys(artistCount)[id];
        artistRank.push({
            artistName: artistName,
            numCount: numCount
        });
    });
    artistRank.sort((a, b) => a.numCount < b.numCount ? 1 : -1);
    console.log(artistRank[0].artistName)
    //mostPopArtist = artistRank.filter(song => song.artistName === artistRank[0].artistName)
    console.log(top50.filter(song => song.artist === artistRank[0].artistName))
    res.render('pages/popular-artist.ejs', {    
        title: 'top artist of 2015 on Spotify',
        topSongs: top50.filter(song => song.artist === artistRank[0].artistName)
    })
})

// handle 404s
app.get('*', (req, res) => {
    res.status(404);
    res.render('pages/fourOhFour', {
        title: 'I got nothing',
        path: req.originalUrl
    });
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

