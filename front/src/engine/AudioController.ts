import { Controller } from "./Controller.js";
import { FileType } from "./FileType.js";

export class AudioController {
    static instance: AudioController = new AudioController();

    soundVolume: number = .5;
    musicVolume: number = .5;

    constructor() {
        $("#mm_sounds_level").on("input", (val) => {
            this.soundVolume = +(val.target as HTMLInputElement).value / 100;
        })

        $("#mm_music_level").on("input", (val) => {
            this.musicVolume = +(val.target as HTMLInputElement).value / 100;
        })
    }

    play(name: string) {
        let path = Controller.instance.getPackFileAddress(FileType.AUDIO, name);
        let audio = new Audio(path);
        audio.volume = this.soundVolume;
        audio.play();
    }
}