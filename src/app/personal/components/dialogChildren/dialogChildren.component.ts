import { Component, Inject, OnInit } from '@angular/core';
import { Children } from '../../interfaces/children.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChildrenService } from '../../services/children.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DialogNewChildComponent } from '../dialogNewChild/dialogNewChild.component';
import { DialogYesNoComponent } from '../dialogYesNo/dialogYesNo.component';
import { DialogYesNoChildComponent } from '../dialogYesNoChild/dialogYesNoChild.component';

@Component({
    selector: 'app-dialog-children',
    templateUrl: './dialogChildren.component.html',
    styleUrls: ['./dialogChildren.component.css'],
})
export class DialogChildrenComponent implements OnInit {

    displayedColumns: string[] = ['id', 'tipodoc', 'numeroDoc', 'nombreCompleto', 'fechaNac', 'acciones'];
    dataSource: Children[] = [];
    searchTerm: string = '';

    public personal: Children[] = [];

    formData: FormGroup;

    constructor(
        private childrenService: ChildrenService,
        public dialog: MatDialog,
        private fb: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public dataPersonal: { isChildren: boolean, id: string },
    ) { 
            this.formData = this.fb.group({
            // ... Otras propiedades del formulario
            fechaNac: [null, Validators.required],
          });
    }

    ngOnInit(): void {
        this.loadTable(this.dataPersonal.id);
    }

    findChild( term: string ): void {
        if ( term === '' )  return this.loadTable(this.dataPersonal.id);
        this.childrenService.findChild( term, this.dataPersonal.id )
            .subscribe( children => {
                this.dataSource = children;
            } );
    }

    openNewChildDialog() { 
        const dialogRef = this.dialog.open(DialogNewChildComponent, {
            data: {
                isEditing: false,
                id: null,
                idPersonal: this.dataPersonal.id
            },
        });
      
        dialogRef.afterClosed().subscribe(result => {
            this.loadTable(this.dataPersonal.id);
            console.log('The dialog was closed');
        });
    }
    
    editChild( id: string ) {
        const dialogRef = this.dialog.open(DialogNewChildComponent, {
            data: {
                isEditing: true,
                id: id,
                idPersonal: this.dataPersonal.id
            },
        });
      
        dialogRef.afterClosed().subscribe(result => {
            this.loadTable(this.dataPersonal.id);
            console.log('The dialog was closed');
        });
    }

    deleteChild( id: string ){
        const dialogRef = this.dialog.open(DialogYesNoChildComponent, {
            data: {
                isDeleting: true,
                id: id
            },
        });
      
        dialogRef.afterClosed().subscribe(result => {
            this.loadTable( id );
            console.log('The dialog was closed');
        });
    }

    public loadTable(id: string) {
        this.childrenService.getChildren(id)
            .subscribe( child => {
                this.dataSource = child;
            });
    }

 }
