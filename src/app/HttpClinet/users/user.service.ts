import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  User,
  CreateUserDto,
  UpdateUserDto,
  EmailCheckRequest,
  EmailCheckResponse,
} from './user.model';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  private readonly baseUrl = 'https://api.escuelajs.co/api/v1/users';

  constructor(private http: HttpClient) {}

  // GET /users?limit=&offset=
  getUsers(limit = 10, offset = 0): Observable<User[]> {
    const params = new HttpParams()
      .set('limit', limit)
      .set('offset', offset);

    return this.http.get<User[]>(this.baseUrl, { params });
  }

  // GET /users/{id}
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/${id}`);
  }

  // POST /users
  createUser(dto: CreateUserDto): Observable<User> {
    return this.http.post<User>(this.baseUrl, dto);
  }

  // PUT /users/{id}
  updateUser(id: number, dto: UpdateUserDto): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/${id}`, dto);
  }

  // DELETE /users/{id}
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // POST /users/is-available
  checkEmail(body: EmailCheckRequest): Observable<EmailCheckResponse> {
    return this.http.post<EmailCheckResponse>(
      `${this.baseUrl}/is-available`,
      body,
    );
  }
}
