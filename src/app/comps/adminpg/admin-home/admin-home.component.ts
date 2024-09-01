import { Component } from '@angular/core';
import { LoginComponent } from '../../pages/login/login.component';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent {

}
