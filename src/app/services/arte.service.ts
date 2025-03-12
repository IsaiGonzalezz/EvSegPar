import { Injectable, inject } from '@angular/core';
import { Arte } from '../models/arte.model';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, updateDoc } from '@angular/fire/firestore';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArteService {

  private db: Firestore = inject(Firestore);

  constructor() {}

  // Obtener artes desde Firebase
  getArtes() {
    const artesCollection = collection(this.db, 'arte');
    return collectionData(artesCollection, { idField: 'id' }).pipe(first());
  }

  // Agregar un nuevo arte
  agregarArte(arte: Arte) {
    const artesCollection = collection(this.db, 'arte');
    const arteData = {
      articulo: arte.articulo,
      descripcion: arte.descripcion,
      gama: arte.gama,
      precio: arte.precio
    };
    return addDoc(artesCollection, arteData);
  }

  // Modificar arte existente
  modificarArte(arte: Arte) {
    const documentRef = doc(this.db, 'arte', arte.id.toString());
    return updateDoc(documentRef, {
      articulo: arte.articulo,
      descripcion: arte.descripcion,
      gama: arte.gama,
      precio: arte.precio
    });
  }

  // Eliminar arte
  eliminarArte(arte: Arte) {
    const documentRef = doc(this.db, 'arte', arte.id.toString());
    return deleteDoc(documentRef);
  }
}
