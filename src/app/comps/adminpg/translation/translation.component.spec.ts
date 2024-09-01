import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationComponent } from './translation.component';
import { SettingsService } from '../../../services/settings.service';
import { provideHttpClient } from '@angular/common/http';
import { MissingTranslationHandler, TranslateCompiler, TranslateLoader, TranslateModule, TranslateParser, TranslateStore } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

describe('TranslationComponent', () => {
  let component: TranslationComponent;
  let fixture: ComponentFixture<TranslationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslationComponent, TranslateModule.forRoot()],
      providers: [
        provideHttpClient(),
        SettingsService,
        MessageService
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
