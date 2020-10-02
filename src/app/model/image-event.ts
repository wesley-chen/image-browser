import { Action } from './action';
import { Image } from './image';
import { ImageList } from './image-list';

export class ImageEvent {

    constructor(public action: Action, public image: Image, public fromImageList: ImageList) { };

    toString() {
        let msg = "Image [" + this.image.fileName + "] from: [" + this.fromImageList + "]"
        msg = "Event (" + msg + ")";
        return msg;
    }
}