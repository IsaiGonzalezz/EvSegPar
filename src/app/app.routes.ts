import { Routes } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { LibroComponent } from './pages/libro/libro.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ArteComponent } from './pages/arte/arte.component';

export const routes: Routes = [
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: 'libro',
        component: LibroComponent
    },
    {
        path: 'productos',
        component: ProductosComponent
    },
    {
        path: 'arte',
        component: ArteComponent
    },
    {
        path: '**',
        redirectTo: 'about'
    }

];