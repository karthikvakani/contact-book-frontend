import { Component, isStandalone } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DataserviceService } from '../dataservice.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;
  disablesigninbtn: boolean = false
  is_error:boolean=false

  constructor(private router: Router, private fb: FormBuilder, private dataservice: DataserviceService) {
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }


  goToSignup() {
    this.router.navigate(['auth/signup'])
  }

  login() {
    if (this.loginForm.valid && this.loginForm.touched) {
      const email = this.loginForm.get('email')?.value
      const password = this.loginForm.get('password')?.value
      this.dataservice.verifyLogin(email, password).subscribe({
        next: res => {
          console.log(res)
          localStorage.setItem('token', res.access_token)
          localStorage.setItem('token_type', res.token_type)
          this.router.navigate(["/phonebook/home"])
        },
        error: err => {
          this.is_error=true
          console.error('Login failed:', err?.error?.detail);
        }
      })
    }
  }
}
