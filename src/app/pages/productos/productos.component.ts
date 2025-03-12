import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Producto } from '../../models/producto.model';
import { firstValueFrom } from 'rxjs';
import { ProductoService } from '../../services/producto.service';

@Component({
  selector: 'app-productos',
  imports: [FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
export class ProductosComponent {
  productos: any;
  producto = new Producto();
  editando = false; // Nueva bandera para modo edición

  constructor(private productoService: ProductoService) {
    this.getProducto();
  }

  async getProducto(): Promise<void> {
    this.productos = await firstValueFrom(this.productoService.getProductos());
  }

  // Insertar nuevo producto
  insertarProducto() {
    if (!this.validarProducto()) return;
    this.productoService.agregarProducto(this.producto);
    this.getProducto();
    this.resetFormulario();
  }

  // Seleccionar un producto para edición
  selectProducto(productoSeleccionado: Producto) {
    this.producto = { ...productoSeleccionado };
    this.editando = true; // Se activa modo edición
  }

  // Modificar producto seleccionado
  updateProducto() {
    if (!this.validarProducto()) return;
    this.productoService.modificarProducto(this.producto);
    this.getProducto();
    this.resetFormulario(); // Restablecer el formulario
  }

  // Eliminar producto seleccionado
  deleteProducto() {
    this.productoService.eliminarProducto(this.producto);
    this.getProducto();
    this.resetFormulario(); // Restablecer el formulario
  }

  // Restablecer formulario y salir de modo edición
  resetFormulario() {
    this.producto = new Producto();
    this.editando = false; // Desactivar modo edición
  }

  // Validar los datos del formulario
  validarProducto() {
    if (!this.producto.descripcion || this.producto.descripcion.trim().length < 5) {
      alert('Pon bien una descripción');
      return false;
    }
    if (!this.producto.precio || this.producto.precio <= 0) {
      alert('No puede haber productos gratis');
      return false;
    }
    return true;
  }
}
