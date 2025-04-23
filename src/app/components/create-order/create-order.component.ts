import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  imports: [CommonModule, FormsModule],
  templateUrl: './create-order.component.html',
  styleUrl: './create-order.component.css'
})
export class CreateOrderComponent implements OnInit {
  orderData = {
    orderId: '',
    vendorName: '',
    customerName: '',
    address: '',
    payment: {
      amount: '',
      method: '',
      status: 'Pending',
      transactionId: ''
    }
  };
  errorMessage: string = '';
  successMessage: string = '';
  role: string = '';

  constructor(private orderService: OrderService, private router: Router) {
    this.role = this.orderService.getRole();
  }

  ngOnInit(): void { }

  createOrder() {
    this.orderService.createOrder(this.orderData).subscribe({
      next: (response) => {
        this.successMessage = 'Order created successfully!';
        console.log(response);
        this.errorMessage = '';
        setTimeout(() => {
          if (this.role === 'Vendor') {
            this.router.navigate(['/vendor/view-orders'])
          } else if (this.role === 'Admin') {
            this.router.navigate(['/admin/view-orders']);
          }
        }, 2000);
      },
      error: (err) => {
        this.errorMessage = 'Failed to create order';
        this.successMessage = '';
        console.error(err);
      }
    });
  }

}
