import { Injectable } from '@angular/core';

import { AngularFirestore,
   AngularFirestoreCollection,
   AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Post } from './post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
  postCollection!: AngularFirestoreCollection<Post>;
  postDoc! : AngularFirestoreDocument<Post>;
  constructor(private afs : AngularFirestore) {
    this.postCollection = this.afs.collection("posts", ref => 
      ref.orderBy('published','desc')
    );
   }
  
   getPosts() {
     return   this.postCollection.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          data.postId = id;
          return data;
        }))
      );
      
   }
   getPost(id: string) {
    return this.afs.doc<Post>(`posts/${id}`);
  }

  getPostData(id : string) : Observable<Post> {
    this.postDoc = this.afs.doc<Post>(`posts/${id}`);
    return this.postDoc.valueChanges() as Observable<Post>;
  }

  create(data: Post) {
    this.postCollection.add(data)
  }

  update(id: string, formData : any) {
    return this.getPost(id).update(formData)
  }



   delete(id: string) {
    return this.getPost(id).delete()
  }

}
