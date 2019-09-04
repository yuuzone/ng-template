import { NgModule } from '@angular/core';

import { LayoutDefaultComponent } from './default/default.component';
import { SharedModule } from '@shared/shared.module';
import { HeaderComponent } from './header/header.component';

const COMPONENTS = [
    LayoutDefaultComponent,
    HeaderComponent
];

@NgModule({
    imports: [SharedModule],
    providers: [],
    declarations: [...COMPONENTS],
    exports: [...COMPONENTS],
    entryComponents: []
})
export class LayoutModule { }
