import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadImageProfileComponent } from 'component/page/profile/upload-image-profile/upload-image-profile.component';

describe('UploadImageProfileComponent', () => {
  let component: UploadImageProfileComponent;
  let fixture: ComponentFixture<UploadImageProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadImageProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadImageProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
