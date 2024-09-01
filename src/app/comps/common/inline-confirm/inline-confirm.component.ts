import { Component, OnInit } from '@angular/core';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

@Component({
  selector: 'app-inline-confirm',
  standalone: true,
  imports: [
    ConfirmPopupModule
  ],
  templateUrl: './inline-confirm.component.html',
  styleUrl: './inline-confirm.component.scss'
})
export class InlineConfirmComponent implements OnInit {

  ngOnInit(): void {
      
  }
}
