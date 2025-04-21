import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {
  orders: any[] = [];
  errorMessage: string = '';

  constructor(private orderService: OrderService, private router: Router) {}

  // ngOnInit(): void {
  //   this.fetchOrders();
  // }

  // // Fetch orders from the backend
  // fetchOrders() {
  //   this.orderService.getAllOrders().subscribe({
  //     next: (data) => {
  //       this.orders = data;
  //       console.log(data)
  //     },
  //     error: (err) => {
  //       this.errorMessage = 'Failed to load orders.';
  //       console.error(err);
  //     }
  //   });
  // }

  // Navigate to create order page
  goToCreateOrder() {
    this.router.navigate(['/admin/create-order']);
  }

  // Navigate to assign order page
  goToAssignOrder() {
    this.router.navigate(['/admin/assign-order']);
  }

  // Navigate to all orders page
  goToAllOrders() {
    this.router.navigate(['/admin/view-orders']);
  }
}
