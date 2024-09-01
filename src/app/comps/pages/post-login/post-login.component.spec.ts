import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostLoginComponent } from './post-login.component';
import { RouterModule } from '@angular/router';

describe('PostLoginComponent', () => {
  let component: PostLoginComponent;
  let fixture: ComponentFixture<PostLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PostLoginComponent,
        RouterModule.forRoot([])
      ],
      providers: [
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
