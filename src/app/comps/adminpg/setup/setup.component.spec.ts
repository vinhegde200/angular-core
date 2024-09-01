import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SetupComponent } from './setup.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { MessageDlgService } from '../../common/error-dlg/msg-dlg.service';

describe('SetupComponent', () => {
  let component: SetupComponent;
  let fixture: ComponentFixture<SetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TranslateModule.forRoot(),
        RouterModule.forRoot([]),
        SetupComponent
      ],
      providers: [
        provideHttpClient(),
        MessageService,
        TranslateService,
        { provide: ActivatedRoute, useValue: { params: of({ id: '123' }) } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
