import { describe, it, expect, beforeEach, vi } from 'vitest';
import { of, throwError } from 'rxjs';
import { UsersService, UserDto } from './users.service';

describe('UsersService (Vitest) - Simple', () => {
  let service: UsersService;
  let httpClientSpy: any;

  beforeEach(() => {
    httpClientSpy = {
      get: vi.fn()
    };

    service = new UsersService(httpClientSpy);
  });

  it('1) should be created', () => {
    expect(service).toBeTruthy();
  });

  it('2) should fetch users from API', () => {
    const mockUsers: UserDto[] = [
      {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
        address: {
          street: 'Kulas Light',
          suite: 'Apt. 556',
          city: 'Gwenborough',
          zipcode: '92998-3874',
          geo: {
            lat: '-37.3159',
            lng: '81.1496',
          },
        },
        phone: '1-770-736-8031 x56442',
        website: 'hildegard.org',
        company: {
          name: 'Romaguera-Crona',
          catchPhrase: 'Multi-layered client-server neural-net',
          bs: 'harness real-time e-markets',
        },
      },
    ];

    httpClientSpy.get.mockReturnValue(of(mockUsers));

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
      expect(users.length).toBe(1);
      expect(users[0].name).toBe('Leanne Graham');
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  it('3) should return empty array when no users', () => {
    const mockUsers: UserDto[] = [];

    httpClientSpy.get.mockReturnValue(of(mockUsers));

    service.getUsers().subscribe((users) => {
      expect(users).toEqual([]);
      expect(users.length).toBe(0);
    });

    expect(httpClientSpy.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  it('4) should handle HTTP 500 error', () => {
    const errorResponse = { status: 500, statusText: 'Internal Server Error' };

    httpClientSpy.get.mockReturnValue(throwError(() => errorResponse));

    service.getUsers().subscribe({
      next: () => {
        throw new Error('Should have failed with 500 error');
      },
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      },
    });
  });

  it('5) should validate user structure', () => {
    const mockUser: UserDto = {
      id: 1,
      name: 'Test User',
      username: 'testuser',
      email: 'test@example.com',
      address: {
        street: 'Test Street',
        suite: 'Suite 100',
        city: 'Test City',
        zipcode: '12345',
        geo: {
          lat: '0',
          lng: '0',
        },
      },
      phone: '123-456-7890',
      website: 'test.com',
      company: {
        name: 'Test Company',
        catchPhrase: 'Test phrase',
        bs: 'test bs',
      },
    };

    httpClientSpy.get.mockReturnValue(of([mockUser]));

    service.getUsers().subscribe((users) => {
      const user = users[0];

      expect(user.id).toBeDefined();
      expect(user.name).toBeDefined();
      expect(user.address).toBeDefined();
      expect(user.address.geo).toBeDefined();
      expect(user.company).toBeDefined();
    });
  });

  it('6) should use correct API endpoint', () => {
    httpClientSpy.get.mockReturnValue(of([]));

    service.getUsers().subscribe();

    expect(httpClientSpy.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users');
  });

  it('7) should handle 404 error', () => {
    const errorResponse = { status: 404, statusText: 'Not Found' };

    httpClientSpy.get.mockReturnValue(throwError(() => errorResponse));

    service.getUsers().subscribe({
      next: () => {
        throw new Error('Should have failed with 404 error');
      },
      error: (error) => {
        expect(error.status).toBe(404);
        expect(error.statusText).toBe('Not Found');
      },
    });
  });

  it('8) should return Observable', () => {
    httpClientSpy.get.mockReturnValue(of([]));

    const result = service.getUsers();

    expect(result).toBeDefined();
    expect(typeof result.subscribe).toBe('function');
  });

  it('9) should validate complete user data structure', () => {
    const mockUser: UserDto = {
      id: 1,
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      address: {
        street: 'Main St',
        suite: 'Apt 1',
        city: 'City',
        zipcode: '12345',
        geo: {
          lat: '10.0',
          lng: '20.0',
        },
      },
      phone: '123-456-7890',
      website: 'example.com',
      company: {
        name: 'Tech Corp',
        catchPhrase: 'Innovation',
        bs: 'solutions',
      },
    };

    httpClientSpy.get.mockReturnValue(of([mockUser]));

    service.getUsers().subscribe((users) => {
      const user = users[0];

      expect(user.id).toBe(1);
      expect(user.name).toBe('John Doe');
      expect(user.address.city).toBe('City');
      expect(user.company.name).toBe('Tech Corp');
    });
  });

  it('10) should call HTTP get only once', () => {
    httpClientSpy.get.mockReturnValue(of([]));

    service.getUsers().subscribe();

    expect(httpClientSpy.get).toHaveBeenCalledTimes(1);
  });
});
