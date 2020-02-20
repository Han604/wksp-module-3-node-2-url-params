let artistCount = {};
let artistRank = [];
topSongs.forEach(song => { 
    let count = 0;
    topSongs.forEach(duplicate => {
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
console.log(artistRank);
console.log(artistRank.filter(song => song.artistName === artistRank[0].artistName))