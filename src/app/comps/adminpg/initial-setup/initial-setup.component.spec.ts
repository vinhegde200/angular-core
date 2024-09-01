import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSetupComponent } from './initial-setup.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';

describe('InitialSetupComponent', () => {
  let component: InitialSetupComponent;
  let fixture: ComponentFixture<InitialSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        InitialSetupComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideHttpClient(),
        MessageService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InitialSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
