import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-url-info',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './url-info.component.html',
  styleUrl: './url-info.component.scss'
})
export class UrlInfoComponent implements OnInit {
  @Input("companycode") set _companyCode(_cc: string | undefined) {
    this.companycode = _cc;
  }
  @Output("companycodeChange") companycodeChange = new EventEmitter<string>();
  companycode: string | undefined;
  ngOnInit(): void {
      
  }

  valueChanged(val: string) {
    this.companycodeChange.emit(val);
  }
}
