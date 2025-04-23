import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  private authService = inject(AuthService);
  private router = inject(Router);
  private cookieService = inject(CookieService);

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response: any) => {
        console.log("Login Response:", JSON.stringify(response, null, 2)) // Format response object for readable logging
        this.cookieService.set('token', response.token);
        this.authService.setUser(response.user);
        const role = response.user.role;
        if (role === 'Vendor') {
          this.router.navigate(['/vendor']);
        } else if (role === 'DeliveryAgent') {
          this.router.navigate(['/delivery']);
        } else if (role === 'Admin') {
          this.router.navigate(['/admin']);
        }
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
