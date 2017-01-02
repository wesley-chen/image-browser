import { Component, Input } from '@angular/core';
import { Image } from '../model';
import { ImageGridSetting } from './image-grid.model';

@Component({
    selector: 'tp-image-grid',
    templateUrl: 'image-grid.component.html'
})
export class ImageGridComponent {

    @Input()
    images: Image[] = [];

    @Input()
    setting: ImageGridSetting;

    boxStyle: Object;

    currentIdx: number = -1;
    currentImage: Image = null;

    changeWidth(widthMode: string) {

        //console.log('ok3' + this.settings.widthMode);
        var defaultWidth = 136;
        var width = defaultWidth;
        if (widthMode == "Small") {
            width = defaultWidth;
            var height = (this.setting.showCaption ? width + 20 : width);
            this.boxStyle = { "width": width + "px", "height": height + "px" };
        } else if (widthMode == "Middle") {
            width = defaultWidth * 2;
            var height = (this.setting.showCaption ? width + 20 : width);
            this.boxStyle = { "width": width + "px", "height": height + "px" };
        } else if (widthMode == "FitWidth") {
            width = window.innerWidth - 20; //remove paddings
            this.boxStyle = { "width": width + "px", "height": "100%" };
        } else if (widthMode == "100%") {
            this.boxStyle = { "width": "100%", "height": "100%" };
        }

        width = width - 10; //remove paddings

        for (let img of this.images) {
            var imageRate = width / Math.max(img.width, img.height, 1);
            if (widthMode == "100%" || imageRate > 1) {
                imageRate = 1;
            }

            //sometimes, image is not load completed, width or height may is 0
            var imgWidth = Math.max(imageRate * img.width, 1);
            var imgHeight = Math.max(imageRate * img.height, 1);

            img.imgStyle = { "width": imgWidth + "px", "height": imgHeight + "px" };
        }
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