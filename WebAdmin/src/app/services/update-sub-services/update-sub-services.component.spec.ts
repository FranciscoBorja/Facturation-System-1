import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdateSubServicesComponent} from './update-sub-services.component';

describe('UpdateSubServicesComponent', () => {
  let component: UpdateSubServicesComponent;
  let fixture: ComponentFixture<UpdateSubServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateSubServicesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSubServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
