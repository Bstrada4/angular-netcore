import { Component, Inject } from '@angular/core';
import { ChildrenService } from '../../services/children.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormControl, FormGroup } from '@angular/forms';
import { Children, TipoDoc } from '../../interfaces/children.interface';

@Component({
    selector: 'app-dialog-new-child',
    templateUrl: './dialogNewChild.component.html',
    styleUrls: ['./dialogNewChild.component.css'],
})
export class DialogNewChildComponent {

    public childForm = new FormGroup({
        id:         new FormControl<string>(''),
        tipoDoc:    new FormControl<TipoDoc>( TipoDoc.Dni ),
        numeroDoc:  new FormControl<string>(''),
        apPaterno:  new FormControl<string>(''),
        apMaterno:  new FormControl<string>(''),
        nombre1:    new FormControl<string>(''),
        nombre2:    new FormControl<string>(''),
        fechaNac:   new FormControl<string>( new Date().toISOString()),
        idPersonal: new FormControl<string>(this.dataChild.idPersonal),
    });

    constructor(
        private childService: ChildrenService,
        private snackBar: MatSnackBar,
        private dialog: MatDialogRef<DialogNewChildComponent>,
        @Inject(MAT_DIALOG_DATA) public dataChild: { isEditing: boolean, id: string, idPersonal: string },
    ) { }
    

    ngOnInit(): void {
        // throw new Error('Method not implemented.');
        if ( this.dataChild.isEditing === true ) {
            this.childService.findChildById( this.dataChild.id, this.dataChild.idPersonal )
            .subscribe( (children: any) => {
                this.childForm.reset(children);
            });
        }
        return;
    }

    get currentChild(): Children{
        const child = this.childForm.value as Children;
        return child;
    }

    onSubmit(){
        if ( this.childForm.invalid ) return;
        this.dialog.close();
        if ( this.dataChild.isEditing === true ) {
            this.childService.updateChild( this.currentChild )
            .subscribe( child => {
                this.showSnackBar(`${ this.currentChild.nombre1 } updated!`);
            });
            return;
        }
        
        this.childService.addChild( this.currentChild )
            .subscribe( (child: any) => {
                this.showSnackBar(`${ child.message }!`);
            });
    }

    showSnackBar( message: string ):void {
        this.snackBar.open( message, 'done', {
            duration: 2500
        });
    }



 }
