import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {GetSubServicesComponent} from './get-sub-services.component';

describe('GetSubServicesComponent', () => {
  let component: GetSubServicesComponent;
  let fixture: ComponentFixture<GetSubServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GetSubServicesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetSubServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
