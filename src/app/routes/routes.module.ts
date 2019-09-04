import { NgModule } from '@angular/core';

import { RouteRoutingModule } from './routes-routing.module';
import { SharedModule } from '@shared/shared.module';

@NgModule({
    imports: [SharedModule, RouteRoutingModule],
    declarations: [
    ],
    providers: [
    ]
})

export class RoutesModule { }

