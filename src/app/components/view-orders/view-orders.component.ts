import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-view-orders',
  imports: [CommonModule, FormsModule],
  templateUrl: './view-orders.component.html',
  styleUrl: './view-orders.component.css'
})
export class ViewOrdersComponent implements OnInit {
  orders: any[] = [];
  errorMessage: string = '';

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.fetchOrders();
  }

  // Fetch orders from the backend
  fetchOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        this.orders = data;
        console.log(data);
      },
      error: (err) => {
        this.errorMessage = 'Failed to load orders.';
        console.error(err);
      }
    });
  }

}
