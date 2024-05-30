import { Injectable, inject } from '@angular/core';
import { Note } from '../interfaces/note.interface'
import { Firestore, collection, doc, collectionData, onSnapshot } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteListService {
  trashNotes: Note[] = [];
  normalNotes: Note[] = [];

  items$;
  items;
  unsubList;
  // unsubSingle;

  firestore: Firestore = inject(Firestore);

  constructor() { 
    this.unsubList = onSnapshot(this.getNotesRef(), (list) => {
      list.forEach(element => {
        console.log(element);
      });
    });
    
    // this.unsubSingle = onSnapshot(this.getSingleDocRef("notes", "a665s4d6a1s9d"), (element) => {
    // });

    // this.unsubSingle();
    this.unsubList();

    this.items$ = collectionData(this.getTrashRef());
    this.items = this.items$.subscribe((list) => {
      list.forEach(element => {
        console.log(element);
      });
    })
    this.items.unsubscribe();
  }

  getTrashRef() {
    return collection(this.firestore, 'trash');
  }

  getNotesRef() {
    return collection(this.firestore, 'notes');
  }

  getSingleDocRef(colId: string, docId: string) {
    return doc(collection(this.firestore, colId), docId);
  }



} 
