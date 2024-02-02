import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalRoutingModule } from './personal-routing.module';
import { LayoutPageComponent } from './pages/layoutPage/layoutPage.component';
import { PersonalPageComponent } from './pages/personalPage/personalPage.component';
import { ListPageComponent } from './pages/listPage/listPage.component';
import { MaterialModule } from '../material/material.module';
import { DialogNewPersonalComponent } from './components/dialogs/dialogNewPersonal.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // quitar el formsmodule al actualizar el codigo del buscador
import { DialogYesNoComponent } from './components/dialogYesNo/dialogYesNo.component';
import { DialogChildrenComponent } from './components/dialogChildren/dialogChildren.component';
import { DialogNewChildComponent } from './components/dialogNewChild/dialogNewChild.component';
import { DialogYesNoChildComponent } from './components/dialogYesNoChild/dialogYesNoChild.component';

@NgModule({
    declarations: [
        LayoutPageComponent,
        PersonalPageComponent,
        ListPageComponent,
        DialogNewPersonalComponent,
        DialogYesNoComponent,
        DialogChildrenComponent,
        DialogNewChildComponent,
        DialogYesNoChildComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        PersonalRoutingModule,
        MaterialModule,
        FormsModule
    ]
})
export class PersonalModule { }
