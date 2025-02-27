import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartfilledComponent } from './startfilled.component';

describe('StartfilledComponent', () => {
  let component: StartfilledComponent;
  let fixture: ComponentFixture<StartfilledComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartfilledComponent]
    });
    fixture = TestBed.createComponent(StartfilledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
