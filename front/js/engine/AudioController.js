import { Controller } from "./Controller.js";
import { FileType } from "./FileType.js";
export class AudioController {
    constructor() {
        this.soundVolume = .5;
        this.musicVolume = .1;
        $("#mm_sounds_level").on("input", (val) => {
            this.soundVolume = +val.target.value / 100;
        });
        $("#mm_music_level").on("input", (val) => {
            this.musicVolume = +val.target.value / 100;
            if (this.backgroundMusic) {
                this.backgroundMusic.volume = this.musicVolume;
            }
        });
    }
    play(name) {
        let path = Controller.instance.getPackFileAddress(FileType.AUDIO, name);
        let audio = new Audio(path);
        audio.volume = this.soundVolume;
        audio.play();
    }
    setBackground(name) {
        let path = Controller.instance.getPackFileAddress(FileType.AUDIO, name);
        this.backgroundMusic = new Audio(path);
        this.backgroundMusic.volume = this.musicVolume;
        this.backgroundMusic.loop = true;
        this.backgroundMusic.play();
    }
    playRandomSequence(basename, range, count, interval) {
        let parts = basename.split(".");
        for (let i = 0; i < count; i++) {
            let path = Controller.instance.getPackFileAddress(FileType.AUDIO, parts[0] + "_" + Math.ceil(Math.random() * range) + "." + parts[1]);
            let sound = new Audio(path);
            sound.volume = this.soundVolume;
            setTimeout(() => {
                sound.play();
            }, interval * i);
        }
    }
}
AudioController.instance = new AudioController();
