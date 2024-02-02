import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent } from './shared/pages/Error404Page/Error404Page.component';

const routes: Routes = [
    {
        path: 'personal',
        loadChildren: () => import('./personal/personal.module').then( m => m.PersonalModule ),
    },
    {
        path: 'children',
        loadChildren: () => import('./children/children.module').then( m => m.ChildrenModule ),
    },
    {
        path: '404',
        component: Error404PageComponent,
    },
    {
        path: '',
        redirectTo: 'personal',
        pathMatch: 'full',
    },
    {
        path: '**',
        redirectTo: '404',
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
