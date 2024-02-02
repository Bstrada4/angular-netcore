import { Component, Inject  } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonalService } from '../../services/personal.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-dialog-yesno',
    templateUrl: './dialogYesNo.component.html',
    styleUrls: [],
})
export class DialogYesNoComponent  { 

    constructor(
        private personalService: PersonalService,
        private snackBar: MatSnackBar,
        private dialog: MatDialogRef<DialogYesNoComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { isDeleting: boolean, id: string },
    ) { }

    onNoClick() {
        this.dialog.close(true);
    }

    onConfirm() {
        if ( this.data.isDeleting === true ) {
            this.personalService.deletePersonalById( this.data.id )
            .subscribe( personal => {
                this.showSnackBar(`Registro eliminado!`);
            });
            this.dialog.close(true);
            return;
        }
    }

    showSnackBar( message: string ):void {
        this.snackBar.open( message, 'done', {
            duration: 2500
        });
    }
}