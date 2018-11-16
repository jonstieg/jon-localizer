import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalizerListComponent } from './localizer-list.component';

describe('LocalizerListComponent', () => {
  let component: LocalizerListComponent;
  let fixture: ComponentFixture<LocalizerListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalizerListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalizerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
