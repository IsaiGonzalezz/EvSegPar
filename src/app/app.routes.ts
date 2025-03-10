import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { LibroComponent } from './pages/libro/libro.component';
import { ProductosComponent } from './pages/productos/productos.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
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
        path: '**',
        redirectTo: 'home'
    }

];