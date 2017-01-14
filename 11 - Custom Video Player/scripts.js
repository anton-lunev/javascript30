class Player {
    constructor(playerSelector) {
        this.player = document.querySelector(playerSelector);
        this.video = this.player.querySelector('.viewer');
        this.progress = this.player.querySelector('.progress');
        this.progressBar = this.player.querySelector('.progress__filled');
        this.toggle = this.player.querySelector('.toggle');
        this.skipButtons = this.player.querySelectorAll('[data-skip]');
        this.ranges = this.player.querySelectorAll('.player__slider');

        this.subscribeEvents();
    }

    subscribeEvents() {
        this.toggle.addEventListener('click', e => this.togglePlay(e));

        this.video.addEventListener('click', e => this.togglePlay(e));
        this.video.addEventListener('play', e => this.updateButton(e));
        this.video.addEventListener('pause', e => this.updateButton(e));
        this.video.addEventListener('timeupdate', e => this.handleProgress(e));

        this.skipButtons.forEach(button => button.addEventListener('click', e => this.skip(e)));
        this.ranges.forEach(range => range.addEventListener('input', e => this.handleRangeUpdate(e)));

        let mousedown = false;
        this.progress.addEventListener('click', e => this.scrub(e));
        this.progress.addEventListener('mousemove', (e) => mousedown && this.scrub(e));
        this.progress.addEventListener('mousedown', () => mousedown = true);
        this.progress.addEventListener('mouseup', () => mousedown = false);
    }

    togglePlay() {
        const method = this.video.paused ? 'play' : 'pause';
        this.video[method]();
    }

    updateButton() {
        this.toggle.textContent = this.video.paused ? '►' : '❚ ❚';
    }

    skip(e) {
        this.video.currentTime += parseFloat(e.target.dataset.skip);
    }

    handleRangeUpdate(e) {
        this.video[e.target.name] = e.target.value;
    }

    handleProgress() {
        const percent = (this.video.currentTime / this.video.duration) * 100;
        this.progressBar.style.flexBasis = `${percent}%`;
    }

    scrub(e) {
        this.video.currentTime = (e.offsetX / this.progress.offsetWidth) * this.video.duration;
    }
}

const playerClass = new Player('.player');
