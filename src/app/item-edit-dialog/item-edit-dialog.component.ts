import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../item';

@Component({
  selector: 'app-item-edit-dialog',
  templateUrl: './item-edit-dialog.component.html',
  styleUrls: ['./item-edit-dialog.component.scss']
})
export class ItemEditDialogComponent {
  itemForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ItemEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { item: Item },
    private fb: FormBuilder
  ) {
    this.itemForm = this.fb.group({
      name: [data.item.name, Validators.required],
      description: [data.item.description, Validators.required]
    });
  }

  saveChanges(): void {
    if (this.itemForm.valid) {
      const editedItem: Item = {
        ...this.data.item,
        name: this.itemForm.value.name,
        description: this.itemForm.value.description
      };

      this.dialogRef.close(editedItem);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
