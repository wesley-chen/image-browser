import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { ImageContainer } from './image-container.model';

@Component({
    selector: 'tp-image-container',
    templateUrl: 'image-container.component.html'
})
export class ImageContainerComponent {

    @Input()
    container: ImageContainer;

    lastCommandMessage: string = "";

    @Output()
    public tabClicked = new EventEmitter();

    constructor(public snackBar: MdSnackBar) { }

    onClickTab(event: MouseEvent) {
        this.tabClicked.emit(this.container);
    }

    showNotification() {
        let cmd = this.container.lastCommand;
        if (cmd != null) {
            this.lastCommandMessage = "Add image";

            let snackBarRef = this.snackBar.open('Add image: ' + cmd.image.fileName, 'Undo'
                , {
                    duration: 3000,
                });

            snackBarRef.onAction().subscribe(() => {
                this.container.undo();
            });
        }
    }
}