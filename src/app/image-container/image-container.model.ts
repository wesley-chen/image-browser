import { Image, ImageList, Action, Command } from '../model';
import { Logger } from '../services/logger.service';

export class ImageContainer {

    logger: Logger = new Logger();

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
                if (originalCmd != null) {
                    this.switchImage(img, this.images, originalCmd.fromImageList)
                    this.commandMap.delete(img);

                    // Don't record remove image command for unde 
                    this.lastCommand = null;
                }
            }
        }

        return canHandle;
    }

    switchImage(img: Image, fromImageList: ImageList, toImageList: ImageList) {

        // logging
        if (this.images == fromImageList) {
            this.logger.log("Remove image [" + img.fileName + "] from: [" + this.name + "] container.");
        } else if (this.images == toImageList) {
            this.logger.log("Add image [" + img.fileName + "] to: [" + this.name + "] container.");
        } else {
            this.logger.log("Bug: the image [" + img.fileName + "] is not belong to this container. Switch from: [" + fromImageList + "] to [" + toImageList + "]");
        }

        // processing
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
            this.logger.log("Undo: " + cmd);
            this.switchImage(image, cmd.toImageList, cmd.fromImageList);
            this.commandMap.delete(image);
        }
    }
}