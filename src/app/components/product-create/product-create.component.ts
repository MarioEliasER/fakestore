import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Category, Product, ProductCreate } from '../../models/product.interface';
import { CategoryService } from '../../services/category.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent {
  categories : Category[] = [];
  product: ProductCreate = {
    title: '',
    price: 0,
    description: '',
    categoryId: 0,
    images: []
};
errorMessage: string = '';

constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService
) {
    this.categoryService.getCategories().subscribe((data : any) =>{
      this.categories = data;
    })
}

createProduct(): void {
  
  console.log(this.product);
  const newProduct = {
    title: this.product.title,
    price: this.product.price,
    description: this.product.description,
    categoryId: this.product.categoryId,
    images: [this.product.images],
  };

  this.productService.createProduct(newProduct).subscribe(() => {
    this.router.navigate(['/']);
  });
  }
}
