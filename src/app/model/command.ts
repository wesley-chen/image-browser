import { Action } from './action';
import { Image } from './image';
import { ImageList } from './image-list';

export class Command {

    constructor(public action: Action, public image: Image, public fromImageList: ImageList, public toImageList: ImageList) { };

}