import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Item } from '../item';
import { ItemService } from '../item.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {
  itemForm: FormGroup;
  isEditing = false;
  editingItemId: number | null = null;

  constructor(private fb: FormBuilder, private itemService: ItemService,private router: Router) {
    this.itemForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.itemForm.invalid) {
      return;
    }

    const newItem: Item = {
      id: Date.now(),
      ...this.itemForm.value
    };

    if (this.isEditing && this.editingItemId) {
      newItem.id = this.editingItemId;
      this.itemService.updateItem(newItem);
    } else {
      this.itemService.addItem(newItem);
      this.router.navigate(['/items']);
    }

    this.resetForm();
  }

  editItem(item: Item): void {
    this.isEditing = true;
    this.editingItemId = item.id;
    this.itemForm.patchValue(item);
  }

  resetForm(): void {
    this.itemForm.reset();
    this.isEditing = false;
    this.editingItemId = null;
  }
}
