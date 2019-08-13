import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {UpdloadUserComponent} from './updload-user.component';

describe('UpdloadUserComponent', () => {
  let component: UpdloadUserComponent;
  let fixture: ComponentFixture<UpdloadUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UpdloadUserComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdloadUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
