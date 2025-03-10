import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-productos',
  imports: [RouterOutlet, FormsModule],
  templateUrl: './productos.component.html',
  styleUrl: './productos.component.css'
})
  export class ProductosComponent {
    //Propiedades
  producto = {
    id:0,
    descripcion:'',
    precio:0,
  };

  //arreglo de productos
  productos = [
    {id: 1,descripcion: 'coca sin azucar',precio:16},    
    {id: 2,descripcion: 'hamburguesa',precio:55},
    {id: 3,descripcion: 'salsagueti',precio:22},
    {id: 4,descripcion: 'ganso',precio:18},
    {id: 5,descripcion: 'agua ziel',precio:11},
    {id: 6,descripcion: 'chocolate',precio:32},
  ];

  //método que determina si hay los productos en el arreglo
  hayProductos(){
    return this.productos.length>0;

  }; 

  //método que agrega productos al arreglo 
  agregarProductos(){
    if(this.producto.id == 0){
      alert('el id del producto debe ser diferente de 0');
      return;
    }

    //revisar que el id no se repita
    for(let i=0; i<this.productos.length; i++){
      if(this.producto.id == this.productos[i].id){
        alert('producto repetido');
        return;
      }
    }

    this.productos.push({
      id: this.producto.id,
      descripcion: this.producto.descripcion,
      precio : this.producto.precio
    });

    this.producto.id=0;
    this.producto.descripcion='';
    this.producto.precio=0;
  }

  //metodo para seleccionar un producto existente
  seleccionarProducto(productoSeleccionado: {id:number, descripcion:string, precio:number}){
    this.producto.id = productoSeleccionado.id;
    this.producto.descripcion = productoSeleccionado.descripcion;
    this.producto.precio = productoSeleccionado.precio;
  }


  //función para modificar un producto seleccionado
  modificarProducto(){
    for(let i = 0; i<this.productos.length; i++){
      if(this.producto.id == this.productos[i].id){
        this.productos[i].descripcion = this.producto.descripcion,
        this.productos[i].precio = this.producto.precio,

        this.producto.id=0;
        this.producto.descripcion='';
        this.producto.precio=0;

        return;
      }
    }
    alert('no existe ID');
  }

  //función para eliminar productos
  eliminarProductos(id:number){
    for (let i = 0; i < this.productos.length; i++) {
      if (id == this.productos[i].id) {
        this.productos.splice(i,1);
        return;  
      }
    } 
  }
}
