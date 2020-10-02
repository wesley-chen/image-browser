import { Injectable } from '@angular/core';


@Injectable()
export class Logger {

    get log() {
        return console.log.bind(console);
    }
}