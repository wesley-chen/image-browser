import { Image, ImageList, Action, ImageEvent } from '../model';
import { Logger } from '../services/logger.service';

export class ImageContainer {

    logger: Logger = new Logger();

    name: string;

    iconUrl: string;

    bindedActions: Action[] = [];

    // Data
    images: ImageList = new ImageList([]);

    //Key: image, Value: the original event that add this image to this container
    eventMap: Map<Image, ImageEvent> = new Map<Image, ImageEvent>();

    commands: ICommand[] = [];

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

    moveInImage(event: ImageEvent) {
        let img = event.image;
        this.switchImage(img, event.fromImageList, this.images)
        this.eventMap.set(img, event);
    }

    moveBackImage(img: Image) {
        let originalEvent = this.eventMap.get(img);
        if (originalEvent != null) {
            this.switchImage(img, this.images, originalEvent.fromImageList)
            this.eventMap.delete(img);
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

export interface ICommand {

    name: String,

    execute(imageList: ImageList): void

}