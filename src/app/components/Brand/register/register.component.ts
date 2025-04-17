import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  brandForm: FormGroup;
  selectedFile: File | null = null;

  categories: any[] = [];

constructor(
  private fb: FormBuilder,
  private router: Router,
  private api: ApiService
) {
  this.brandForm = this.fb.group({
    brandName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    categoryId: ['', Validators.required],
    otherCategory: [''],
    description: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    district: ['', Validators.required]
  });

  this.fetchCategories(); // 👈 Call on init
}
fetchCategories(): void {
  this.api.getCategories().subscribe({
    next: (res: any) => {
      console.log('✅ Categories response:', res);
      this.categories = res.$values ?? [];
    },
    error: (err) => {
      console.error('❌ Failed to fetch categories', err);
    }
  });
}



  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onSubmit(): void {
    if (this.brandForm.valid) {
      const formData = new FormData();
  
      formData.append('brandName', this.brandForm.value.brandName);
      formData.append('categoryId', this.brandForm.value.categoryId);
      formData.append('country', this.brandForm.value.country);
      formData.append('city', this.brandForm.value.city);
  
      this.api.createBrand(formData).subscribe({
        next: () => {
          this.router.navigate(['/reg-three']);
        },
        error: err => {
          console.error('❌ Failed to create brand', err);
        }
      });
    }
  }

  goBack(): void {
    this.router.navigate(['/reggone']);
  }
}
