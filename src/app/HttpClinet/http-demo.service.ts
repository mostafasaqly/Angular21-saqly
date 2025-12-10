import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}


@Injectable({ providedIn: 'root' })
export class HttpDemoService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  // GET /posts?_limit=10
  getPosts(limit = 20): Observable<Post[]> {
    const params = new HttpParams().set('_limit', limit);
    return this.http.get<Post[]>(`${this.apiUrl}/posts`, { params });
  }


  // GET /posts/:id
  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.apiUrl}/posts/${id}`);
  }

  // POST /posts
  createPost(data: Pick<Post, 'title' | 'body' | 'userId'>): Observable<Post> {
    return this.http.post<Post>(`${this.apiUrl}/posts`, data);
  }

  // PUT example
  updatePost(id: number, changes: Partial<Post>): Observable<Post> {
    return this.http.put<Post>(`${this.apiUrl}/posts/${id}`, changes);
  }

  // DELETE example
  deletePost(id: number) {
    return this.http.delete(`${this.apiUrl}/posts/${id}`);
  }
}
