import { Component, Inject } from '@angular/core';
import { ChildrenService } from '../../services/children.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-dialog-yes-no-child',
    templateUrl: './dialogYesNoChild.component.html',
    styleUrls: ['./dialogYesNoChild.component.css'],
})
export class DialogYesNoChildComponent {
    constructor(
        private childService: ChildrenService,
        private snackBar: MatSnackBar,
        private dialog: MatDialogRef<DialogYesNoChildComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { isDeleting: boolean, id: string },
    ) { }

    onNoClick() {
        this.dialog.close(true);
    }

    onConfirm() {
        if ( this.data.isDeleting === true ) {
            this.childService.deleteChildById( this.data.id )
            .subscribe( child => {
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
