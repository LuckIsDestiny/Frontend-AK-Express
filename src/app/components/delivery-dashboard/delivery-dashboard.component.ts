import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Router, RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-delivery-dashboard',
  imports: [CommonModule, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './delivery-dashboard.component.html',
  styleUrl: './delivery-dashboard.component.css'
})
export class DeliveryDashboardComponent implements OnInit {
  orders: any[] = [];
  deliveryAgentId: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private orderService: OrderService, private authService: AuthService, private router: Router) {
    // Get token from cookie and decode to get user ID
    this.deliveryAgentId = this.orderService.getDeliveryAgentId();
  }

  ngOnInit(): void {
    this.loadDeliveryAgentOrders();
  }

  loadDeliveryAgentOrders() {
    if (this.deliveryAgentId) {
      this.orderService.getOrdersById(this.deliveryAgentId)
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

  goToUpdateOrderStatus() {
    this.router.navigate(['/delivery/update-status']);
  }

  goToMyOrders() {
    this.router.navigate(['/delivery/view-orders']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
