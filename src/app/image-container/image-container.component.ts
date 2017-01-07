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
        this.lastCommandMessage = this.composeLastCommandMsg();
        this.notification.show();
    }

    composeLastCommandMsg(): string {
        let msg = "";
        let cmd = this.container.lastCommand;
        if (cmd != null) {

            if (cmd.toImageList == this.container.images) {
                msg = "Add image";
            } else {
                msg = "Remove image";
            }
        }

        return msg;
    }

    undo() {
        this.container.undo();
        this.showNotification();
    }
}