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
  role: string = '';

  constructor(private orderService: OrderService) { 
    this.role = this.orderService.getRole(); 
  }

  ngOnInit(): void {
    this.fetchOrders();
  }

  // Fetch orders from the backend
  fetchOrders() {
    if (this.role === 'Vendor' || this.role === 'Admin') {
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
    } else if(this.role === 'DeliveryAgent'){
      const deliveryAgentId = this.orderService.getDeliveryAgentId();
      this.orderService.getOrdersById(deliveryAgentId)
        .subscribe({
          next: (response) => {
            this.orders = response;
            console.log(response);
          },
          error: (error) => {
            console.error('Error fetching orders:', error);
            this.errorMessage = 'Error fetching orders';
          }
        });
    }

  }

}
