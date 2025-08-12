import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  constructor(private router: Router, private fb: FormBuilder, private dataservice: DataserviceService) { }

  signupForm!: FormGroup
  is_error: boolean = false

  goToSignin() {
    this.router.navigate(['auth/login'])
  }

  ngOnInit() {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }
  signUp() {
    const firstName = this.signupForm.get('firstName')?.value
    const lastName = this.signupForm.get('lastName')?.value
    const email = this.signupForm.get('email')?.value
    const password = this.signupForm.get('password')?.value
    const confirmPassword = this.signupForm.get('confirmPassword')?.value
    if (this.signupForm.valid && this.signupForm.touched) {
      this.dataservice.createAccount(firstName, lastName, email, password).subscribe({
        next: res => {
          console.log(res);
        },

        error: err => {
          this.is_error = true
          console.error('Login failed:', err?.error?.detail);
        }
      })
    }
  }

}
