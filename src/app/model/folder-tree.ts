import { FileModel } from './file';
import { Image } from './image';
export class FolderTree {
    current: FileModel;
    parents: FileModel[];
    childFolders: FileModel[];
    images: Image[];
}