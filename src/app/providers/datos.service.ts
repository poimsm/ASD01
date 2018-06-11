// import { Injectable } from '@angular/core';
// import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
// import { Observable } from 'rxjs';
// import 'rxjs/add/operator/map'
// import { AngularFireAuth } from 'angularfire2/auth';
// import { firebase } from '@firebase/app';
//
// export interface Usuario {
//   nombre:string;
//   id: string;
// }
// export interface Post {
//   mensaje:string;
//   id: string;
// }
// export interface Comentario {
//   Mensaje:string;
//   id: string;
// }
// export interface Likes {
//   nombre:string;
//   id: string;
// }
//
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class DatosService {
//
//     post: Post;
//     em: string = "hola";
//     usuario:  any = [];
//     userDoc:any;
//     tasks:any;
//     // item: Observable<Item>;
//     items: any;
//     itemDoc: any;
//     docData: any;
//     itemsCollection: any;
//     // private itemsCollection: AngularFirestoreCollection<Item>;
//     constructor( private afs: AngularFirestore, public afAuth: AngularFireAuth ){
//
//     this.afAuth.authState.subscribe( user => {
//       if(!user){return}
//       this.usuario.name = user.displayName;
//       this.usuario.uid = user.uid;
//     });
//     this.docData = {
//       stringExample: "Hello world!",
//       booleanExample: true,
//       numberExample: 3.14159265,
//       dateExample: new Date("December 10, 1815"),
//       arrayExample: [5, true, "hello"],
//       nullExample: null,
//       objectExample: {
//         a: 5,
//         b: {
//           nested: "foo"
//         }
//       }
//     };
//     this.afs.collection("data").doc("one").set(this.docData).then(function() {
//       console.log("Document successfully written!");
//     });
//
//         // this.userDoc = afs.doc('items/david');
//         // this.tasks = this.userDoc.collection('tasks').valueChanges().add('weey');
//         // `items/${this.em}`
//         // this.itemDoc = afs.doc<Item>('items/1');
//         // this.item = this.itemDoc.valueChanges();
//         //
//         // this.itemsCollection = afs.collection<Item>('items').doc(this.usuario.uid).collection<Item>('creo');
//         // this.itemsCollection = afs.doc('items/' + this.usuario.uid).collection<Item>('creo');
//         this.itemsCollection = afs.collection('items');
//         this.items = this.itemsCollection.valueChanges();
//       }
//
//       addPost( mensaje: string ){
//         const id = this.afs.createId()
//         const post:Post = {
//           mensaje: mensaje,
//           id: id
//         }
//         return this.afs.collection("data").doc(post.id).set(post);
//       }
//
//
//       addItem(tu: string ) {
//         //  let item: Item = {body: tu};
//         // this.itemsCollection.add(item);
//         this.afs.collection("data").doc(this.usuario.uid).set(this.docData).then(function() {
//           console.log("Document successfully written!");
//         });
//         console.log(this.usuario.uid)
//       }
//
//   }
