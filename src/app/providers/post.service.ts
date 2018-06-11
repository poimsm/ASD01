import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Post } from '../interfaces/post.interface';
import 'rxjs/add/operator/map'
import { AngularFireAuth } from 'angularfire2/auth';
import { firebase } from '@firebase/app';
import { FileItem } from '../models/file-item';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class PostService {
  private itemsCollection: AngularFirestoreCollection<Post>;
  public posts: Post[]=[];
  public usuario: any = [];
  private CARPETA_IMAGENES = 'img';
  archivos: FileItem[];


  constructor(private afs: AngularFirestore,
              public afAuth: AngularFireAuth,
            private router: Router) {


    this.afAuth.authState.subscribe( user => {
      if(!user){return}
      this.usuario.name = user.displayName;
      this.usuario.uid = user.uid;
    });

  }


  login( proveedor: string ) {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  logout() {
      this.usuario = {};
      this.afAuth.auth.signOut();
    }


  getPost(){
    this.itemsCollection = this.afs.collection<Post>('posts', ref => ref.orderBy('fecha','desc').limit(10));
    return this.itemsCollection.valueChanges()
                                .map( (posts: Post[])=>{
                                  this.posts = [];
                                  for (let post of posts){
                                    this.posts.push( post );
                                  }
                                })
  }
  // getImg(){
  //   this.itemsCollection = afs.collection<Item>('img');
  //   this.items = this.itemsCollection.valueChanges();
  // }

  addPost( texto: string ){
    let post:Post = {
      nombre: this.usuario.name,
      mensaje: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    }
    return this.itemsCollection.add( post );
  }


  // addImg ( imagen: { nombre: string, url: string } ) {
  //   this.afs.collection(`/${ this.usuario.uid }`)
  //           .add( imagen );
  // }


  // cargarImagenesFirebase( imagenes: FileItem[] ) {
  //
  //   const storageRef = firebase.storage().ref();
  //
  //   for ( const item of imagenes ) {
  //
  //     item.estaSubiendo = true;
  //     if ( item.progreso >= 100 ) {
  //       continue;
  //     }
  //
  //     const uploadTask: firebase.storage.UploadTask =
  //                 storageRef.child(`${ this.CARPETA_IMAGENES }/${ item.nombreArchivo }`)
  //                           .put( item.archivo );
  //
  //     uploadTask.on( firebase.storage.TaskEvent.STATE_CHANGED,
  //             ( snapshot: firebase.storage.UploadTaskSnapshot ) =>
  //                         item.progreso = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100,
  //             ( error ) => console.error('Error al subir', error ),
  //             () => {
  //
  //               console.log('Imagen cargada correctamente');
  //               item.url = uploadTask.snapshot.downloadURL;
  //               item.estaSubiendo = false;
  //               this.addImg({
  //                 nombre: item.nombreArchivo,
  //                 url: item.url
  //               });
  //             });
  //   }
  //
  // }


  goPlaces(donde:string) {
    if(donde === 'adelante'){
      this.router.navigate(['/', 'reciente']);
    }
    if(donde === 'chat') {
      this.router.navigate(['/', 'chat']);
    }
    if(donde === 'user') {
      this.router.navigate(['/', 'user']);
    }
    if(donde === 'land1') {
      this.router.navigate(['../', 'landing', 'land1']);
    }
    if(donde === 'land2') {
      this.router.navigate(['../', 'landing', 'land2']);
    }
    if(donde === 'land3') {
      this.router.navigate(['../', 'landing', 'land3']);
    }
    if(donde === 'chaat') {
      this.router.navigate(['../', 'landing', 'land3']);
    }
    console.log('aaaaajammmm')
  }

}
