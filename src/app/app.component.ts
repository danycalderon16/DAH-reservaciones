import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private translateservice: TranslateService) {
    this.translateservice.setDefaultLang('ingles');
    this.translateservice.addLangs(['ingles','español','frances']);
  }
}
