import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layoutPage/layoutPage.component';
import { ChildrenPageComponent } from './pages/childrenPage/childrenPage.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutPageComponent,
        children: [
            { path: 'list', component: ChildrenPageComponent },
            { path: '**', redirectTo: 'list' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ChildrenRoutingModule { }
