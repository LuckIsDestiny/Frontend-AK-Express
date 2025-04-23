import { Routes } from "@angular/router";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { VendorDashboardComponent } from "./components/vendor-dashboard/vendor-dashboard.component";
import { AuthGuard } from "./guards/auth.guard";
import { DeliveryDashboardComponent } from "./components/delivery-dashboard/delivery-dashboard.component";
import { AssignOrderComponent } from "./components/assign-order/assign-order.component";
import { CreateOrderComponent } from "./components/create-order/create-order.component";
import { ViewOrdersComponent } from "./components/view-orders/view-orders.component";
import { UpdateStatusComponent } from "./components/update-status/update-status.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'vendor',
    component: VendorDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'create-order', component: CreateOrderComponent },
      // { path: 'assign-order', component: AssignOrderComponent },
      { path: 'view-orders', component: ViewOrdersComponent },
      { path: '', redirectTo: 'view-orders', pathMatch: 'full' }
    ]
  },
  { path: 'delivery',
    component: DeliveryDashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'view-orders', component: ViewOrdersComponent },
      { path: 'update-status', component: UpdateStatusComponent },
      { path: '', redirectTo: 'view-orders', pathMatch: 'full' }
    ]
  },
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
];
