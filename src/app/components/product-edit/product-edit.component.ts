import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.interface';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product | undefined;
  imageUrls: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProductById(id).subscribe((product) => {
      this.product = product;
      // Si el producto ya tiene imágenes, se pueden inicializar imageUrls con esas imágenes
      if (product.images) {
        this.imageUrls = product.images; // No es necesario realizar ningún procesamiento, ya que product.images es un arreglo de strings
      }
    });
  }

  updateProduct(): void {
    if (this.product) {
      this.product.images = this.imageUrls; // Asignar el arreglo de URLs de imagen
      this.productService.updateProduct(this.product).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }  
}