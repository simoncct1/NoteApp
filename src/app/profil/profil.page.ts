import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

import { ActionSheetController } from '@ionic/angular';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.page.html',
  styleUrls: ['./profil.page.scss'],
})
export class ProfilPage implements OnInit {
userId: string;
users= [];
email;


  constructor(
    public afDB: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    public actionSheetController: ActionSheetController,
 
    public afSG: AngularFireStorage,
    private route: Router,
    
  ) { 
    this.afAuth.authState.subscribe(auth => {
      if (!auth) {
      } else {
        this.userId = auth.uid;
        this.getUser();
      }
    });
  }

  ngOnInit() {
    
  }

  getUser() {
    this.afDB.list('Users/' + this.userId).snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.users = [];
      actions.forEach(action => {
        this.users.push({
          key: action.key,
          email: action.payload.exportVal().email,
          pseudo: action.payload.exportVal().pseudo,
        });
      });
    });
  }

  logout() {
    this.afAuth.signOut();
    this.route.navigate(['login']);
  }
  



}
