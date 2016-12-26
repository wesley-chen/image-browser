import { Injectable } from '@angular/core';

export class FileModel {
    name: string;
    path: string;
    isDirectory: boolean;
    createdAt: Date;
    modifiedAt: Date;
}

export class FolderTree {
    current: FileModel;
    parents: FileModel[];
    childFolders: FileModel[];
}

@Injectable()
export class FileSystemService {


    /**
     * Convert to FileModel.
     * Return null if any exception occurred, e.g. permission issue
     */
    toFile(filePath: string): FileModel {

        const FS = require('fs');
        const PATH = require('path');

        let fileName: string = PATH.basename(filePath);
        if (fileName == "") { // root folder case: "C:\"
            fileName = PATH.dirname(filePath);
            fileName = fileName.substr(0, fileName.length - 1);
        }
        try {
            let fileInfo = FS.lstatSync(filePath);

            let file = new FileModel();
            file.name = fileName;
            file.path = filePath;
            file.isDirectory = fileInfo.isDirectory();
            file.createdAt = fileInfo.birthtime;
            file.modifiedAt = fileInfo.mtime;

            return file;
        } catch (err) {
            // handle the error safely
            console.log("Warning: " + err)
            return null;
        }
    }

    /**
     * Return parent folders
     */
    listParentFolders(filePath: string): FileModel[] {

        const FS = require('fs');
        const PATH = require('path');

        let parentFolders: FileModel[] = [];

        let currentPath = filePath;
        let parentPath = PATH.dirname(currentPath);
        while (parentPath != currentPath) {
            currentPath = parentPath;
            let parentFolder = this.toFile(currentPath);
            if (parentFolder != null) {
                parentFolders.push(this.toFile(currentPath));
            }
            parentPath = PATH.dirname(currentPath);
        }
        parentFolders.reverse();

        return parentFolders;
    }

    /**
     * Return child folders
     */
    listChildFolders(filePath: string): FileModel[] {

        const FS = require('fs');
        const PATH = require('path');

        let childFolders: FileModel[] = [];

        let childNames: string[] = FS.readdirSync(filePath);
        for (let childName of childNames) {
            let childPath = PATH.resolve(filePath, childName);
            let childFile = this.toFile(childPath);
            if (childFile != null && childFile.isDirectory) {
                childFolders.push(childFile);
            }
        }
        return childFolders;
    }

    /**
     * Build a folder tree with child folders and parrent folders
     */
    buildFolderTree(filePath: string): FolderTree {
        let tree = new FolderTree();
        tree.current = this.toFile(filePath);
        tree.parents = this.listParentFolders(filePath);
        tree.childFolders = this.listChildFolders(filePath);
        return tree;
    }
}