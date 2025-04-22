import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-assign-order',
  imports: [CommonModule, FormsModule, RouterModule], 
  templateUrl: './assign-order.component.html',
  styleUrl: './assign-order.component.css'
})
export class AssignOrderComponent implements OnInit {
  orders: any[] = [];
  deliveryAgents: any[] = [];
  assignmentData = {
    orderId: '',
    deliveryAgentId: ''
  };

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.loadOrders();
    this.loadDeliveryAgents();
  }

  loadOrders() {
    this.orderService.getAllOrders().subscribe({
      next: (data) => {
        // Filter orders that are pending and have no assigned driver
        this.orders = data.filter(order => 
          order.status === 'Pending' && !order.assignedTo
        );
        console.log("Orders : ", this.orders);
      },
      error: (error) => {
        console.error('Error loading orders:', error);
      }
    });
  }

  loadDeliveryAgents() {
    this.orderService.getDeliveryAgents().subscribe({
      next: (agents) => {
        this.deliveryAgents = agents;
        console.log(agents);
      },
      error: (error) => {
        console.error('Error loading delivery agents:', error);
      }
    });
  }

  assignOrder() {
    // Additional check before assigning
    // if (!this.assignmentData.orderId || !this.assignmentData.deliveryAgentId) {
    //   console.error('Please select both order and delivery agent');
    //   return;
    // }

    // const orderToAssign = this.orders.find(o => o.id === this.assignmentData.orderId);
    // if (!orderToAssign || orderToAssign.status !== 'pending' || orderToAssign.deliveryAgentId) {
    //   console.error('Invalid order selection or order already assigned');
    //   return;
    // }

    this.orderService.assignOrder(this.assignmentData).subscribe({
      next: (response) => {
        console.log('Order assigned successfully:', response);
        this.loadOrders();
      },
      error: (error) => {
        console.error('Error assigning order:', error);
      }
    });
  }
}
