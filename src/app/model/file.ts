export class FileModel {
    name: string;
    path: string;
    isDirectory: boolean;
    fileExt: string;
    fileSize: number = 0; // file size in Bytes 
    createdAt: Date;
    modifiedAt: Date;
}