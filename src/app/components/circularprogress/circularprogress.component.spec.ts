import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircularprogressComponent } from './circularprogress.component';

describe('CircularprogressComponent', () => {
  let component: CircularprogressComponent;
  let fixture: ComponentFixture<CircularprogressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CircularprogressComponent]
    });
    fixture = TestBed.createComponent(CircularprogressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
