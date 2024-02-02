import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layoutPage/layoutPage.component';
import { PersonalPageComponent } from './pages/personalPage/personalPage.component';
import { ListPageComponent } from './pages/listPage/listPage.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutPageComponent,
        children: [
            { path: 'list', component: ListPageComponent },
            { path: ':id', component: PersonalPageComponent},
            { path: '**', redirectTo: 'list' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PersonalRoutingModule { }
