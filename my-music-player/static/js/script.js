var playlist = []; // Global variable to store the playlist
var currentIndex = 0; // Global variable to track the current index in the playlist

function playRandom() {
    fetch('/random')
        .then(response => response.json())
        .then(data => {
            var audioPlayer = document.getElementById('audio-player');
            audioPlayer.src = '/songs/' + data.random_song;
            audioPlayer.load();
            audioPlayer.play();

            var songName = document.getElementById('current-song');
            songName.textContent = data.random_song;

            // Update the playlist and current index
            playlist = Array.from(document.querySelectorAll('#song-list ul li a')).map(a => a.textContent);
            currentIndex = playlist.indexOf(data.random_song);
        })
        .catch(error => console.error('Error:', error));
}

function play(song) {
    var audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = '/songs/' + song;
    audioPlayer.load();
    audioPlayer.play();

    var songName = document.getElementById('current-song');
    songName.textContent = song;

    // Update the current index
    currentIndex = playlist.indexOf(song);
}

function playInOrder() {
    playlist = Array.from(document.querySelectorAll('#song-list ul li a')).map(a => a.textContent);
    currentIndex = 0;
    playNext();
}

function playNext() {
    if (playlist.length > 0) {
        currentIndex = (currentIndex + 1) % playlist.length;
        var nextSong = playlist[currentIndex];
        play(nextSong);
    } else {
        console.log("Playlist is empty.");
    }
}

