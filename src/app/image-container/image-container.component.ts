import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Popover } from "ng2-popover";
import { ImageContainer } from './image-container.model';

@Component({
    selector: 'tp-image-container',
    templateUrl: 'image-container.component.html'
})
export class ImageContainerComponent {

    @Input()
    container: ImageContainer;

    @ViewChild(Popover) notification: Popover;

    lastCommandMessage: string = "";

    @Output()
    public tabClicked = new EventEmitter();

    onClickTab(event: MouseEvent) {
        this.tabClicked.emit(this.container);
    }

    showNotification() {
        let cmd = this.container.lastCommand;
        if (cmd != null) {
            this.lastCommandMessage = "Add image";
            this.notification.show();
        }
    }

    undo() {
        this.notification.hide();
        this.container.undo();
    }
}