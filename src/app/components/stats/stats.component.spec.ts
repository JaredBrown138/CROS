import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { imports } from '../../services/util.imports';
import { declarations } from '../../services/util.imports';
import { providers } from '../../services/util.imports';

import { StatsComponent } from './stats.component';

describe('StatsComponent', () => {
  let component: StatsComponent;
  let fixture: ComponentFixture<StatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [StatsComponent, declarations],
      imports: [imports],
      providers: [providers]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('calcTotal should sum all quantity values in an array', () => {
    let arr = [
      { name: "Password Reset", quantity: 1, id: "pswd" },
      { name: "Spyware Removal", quantity: 1, id: "spyw" },
      { name: "RAM Upgrade", quantity: 1, id: "ram" },
      { name: "Software Installation", quantity: 1, id: "sftw" },
      { name: "Tune-up", quantity: 1, id: "tune" },
      { name: "Keyboard Cleaning", quantity: 1, id: "keyc" },
      { name: "Disk Clean-up", quantity: 1, id: "disc" },
      { name: "Custom Service", quantity: 1, id: "custom" }
    ];
    let count = component.calcTotal(arr);
    console.log(count);
    expect(count).toBe(8);
  });


});
