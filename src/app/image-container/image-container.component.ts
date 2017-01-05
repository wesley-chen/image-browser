import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ImageContainer } from './image-container.model';

@Component({
    selector: 'tp-image-container',
    templateUrl: 'image-container.component.html'
})
export class ImageContainerComponent {

    @Input()
    container: ImageContainer;

    @Output()
    public tabClicked = new EventEmitter();

    onClickTab(event: MouseEvent) {
        this.tabClicked.emit(this.container);
    }

}