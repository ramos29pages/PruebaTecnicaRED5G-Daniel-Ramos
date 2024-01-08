import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})

export class LoginFormComponent implements OnInit {

  datos : any;
  infoUsername !: string;
  infoPassword !: string;
  loginForm : FormGroup;
  isPresent = false;
  errPassword: boolean = false;
  errUsername: boolean = false;
  passwordHidden: boolean = false;
  animationOne : boolean = true;
  animationTwo : boolean = true;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

  
  }

  ngOnInit() {}

  submit() {

    if(this.loginForm.get('username')?.errors?.['required']){
      console.log( 'USERNAME', this.loginForm.get('username'));
      this.infoUsername = 'Ingresa un nombre valido';
      this.errUsername = true;
    } else{
      this.infoUsername = '';
      this.errUsername = false;
    }

    if(this.loginForm.get('password')?.errors?.['required']){
      console.log( 'PASSWORD', this.loginForm.get('password'));
      this.infoPassword = 'Ingresa una contraseña valida';
      this.errPassword = true;
    } else{
      this.infoPassword = '';
      this.errPassword = false;
    }
    
    if (this.loginForm.valid) {
      const { username, password } = this.loginForm.value;
      console.log(username, password);
      this.isPresent = false;
      if (this.isPresent) {
        this.errUsername = false;
        this.animationOne = false;
        this.animationTwo = false;
        setTimeout(()=>{
          this.router.navigate(["/dash"]);
        }, 1000);
      } else {
        this.errUsername = true;
        this.infoUsername = "El usuario no ha sido encontrado."
      }
    }
   
  }

  forgetPassword() {
    Swal.fire({
      title: 'Lo sentimos',
      html :  `<p class="alert" >Porfavor contacta con el administrador.</p>`,
      icon: "error",
      showCancelButton: false,
      showConfirmButton : false,
      timer : 2500,
      timerProgressBar : true
    });
  }

  showPassword() {
    this.passwordHidden = !this.passwordHidden;

  }
}