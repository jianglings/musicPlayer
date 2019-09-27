 oSongList = document.getElementsByClassName('songList-name')[0];

// 随着音乐改变歌单曲目
function changeSongName(index) {
    for (var i = 0, len = musicList.length; i < len; i++) {
        oSongList[i].className = 'songList-item'
    }
    oSongList[index].className = 'songList-item color';
}

