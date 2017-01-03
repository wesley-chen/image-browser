import { Image, ImageList, Action, Command } from '../model';

export class ImageContainer {

    name: string;

    iconUrl: string;

    bindedActions: Action[] = [];

    // Data
    images: ImageList = new ImageList([]);

    lastCommand: Command;

    execute(cmd: Command): boolean {

        let canHandle = false;
        for (let cur of this.bindedActions) {
            if (cur.equals(cmd.action)) {
                canHandle = true;
                break;
            }
        }

        // Handle this action
        if (canHandle) {

            if (!this.images.contains(cmd.targetImage)) {
                this.images.add(cmd.targetImage);
            }

            // Remove from original
            cmd.originalImageList.remove(cmd.targetImage);

            this.lastCommand = cmd;
        }

        return canHandle;
    }

    undo() {

        if (this.lastCommand) {

            let image = this.lastCommand.targetImage;
            let index = this.lastCommand.originalImageIndex;
            this.lastCommand.originalImageList.insert(index, image);

            this.images.remove(image);
        }
    }
}