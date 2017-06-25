import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Image, ImageList, Action, ImageEvent } from '../model';
import { ImageContainer } from './image-container.model';

@Component({
    selector: 'tp-image-container',
    templateUrl: 'image-container.component.html',
    styleUrls: ['image-container.component.css']
})
export class ImageContainerComponent {

    @Input()
    container: ImageContainer;

    @Output()
    public tabClicked = new EventEmitter();

    constructor(public snackBar: MdSnackBar) { }

    onClickTab(event: MouseEvent) {
        this.tabClicked.emit(this.container);
    }

    process(event: ImageEvent): boolean {

        let canHandle = this.container.containAction(event.action);
        if (canHandle) {
            let isThisContainerEvent = (this.container.images == event.fromImageList);
            if (isThisContainerEvent) { // Need move back to original container
                this.container.moveBackImage(event.image);

                //Show notification
                let msg = 'Move image: ' + event.image.fileName + " back.";

                let snackBarRef = this.snackBar.open(msg, null, {
                    duration: 3000,
                });

            } else {
                this.container.moveInImage(event);

                //Show notification
                let msg = 'Move image: ' + event.image.fileName + " into the '" + this.container.name + "' container.";

                let snackBarRef = this.snackBar.open(msg, 'Undo', {
                    duration: 3000,
                });

                snackBarRef.onAction().subscribe(() => { // Handle 'undo'
                    this.container.moveBackImage(event.image);
                });
            }
        }

        return canHandle;
    }
}