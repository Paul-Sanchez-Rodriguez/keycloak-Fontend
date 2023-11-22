import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminContainerComponent } from '@soa/shared/layout/containers';
import { permissionsGuard } from './guards/permissions.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminContainerComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'funcionary'
      },
      {
        path: 'funcionario',
        canActivate: [permissionsGuard],
        loadChildren: () => import('./funcionary/funcionary.module').then(m => m.FuncionaryModule)
      },
      {
        path: 'adolescente',
        canActivate: [permissionsGuard],
        loadChildren: () => import('./adolescent/adolescent.module').then(m => m.AdolescentModule)
      },
      {
        path: 'Asistencia',
        canActivate: [permissionsGuard],
        loadChildren: () => import('./participation/participation.module').then(m => m.ParticipationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
