import { Image, ImageList, Action, Command } from '../model';

export class ImageContainer {

    name: string;

    iconUrl: string;

    bindedActions: Action[] = [];

    // Data
    images: ImageList = new ImageList([]);

    //Key: image, Value: the original command that add this image to this container
    commandMap: Map<Image, Command> = new Map<Image, Command>();

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
                let img = cmd.targetImage;
                this.images.add(img);
                // Remove from original
                cmd.originalImageList.remove(img);
                this.commandMap.set(img, cmd);
                this.lastCommand = cmd;
            } else { // click on this container
                // Reverse the image to its original container.
                let img = cmd.targetImage;
                let originalCmd = this.commandMap.get(img);
                originalCmd.originalImageList.insert(originalCmd.originalImageIndex, img);

                this.images.remove(img);
                this.commandMap.delete(img);
            }
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