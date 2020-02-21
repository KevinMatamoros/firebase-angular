import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { userI } from '../utils/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user: any;

  private basePath: string = '/users';

  constructor(private firestoreService: AngularFirestore) { }

  setUser(user) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }

  getUsers() {
    return this.firestoreService.collection('users').snapshotChanges();
  }

  updatePolicy(user: userI) {
    // delete user.id;
    this.firestoreService.doc('users/' + user.id).update(user);
  }


}
