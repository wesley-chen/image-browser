import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { MdSnackBar } from '@angular/material';
import { Image, ImageList, Action, Command } from '../model';
import { ImageContainer } from './image-container.model';

@Component({
    selector: 'tp-image-container',
    templateUrl: 'image-container.component.html'
})
export class ImageContainerComponent {

    @Input()
    container: ImageContainer;

    lastCommand: Command;

    @Output()
    public tabClicked = new EventEmitter();

    constructor(public snackBar: MdSnackBar) { }

    onClickTab(event: MouseEvent) {
        this.tabClicked.emit(this.container);
    }

    execute(cmd: Command): boolean {

        let canHandle = this.container.containAction(cmd.action);
        if (canHandle) {
            let isThisContainerCommand = (this.container.images == cmd.fromImageList);
            if (isThisContainerCommand) { // Need move back to original container
                this.container.moveBackImage(cmd.image);

                //Show notification
                let msg = 'Move image: ' + cmd.image.fileName + " back.";

                let snackBarRef = this.snackBar.open(msg, null, {
                    duration: 3000,
                });

            } else {
                this.container.moveInImage(cmd);

                //Show notification
                let msg = 'Move image: ' + cmd.image.fileName + " into the '" + this.container.name + "' container.";

                let snackBarRef = this.snackBar.open(msg, 'Undo', {
                    duration: 3000,
                });

                snackBarRef.onAction().subscribe(() => { // Handle 'undo'
                    this.container.moveBackImage(cmd.image);
                });
            }
        }

        return canHandle;
    }
}