import { Component, OnInit } from '@angular/core';
import { Post } from '../../core/interfaces/post';
import { PostApiService } from '../../core/services/post-api.service';

@Component({
  selector: 'app-post',
  imports: [],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  public postList: Post[] = [];

  constructor(
    private postService: PostApiService
  ){

  }

  ngOnInit(): void {

  }

  getPostList(){
    this.postService.getPostList().subscribe({
      next: (response) => {
        console.log("List of post : ", response)
        this.postList = response;
      },
      error: (err) => {
        console.log("Error while loading list of posts", err);
      }
    });
  }
}
