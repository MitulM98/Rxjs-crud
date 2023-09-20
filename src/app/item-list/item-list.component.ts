import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
import { Item } from '../item';
import { ItemService } from '../item.service';
import { debounceTime } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ItemEditDialogComponent } from '../item-edit-dialog/item-edit-dialog.component'; 
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss'],
})
export class ItemListComponent implements OnInit {
  items: Item[] = [];
  searchQuery: any;
  searchControl = new FormControl('');

  constructor(private itemService: ItemService, private dialog: MatDialog, private router: Router) {}

  ngOnInit(): void {
    this.itemService.getItems().subscribe((items) => {
      this.items = items;
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(300)) // Using Debounce for a smooth search 
      .subscribe(query => {
        this.searchQuery = query;
      });
  }

  deleteItem(id: number): void {
    this.itemService.deleteItem(id);
  }

  editItem(item: Item): void {
    const dialogRef = this.dialog.open(ItemEditDialogComponent, {
      width: '400px',
      data: { item }, // Pass the item to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        
        this.itemService.updateItem(result);
      }
    });
  }
}
