import {Component, OnInit, signal, OnDestroy, Renderer2 } from '@angular/core';
import {User} from "../../class/model/user/user";
import {LoginService} from "../../service/user/login.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Display} from "../../class/util/display";
import {Router} from "@angular/router";
import {DataSecurity} from "../../class/util/data-security";
import {Constants} from "../../class/util/constants";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  title: string = Constants.APP_TITLE;
  form : FormGroup;
  loading: boolean = false;
  ngOnInit() {
    this.renderer.addClass(document.body, 'login');
    // if (User.verify()) {
    //   this.router.navigate(['/home/dashboard']).then(r => true);
    // }
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'login');
  }

  constructor(private renderer: Renderer2, private fBuilder : FormBuilder , private loginService : LoginService , private router : Router , private alert : MatSnackBar) {
    this.form = this.fBuilder.group({
      username : [''],
      password : ['']
    });
  }

  login() {
    const data = {
      username : this.form.get('username')?.value,
      mot_de_passe : this.form.get('password')?.value
    }


    this.loading = true;
    this.loginService.login(data,"/membre/connect").subscribe({
      next:(valiny)=> {
        console.log(valiny);
        User.setUserAuth(DataSecurity.encryptData(valiny.data, 'auth'));
        this.loading = false;
        this.addFadeOutAnimation().then(() => {
          this.router.navigate(['/home/dashboard']).then(r => true);
        });
      },
      error:(err) => {
        this.loading = false;
        if (err.status === 0) {
          Display.alert(this.alert , 'Server unavailable',"close",3000);
          return;
        }
        Display.alert(this.alert , err.error.message,"close",3000);
      }
    });
  }

  private addFadeOutAnimation(): Promise<void> {
    return new Promise((resolve) => {
      const text = document.querySelector('.text');
      this.renderer.addClass(text, 'fade-out-left');

      const base1 = document.querySelector('.base1');
      this.renderer.addClass(base1, 'fade-out-left');

      const base2 = document.querySelector('.base2');
      this.renderer.addClass(base2, 'fade-out-top');

      const form = document.querySelector('.formulaire');
      if (form) {
        this.renderer.setAttribute(form, 'class', 'formulaire');
        this.renderer.addClass(form, 'fade-out-right');
      }
      setTimeout(() => {
        resolve();
      }, 1000);
    });
  }
}

