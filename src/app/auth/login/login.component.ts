import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { SakhiApiResponse } from '../../shared/shared';
import { LoginResponse } from '../auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { phone, password } = this.loginForm.value;
      this.authService.login("+91"+ phone, password).subscribe({
        next: (response: SakhiApiResponse<LoginResponse>) => {
          if (response && response.data.token) {
            localStorage.setItem('jwt', response.data.token); // Store the token
            this.router.navigate(['/dashboard']); // Redirect to dashboard
          } else {
            alert('Login failed: Token not received');
          }
        },
        error: (err) => {
          alert('Login failed: ' + (err.error?.message || 'Server error'));
        }
      });
    }
  }
}
