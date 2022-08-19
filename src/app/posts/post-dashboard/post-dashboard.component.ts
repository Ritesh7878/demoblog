import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AuthService } from 'src/app/core/auth.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-dashboard',
  templateUrl: './post-dashboard.component.html',
  styleUrls: ['./post-dashboard.component.css']
})
export class PostDashboardComponent implements OnInit {
  title : string = '';
  image : string = '';
  content : string = '';

  saving = 'Create Post'

  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;


  constructor(
    private postService : PostService,
    private auth : AuthService,
    private storage: AngularFireStorage
    ) { }

  ngOnInit(): void {
  }
  createPost(): void{
    const postData : Post = {
      postId : '',
      author: this.auth.authState.displayName || this.auth.authState.email,
      authorId: this.auth.currentUserId,
      content: this.content,
      image: this.image || '',
      published: new Date(),
      title: this.title
    }
    this.postService.create(postData)
    this.title = ''
    this.content = ''
    this.image = ''

    this.saving = 'Post Created!'
    setTimeout(() => (this.saving = 'Create Post'), 3000)

  }
  uploadImage(event : any) {
    const file = event.target.files[0]
    const path = `posts/${file.name}`
    const fileRef = this.storage.ref(path);
    if (file.type.split('/')[0] !== 'image') {
      return alert('Only Image files are allowed');
    } else {
      const task = this.storage.upload(path, file);
      task.snapshotChanges().pipe(
        finalize(() =>   fileRef.getDownloadURL().subscribe(url => { 
          this.downloadURL = url // with this you can use it in the html
          this.image = url;
      }))
     ).subscribe();
      this.uploadPercent = task.percentageChanges() as Observable<number>;
      console.log('Image Uploaded!')
      //this.downloadURL.subscribe(url => (this.image = url))
    }
  }
 

}
