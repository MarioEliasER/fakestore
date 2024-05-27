import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  product: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    categoryId: 0,
    images: []
  };
  errorMessage: string = '';
  imageList: string = ''; // Cambiado a string en lugar de arreglo

  constructor(
    private productService: ProductService,
    private router: Router
  ) {}

  createProduct(): void {
    const imagesArray = this.imageList.split(',').map(image => image.trim());
    this.product.images = imagesArray.filter(image => image);
    if (!this.product.categoryId || isNaN(this.product.categoryId)) {
      this.errorMessage = 'Category ID is required and must be a number.';
      return;
    }
    if (!Array.isArray(this.product.images) || this.product.images.length === 0) {
      this.errorMessage = 'Images are required and must be an array.';
      return;
    }

    this.productService.createProduct(this.product).subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
