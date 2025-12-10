import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpDemoService, Post } from './http-demo.service';

describe('HttpDemoService', () => {
  let service: HttpDemoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpDemoService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(HttpDemoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should GET posts', () => {
    const mockPosts: Post[] = [
      { userId: 1, id: 1, title: 'Test', body: 'Body' },
    ];

    service.getPosts(1).subscribe(posts => {
      expect(posts.length).toBe(1);
      expect(posts[0].title).toBe('Test');
    });

    const req = httpMock.expectOne(
      r => r.url === 'https://jsonplaceholder.typicode.com/posts' && r.params.get('_limit') === '1',
    );

    expect(req.request.method).toBe('GET');
    req.flush(mockPosts);
  });
});
