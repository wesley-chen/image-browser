import { Image } from './image';

export class ImageList {

    private items: Array<Image>;

    constructor(items: Image[]) {
        this.items = items;
    }

    size(): number {
        return this.items.length;
    }

    add(value: Image): void {
        this.items.push(value);
    }

    insert(index: number, value: Image): void {
        this.items.splice(index, 0, value);
    }

    get(index: number): Image {
        return this.items[index];
    }

    contains(value: Image): boolean {
        return (this.indexOf(value) > -1);
    }

    listAll(): Image[] {
        return this.items;
    }

    indexOf(value: Image): number {
        return this.items.indexOf(value);
    }

    remove(value: Image): boolean {

        let index: number = this.items.indexOf(value);
        if (index > -1) { // found
            this.items.splice(index, 1);
            return true;
        } else {
            return false;
        }
    }

    removeAll(): void {
        this.items = [];
    }

    findImageByURL(imageUrl: string): Image {

        // Find image
        let foundImg: Image = null;
        for (let img of this.items) {
            if (img.url == imageUrl) {
                foundImg = img;
                break;
            }
        }

        return foundImg;
    }

    toString(): string {
        let msg = "";
        for (let img of this.items) {
            msg = msg + img.fileName + ","
        }
        return msg;
    }
}