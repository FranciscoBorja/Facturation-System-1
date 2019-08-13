import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {RegisterSubServicesComponent} from './register-sub-services.component';

describe('RegisterSubServicesComponent', () => {
  let component: RegisterSubServicesComponent;
  let fixture: ComponentFixture<RegisterSubServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterSubServicesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterSubServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
