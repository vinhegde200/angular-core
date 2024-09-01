import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SetupComponent } from './setup/setup.component';

@Component({
  selector: 'app-initial-setup',
  standalone: true,
  imports: [
    CommonModule,
    SetupComponent
  ],
  templateUrl: './initial-setup.component.html',
  styleUrl: './initial-setup.component.scss'
})
export class InitialSetupComponent implements OnInit {
  steps: Step[] = [];
  errSections: number[] = [0, 1, 2, 3, 4, 5];
  ngOnInit(): void {
    this.initSteps();  
  }

  validationErrors(errSections: number[]) {
    this.errSections = errSections;
  }
  initSteps() {
    this.steps = [
      {
        label: "Keycloak login",
        stepNumber: 1,
        completed: false
      },
      {
        label: "Application URL",
        stepNumber: 2,
        completed: false
      },
      {
        label: "Create First admin",
        stepNumber: 3,
        completed: false
      },
      {
        label: "Create first tenant",
        stepNumber: 4,
        completed: false
      },
      {
        label: "Complete setup",
        stepNumber: 5,
        completed: false
      }
    ]
  }
}

interface Step {
  label: string;
  stepNumber: number;
  completed: boolean;
}
