import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarritoComponent } from './carrito/carrito.component';
import { CarruselComponent } from './carrusel/carrusel.component';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { StoreComponent } from './store/store.component';
import { AlertComponent } from './alert/alert.component';
import { VentanaComponent } from './ventana/ventana.component';
import { FormProductoComponent } from './formularios/form-producto/form-producto.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from './servicios/producto.service';
import { ComprarComponent } from './comprar/comprar.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './servicios/auth.service';
import { InterceptorService } from './servicios/interceptor.service';
import { LogInComponent } from './logIn/logIn.component';
import { ProductoMiniaturaComponent } from './producto-miniatura/producto-miniatura.component';

import { ContactanosComponent } from './contactanos/contactanos.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    CarritoComponent,
    CarruselComponent,
    HomeComponent,
    ProductoComponent,
    StoreComponent,
    AlertComponent,
    VentanaComponent,
    LogInComponent,
    FormProductoComponent,
    ComprarComponent,
    NavComponent,
    ProductoMiniaturaComponent,
    ContactanosComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [ProductoService , AuthService,{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true }],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
