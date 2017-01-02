import { Component, Input, ElementRef } from '@angular/core';
import { Image } from '../model';
import { ImageGridSetting, WidthMode } from './image-grid.model';

@Component({
    selector: 'tp-image-grid',
    templateUrl: 'image-grid.component.html'
})
export class ImageGridComponent {

    private _images: Image[] = [];

    @Input()
    setting: ImageGridSetting;

    boxStyle: Object;
    containerWidth: number;

    currentIdx: number = -1;
    currentImage: Image = null;

    @Input()
    set images(images: Image[]) {
        this._images = images;
        this.refresh();
    }

    get images(): Image[] {
        return this._images;
    }

    constructor(private elementRef: ElementRef) {
        this.containerWidth = elementRef.nativeElement.parentNode.clientWidth;
    }

    changeWidth(widthModeStr: string) {
        let widthMode = WidthMode[widthModeStr];
        this._changeWidth(widthMode);
    }

    refresh() {
        this._changeWidth(this.setting.widthMode);
    }

    _changeWidth(widthMode: WidthMode) {

        //console.log('ok3' + this.settings.widthMode);
        var defaultWidth = 136;
        var width = defaultWidth;
        if (widthMode == WidthMode.Small) {
            width = defaultWidth;
            var height = (this.setting.showCaption ? width + 20 : width);
            this.boxStyle = { "width": width + "px", "height": height + "px" };
        } else if (widthMode == WidthMode.Middle) {
            width = defaultWidth * 2;
            var height = (this.setting.showCaption ? width + 20 : width);
            this.boxStyle = { "width": width + "px", "height": height + "px" };
        } else if (widthMode == WidthMode.FitWidth) {
            width = this.containerWidth - 80; //remove paddings
            this.boxStyle = { "height": "100%" };
        } else if (widthMode == WidthMode.Percent100) {
            this.boxStyle = { "height": "100%" };
        }

        width = width - 10; //remove paddings

        for (let img of this.images) {
            var imageRate = width / Math.max(img.width, img.height, 1);
            if (widthMode == WidthMode.Percent100 || imageRate > 1) {
                imageRate = 1;
            }

            //sometimes, image is not load completed, width or height may is 0
            var imgWidth = Math.max(imageRate * img.width, 1);
            var imgHeight = Math.max(imageRate * img.height, 1);

            img.imgStyle = { "width": imgWidth + "px", "height": imgHeight + "px" };
        }

        this.setting.widthMode = widthMode;
    };

    onKey(event: KeyboardEvent) { // with type info
        if (event.keyCode == 32) {// space 
            this.moveNext();
        }
    }

    moveNext() {

        if (!this.images) {
            return;
        }

        var startIdx = this.currentIdx;
        if (startIdx >= this.images.length - 1) {
            startIdx = -1;
        }

        for (var i = startIdx + 1; i < this.images.length; i++) {
            if (this.images[i].visible) {
                this.moveTo(this.images[i], i, true);
                break;
            }
        }
    }

    moveTo = function (img: Image, index: number, scroll: boolean) {
        this.currentIdx = index;
        this.currentImage = img;
        if (scroll && (index != -1)) {
            //$('html, body').animate({ scrollTop: $("#imgbox-" + index).offset().top - 30 }, 200);
        }
        // console.log(index);
    }
}