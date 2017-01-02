import { Image, Action } from '../model';

export class ImageContainer {

    name: string;

    iconUrl: string;

    bindedActions: Action[] = [];

    // Data
    images: Image[] = [];

    handleAction(action: Action, image: Image): boolean {

        let matched = false;
        for (let cur of this.bindedActions) {
            if (cur.equals(action)) {
                matched = true;
                break;
            }
        }

        // Handle this action
        if (matched) {
            this.images.push(image);
        }

        return matched;
    }

    undo() {
        this.images.pop();
    }
}