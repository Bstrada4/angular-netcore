import { Component, Injectable, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogNewPersonalComponent } from '../../components/dialogs/dialogNewPersonal.component';
import { Personal } from '../../interfaces/personal.interface';
import { PersonalService } from '../../services/personal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogYesNoComponent } from '../../components/dialogYesNo/dialogYesNo.component';
import { DialogChildrenComponent } from '../../components/dialogChildren/dialogChildren.component';


@Component({
    selector: 'app-list-page',
    templateUrl: './listPage.component.html',
    styleUrls: ['./listPage.component.css']
})
@Injectable({
    providedIn: 'root',
})
export class ListPageComponent implements OnInit {
    
    displayedColumns: string[] = ['id', 'tipodoc', 'numeroDoc', 'nombreCompleto', 'fechaNac', 'fechaIngreso', 'acciones'];
    dataSource: Personal[] = [];
    searchTerm: string = '';

    public personal: Personal[] = [];

    formData: FormGroup;

    constructor(
        private personalService: PersonalService,
        public dialog: MatDialog,
        private fb: FormBuilder,
    ) { 
            this.formData = this.fb.group({
            // ... Otras propiedades del formulario
            fechaNac: [null, Validators.required],
          });
    }

    
    ngOnInit(): void {
        this.loadTable();
    }

    findPersonal( term: string): void {
        if ( term === '' )  return this.loadTable();
        
        this.personalService.findPersonal( term )
            .subscribe( personal => {
                this.dataSource = personal;
            } );
    }

    openNuevoPersonalDialog() { 
        const dialogRef = this.dialog.open(DialogNewPersonalComponent, {
            data: {
                isEditing: false,
                id: null
            },
        });
      
        dialogRef.afterClosed().subscribe(result => {
            this.loadTable();
            console.log('The dialog was closed');
        });
    }

    editPersonal( id: Personal ) {
        const dialogRef = this.dialog.open(DialogNewPersonalComponent, {
            data: {
                isEditing: true,
                id: id
            },
        });
      
        dialogRef.afterClosed().subscribe(result => {
            this.loadTable();
            console.log('The dialog was closed');
        });
    }

    deletePersonal( id: string ){
        const dialogRef = this.dialog.open(DialogYesNoComponent, {
            data: {
                isDeleting: true,
                id: id
            },
        });
      
        dialogRef.afterClosed().subscribe(result => {
            this.loadTable();
            console.log('The dialog was closed');
        });
    }

    openChildrenDialog( id: string ) { 
        const dialogRef = this.dialog.open(DialogChildrenComponent, {
            data: {
                isChildren: true,
                id: id
            },
        });
      
        dialogRef.afterClosed().subscribe(result => {
            this.loadTable();
            console.log('The dialog was closed');
        });
    }

    public loadTable() {
        this.personalService.getPersonal()
            .subscribe( personal => {
                this.dataSource = personal;
            });
    }

}
