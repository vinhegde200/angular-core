import { Component } from '@angular/core';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-error-dlg',
  standalone: true,
  imports: [
    ToastModule
  ],
  templateUrl: './error-dlg.component.html',
  styleUrl: './error-dlg.component.scss'
})
export class ErrorDlgComponent {

}
