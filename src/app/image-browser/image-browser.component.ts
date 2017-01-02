import { Component } from '@angular/core';
import { FileSystemService } from '../services/file-system.service';
import { Image, FileModel, FolderTree, Action } from '../model';
import { ImageGridSetting, WidthMode } from '../image-grid';
import { ImageContainer } from '../image-container';

@Component({
    selector: 'tp-image-browser',
    providers: [FileSystemService],
    templateUrl: 'image-browser.component.html'
})
export class ImageBrowserComponent {

    rootPath: string = "E:\图片";
    tree: FolderTree;
    imageGridSetting: ImageGridSetting = new ImageGridSetting(WidthMode.Middle, true);
    containers: ImageContainer[] = [];

    constructor(private fileSytemService: FileSystemService) {
        let c = this.creaeteDeletedContainer()
        this.containers.push(c);
    }

    creaeteDeletedContainer(): ImageContainer {

        const PATH = require('path');
        let icon = require('../../assets/images/folder0.png');

        // Added container for "Deleted" image
        let deletedContainer = new ImageContainer();
        deletedContainer.name = "Deleted";
        deletedContainer.iconUrl = icon;

        // bind action for Ctrl + Click
        let ctrlAction = new Action();
        ctrlAction.ctrlKey = true;
        ctrlAction.isClicked = true;

        deletedContainer.bindedActions.push(ctrlAction);

        // bind action for double click
        let doubleClickAction = new Action();
        doubleClickAction.isDoubleClicked = true;

        return deletedContainer;
    }

    onImageClicked(msg: any) {

        let event: MouseEvent = msg.event;
        let imageUrl: string = msg.imageUrl;

        // Find image
        let foundImg: Image = null;
        for (let img of this.tree.images) {
            if (img.url == imageUrl) {
                foundImg = img;
                break;
            }
        }

        let action = new Action();
        action.isClicked = true;
        action.ctrlKey = event.ctrlKey;
        action.altKey = event.altKey;
        action.shiftKey = event.shiftKey;

        // Process by containers
        for (let container of this.containers) {
            let handled = container.handleAction(action, foundImg);
            if(handled){
                break;
            }
        }
    }

    ngOnInit(): void {
        this.tree = this.fileSytemService.buildFolderTree(this.rootPath);
    }

    goTo(filePath: string) {
        this.tree = this.fileSytemService.buildFolderTree(filePath);
    }
}