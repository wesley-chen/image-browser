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
            if (!this.images.contains(cmd.image)) {
                let img = cmd.image;
                this.switchImage(img, cmd.fromImageList, this.images)
                this.commandMap.set(img, cmd);

                this.lastCommand = cmd;
                this.lastCommand.toImageList = this.images;

            } else { // click on this container
                // Reverse the image to its original container.
                let img = cmd.image;
                let originalCmd = this.commandMap.get(img);
                this.switchImage(img, this.images, originalCmd.fromImageList)
                this.commandMap.delete(img);

                this.lastCommand = cmd;
                this.lastCommand.fromImageList = this.images;
                this.lastCommand.toImageList = originalCmd.fromImageList;
            }
        }

        return canHandle;
    }

    switchImage(img: Image, fromImageList: ImageList, toImageList: ImageList) {
        if (!toImageList.contains(img)) {
            toImageList.add(img);
        }
        fromImageList.remove(img);
    }

    undo() {

        if (this.lastCommand) {
            let cmd = this.lastCommand;
            this.lastCommand = null;

            let image = cmd.image;
            this.switchImage(image, cmd.toImageList, cmd.fromImageList);
        }
    }
}