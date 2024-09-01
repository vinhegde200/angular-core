import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineConfirmComponent } from './inline-confirm.component';

describe('InlineConfirmComponent', () => {
  let component: InlineConfirmComponent;
  let fixture: ComponentFixture<InlineConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InlineConfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InlineConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
