import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { imports } from '../../services/util.imports';
import { declarations } from '../../services/util.imports';
import { providers } from '../../services/util.imports';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterComponent, declarations],
      imports: [imports],
      providers: [providers]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('first step should verify username and password to specs', () => {
    component.user.username = "aUser";
    component.user.password = "notvalid";
    component.user.passwordConfirm = "notvalid";
    expect(component.firstStep()).toBeFalsy();
  });

  it('second step should verify user info', () => {
    component.user = {
      "username": "fdsfds",
      "password": "Abc123456",
      "passwordConfirm": "Abc123456",
      "fName": "fdsafd",
      "lName": "fdafds",
      "phone": "32453123",
      "address": "fdsfsdfsdfds",
      "email": "fdsfd@fdscs.com",
    }
    expect(component.secondStep()).toBeTruthy();
  });

});
