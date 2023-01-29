import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../servicios/auth.service';

@Component({
  selector: 'app-logIn',
  templateUrl: './logIn.component.html',
  styleUrls: ['./logIn.component.css']
})
export class LogInComponent implements OnInit {
  public registrado:boolean = true;
  public logIn:FormGroup;


  constructor(private authService:AuthService, private formBuilder:FormBuilder) { }

  comprobar(){
    if(this.authService.loggedIn()){
      window.location.href='/store/0';
    }else{
      alert("El usuario o la contraseña son incorrectos.")
    }
  }

  ingresar(){
    this.authService.IniciarSesion(this.logIn.value).subscribe(()=>this.comprobar());
  }

  ngOnInit(): void {

    this.logIn = this.formBuilder.group(
      {
        user:['',[Validators.required]],
        password:['',[Validators.required]]
      }
    )

  }

}
