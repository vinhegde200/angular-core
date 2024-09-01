import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputTextModule } from 'primeng/inputtext';
import { Configuration, KeyVal } from '../../../../model/config.model';

@Component({
  selector: 'app-txrow',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule, CheckboxModule],
  templateUrl: './txrow.component.html',
  styleUrl: './txrow.component.scss'
})
export class TxrowComponent {
  txRow = new FormGroup({
    key: new FormControl('', Validators.required),
    value: new FormControl('', Validators.required)
  });
  tx: KeyVal | undefined;
  @Input("txrow") set _tx (_t: KeyVal | undefined) {
    this.tx = _t;
    this.initForm();
  }

  initForm() {
    if (this.tx) {
      this.txRow.get("key")?.setValue(this.tx.key);
      this.txRow.get("value")?.setValue(this.tx.value);
      this.tx.dirty = false;
    }
  
    this.txRow.valueChanges.subscribe({
      next: (res: any) => {
        if (this.tx != null) {
          this.tx.value = this.txRow.get("value")?.value || "";
          this.tx.key = this.txRow.get("key")?.value || "";
          this.tx.dirty = true;
        }
      }
    });
  }
}
