import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from '../../../services/settings.service';
import { KeyVal, Translation } from '../../../model/config.model';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';
import { TxrowComponent } from './txrow/txrow.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NewlangComponent } from './newlang/newlang.component';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { MessageDlgService } from '../../common/error-dlg/msg-dlg.service';

@Component({
  selector: 'app-translation',
  standalone: true,
  imports: [DropdownModule,
    CommonModule,
    TxrowComponent,
    ButtonModule,
    SplitButtonModule,
    DialogModule,
    NewlangComponent,
    TranslateModule,
    TableModule,
    FormsModule,
    InputTextModule,
    IconFieldModule,
    InputIconModule
  ],
  templateUrl: './translation.component.html',
  styleUrl: './translation.component.scss'
})
export class TranslationComponent implements OnInit {
  @ViewChild('fileinput') filein: ElementRef | undefined;
  langs: Translation[] = [];
  // translations: Translation | undefined;
  txjson: KeyVal[] = [];
  showAddLang: boolean = false;

  // items: any;

  copyfrom: Translation | undefined;

  selectedLang: Translation | undefined;

  constructor(private ss: SettingsService,
    private ts: TranslateService,
    private msgSer: MessageDlgService) {}
  ngOnInit(): void {
    this.getLanguages();
    const _parent = this;
  }

  uploadLangString() {
    const _parent = this;
    if (this.filein) {
      this.filein.nativeElement.onchange = function(event: any) {
        _parent.readText(event, _parent);
      };
      this.filein?.nativeElement.click();
    }
  }

  getLanguages() {
    this.ss.getLanguages()
    .subscribe({
      next: (res: any) => {
        this.langs = res.data as Translation[];
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }

  // showTranslationStrings(lang: Translation) {
  //   const _t = JSON.parse(lang.txJson || "{}");
  //   const result: KeyVal[] = Object.keys(_t).map((key) => {
  //     return {key: key, value: _t[key]}
  //   });
  //   if (result && result.length > 0) {
  //     this.txjson = result;
  //   } else {
  //     this.txjson = [];
  //   }
  // }

  getLangStrings(langid: number, copy: boolean = false) {
    this.ss.getTranslations(langid)
    .subscribe({
      next: (res: any) => {
        const translations = res.data as Translation;
        if (translations != null && translations.txJson != null) {
          const _t = JSON.parse(translations.txJson);
          const result: KeyVal[] = Object.keys(_t).map((key) => {
            return {key: key, value: _t[key]}
          });
          if (result && result.length > 0) {
            this.txjson = result;
          } else {
            this.txjson = [];
          }
          if (copy) {
            this.copyLanguages();
          }
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  langSelected(event: MouseEvent, lang: Translation) {
    const target: any = event.target;
    let copy: boolean = false;
    if (target && target.matches('.cls-skip-default')) {
      copy = true;
    }
    console.log('Changed to ' + lang.id);
    this.selectedLang = lang;
    if (lang.id) {
      this.getLangStrings(lang.id, copy);
    }
  }

  addRow() {
    this.txjson?.splice(0, 0, {
      key: "",
      value: "",
      dirty: true
    });
  }

  // showAddNewLang() {
  //   this.showAddLang = true;
  // }

  addNewLanguage() {
    const lang: Translation = {
      lang: "code",
      langStr: "lang-name",
      txJson: "{}",
      newRec: true
    };
    this.langs.push(lang);
    this.txjson = [];
    this.selectedLang = lang;
  }

  addLanguage(tx: Translation) {
    this.ss.saveLanguages(tx.lang, tx)
    .subscribe({
      next: (res: any) => {
        this.getLanguages();
        this.showAddLang = false;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }

  copyLanguages() {
    if (this.selectedLang) {
      const tx: Translation = {
        id: 0,
        lang: this.selectedLang.lang,
        langStr: `${this.selectedLang.langStr}-copy`,
        txJson: "{}" 
      };
      this.langs.push(tx);
      this.selectedLang = tx;
    }
  }

  validate() {
    if (this.selectedLang?.lang == null || this.selectedLang.lang == '') {
      this.msgSer.showErrorMsg('translation.enterlang', 'validation.error');
      return false;
    }
    if (this.selectedLang?.langStr == null || this.selectedLang.langStr == '') {
      this.msgSer.showErrorMsg('translation.enterlangstr', 'validation.error');
      return false;
    }
    return true;
  }

  save() {
    if (!this.validate()) {
      return;
    }
    const txObj: any = {};
    this.txjson?.forEach((itm: KeyVal) => {
      txObj[itm.key] = itm.value;
    });
    if (this.selectedLang != null) {
      const tx: Translation = {
        lang: this.selectedLang.lang,
        langStr: this.selectedLang.langStr,
        id: this.selectedLang.id,
        txJson: JSON.stringify(txObj)
      }
      this.ss.saveLanguages(this.selectedLang.lang, tx)
      .subscribe({
        next: (res: any) => {
          let _t: Translation = res.data as Translation;
          if (_t && _t.id && this.selectedLang) {
            this.selectedLang.id = _t.id;
          }
          this.msgSer.showSuccess('translation.savedmessage', 'translation.success');
        },
        error: (err: any) => {
          this.msgSer.showError(err);
        }
      });
    }
  }

  download() {
    const txObj: any = {};
    this.txjson?.forEach((itm: KeyVal) => {
      txObj[itm.key] = itm.value;
    });
    const lang = this.selectedLang?.lang;
    this.downloadNow(`translations_${lang}.json`, JSON.stringify(txObj, null, 2));
  }

  downloadNow(file: string, text: any) {
    let element = document.createElement('a');
    element.setAttribute('href',
        'data:text/plain;charset=utf-8, '
        + encodeURIComponent(text));
    element.setAttribute('download', file);
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }

  readText(event: any, parent: TranslationComponent) {
    let filecontent: any = "";
    var myFile = event.target.files[0];
    var reader = new FileReader();
    reader.addEventListener('load', function (e) {
      filecontent = e.target?.result;
      parent.processFileContent(filecontent);
    });
    reader.readAsText(myFile);
  }

  processFileContent(fileStr: string) {
    const _t = JSON.parse(fileStr);
    const result: KeyVal[] = Object.keys(_t).map((key) => {
      return {key: key, value: _t[key]}
    });
    if (!this.txjson) {
      this.txjson = [];
    }
    this.txjson.splice(0, 0, ...result);
    // if (result && result.length > 0) {
    //   this.txjson = result;
    // } else {
    //   this.txjson = [];
    // }
  }

  clearLang() {
    this.txjson = [];
    this.selectedLang = undefined;
  }

  dlgClosed() {
    this.copyfrom = undefined;
  }
}
