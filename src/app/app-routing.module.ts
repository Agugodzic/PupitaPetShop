import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito/carrito.component';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { StoreComponent } from './store/store.component';
import { ComprarComponent } from './comprar/comprar.component';
import { LogInComponent } from './logIn/logIn.component';

const routes: Routes = [
{ path: 'store/:categoria', component: StoreComponent },
{ path: 'store', component: StoreComponent },
{ path: 'home', component: HomeComponent },
{ path: 'carrito', component: CarritoComponent },
{ path: 'prod/:id', component: ProductoComponent },
{ path: 'comprar', component:ComprarComponent },
{ path: 'admin-log', component:LogInComponent },

{ path: '', redirectTo: '/home', pathMatch: 'full' },
{ path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
