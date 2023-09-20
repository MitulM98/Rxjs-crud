import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, interval } from 'rxjs';
import { map, take  } from 'rxjs/operators';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private items: Item[] = [];
  private itemsSubject = new BehaviorSubject<Item[]>([]);

  constructor() {
    // Simulate adding some initial items
    this.addItem({ id: 1, name: 'Item 1', description: 'Description 1' });
    this.addItem({ id: 2, name: 'Item 2', description: 'Description 2' });
    this.addItem({ id: 3, name: 'Item 3', description: 'Description 3' });
    this.addItem({ id: 4, name: 'Item 4', description: 'Description 4' });
  }

  getItems(): Observable<Item[]> {
    // Simulate a delay using the interval operator
    return interval(1000).pipe(
      take(1), // Take one value (0) from the interval
      map(() => this.items), // Map to the current items array
    );
  }

  addItem(item: Item): void {
    this.items.push(item);
    this.itemsSubject.next(this.items);
  }

  getItem(id: number): Observable<Item | undefined> {
    return this.itemsSubject.pipe(
      map(items => items.find(item => item.id === id))
    );
  }

  updateItem(updatedItem: Item): void {
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem;
      this.itemsSubject.next(this.items);
    }
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.itemsSubject.next(this.items);
  }
}

