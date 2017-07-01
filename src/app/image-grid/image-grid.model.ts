export class WidthMode {
    static readonly SMALL = "Small";
    static readonly MIDDLE = "Middle";
    static readonly FIT_WIDTH = "FitWidth";
    static readonly PERCENT_100 = "Percent100";
}

export class ImageGridSetting {

    public widthMode: string = WidthMode.MIDDLE;
    public showCaption: boolean;

    constructor(widthMode: string, showCaption: boolean) {
        this.widthMode = widthMode;
        this.showCaption = showCaption;
    };
}