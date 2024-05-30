import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Category, Product } from '../../models/product.interface';
import { error } from 'console';

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
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
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
      private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.params['id']);
    this.productService.getProductById(id).subscribe((data : any) => {
      if (!data){
        this.router.navigate(['/']);
      }
      this.product = data;
    });
  }
  
  updateProduct() {
    if (this.product) {
      this.productService.updateProduct(this.product.id, this.product).subscribe(
        () => {
          this.router.navigate(['/']);
        }
      )
    }
  }  
}