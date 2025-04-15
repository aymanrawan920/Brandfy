import { Component  ,OnInit} from '@angular/core';
import { ProductService } from 'src/app/services/product.service'; 

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  colors: string[];
  description: string;
  type: string;
}


@Component({
  selector: 'app-my-products',
  templateUrl: './my-products.component.html',
  styleUrls: ['./my-products.component.css']
})
export class MyProductsComponent implements OnInit{
  
    searchText: string = '';
    selectedProduct: Product | null = null;
    products: Product[] = [];
    isLoading = false;
    errorMessage = '';
  
    constructor(private productService: ProductService) {}
  
    ngOnInit() {
      const brandId = 123; 
      this.fetchProducts(brandId);
    }
    
    fetchProducts(brandId: number) {
      this.isLoading = true;
      this.productService.getProductsByBrand(brandId).subscribe({
        next: (data) => {
          this.products = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Error fetching products';
          this.isLoading = false;
        }
      });
    }
    
  
    filteredProducts() {
      return this.products.filter(p =>
        p.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  
    showProductDetails(product: Product) {
      this.selectedProduct = product;
    }
  
    closeModal() {
      this.selectedProduct = null;
    }

}
