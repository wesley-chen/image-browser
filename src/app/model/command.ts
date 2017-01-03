import { Action } from './action';
import { Image } from './image';
import { ImageList } from './image-list';

export class Command {

    constructor(public action: Action, public targetImage: Image, public originalImageList: ImageList, public originalImageIndex: number) { };

}