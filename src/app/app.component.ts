import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'asyncupload';

  public completed(e) {
    console.log({e});
  }

  public onError(e) {
    console.log({e});
  }
}
