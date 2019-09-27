var oAudio = document.getElementById('audio'),
    oCurrentTime = document.getElementsByClassName('current-time')[0],
    oDurationTime = document.getElementsByClassName('duration-time')[0],
    oBtn = document.getElementsByClassName('btn')[0],
    // 更换小图标
    oIsPlayer = oBtn.getElementsByClassName('icon-Player')[0],
    oProActive = document.getElementsByClassName('pro-active')[0],
    oProgress = document.getElementsByClassName('progress')[0],
    oProBox = document.getElementsByClassName('pro-box')[0],
    oRadioBox = document.getElementsByClassName('radio-box')[0],
    // 音量
    oVolume = document.getElementsByClassName('volume')[0],
    oIsMute = oVolume.getElementsByClassName('icon-volume')[0],
    oVolBox = document.getElementsByClassName('vol-box')[0],
    oVolActive = oVolBox.getElementsByClassName('vol-active')[0],
    oVolRadioBox = oVolActive.getElementsByClassName('volRadio-box')[0],
    // 切换歌曲
    oPrevMusic = document.getElementsByClassName('prev-music')[0],
    oNextMusic = document.getElementsByClassName('next-music')[0],
    audio = document.getElementById('audio'),
    oMusciPoster = document.getElementsByClassName('music-poster')[0],
    // 当前播放歌曲
    oPalyNow = document.getElementsByClassName('songPlay')[0],
    oSongList = document.getElementsByClassName('songList-name')[0],
    oSongItem = document.getElementsByTagName('li');

var timerPro,
    timerVol,
    duration = oAudio.duration,
    bgWidth = 192,
    bgVolWidth = 50,
    allVol = 1;



var musicList = [
    './source/Coldplay - Yellow.mp3',
    './source/Coldplay,Gwyneth Paltrow - Everglow.mp3',
    './source/Midnight - Barcelona .mp3',
    './source/Linkin Park - In The End.mp3',
    './source/逃跑计划 - 再见 再见.mp3',
    './source/逃跑计划 - 夜空中最亮的星.mp3',


]

var musicName = [
    'Coldplay - Yellow.mp3',
    'Coldplay,Gwyneth Paltrow - Everglow.mp3',
    'Midnight - Barcelona .mp3',
    'Linkin Park - In The End.mp3',
    '逃跑计划 - 再见 再见.mp3',
    '逃跑计划 - 夜空中最亮的星.mp3',
]

var MusciPosterList = [
    './img/yellow.jpg',
    './img/everglow.jpg',
    './img/midnight.jpg',
    './img/in the end.jpg',
    './img/再见再见.jpg',
    './img/夜空中最亮的星.jpg',

]



/**
 *  线上资源采用（资源加载较本地较慢)   oAudio.ondurationchange()    -->当duration发生改变时就会触发
 * 
 * 本地资源加载较快，可能资源加载完成了才开始执行js ,duration 不会发生变化
 * 
 * canplay()  每次拖拽调试到新的播放点都会触发一次 (每次都会设置成0 先, --> currentTime)
 * 
 * window.onload 所以资源加载完成之后再执行
 */
// ondurationchange   -->通过网络获取（相对于本地速度较慢）



// 获取音乐列表
var str = '';
function getList(musicList) {

    var len = musicList.length;
    for (var i = 0; i < len; i++) {

        str += '<li class="songList-item ">' + '<span>' + musicList[i] + '</span></li>';
    }
    oSongList.innerHTML = str;
}
getList(musicName);





// 获取时间
oAudio.oncanplay = function () {
    duration = this.duration
    // oCurrentTime.innerHTML = converTime(0);
    oCurrentTime.innerHTML = converTime(oAudio.currentTime);
    oDurationTime.innerHTML = converTime(duration);
}


// 将时间转换成 00：00  的格式
function converTime(time) {
    var min = parseInt(time / 60) < 10 ? '0' + parseInt(time / 60) : parseInt(time / 60);
    var sec = parseInt(time % 60) < 10 ? '0' + parseInt(time % 60) : parseInt(time % 60);
    return min + ":" + sec;
}



/**
 * 绑定事件
 *      控制播放或停止
 * 在播放时，改变进度条的width
 *      setInterval(funtionName, 1000)
 *      currentTime / duration  =  width / bgWidth
 */

// 点击改变音乐播放状态
oBtn.onmouseup = function () {
    if (oAudio.paused) {
        musicPlay();
    }
    else {
        musicPause();
    }
}


// 播放音乐
function musicPlay() {
    oAudio.play();
    oIsPlayer.className = 'iconfont icon-pause';
    oMusciPoster.className = 'music-poster active';
    timerPro = setInterval(changeProg, 200);
    changeSongName(index);
}

// 暂停音乐
function musicPause() {
    oAudio.pause();
    oIsPlayer.className = 'iconfont icon-Player';
    oMusciPoster.className = 'music-poster';
    clearInterval(timerPro);
}



// // 点击歌单曲目播放音乐
// songNamePlay();
// function songNamePlay() {
//     var len = oSongItem.length;
//     for (let i = 0; i < len; i++) {
//         (function (i) {
//             oSongItem[i].onclick = function () {
//                 index = i;
//                 musicPlay();
//             }
//         }(i))
//     }
// }


// 随着音乐改变歌单曲目
function changeSongName(index) {
    for (var i = 0, len = musicName.length; i < len; i++) {
        oSongItem[i].className = 'songList-item'
    }
    oSongItem[index].className = 'songList-item color';
}

