import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Editor } from 'ngx-editor';
import { AuthService } from 'src/app/core/auth.service';
import { Post } from '../post';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit, OnDestroy {
  post !: Post;
  editing: boolean = false;
  editor: Editor;

  constructor(
    private route : ActivatedRoute,
    private router: Router,
    private postService : PostService,
    public auth: AuthService
    ) { }
  ngOnDestroy(): void {
    this.editor.destroy();
  }

  ngOnInit(): void {
    this.editor = new Editor();
    this.getPost();
  }

  getPost() {
    const id : string = this.route.snapshot.paramMap.get('id') as string;
    return this.postService.getPostData(id).subscribe(data => this.post = data);
  }

  delete() {
    const id : string = this.route.snapshot.paramMap.get('id') as string;
    this.postService.delete(id)
    this.router.navigate(['/blog'])
  }

  updatePost() {
    const formData = {
      title: this.post.title,
      content: this.post.content
    }
    const id = this.route.snapshot.paramMap.get('id') as string;
    this.postService.update(id, formData)
    this.editing = false
  }




}
