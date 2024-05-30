import { Controller } from "./Controller.js";
import { FileType } from "./FileType.js";
export class AudioController {
    constructor() {
        this.soundVolume = .5;
        this.musicVolume = .5;
        $("#mm_sounds_level").on("input", (val) => {
            this.soundVolume = +val.target.value / 100;
        });
        $("#mm_music_level").on("input", (val) => {
            this.musicVolume = +val.target.value / 100;
        });
    }
    play(name) {
        let path = Controller.instance.getPackFileAddress(FileType.AUDIO, name);
        let audio = new Audio(path);
        audio.volume = this.soundVolume;
        audio.play();
    }
}
AudioController.instance = new AudioController();