function changeProg() {
    // oProActive.style.width +=10 +'px';
    var currTime = oAudio.currentTime;
    oCurrentTime.innerHTML = converTime(currTime);
    // duration = oAudio.duration;
    oDurationTime.innerHTML = converTime(duration);
    var currWidth = currTime / duration * bgWidth;
    // oProActive.style.width = currWidth + 8 + 'px';
    oProActive.style.width = currWidth + 'px';
}

/**
 *  在拖动过程中，音乐继续播放currentTime 和 进度条 不变
 *  若使用 musicPause 则音乐也会停止
 */
oAudio.onended = function () {
    musicPause();
    oAudio.currentTime = 0;
    oCurrentTime.innerHTML = converTime(0);
    oProActive.style.width = 8 + 'px';
    musicPlay();
}


/**
 * 鼠标拖拽
 *      点击radio-box进行拖拽   --> 给radio-box 绑定点击事件
 *      拖拽包括 
 *       鼠标按下 
 *          鼠标在按下拖拽但是还未抬起时，current-time 应该不改变   --> 清除计时器
 *       再绑定 拖动 
 *          拖拽的距离 = 鼠标到左侧的距离 - pro-box到左侧的距离 - radio的宽度  
 *          getBoundingClientRect()  当前元素距离浏览器左侧的值 返回一个对象，可以获取到left 值
 *          nweCurrentTime = newWith / bgWidth * duration;
 *          先设置拖动时的时间变化，不改变oAudio.currentTime  ,拖拽结束之后再改变值
 *       鼠标抬起
 *           取消鼠标move事件   oProgress.onmousemove = null;
 *           取消鼠标up事件   oProgress.onmouseup = null;
 *  
 */

oRadioBox.onmousedown = function () {
    clearInterval(timerPro);
    var nweCurrentTime = oAudio.currentTime;   //若是没有改变就是原值，若改变则赋新值
    oProgress.onmousemove = function (e) {
        var newWidth = e.clientX - oProBox.getBoundingClientRect().left;

        if (newWidth < 0) {
            newWidth = 0;
        } else if (newWidth > 240) {
            newWidth = 200;
        }
        oProActive.style.width = newWidth + 'px';
        nweCurrentTime = (newWidth - 8) / bgWidth * duration;
        // oAudio.currTime = nweCurrentTime;
        oCurrentTime.innerHTML = converTime(nweCurrentTime);
    }
    oProgress.onmouseup = function () {
        oProgress.onmousemove = null;   //取消鼠标move事件
        oProgress.onmouseup = null;
        musicPlay();  //在拖动的时候正常播放，拖动停止之后从新位置开始继续播放
        oAudio.currentTime = nweCurrentTime;
    }
}



/**
 *  第 53 行  有绑定 onmouseup
 *  第 128 行 也有绑定 onmouseup 事件
 *      若没有将事件清除，由于冒泡  触发53 行的事件之后还会触发 128 行的事件
 */


/**
 * 音量
 * 
 */

oAudio.volume = 0.3;
volChangePro();
// console.log(oAudio.volume);
oVolume.onclick = function () {

    if (oAudio.volume == 0) {
        oAudio.volume = .3;
        oIsMute.className = 'iconfont icon-volume';
    } else {
        oAudio.volume = 0;
        oIsMute.className = 'iconfont icon-mute';
    }
}



/**
 * 改变音量进度条
 */

var currentVolume;
function volChangePro() {
    currentVolume = oAudio.volume;
    var currentVolWidth = currentVolume / allVol * bgVolWidth;
    oVolActive.style.width = currentVolWidth + 'px';
}

oVolRadioBox.onmousedown = function () {
    clearInterval(timerVol);
    timerVol = setInterval(volChangePro, 200);
    var newCurrentVol = oAudio.volume;
    // newCurrentVol = oAudio.volume;

    oVolBox.onmousemove = function (e) {
        clearInterval(timerVol);
        var newVolWidth = e.clientX - oVolBox.getBoundingClientRect().left;
        if (newVolWidth < 0) {
            newVolWidth = 0;
        }
        else if (newVolWidth > 50) {
            newVolWidth = 50;
        }
        oVolActive.style.width = newVolWidth + 'px';
        newCurrentVol = newVolWidth / bgVolWidth * allVol;
        console.log(newCurrentVol);
    }

    oVolBox.onmouseup = function () {
        oVolBox.onmousemove = null;
        oVolBox.onmouseup = null;
        oAudio.volume = newCurrentVol;
    }
}








var musicLen = musicList.length,
    musicPosterLen = MusciPosterList.length;

var index = 0;



/**
 * 上一首 
 */

oPrevMusic.onclick = function () {
    if (index > 0) {

        index--;
    } else {
        index = musicLen - 1;
    }
    oPalyNow.innerText = musicName[index];
    audio.src = musicList[index];
    oMusciPoster.src = MusciPosterList[index];
    // audio.src = './source/Coldplay - Yellow.mp3';
    // oMusciPoster.src = './img/yellow.jpg';
    musicPlay();
}

/**
 * 下一首
 */

oNextMusic.onclick = function () {
    if (index < musicLen - 1) {
        index++;
    } else {
        index = 0;
    }
    oPalyNow.innerText = musicName[index];
    audio.src = musicList[index];

    oMusciPoster.src = MusciPosterList[index];
    // audio.src = './source/Midnight - Barcelona .mp3';
    // oMusciPoster.src = './img/midnight.jpg';
    musicPlay();
}



