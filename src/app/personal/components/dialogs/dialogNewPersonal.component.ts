import { Component, Inject, OnInit  } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


import { Personal, TipoDoc } from '../../interfaces/personal.interface';
import { PersonalService } from '../../services/personal.service';


@Component({
    selector: 'app-dialog-newpersonal',
    templateUrl: './dialogNewPersonal.component.html',
    styleUrls: ['./dialogNewPersonal.component.css'],
})
export class DialogNewPersonalComponent implements OnInit { 
    
    public personalForm = new FormGroup({
        id:         new FormControl<string>(''),
        tipoDoc:    new FormControl<TipoDoc>( TipoDoc.Dni),
        numeroDoc:  new FormControl<string>(''),
        apPaterno:  new FormControl<string>(''),
        apMaterno:  new FormControl<string>(''),
        nombre1:    new FormControl<string>(''),
        nombre2:    new FormControl<string>(''),
        fechaNac:   new FormControl<string>( new Date().toISOString()),
        fechaIngreso: new FormControl<string>( new Date().toISOString() ),
    });

    constructor(
        private personalService: PersonalService,
        private snackBar: MatSnackBar,
        private dialog: MatDialogRef<DialogNewPersonalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { isEditing: boolean, id: string },
    ) { }

    ngOnInit(): void {
        // throw new Error('Method not implemented.');
        if ( this.data.isEditing === true ) {
            this.personalService.findPersonalById( this.data.id )
            .subscribe( (personal: any) => {
                this.personalForm.reset(personal);
            });
        }
        return;
    }

    get currentPersonal(): Personal{
        const personal = this.personalForm.value as Personal;
        return personal;
    }

    onSubmit():void {

        if ( this.personalForm.invalid ) return;
        this.dialog.close();
        if ( this.data.isEditing === true ) {
            this.personalService.updatePersonal( this.currentPersonal )
            .subscribe( personal => {
                this.showSnackBar(`${ this.currentPersonal.nombre1 } updated!`);
            });
            return;
        }
        this.personalService.addPersonal( this.currentPersonal )
            .subscribe( (personal: any) => {
                this.showSnackBar(`${ personal.message }!`);
                
            });
    }


    showSnackBar( message: string ):void {
        this.snackBar.open( message, 'done', {
            duration: 2500
        });
    }
}
