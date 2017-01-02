export class Action {

    //Returns whether the "CTRL" key was pressed when the mouse event was triggered
    ctrlKey: boolean = false;

    //Returns whether the "ALT" key was pressed when the mouse event was triggered
    altKey: boolean = false;

    //Returns whether the "SHIFT" key was pressed when an event was triggered
    shiftKey: boolean = false;

    isClicked: boolean = false;

    isDoubleClicked: boolean = false;

    equals(other: Action): boolean {
        if (this == other) {
            return true;
        }

        if (other == null) {
            return false;
        }

        let isAllFieldsSample = ((this.ctrlKey == other.ctrlKey)
            && (this.altKey == other.altKey)
            && (this.shiftKey == other.shiftKey)
            && (this.isClicked == other.isClicked)
            && (this.isDoubleClicked == other.isDoubleClicked));

        return isAllFieldsSample;
    }
}