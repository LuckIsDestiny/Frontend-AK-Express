import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { AuthGuard } from "./guards/auth.guard";
import { CreateOrderComponent } from "./components/create-order/create-order.component";
import { AssignOrderComponent } from "./components/assign-order/assign-order.component";
import { ViewOrdersComponent } from "./components/view-orders/view-orders.component";
import { DeliveryDashboardComponent } from "./components/delivery-dashboard/delivery-dashboard.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'create-order', component: CreateOrderComponent },
      { path: 'assign-order', component: AssignOrderComponent },
      { path: 'view-orders', component: ViewOrdersComponent },
      { path: '', redirectTo: 'view-orders', pathMatch: 'full' }
    ]
  },
  { path: 'delivery', component: DeliveryDashboardComponent, canActivate: [AuthGuard] }
];