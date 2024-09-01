import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopbarComponent } from './topbar.component';
import { BrandingTestData } from '../../../testdata/branding.data';
import { By } from '@angular/platform-browser';

describe('TopbarComponent', () => {
  let component: TopbarComponent;
  let fixture: ComponentFixture<TopbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('set the title', () => {
    const comp: TopbarComponent = fixture.componentInstance
    const btd = new BrandingTestData();
    const c1 = btd.comp_title.data;
    const c2 = btd.comp_name.data;
    comp._company = c1;
    comp._branding = btd.branding.data;
    comp._user = btd.user.data;
    fixture.detectChanges();

    let title = fixture.debugElement.query(By.css('#_topbar-title-text')).nativeElement.innerText;
    expect(title).toBe(c1.title);

    comp._company = c2;
    fixture.detectChanges();
    title = fixture.debugElement.query(By.css('#_topbar-title-text')).nativeElement.innerText;
    expect(title).toBe(c2.name);
  });
});
