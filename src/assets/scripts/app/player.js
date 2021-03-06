import {Note, Pause} from './items';

var WHOLE_NOTE_LENGTH = 2; // seconds

class Player {

	constructor(bpm = 120, channel = 0) {
		WHOLE_NOTE_LENGTH = 60 / (bpm / 4);
		this.channel = channel;
	}

	delay = 1;

	playNote(note, octave, value) {
		var midiNote = MIDI.keyToNote[note + octave];
		MIDI.noteOn(this.channel, midiNote, 127, this.delay);
		MIDI.noteOff(this.channel, midiNote, this.delay + WHOLE_NOTE_LENGTH * value);
		this.delay += WHOLE_NOTE_LENGTH * value;
	}

	pause(value) {
		this.delay += WHOLE_NOTE_LENGTH * value;
	}

	playBar(bar) {
		bar.items.forEach(item => {
			if (item instanceof Note) {
				this.playNote(item.tone, item.octave, item.value);
			} else if (item instanceof Pause) {
				this.pause(item.value);
			}
		});
	}
}

export default Player;