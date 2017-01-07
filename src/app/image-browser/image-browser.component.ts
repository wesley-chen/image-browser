import { Component } from '@angular/core';
import { FileSystemService } from '../services/file-system.service';
import { Image, ImageList, FileModel, FolderTree, Action, Command } from '../model';
import { ImageGridSetting, WidthMode } from '../image-grid';
import { ImageContainer } from '../image-container';
const {ipcRenderer} = require('electron')

@Component({
    selector: 'tp-image-browser',
    providers: [FileSystemService],
    templateUrl: 'image-browser.component.html'
})
export class ImageBrowserComponent {

    rootPath: string = "E:\图片";
    tree: FolderTree;
    imageGridSetting: ImageGridSetting = new ImageGridSetting(WidthMode.Middle, true);

    isFullScreenMode: boolean = false;
    activeContainer: ImageContainer
    containers: ImageContainer[];

    constructor(private fileSytemService: FileSystemService) { }

    initContainers(images: Image[]) {
        this.activeContainer = this.creaeteMainContainer(images);
        this.containers = [];
        this.containers.push(this.activeContainer);
        this.containers.push(this.creaeteDeletedContainer());
    }

    creaeteMainContainer(images: Image[]): ImageContainer {

        const PATH = require('path');
        let icon = require('../../assets/images/folder0.png');

        // Added container for "Main" image
        let mainContainer = new ImageContainer();
        mainContainer.name = "Main";
        mainContainer.iconUrl = icon;
        mainContainer.images = new ImageList(images);

        return mainContainer;
    }

    creaeteDeletedContainer(): ImageContainer {

        const PATH = require('path');
        let icon = require('../../assets/images/folder1.png');

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

    onImageClicked(cmd: Command) {

        // Process by containers
        for (let container of this.containers) {
            let handled = container.execute(cmd);
            if (handled) {
                break;
            }
        }
    }

    onContainerTabClicked(clickedContainer: ImageContainer) {
        if (this.activeContainer != clickedContainer) {
            this.activeContainer = clickedContainer;
        }
    }

    ngOnInit(): void {
        this.tree = this.fileSytemService.buildFolderTree(this.rootPath);
        this.initContainers(this.tree.images);
    }

    goTo(filePath: string) {
        this.tree = this.fileSytemService.buildFolderTree(filePath);
        this.initContainers(this.tree.images);
    }

    /** Windows controls behaviors*/
    toggleFullScreen() {
        if (this.isFullScreenMode) {
            ipcRenderer.send('turn-off-full-screen-mode');
        } else {
            ipcRenderer.send('turn-on-full-screen-mode');
        }

        this.isFullScreenMode = !this.isFullScreenMode;
    }

    closeWindow() {
        ipcRenderer.send('close-main-window');
    }
}