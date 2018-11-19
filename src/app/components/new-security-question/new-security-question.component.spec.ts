import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { imports } from '../../services/util.imports';
import { declarations } from '../../services/util.imports';
import { providers } from '../../services/util.imports';

import { NewSecurityQuestionComponent } from './new-security-question.component';

describe('NewSecurityQuestionComponent', () => {
  let component: NewSecurityQuestionComponent;
  let fixture: ComponentFixture<NewSecurityQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewSecurityQuestionComponent, declarations],
      imports: [imports],
      providers: [providers]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSecurityQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
