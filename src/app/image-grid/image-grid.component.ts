import { Component, Input, Output, EventEmitter, ElementRef, HostListener } from '@angular/core';
import { Image, ImageList, Action, ImageEvent } from '../model';
import { ImageGridSetting, WidthMode } from './image-grid.model';

@Component({
    selector: 'tp-image-grid',
    templateUrl: 'image-grid.component.m.html',
    styleUrls: ['image-grid.component.css']
})
export class ImageGridComponent {

    private imageList: ImageList;

    @Input()
    setting: ImageGridSetting;

    boxStyle: Object;
    containerWidth: number;


    currentIdx: number = -1;
    currentImage: Image = null;

    @Input()
    set images(images: ImageList) {
        this.imageList = images;
        this.refresh();
    }

    get images(): ImageList {
        return this.imageList;
    }

    @Output()
    public imageClicked = new EventEmitter();

    onClick(event: MouseEvent, image: Image, isDoubleClick: boolean) {

        //TODO: double click doesn't work when bind click and double click on the same element

        let action = new Action();
        action.ctrlKey = event.ctrlKey;
        action.altKey = event.altKey;
        action.shiftKey = event.shiftKey;
        if (isDoubleClick) {
            action.isDoubleClicked = true;
        } else {
            action.isClicked = true;
        }

        let imgEvent = new ImageEvent(action, image, this.imageList);

        this.imageClicked.emit(imgEvent);
    }


    constructor(private elementRef: ElementRef) {
    }

    ngAfterViewInit() {
        //console.dir(this.elementRef.nativeElement);
        //console.log('ngAfterViewInit width: ' + this.elementRef.nativeElement.parentNode.clientWidth);
    }


    refresh() {
        this.changeWidth(this.setting.widthMode);
    }

    changeWidth(widthMode: string) {

        //console.log('ok3' + this.settings.widthMode);
        let defaultWidth = 140;
        let captionHeight = 20;
        this.containerWidth = this.elementRef.nativeElement.parentNode.clientWidth;
        this.elementRef.nativeElement.parentNode.width = this.containerWidth;

        var width = defaultWidth;
        if (widthMode == WidthMode.SMALL) {
            var height = (this.setting.showCaption ? width + captionHeight : width);
            this.boxStyle = { "width": width + "px", "height": height + "px" };
        } else if (widthMode == WidthMode.MIDDLE) {
            width = defaultWidth * 2;
            var height = (this.setting.showCaption ? width + captionHeight : width);
            this.boxStyle = { "width": width + "px", "height": height + "px" };
        } else if (widthMode == WidthMode.FIT_WIDTH) {
            width = this.containerWidth - 30; //remove paddings
            this.boxStyle = { "width": width + "px", "height": "100%" };
        } else if (widthMode == WidthMode.PERCENT_100) {
            this.boxStyle = { "height": "100%", "clear": "both" };
        }
        // console.log('width: ' + width);

        for (let img of this.imageList.listAll()) {

            var imageRate = width / Math.max(img.width, img.height, 1);
            if (widthMode == WidthMode.FIT_WIDTH) {
                imageRate = width / Math.max(img.width, 1);
            } else if (widthMode == WidthMode.PERCENT_100) {
                imageRate = 1;
            }

            if (imageRate > 1) { // don't zoom in
                imageRate = 1;
            }

            //sometimes, image is not load completed, width or height may is 0
            var imgWidth = Math.max(imageRate * img.width, 1);
            var imgHeight = Math.max(imageRate * img.height, 1);

            let imgStyle = { "width": imgWidth + "px", "height": imgHeight + "px" };

            if (widthMode == WidthMode.PERCENT_100) {
                imgStyle = Object.assign(imgStyle, { "float": "left" });
            }
            img.imgStyle = imgStyle;
        }

        this.setting.widthMode = widthMode;
    };

    @HostListener('window:keydown', ['$event'])
    onKey(event: KeyboardEvent) { // with type info
        if (event.keyCode == 32) {// space 
            this.moveNext();
        }
    }

    moveNext() {

        let images = this.imageList.listAll();

        if (!images) {
            return;
        }

        var startIdx = this.currentIdx;
        if (startIdx >= images.length - 1) {
            startIdx = -1;
        }

        for (var i = startIdx + 1; i < images.length; i++) {
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
            $('html, body').animate({ scrollTop: $("#imgbox-" + index).offset().top - 60 }, 200);
        }
        // console.log(index);
    }
}