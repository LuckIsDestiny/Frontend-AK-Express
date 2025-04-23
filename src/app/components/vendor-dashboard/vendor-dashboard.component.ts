import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-vendor-dashboard',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './vendor-dashboard.component.html',
  styleUrl: './vendor-dashboard.component.css'
})
export class VendorDashboardComponent implements OnInit {
  orders: any[] = [];
  errorMessage: string = '';

  constructor(private authService: AuthService, private orderService: OrderService, private router: Router) {}

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

  // Call logout from authService and subscribe to ensure HTTP request completes
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Navigate to create order page
  goToCreateOrder() {
    this.router.navigate(['/vendor/create-order']);
  }

  // Navigate to assign order page
  // goToAssignOrder() {
  //   this.router.navigate(['/vendor/assign-order']);
  // }

  // Navigate to all orders page
  goToAllOrders() {
    this.router.navigate(['/vendor/view-orders']);
  }
}
