import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChildrenRoutingModule } from './children-routing.module';
import { LayoutPageComponent } from './pages/layoutPage/layoutPage.component';
import { ChildrenPageComponent } from './pages/childrenPage/childrenPage.component';


@NgModule({
    declarations: [
        LayoutPageComponent,
        ChildrenPageComponent
    ],
    imports: [
        CommonModule,
        ChildrenRoutingModule
    ]
})
export class ChildrenModule { }
