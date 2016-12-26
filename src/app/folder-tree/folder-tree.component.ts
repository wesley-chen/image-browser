import { Component } from '@angular/core';
import { FileModel, FolderTree, FileSystemService } from './file-system.service';

@Component({
    selector: 'tp-folder-tree',
    providers: [FileSystemService],
    templateUrl: 'folder-tree.component.html'
})
export class FolderTreeComponent {

    rootPath: string = "E:\图片";
    tree: FolderTree;

    constructor(private fileSytemService: FileSystemService) { }

    ngOnInit(): void {
        this.tree = this.fileSytemService.buildFolderTree(this.rootPath);
    }

    goTo(filePath: string) {
        this.tree = this.fileSytemService.buildFolderTree(filePath);
    }
}