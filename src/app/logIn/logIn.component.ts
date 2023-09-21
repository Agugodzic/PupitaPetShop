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
  public showErrorMessage:boolean = false;
  public spinner:boolean = false;


  constructor(private authService:AuthService, private formBuilder:FormBuilder) { }

  comprobar(response:string){
    if(this.authService.loggedIn() && response !== 'e'){
      window.location.href='/#/store/0';
    }else{
      this.showErrorMessage = true;
      this.spinner = false;
    }
  }

  ingresar(){
    this.spinner = true;
    this.authService.IniciarSesion(this.logIn.value).subscribe((response)=>{
      this.comprobar(response);
    });
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
