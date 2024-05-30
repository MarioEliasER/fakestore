import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CategoryService } from '../../services/category.service';
import { Category, Product } from '../../models/product.interface';

interface ProductDetails {
  title?: string;
  price?: number;
  description?: string;
  category?: {
    id: number;
    name: string;
  };
  images?: string[];
}

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit {
  product: Product = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: {
      id: 0,
      name: '',
      image: '',
    },
    images: [],
};

constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService
) {}
  
ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));
  this.productService.getProductById(id).subscribe((product: any) => {
    console.log('Product received:', product);
    this.product = product;

    if (this.product.category && this.product.category.id > 0) {
      this.categoryService.getCategoryName(this.product.category.id).subscribe((category: any) => {
        this.product.category.name = category.name;
      });
    } else {
      console.warn('Invalid category ID:', this.product.category.id);
    }
  });
}

}
