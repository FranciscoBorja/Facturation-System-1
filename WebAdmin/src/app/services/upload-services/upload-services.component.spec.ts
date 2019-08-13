import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UploadServicesComponent} from './upload-services.component';

describe('UploadServicesComponent', () => {
  let component: UploadServicesComponent;
  let fixture: ComponentFixture<UploadServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UploadServicesComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
