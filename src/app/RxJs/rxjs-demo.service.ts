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
export class RxjsDemoService {
  private readonly base = 'https://jsonplaceholder.typicode.com';

  constructor(private http: HttpClient) {}

  getPosts(limit = 10): Observable<Post[]> {
    const params = new HttpParams().set('_limit', limit);
    return this.http.get<Post[]>(`${this.base}/posts`, { params });
  }

  getPost(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.base}/posts/${id}`);
  }

  searchPosts(q: string, limit = 10): Observable<Post[]> {
    // JSONPlaceholder doesn't support real search. We'll demo with "q" + client-side filtering later.
    const params = new HttpParams().set('_limit', limit);
    return this.http.get<Post[]>(`${this.base}/posts`, { params });
  }

  createPost(data: Pick<Post, 'title' | 'body' | 'userId'>): Observable<Post> {
    return this.http.post<Post>(`${this.base}/posts`, data);
  }
}
