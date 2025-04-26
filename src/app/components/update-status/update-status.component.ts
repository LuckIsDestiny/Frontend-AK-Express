import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-update-status',
  imports: [CommonModule, FormsModule],
  templateUrl: './update-status.component.html',
  styleUrl: './update-status.component.css'
})
export class UpdateStatusComponent {
  orderId: string = '';
  orders: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';
  status: 'Assigned' | 'Out for Delivery' | 'Delivered' = 'Assigned';

  constructor(private http: HttpClient, private orderService: OrderService) {
    this.loadOrders();
    // Remove updateStatus() from constructor since orderId is empty initially
  }

  // Add method to update status with order ID parameter
  updateStatus(orderId: string) {
    this.orderId = orderId;
    this.orderService.updateOrderStatus(this.orderId, this.status).subscribe({
      next: (response: any) => {
        console.log('Status updated successfully', response);
        this.successMessage = 'Status updated successfully';
        // Reload orders after status update
        this.loadOrders();
      },
      error: (error) => {
        console.error('Failed to update status', error);
        this.errorMessage = 'Failed to update status';
      }
    });
  }

  loadOrders() {
    const deliveryAgentId = this.orderService.getDeliveryAgentId();
    this.orderService.getOrdersById(deliveryAgentId)
      .subscribe({
        next: (response) => {
          this.orders = response;
        },
        error: (error) => {
          console.error('Error fetching orders:', error);
          this.errorMessage = 'Error fetching orders';
        }
      });
  }
}
