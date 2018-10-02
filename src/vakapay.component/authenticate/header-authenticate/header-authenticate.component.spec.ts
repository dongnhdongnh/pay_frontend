import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAuthenticateComponent } from 'component/authenticate/header-authenticate/header-authenticate.component';

describe('HeaderAuthenticateComponent', () => {
  let component: HeaderAuthenticateComponent;
  let fixture: ComponentFixture<HeaderAuthenticateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderAuthenticateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderAuthenticateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
