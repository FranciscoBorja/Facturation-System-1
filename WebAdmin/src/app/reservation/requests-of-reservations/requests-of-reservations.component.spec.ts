import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RequestsOfReservationsComponent} from './requests-of-reservations.component';

describe('RequestsOfReservationsComponent', () => {
  let component: RequestsOfReservationsComponent;
  let fixture: ComponentFixture<RequestsOfReservationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RequestsOfReservationsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestsOfReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
