import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSecurityQuestionComponent } from './new-security-question.component';

describe('NewSecurityQuestionComponent', () => {
  let component: NewSecurityQuestionComponent;
  let fixture: ComponentFixture<NewSecurityQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSecurityQuestionComponent ]
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
