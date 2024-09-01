import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarUserComponent } from './topbar-user.component';
import { TranslateModule } from '@ngx-translate/core';

describe('TopbarUserComponent', () => {
  let component: TopbarUserComponent;
  let fixture: ComponentFixture<TopbarUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        TopbarUserComponent,
        TranslateModule.forRoot()
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopbarUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
