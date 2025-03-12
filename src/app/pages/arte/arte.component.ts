import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Arte } from '../../models/arte.model';
import { firstValueFrom } from 'rxjs';
import { ArteService } from '../../services/arte.service';

@Component({
  selector: 'app-arte',
  imports: [FormsModule],
  templateUrl: './arte.component.html',
  styleUrl: './arte.component.css'
})
export class ArteComponent {
  artes: any;
  arte = new Arte();
  editando = false;

  constructor(private arteService: ArteService) {
    this.getArtes();
  }

  async getArtes(): Promise<void> {
    this.artes = await firstValueFrom(this.arteService.getArtes());
  }

  // Insertar nuevo arte
  insertarArte() {
    if (!this.validarArte()) return;
    this.arteService.agregarArte(this.arte).then(() => {
      this.getArtes();
      this.resetFormulario();
    });
  }

  // Seleccionar un arte para edición
  selectArte(arteSeleccionado: Arte) {
    this.arte = { ...arteSeleccionado };
    this.editando = true;
  }

  // Modificar arte seleccionado
  updateArte() {
    if (!this.validarArte()) return;
    this.arteService.modificarArte(this.arte).then(() => {
      this.getArtes();
      this.resetFormulario();
    });
  }

  // Eliminar arte seleccionado
  deleteArte() {
    if (this.arte.id) {
      this.arteService.eliminarArte(this.arte).then(() => {
        this.getArtes();
        this.resetFormulario();
      });
    }
  }

  // Restablecer formulario y salir de modo edición
  resetFormulario() {
    this.arte = new Arte();
    this.editando = false;
  }

  // Validar los datos del formulario
  validarArte() {
    if (!this.arte.articulo || this.arte.articulo.trim().length < 3) {
      alert('El nombre del artículo debe tener al menos 3 caracteres.');
      return false;
    }
    if (!this.arte.descripcion || this.arte.descripcion.trim().length < 5) {
      alert('La descripción debe tener al menos 5 caracteres.');
      return false;
    }
    if (!this.arte.gama || this.arte.gama.trim().length < 3) {
      alert('La gama debe tener al menos 3 caracteres.');
      return false;
    }
    if (!this.arte.precio || this.arte.precio <= 0) {
      alert('El precio debe ser mayor que 0.');
      return false;
    }
    return true;
  }
}
