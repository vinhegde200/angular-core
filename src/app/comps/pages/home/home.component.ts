import { Component, OnInit } from '@angular/core';
import { AccessService } from '../../../services/access.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Branding, Company } from '../../../model/access.model';
import { ButtonModule } from 'primeng/button';
import { SsoService } from '../../../sso/sso.service';
import { StorageServie } from '../../../services/storage.service';
import { AdminHomeComponent } from '../../adminpg/admin-home/admin-home.component';
import { TranslateService } from '@ngx-translate/core';
import { LangService } from '../../../services/lang.service';
import { Translation } from '../../../model/config.model';
import { MessageDlgService } from '../../common/error-dlg/msg-dlg.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ButtonModule,
    AdminHomeComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: []
})
export class HomeComponent implements OnInit {
  company: Company | undefined;
  branding: Branding | undefined;
  compname: string | undefined;

  // View Binding variables
  // loggedIn: boolean = false;
  constructor(private readonly as: AccessService,
    private readonly actRoute: ActivatedRoute,
    private readonly router: Router,
    private readonly sso: SsoService,
    private readonly ss: StorageServie,
    private readonly ts: TranslateService,
  private readonly ls: LangService,
  private readonly msgService: MessageDlgService) {
    this.actRoute.params.subscribe((p: any) => {
      let company : string | undefined;
      company = p.company;
      if (!company) {
        company = this.ss.getData("_company") as string;
      }
      if (company) {
        // this.loadCompany(p.company);
        // this.loadBranding(p.company);
        this.compname = company;
        this.loadLangStrings(company);
        this.ss.company = company;
      } else {
        this.ss.company = 'default';
        this.compname = 'default';
      }
    });
  }

  ngOnInit(): void {
  }

  loadLangStrings(compName: string) {
    const language = this.ls.getLocale();
    this.ls.getLangStrings(compName, language)
    .subscribe({
      next: (res: any) => {
        const tr = res.data as Translation;
        try {
          const trObj = JSON.parse(tr.txJson || "{}");
          this.ts.setTranslation(language, trObj, true);
          this.ts.use(language);
        } catch (err) {
          // Ignore the error
          console.log('Failed to parse language string', err);
        }
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
