import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { imports } from '../../services/util.imports';
import { declarations } from '../../services/util.imports';
import { providers } from '../../services/util.imports';

import { SecurityQuestionsComponent } from './security-questions.component';

describe('SecurityQuestionsComponent', () => {
  let component: SecurityQuestionsComponent;
  let fixture: ComponentFixture<SecurityQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SecurityQuestionsComponent, declarations],
      imports: [imports],
      providers: [providers]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('addToTable should add question to the questions array', () => {
    component.questions = [];
    component.addToTable({ question: "Hello" });
    expect(component.questions.length).toBe(1);
  });

});
