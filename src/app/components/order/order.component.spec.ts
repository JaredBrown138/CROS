import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { imports } from '../../services/util.imports';
import { declarations } from '../../services/util.imports';
import { providers } from '../../services/util.imports';

import { OrderComponent } from './order.component';

describe('OrderComponent', () => {
  let component: OrderComponent;
  let fixture: ComponentFixture<OrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OrderComponent, declarations],
      imports: [imports],
      providers: [providers]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tallyTotal should set car total to sum of values in cart', () => {
    component.cart = [
      { text: "Password Reset", price: "39.99", id: "pswd", type: 'password' },
      { text: "Spyware Removal", price: "99.99", id: "spyw", type: 'spyware' }
    ]
    component.tallyTotal();
    expect(component.cartTotal).toBe(139.98);
  });

  it('addToCart should place item in the cart and calculate total', () => {
    component.cart = [];
    component.addToCart({ text: "Password Reset", price: "39.99", id: "pswd", type: 'password' });
    expect(component.cart.length).toBe(1);
  });

  it('removeFromCart should remove item with appropriate id', () => {
    component.cart = [];
    component.addToCart({ text: "Password Reset", price: "39.99", id: "pswd", type: 'password' });
    component.removeFromCart('pswd');
    expect(component.cart.length).toBe(0);
  });

  it('clear() should remove all items from the cart', () => {
    component.cart = [
      { text: "Password Reset", price: "39.99", id: "pswd", type: 'password' },
      { text: "Spyware Removal", price: "99.99", id: "spyw", type: 'spyware' }
    ];
    component.clear();
    expect(component.cart.length).toBe(0);
  });

  it('addCustom should place item in the cart and calculate total', () => {
    component.cart = [];
    component.customTitle = "Test";
    component.customDesc = "Test Desc";
    component.customParts = "123";
    component.customLabor = "1";
    component.addCustom();
    expect(component.cart.length).toBe(1);
  });

  it('addCustom calculate the correct value for cost', () => {
    component.cart = [];
    component.customTitle = "Test";
    component.customDesc = "Test Desc";
    component.customParts = "123";
    component.customLabor = "1";
    component.addCustom();
    expect(component.cart[0]['price']).toBe('173.00');
  });


});
