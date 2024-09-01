import { Component, Input } from '@angular/core';
import { Configuration } from '../../../../model/config.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-row',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule, CheckboxModule],
  templateUrl: './row.component.html',
  styleUrl: './row.component.scss'
})
export class RowComponent {
  configRow = new FormGroup({
    key: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required),
    secret: new FormControl(false, Validators.required),
  });
  _config: Configuration | undefined;
  @Input("config") set _configuration (_c: Configuration | undefined) {
    this._config = _c;
    this.initForm();
  }
  constructor() {

  }

  initForm() {
    if (this._config) {
      this.configRow.get("key")?.setValue(this._config.key);
      this.configRow.get("value")?.setValue(this._config.value);
      this.configRow.get("secret")?.setValue(this._config.secret ? true : false);
    }
  
    this.configRow.valueChanges.subscribe({
      next: (res: any) => {
        if (this._config != null) {
          this._config.key = this.configRow.get("key")?.value || "";
          this._config.value = this.configRow.get("value")?.value || "";
          this._config.secret = this.configRow.get("secret")?.value || false;
        }
      }
    });
  }

}
