import { Component, OnInit } from '@angular/core';
import { v4 as uuid } from 'uuid';
import { APIService } from '../../services/api.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  services: Array<object> = [
    { text: "Password Reset", price: "39.99", id: "pswd", type: 'password' },
    { text: "Spyware Removal", price: "99.99", id: "spyw", type: 'spyware' },
    { text: "RAM Upgrade", price: "129.99", id: "ram", type: 'ram' },
    { text: "Software Installation", price: "49.99", id: "sftw", type: 'software' },
    { text: "Tune-up", price: "89.99", id: "tune", type: 'tune' },
    { text: "Keyboard Cleaning", price: "45.00", id: "keyc", type: 'keyboard' },
    { text: "Disk Clean-up", price: "149.99", id: "disc", type: 'disk' }
  ];

  cart: Array<object> = [];

  submitting: boolean = false;
  submitted: boolean = false;

  customTitle: String = "";
  customDesc: String = "";
  customParts: String = "";
  customLabor: String = "";
  cartTotal: number = 0.00;

  constructor(public api: APIService, public snackBar: MatSnackBar) { }

  ngOnInit() { }


  addToCart(item) {
    this.cart.push(item);
    this.tallyTotal();
  }

  tallyTotal() {
    if (this.cart.length == undefined || this.cart.length == 0) {
      this.cartTotal = 0.00;
    } else {
      let total = 0;
      this.cart.forEach(x => {
        total += Number(x['price'].replace(".", ""));

      });
      let formatted = String(total);
      this.cartTotal =
        Number(formatted.substring(0, formatted.length - 2) + "." + formatted.substring(formatted.length - 2));
    }
  }

  removeFromCart(id) {
    let removed = false;
    for (let x = 0; x < this.cart.length && removed == false; x++) {
      if (this.cart[x]['id'] == id) {
        this.cart.splice(x, 1);
        removed = true;
        this.tallyTotal();

      }
    }
  }

  /**
   * Add a custom service to the 
   * cart.
   */
  addCustom() {
    let customObject = {};
    customObject['text'] = this.customTitle;
    customObject['desc'] = this.customDesc;
    customObject['type'] = "custom";
    customObject['id'] = "custom-" + uuid();
    customObject['price'] = ((Number(this.customLabor) * 50) + Number(this.customParts)).toFixed(2);
    this.cart.push(customObject);
    this.tallyTotal();
  }

  clear() {
    if (confirm('Are you sure?')) {
      this.cart = [];
      this.customTitle = "";
      this.customDesc = "";
      this.customParts = "";
      this.customLabor = "";
      this.cartTotal = 0.00;
    }

  }

  submit() {
    if (confirm('Are you sure?')) {
      this.submitting = true;
      let writeObject = { items: this.cart, total: this.cartTotal };
      this.api.submitOrder(writeObject).subscribe(
        res => {
          this.submitting = false;
          this.submitted = true;
        },
        err => {
          console.log(err);
          this.snackBar.open(err.error.message, '', {
            panelClass: ['bad', 'snack'],
            duration: 5000
          });
          this.submitting = false;
        }
      );
    }
  }

}
