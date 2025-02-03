import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostApiService {
  private baseApiUrl = environment.baseUrl;

  constructor(
    private http: HttpClient
  ) { }

  getPostList(){
    return this.http.get<any>(`${this.baseApiUrl}/posts/get-all-posts`)
  }

  getPaginatedPost(pageIndex: number, pageSize: number){
    return this.http.get<any>(`${this.baseApiUrl}/posts/get-paginated-posts?pageIndex=${pageIndex}&pageSize=${pageSize}`)
  }

  getPostById(postId: any){
    return this.http.get<any>(`${this.baseApiUrl}/posts/:${postId}`)
  }

  getPostByTitle(postTitle: any){
    return this.http.get<any>(`${this.baseApiUrl}/post/get-post-by-title?title=${postTitle}`)
  }

  createPost(userId: any, body: any){
    return this.http.post(`${this.baseApiUrl}/posts/users/:${userId}/create-new-post`, body);
  }
}
