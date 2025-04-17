import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-regg-one',
  templateUrl: './regg-one.component.html',
  styleUrls: ['./regg-one.component.css']
})
export class ReggOneComponent {
  registrationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private api: ApiService
  ) {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern('^01[0-9]{9}$')]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['male', Validators.required]
    });
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      const { fullName, email, phoneNumber, password } = this.registrationForm.value;
      const [displayName, ...lastParts] = fullName.trim().split(' ');
      const lastName = lastParts.join(' ') || '';
  
      const payload = {
        email,
        phoneNumber,
        password,
        displayName,
        lastName
      };
  
      this.api.registerBrand(payload).subscribe(
        (res: any) => {
          console.log('✅ API Response:', res);
  
          // تأكد إن التوكن راجع مع الـ response
          if (res.token && res.userType) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('userType', res.userType);
            console.log('✅ Token saved to localStorage');
  
            this.router.navigate(['/register']);
          } else {
            console.warn('❌ Token or userType missing in response');
          }
        },
        err => {
          console.error('❌ Registration failed:', err);
        }
      );
    }
  }
}