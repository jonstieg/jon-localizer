import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizerDetailsComponent } from './localizer-details.component';

describe('LocalizerDetailsComponent', () => {
  let component: LocalizerDetailsComponent;
  let fixture: ComponentFixture<LocalizerDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizerDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
