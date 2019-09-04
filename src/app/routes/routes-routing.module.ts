import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';

const routes: Routes = [
    { path: '', component: LayoutDefaultComponent,
      children: [
        { path: '', redirectTo: 'index/welcome', pathMatch: 'full' },
        { 
          path: 'index', 
          loadChildren: () => import('app/routes/index/index.module').then(mod => mod.IndexModule)
        },
        { 
          path: 'management',
          loadChildren: () => import('app/routes/management/management.module').then(mod => mod.ManagementModule)
        },
      ],
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
    exports: [RouterModule],
})
export class RouteRoutingModule { }
