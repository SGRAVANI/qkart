import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartemptyComponent } from './startempty.component';

describe('StartemptyComponent', () => {
  let component: StartemptyComponent;
  let fixture: ComponentFixture<StartemptyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StartemptyComponent]
    });
    fixture = TestBed.createComponent(StartemptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
