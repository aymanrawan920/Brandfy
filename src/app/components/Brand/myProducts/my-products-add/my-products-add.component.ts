import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-products-add',
  templateUrl: './my-products-add.component.html',
  styleUrls: ['./my-products-add.component.css']
})
export class MyProductsAddComponent {
  productForm: FormGroup;
  selectedColors: string[] = [];
  selectedImageFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      type: ['', Validators.required],
      available: [0, [Validators.required, Validators.min(1)]],
      price: [0, [Validators.required, Validators.min(1)]],
      description: ['', Validators.required]
    });
  }

  toggleColor(color: string) {
    if (this.selectedColors.includes(color)) {
      this.selectedColors = this.selectedColors.filter(c => c !== color);
    } else {
      this.selectedColors.push(color);
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImageFile = file;
    }
  }

  onSubmit() {
    if (this.productForm.invalid || !this.selectedImageFile || this.selectedColors.length === 0) {
      alert('Please complete the form, select colors and upload an image.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.productForm.value.name);
    formData.append('type', this.productForm.value.type);
    formData.append('available', this.productForm.value.available.toString());
    formData.append('price', this.productForm.value.price.toString());
    formData.append('description', this.productForm.value.description);
    formData.append('colors', JSON.stringify(this.selectedColors));
    formData.append('image', this.selectedImageFile);
    formData.append('brandId', '123'); 

    this.productService.addProduct(formData).subscribe({
      next: () => {
        alert('✅ Product added successfully!');
        this.router.navigate(['/my-products']);
      },
      error: (err) => {
        console.error('Add Product Error:', err);
        alert('❌ Failed to add product: ' + err.error?.message || 'Unknown error');
      }
    });
  }
}
