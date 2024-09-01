import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TxrowComponent } from './txrow.component';

describe('TxrowComponent', () => {
  let component: TxrowComponent;
  let fixture: ComponentFixture<TxrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TxrowComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TxrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
