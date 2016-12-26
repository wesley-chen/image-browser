export enum WidthMode {
    Small,
    Middle,
    FitWidth,
    Percent100
}

export class ImageGridSetting {

    public widthMode: WidthMode;
    public showCaption: boolean;

    constructor(widthMode: WidthMode, showCaption: boolean) {
        this.widthMode = widthMode;
        this.showCaption = showCaption;
    };
}