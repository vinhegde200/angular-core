import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-workinprogress',
  standalone: true,
  imports: [
    TranslateModule,
    ButtonModule
  ],
  templateUrl: './workinprogress.component.html',
  styleUrl: './workinprogress.component.scss'
})
export class WorkinprogressComponent {
  constructor(private ts: ThemeService) {

  }
}
