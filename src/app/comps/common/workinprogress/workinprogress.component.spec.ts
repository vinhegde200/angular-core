import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkinprogressComponent } from './workinprogress.component';

describe('WorkinprogressComponent', () => {
  let component: WorkinprogressComponent;
  let fixture: ComponentFixture<WorkinprogressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WorkinprogressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkinprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
