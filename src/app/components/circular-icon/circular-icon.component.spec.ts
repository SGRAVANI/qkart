import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularIconComponent } from './circular-icon.component';

describe('CircularIconComponent', () => {
  let component: CircularIconComponent;
  let fixture: ComponentFixture<CircularIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircularIconComponent]
    });
    fixture = TestBed.createComponent(CircularIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
