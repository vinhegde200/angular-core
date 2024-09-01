import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputSwitchModule } from 'primeng/inputswitch';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { MessageDlgService } from '../../../common/error-dlg/msg-dlg.service';
import { SetupDTO } from './setup.model';
import { SetupService } from '../../../../services/setup.service';

@Component({
  selector: 'app-setup',
  standalone: true,
  imports: [
    TranslateModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    InputSwitchModule,
    StepsModule
  ],
  templateUrl: './setup.component.html',
  styleUrl: './setup.component.scss'
})
export class SetupComponent implements OnInit {
  setupForm: any;
  // Steps
  setupIndex: number = 0;
  setupCompleted: boolean = false;

  welcomeUser: string = '';
  homeCompany: string = '';

  @Output("validations") validations = new EventEmitter<number[]>();
  constructor(private msgService: MessageDlgService, private ss: SetupService) {

  }
  ngOnInit(): void {
    this.initForm();
    this.initSteps();
  }

  initSteps() {

  }

  initForm() {
    if (!this.setupForm) {
      this.setupForm = new FormGroup({
        keyCloakAdmin: new FormControl('', Validators.required),
        keyCloakPassword: new FormControl('', Validators.required),
        keyCloakAdminClient: new FormControl('', Validators.required),
        realm: new FormControl('', [Validators.required]),
        appName: new FormControl('', Validators.required),
        identityMgmtUrl: new FormControl('', Validators.required),
        keycloakExtUrl: new FormControl('', Validators.required),
        appUrl: new FormControl('', Validators.required),
        sslRequired: new FormControl(false, Validators.required),
        adminUserName: new FormControl('', Validators.required),
        adminUserPassword: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        adminUserEmail: new FormControl('', Validators.required),
        company: new FormControl('', Validators.required),
        erpUrl: new FormControl('', Validators.required)
      });
    }
  }
  onSelectionChange(event: number) {
      this.setupIndex = event;
  }

  startSetup() {
    // Dont do anything here
    // completeSetup will be called.
  }

  completeSetup() {
    if (this.validateForm()) {
      const dto = this.createDto();
      this.welcomeUser = dto.firstName + ' ' + dto.lastName;
      this.homeCompany = dto.company; 
      this.ss.doInitialSetup(dto)
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.setupIndex = 4;
          this.setupCompleted = true;
        },
        error: (err: any) => {
          this.msgService.showError(err);
        }
      })
    } else {
      console.log('Validation error');
    }
  }

  createDto() {
    const dto: SetupDTO = {
      keyCloakAdmin: this.setupForm.get("keyCloakAdmin").value,
      keyCloakPassword: this.setupForm.get("keyCloakPassword").value,
      realm: this.setupForm.get("realm").value,
      appName: this.setupForm.get("appName").value,
      identityMgmtUrl: this.setupForm.get("identityMgmtUrl").value,
      keycloakExtUrl: this.setupForm.get("keycloakExtUrl").value,
      appUrl: this.setupForm.get("appUrl").value,
      sslRequired: '' + this.setupForm.get("sslRequired").value,
      keyCloakAdminClient: this.setupForm.get("keyCloakAdminClient").value,
      adminUserName: this.setupForm.get("adminUserName").value,
      adminUserPassword: this.setupForm.get("adminUserPassword").value,
      firstName: this.setupForm.get("firstName").value,
      lastName: this.setupForm.get("lastName").value,
      adminUserEmail: this.setupForm.get("adminUserEmail").value,
      company: this.setupForm.get("company").value,
      erpUrl: this.setupForm.get("erpUrl").value,
    }
    console.log("DTO Object", dto);
    return dto;
  }

  validateForm() {
    const errSec = this.validateFormInternal();
    if (errSec.length == 0) {
      return true;
    } else {
      this.setupIndex = errSec[0];
      this.msgService.showErrorMsg("Please enter valid values for all fields. One or more values are null or not valid.", "Valiadtion error");
      return false;
    }
  }
  validateFormInternal(): number[] {
    let errorSection = [];
    if (this.setupForm.controls.identityMgmtUrl.error ||
      this.setupForm.controls.keycloakExtUrl.error ||
      this.setupForm.controls.keyCloakAdminClient.error ||
      this.setupForm.controls.keyCloakAdmin.error ||
      this.setupForm.controls.keyCloakPassword.error
    ) {
      errorSection.push(1);
    }
    if (this.setupForm.controls.appUrl.errors ||
        this.setupForm.controls.realm.errors ||
        this.setupForm.controls.appName.errors
    ) {
      errorSection.push(2);
    } 
    if (this.setupForm.controls.adminUserName.errors ||
        this.setupForm.controls.adminUserPassword.errors ||
        this.setupForm.controls.firstName.errors ||
        this.setupForm.controls.lastName.errors ||
        this.setupForm.controls.adminUserEmail.errors
    ) {
      errorSection.push(3);
    }
    if (this.setupForm.controls.company.errors ||
      this.setupForm.controls.erpUrl.errors
    ) {
      errorSection.push(4);
    }
    this.validations.emit(errorSection);
    return errorSection;
  }

  isSectionHavingError(sec: number) {
    return this.validateFormInternal().includes(sec);
  }

  showNext(index: number) {
    this.setupIndex = index;
    this.validateFormInternal();
  }

  gotoLogin() {
    window.location.href = `/#/home/${this.homeCompany}`;
  }
}
