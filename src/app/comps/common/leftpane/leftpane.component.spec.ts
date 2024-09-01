import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftpaneComponent } from './leftpane.component';
import { TranslateModule } from '@ngx-translate/core';
import { provideHttpClient } from '@angular/common/http';

describe('LeftpaneComponent', () => {
  let component: LeftpaneComponent;
  let fixture: ComponentFixture<LeftpaneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LeftpaneComponent,
        TranslateModule.forRoot()
      ],
      providers: [
        provideHttpClient()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeftpaneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
