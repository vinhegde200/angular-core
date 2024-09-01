import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MissingTranslationHandler, MissingTranslationHandlerParams } from '@ngx-translate/core';

@Component({
  selector: 'app-missing-tx',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './missing-tx.component.html',
  styleUrl: './missing-tx.component.scss'
})
export class MissingTxComponent implements MissingTranslationHandler {
  missingTx: any = {};
  txJson: string | undefined;
  handle(params: MissingTranslationHandlerParams) {
    if (!this.missingTx[params.key]) {
      this.missingTx[params.key] = params.key;
      this.txJson = JSON.stringify(this.missingTx, null, 2);
      console.log(this.txJson);
    }
  }
}
