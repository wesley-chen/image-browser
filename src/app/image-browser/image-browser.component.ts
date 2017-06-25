import { Component, HostListener, ViewChildren, QueryList } from '@angular/core';
import { FileSystemService, Logger } from '../services';
import { Image, ImageList, FileModel, FolderTree, Action, ImageEvent, UISetting } from '../model';
import { ImageGridSetting, WidthMode } from '../image-grid';
import { ImageContainer, ImageContainerComponent, ICommand } from '../image-container';
const { ipcRenderer } = require('electron')

@Component({
    selector: 'tp-image-browser',
    providers: [FileSystemService],
    templateUrl: 'image-browser.component.m.html'
})
export class ImageBrowserComponent {

    readonly logger: Logger = new Logger();
    rootPath: string = "E:\图片";
    tree: FolderTree;
    imageGridSetting: ImageGridSetting = new ImageGridSetting(WidthMode.Middle, true);

    isFullScreenMode: boolean = false;
    uiSetting: UISetting = new UISetting();

    activeContainer: ImageContainer
    containers: ImageContainer[];

    @ViewChildren(ImageContainerComponent)
    containerComponents: QueryList<ImageContainerComponent>;

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

        // Add commands
        let deleteAllCmd: ICommand = {
            name: "Delete All",
            execute: (imageList: ImageList) => {

                const shell = require('electron').shell;
                for (let img of imageList.listAll()) {
                    this.logger.log("Deleting  " + img.filePath);
                    shell.moveItemToTrash(img.filePath);
                }
                imageList.removeAll();
            }
        };
        deletedContainer.commands.push(deleteAllCmd);

        return deletedContainer;
    }

    onImageClicked(event: ImageEvent) {

        // Process by containers
        let components = this.containerComponents.toArray();
        for (let c of components) {

            let handled = c.process(event);
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

    handleDrop(e: DragEvent) {
        e.preventDefault();

        let files = e.dataTransfer.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (!file.type && file.size % 4096 == 0) {
                // The file is a folder
                this.goTo(file.path);
            } else {
                // The file is not a folder
                let parentFolder = this.fileSytemService.getParentFolder(file.path);
                this.goTo(parentFolder);
            }
        }
    }

    /** Windows controls behaviors*/
    @HostListener('window:keydown', ['$event'])
    onKeyDown(event: KeyboardEvent) {
        if ((event.ctrlKey == true && event.keyCode == 70)  // "Ctr\ + F"
            || (event.keyCode == 122)) { // "F11"
            this.toggleFullScreen();
        }
    }

    toggleFullScreen() {
        if (this.isFullScreenMode) {
            this.uiSetting.leftPanelShow = true;
            ipcRenderer.send('turn-off-full-screen-mode');
        } else {
            this.uiSetting.leftPanelShow = false;
            ipcRenderer.send('turn-on-full-screen-mode');
        }

        this.isFullScreenMode = !this.isFullScreenMode;
    }

    toggleLeftPanel() {
        this.uiSetting.leftPanelShow = !this.uiSetting.leftPanelShow;
    }

    openDirectory() {
        var remote = require('electron').remote;
        var dialog = remote.require('electron').dialog;

        let paths: string[] = dialog.showOpenDialog({
            properties: ['openDirectory']
        });
        if (paths && paths.length > 0) {
            this.goTo(paths[0]);
        }
    }

    closeWindow() {
        ipcRenderer.send('close-main-window');
    }
}