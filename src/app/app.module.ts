import { NgModule, CUSTOM_ELEMENTS_SCHEMA, isDevMode} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarritoComponent } from './carrito/carrito.component';
import { HomeComponent } from './home/home.component';
import { ProductoComponent } from './producto/producto.component';
import { StoreComponent } from './store/store.component';
import { AlertComponent } from './alert/alert.component';
import { FormProductoComponent } from './formularios/form-producto/form-producto.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoService } from './servicios/producto.service';
import { ComprarComponent } from './comprar/comprar.component';
import { NavComponent } from './nav/nav.component';
import { ImageInputComponent } from './formularios/image-input/image-input.component';
import { AuthService } from './servicios/auth.service';
import { InterceptorService } from './servicios/interceptor.service';
import { LogInComponent } from './logIn/logIn.component';
import { ProductoMiniaturaComponent } from './producto-miniatura/producto-miniatura.component';

import { ContactanosComponent } from './contactanos/contactanos.component';
import { FooterComponent } from './footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher,MatNativeDateModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { PruebasComponent } from './pruebas/pruebas.component';
import { PedidosComponent } from './pedidos/pedidos.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { PedidoComponent } from './pedido/pedido.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { productosReducer } from './state/reducers/productos.reducer';
import { ROOT_REDUCERS } from './state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { LoadderComponent } from './loadder/loadder.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { ImagenService } from './servicios/imagen.service';
import { VariarPreciosComponent } from './formularios/variar-precios/variar-precios.component';


@NgModule({
  declarations: [
    ImageInputComponent,
    AppComponent,
    CarritoComponent,
    HomeComponent,
    ProductoComponent,
    StoreComponent,
    AlertComponent,
    LogInComponent,
    FormProductoComponent,
    ComprarComponent,
    NavComponent,
    ProductoMiniaturaComponent,
    ContactanosComponent,
    FooterComponent,
    PruebasComponent,
    PedidosComponent,
    PedidoComponent,
    LoadderComponent,
    SpinnerComponent,
    VariarPreciosComponent
  ],
  imports: [
    MatIconModule,
    MatMenuModule,
    MatNativeDateModule,
    MatSlideToggleModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EffectsModule.forRoot([]),
  ],
  providers: [
    ProductoService,
    ImagenService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher},
    { provide: LocationStrategy , useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
