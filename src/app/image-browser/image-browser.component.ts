import { Component } from '@angular/core';
import { FileSystemService } from '../services/file-system.service';
import { Image, FileModel, FolderTree } from '../model';
import { ImageGridSetting, WidthMode } from '../image-grid';

@Component({
    selector: 'tp-image-browser',
    providers: [FileSystemService],
    templateUrl: 'image-browser.component.html'
})
export class ImageBrowserComponent {

    rootPath: string = "E:\图片";
    tree: FolderTree;
    imageGridSetting: ImageGridSetting = new ImageGridSetting(WidthMode.Middle, true);

    constructor(private fileSytemService: FileSystemService) { }

    ngOnInit(): void {
        this.tree = this.fileSytemService.buildFolderTree(this.rootPath);
    }

    goTo(filePath: string) {
        this.tree = this.fileSytemService.buildFolderTree(filePath);
    }
}