import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent implements OnInit {
  message: string | undefined;
  constructor(private actRt: ActivatedRoute, private ts: TranslateService) {
    this.actRt.params.subscribe((p: any) => {
      if (p.code) {
        this.message = this.ts.instant(p.code, [p.code]);
        if (this.message == p.code) { // No trnslation available
          this.message = this.ts.instant('default.error.message');
        }
      }
    });
  }
  ngOnInit(): void {
  }
}
