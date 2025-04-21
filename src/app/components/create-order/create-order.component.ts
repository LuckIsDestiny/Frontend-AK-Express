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
    address: ''
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private orderService: OrderService, private router: Router) {}

  ngOnInit(): void {}

  createOrder() {
    this.orderService.createOrder(this.orderData).subscribe({
      next: (response) => {
        this.successMessage = 'Order created successfully!';
        console.log(response);
        this.errorMessage = '';
        setTimeout(() => this.router.navigate(['/admin/view-orders']), 2000);
      },
      error: (err) => {
        this.errorMessage = 'Failed to create order';
        this.successMessage = '';
        console.error(err);
      }
    });
  }

}
