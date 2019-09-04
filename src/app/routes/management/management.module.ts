import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ManagementComponent } from './management.component';
import { ManagementService } from './management.service';


const routes: Routes = [
    {
        path: '', component: ManagementComponent, data: { title: '管理' },
        children: [
            { path: 'user', component: UserComponent, data: { title: '用户列表' } },
        ]
    }
];

  
@NgModule({
    imports: [
        SharedModule, 
        RouterModule.forChild(routes)
    ],
    declarations: [
        ManagementComponent,
        UserComponent
    ],
    providers: [ManagementService],
    entryComponents: [
    ],
    exports: [RouterModule]
})
export class ManagementModule { }
