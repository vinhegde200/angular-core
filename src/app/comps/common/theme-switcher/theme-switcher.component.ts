import { Component, OnInit } from '@angular/core';
import { DropdownChangeEvent, DropdownModule } from 'primeng/dropdown';
import { ThemeService } from '../../../services/theme.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule
  ],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss'
})
export class ThemeSwitcherComponent implements OnInit {
  themes: AppTheme[] = [];
  selectedTheme: AppTheme | undefined;
  constructor(private ts: ThemeService) {
    this.themes = [
      {
        theme: 'admin',
        name: 'Admin Theme'
      },
      {
        theme: 'blue',
        name: 'Blue Theme'
      },
      {
        theme: 'red',
        name: 'Red Theme'
      },
      {
        theme: 'darkblue',
        name: 'Dark Blue Theme'
      }
    ];
  }

  ngOnInit(): void {
      
  }
  changeTheme(event: DropdownChangeEvent) {
    console.log('=======>', event.value);
    this.ts.switchTheme(event.value.theme);
  }
}

export interface AppTheme {
  theme: string;
  name: string;
}