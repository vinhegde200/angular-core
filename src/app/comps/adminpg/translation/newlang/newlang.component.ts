import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Translation } from '../../../../model/config.model';

@Component({
  selector: 'app-newlang',
  standalone: true,
  imports: [InputTextModule, ButtonModule, FormsModule, ReactiveFormsModule, TranslateModule],
  providers: [],
  templateUrl: './newlang.component.html',
  styleUrl: './newlang.component.scss'
})
export class NewlangComponent implements OnInit {

  constructor(private ts: TranslateService) {

  }

  @Output('lang') lang = new EventEmitter<Translation>();
  @Input('copyfrom') set _copyfrom( _c: Translation | undefined) {
    this.copyfrom = _c;
    if (_c) {
      this.copyfrommsg = this.ts.instant('language.copyfromlang', [this.copyfrom?.langStr]);
    } else {
      this.copyfrommsg = undefined;
    }
  }
  
  copyfrom: Translation | undefined;
  copyfrommsg: string | undefined;
  newLangForm = new FormGroup({
    lang: new FormControl('', Validators.required),
    langstr: new FormControl('', Validators.required)
  });
  ngOnInit(): void {
      
  }

  createLanguage() {
    let _l = this.newLangForm.get("lang")?.value;
    let _lstr = this.newLangForm.get("langstr")?.value;
    const tx: Translation = {
      lang: _l ? _l : '',
      langStr: _lstr ? _lstr : '',
      txJson: this.copyfrom ? this.copyfrom.txJson : "{}"
    };
    this.lang.emit(tx);
  }
}
