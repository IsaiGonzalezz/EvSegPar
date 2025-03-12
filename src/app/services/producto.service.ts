import { inject, Injectable } from '@angular/core';
import { Producto } from '../models/producto.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private db : Firestore = inject(Firestore)

  constructor() { }

  //Método para obtener los documentos de la colección
  getProductos(){
    const productosCollection = collection(this.db, 'productos');
    return collectionData((productosCollection), {idField: 'id'}).pipe(first());
  }

  //Método para agregar un nuevo registro o documento
  agregarProducto(producto:Producto){
    const productosCollection = collection(this.db, 'productos');
    const productoData = {
      descripcion : producto.descripcion,
      precio : producto.precio
    };
    addDoc(productosCollection, productoData);
  }

  //método para modificar un documento
  modificarProducto(producto:Producto){
    const documentRef = doc(this.db, 'productos', producto.id.toString())
    updateDoc(documentRef, {
      descripcion:producto.descripcion,
      precio:producto.precio
    });
  }

  //metodo para eliminar
  eliminarProducto(producto:Producto){
    const documentRef = doc(this.db, 'productos', producto.id.toString());
    deleteDoc(documentRef);
  }

}
