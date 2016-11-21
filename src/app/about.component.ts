import { Component, OnInit } from '@angular/core';

declare var Notification: any;

// import { ipcRenderer } from 'electron';

@Component({
  template: `
  <h2 highlight="skyblue">About</h2>
  <twain-quote></twain-quote>
  <p>All about this sample</p>`
})
export class AboutComponent implements OnInit {

  ngOnInit(): void {
    // ipcRenderer.on('asynchronous-reply', (event, arg) => {
    //   let myNotification = new Notification('Title', {
    //     body: 'pong'
    //   });

    //   myNotification.onclick = () => {
    //     console.log('Notification clicked');
    //   };
    // });
    // ipcRenderer.send('asynchronous-message', 'ping');
  }
}


/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
