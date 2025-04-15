import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BrandRegistrationService } from 'src/app/services/brand-registration.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  brandForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private registrationService: BrandRegistrationService
  ) {
    this.brandForm = this.fb.group({
      brandName: ['', Validators.required],
      category: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.brandForm.valid) {
      this.registrationService.stepTwoData = this.brandForm.value;
      this.router.navigate(['/reg-three']);
    }
  }
  goBack(): void {
    console.log("Back button clicked");
  }
}
