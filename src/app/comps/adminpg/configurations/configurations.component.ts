import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { Configuration } from '../../../model/config.model';
import { SettingsService } from '../../../services/settings.service';
import { FormsModule } from '@angular/forms';
import { InputSwitchModule } from 'primeng/inputswitch';

@Component({
  selector: 'app-configurations',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TranslateModule,
    FormsModule,
    InputSwitchModule
  ],
  templateUrl: './configurations.component.html',
  styleUrl: './configurations.component.scss'
})
export class ConfigurationsComponent {
  configs: Configuration[] | undefined;
  formGroup: any;
  checked: boolean = false;
  constructor(private settingService: SettingsService) {

  }

  ngOnInit(): void {
    this.getAppSettings();
  }

  getAppSettings() {
    this.settingService.getAppSettings()
      .subscribe({
        next: (res: any) => {
          this.configs = res.data;
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }

  saveAppSettings() {
    this.settingService.saveAppSettings(this.configs ? this.configs : []).subscribe({
      next: (res: any) => {
        // Reload Settings.
        this.getAppSettings();
      },
      error: (err: any) => {
        console.log(err);
      }
    })
  }
}
