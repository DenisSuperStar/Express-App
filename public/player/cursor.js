const play = document.querySelector('.jp-play');
const pause = document.querySelector('.jp-pause');
let timeStartId;

const watchProgressCurrent = () => {
    const seekBar = document.querySelector('.jp-seek-bar');
    timeStartId = setInterval(() => {
        let playBar = seekBar.querySelector('.jp-play-bar');
        const decFix = 3;
        const progressCurrent = (parseFloat(playBar.style.width) - decFix) + '%';
        let progressPoint = playBar.querySelector('.is-progress');
        progressPoint.style.left = progressCurrent;
    });
}

play.addEventListener('click', () => {
    let timeStartId = setTimeout(watchProgressCurrent, 7000);
});

pause.addEventListener('click', () => {
    setTimeout(() => {clearInterval(timeStartId)}, 0);
});