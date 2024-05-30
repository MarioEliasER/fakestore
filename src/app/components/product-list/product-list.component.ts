import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products : any) => {
      this.products = products;
    });
  }

  deleteProduct(id: number): void {
    const confirmed = window.confirm('Are you sure you want to delete this product?');
    if (confirmed) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.products = this.products.filter(product => product.id !== id);
      });
    }
  }
}
