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


    /**
     * If the binding actions of this container contains the given action
     */
    containAction(action: Action): boolean {

        let isMatched = false;
        for (let cur of this.bindedActions) {
            if (cur.equals(action)) {
                isMatched = true;
                break;
            }
        }
        return isMatched;
    }

    moveInImage(cmd: Command) {
        let img = cmd.image;
        this.switchImage(img, cmd.fromImageList, this.images)
        this.commandMap.set(img, cmd);
    }

    moveBackImage(img: Image) {
        let originalCmd = this.commandMap.get(img);
        if (originalCmd != null) {
            this.switchImage(img, this.images, originalCmd.fromImageList)
            this.commandMap.delete(img);
        }
    }

    private switchImage(img: Image, fromImageList: ImageList, toImageList: ImageList) {

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
}