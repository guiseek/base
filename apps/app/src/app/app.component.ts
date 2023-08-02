import { Component } from '@angular/core';

@Component({
  selector: 'base-root',
  template: `<router-outlet></router-outlet>`,
  styles: [
    `
      :host {
        flex: 1;
        height: 100%;
        display: flex;
        flex-direction: column;
      }
    `,
  ],
})
export class AppComponent {
  title = 'app';
}
