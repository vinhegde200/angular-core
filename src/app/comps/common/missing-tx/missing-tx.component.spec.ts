import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissingTxComponent } from './missing-tx.component';

describe('MissingTxComponent', () => {
  let component: MissingTxComponent;
  let fixture: ComponentFixture<MissingTxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissingTxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MissingTxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
