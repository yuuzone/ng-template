import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { IndexComponent } from './index.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{
    path: '', component: IndexComponent, data: { title: '首页' },
    children: [
    { path: 'welcome', component: WelcomeComponent, data: { title: '欢迎页' } },
    ]
}
];

  
@NgModule({
    imports: [
        SharedModule, 
        RouterModule.forChild(routes)
    ],
    declarations: [
        IndexComponent,
        WelcomeComponent
    ],
    providers: [],
    entryComponents: [
    ],
    exports: [RouterModule]
})
export class IndexModule { }
