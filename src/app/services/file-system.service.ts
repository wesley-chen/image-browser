import { Injectable } from '@angular/core';
import { Image, FileModel, FolderTree } from '../model';

@Injectable()
export class FileSystemService {

    readonly IMAGE_TYPES: string[] = ['.png', '.jpeg', '.jpg', '.gif', '.bmp', '.webp', '.svg'];

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
            if (!file.isDirectory) {
                file.fileExt = PATH.extname(filePath);
                file.fileSize = fileInfo["size"]; // file size in Bytes 
            }

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
        tree.images = this.listImageFiles(filePath);

        return tree;
    }

    listImageFiles(filePath: string): Image[] {

        const FS = require('fs');
        const PATH = require('path');
        const URL = require('file-url');


        // Initializes Calipers with support for calipers-png, calipers-jpeg, ...
        const IMG_UTILS = require('calipers')(this.IMAGE_TYPES);

        let images: Image[] = [];

        let childNames: string[] = FS.readdirSync(filePath);
        for (let childName of childNames) {
            let childPath = PATH.resolve(filePath, childName);
            let childFile = this.toFile(childPath);
            if (childFile != null && !childFile.isDirectory) {

                let index = this.IMAGE_TYPES.indexOf(childFile.fileExt);
                if (index >= 0) {
                    let img = new Image();
                    img.fileName = childFile.name;
                    img.fileExt = childFile.fileExt;
                    img.formatName = childFile.fileExt;
                    img.size = childFile.fileSize;
                    img.url = URL(childFile.path);
                    img.width = 100;
                    img.height = 100;
                    images.push(img);
                }
                // IMG_UTILS.measure(childPath)
                //     .then(function (result: any) {
                //         console.log("this " + result.type + " file is " + result.pages[0].width + "x" + result.pages[0].height);
                //         let isImage = this.IMAGE_TYPES.indexOf(result.type);
                //         if (isImage) {
                //             let img = new Image();
                //             img.fileName = childFile.name;
                //             img.fileExt = result.type;
                //             img.formatName = result.type;
                //             img.size = childFile.fileSize;
                //             img.url = childFile.path;
                //             img.width = result.pages[0].width;
                //             img.height = result.pages[0].height;
                //             images.push(img);
                //         }
                //     });
            } // end if
        }

        return images;
    }
}