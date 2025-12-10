import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from './user.model';
import { UserApiService } from './user.service';

@Component({
  standalone: true,
  selector: 'users-demo',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  template: `
    <div class="container my-4">
      <h1 class="mb-4">Users HTTP Demo (EscuelaJS API)</h1>

      <div class="row">
        <!-- Form column -->
        <div class="col-md-4 mb-4">
          <div class="card">
            <div class="card-header">
              {{ editingId() ? 'Edit user' : 'Create new user' }}
            </div>
            <div class="card-body">
              <form [formGroup]="form" (ngSubmit)="onSubmit()">
                <div class="mb-3">
                  <label class="form-label">Email</label>
                  <div class="input-group">
                    <input
                      type="email"
                      class="form-control"
                      formControlName="email"
                    />
                    <button
                      type="button"
                      class="btn btn-outline-secondary"
                      (click)="onCheckEmail()"
                      [disabled]="form.controls['email'].invalid || checkingEmail()"
                    >
                      Check
                    </button>
                  </div>
                  @if(form.controls['email'].touched && form.controls['email'].invalid){
                  <div
                    class="text-danger small"
                  >
                    Valid email is required
                  </div>
                  }
                  @if(emailCheckMessage()){
                  <div class="small mt-1"
                       [class.text-success]="emailAvailable()"
                       [class.text-danger]="!emailAvailable()">
                    {{ emailCheckMessage() }}
                  </div>
                  }
                </div>

                <div class="mb-3">
                  <label class="form-label">Name</label>
                  <input class="form-control" formControlName="name" />
                  @if(form.controls['name'].touched && form.controls['name'].invalid){
                  <div
                    class="text-danger small"
                  >
                    Name is required
                  </div>
                  }
                </div>

                @if(!editingId()){
                <div class="mb-3" >
                  <label class="form-label">Password</label>
                  <input
                    type="password"
                    class="form-control"
                    formControlName="password"
                  />
                  @if(form.controls['password'].touched && form.controls['password'].invalid){
                  <div
                    class="text-danger small"
                  >
                    Password is required
                  </div>
                  }
                </div>
                }

                <div class="mb-3">
                  <label class="form-label">Role</label>
                  <select class="form-select" formControlName="role">
                    <option value="customer">Customer</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div class="mb-3">
                  <label class="form-label">Avatar URL</label>
                  <input class="form-control" formControlName="avatar" />
                </div>

                <div class="d-flex gap-2">
                  <button
                    type="submit"
                    class="btn btn-primary"
                    [disabled]="form.invalid || saving()"
                  >
                    {{ saving() ? 'Saving...' : (editingId() ? 'Update' : 'Create') }}
                  </button>

                  <button
                    type="button"
                    class="btn btn-secondary"
                    (click)="resetForm()"
                    [disabled]="saving()"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- List column -->
        <div class="col-md-8">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h2 class="h4 mb-0">Users list</h2>

            <div class="d-flex align-items-center gap-2">
              <label class="form-label mb-0">
                Limit:
                <input
                  type="number"
                  min="1"
                  class="form-control d-inline-block"
                  style="width: 80px"
                  [(ngModel)]="limit"
                  (ngModelChange)="loadUsers()"
                />
              </label>

              <button class="btn btn-outline-primary btn-sm" (click)="loadUsers()">
                Reload
              </button>
            </div>
          </div>

          @if(loading()){
          <div class="alert alert-info py-2">
            Loading...
          </div>
          }
          @if(error()){
          <div class="alert alert-danger py-2">
            {{ error() }}
          </div>
          }

          @if(!loading() && !error()){
          <table class="table table-striped table-hover" >
            <thead class="table-light">
              <tr>
                <th>#</th>
                <th>Avatar</th>
                <th>Email</th>
                <th>Name</th>
                <th>Role</th>
                <th style="width: 140px;">Actions</th>
              </tr>
            </thead>
            <tbody>
              @for(u of users(); track u.id; ){
              <tr >
                <td>{{ u.id }}</td>
                <td>
                  <img
                    [src]="u.avatar"
                    [alt]="u.name"
                    class="rounded-circle"
                    style="width: 32px; height: 32px; object-fit: cover;"
                  />
                </td>
                <td>{{ u.email }}</td>
                <td>{{ u.name }}</td>
                <td>{{ u.role }}</td>
                <td>
                  <button
                    class="btn btn-sm btn-outline-secondary me-1"
                    (click)="editUser(u)"
                  >
                    Edit
                  </button>
                  <button
                    class="btn btn-sm btn-outline-danger"
                    (click)="removeUser(u)"
                    [disabled]="saving()"
                  >
                    Delete
                  </button>
                </td>
              </tr>
          }
            </tbody>
          </table>
        }
        </div>
      </div>
    </div>
  `,
})
export class UsersDemoComponent implements OnInit {
  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  saving = signal(false);

  editingId = signal<number | null>(null);

  emailAvailable = signal<boolean | null>(null);
  emailCheckMessage = signal<string | null>(null);
  checkingEmail = signal(false);

  limit = 10;

  form: FormGroup;

  constructor(
    private api: UserApiService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      password: ['', Validators.required],
      role: ['customer', Validators.required],
      avatar: [
        'https://i.pravatar.cc/150?img=1', // default avatar
        Validators.required,
      ],
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading.set(true);
    this.error.set(null);

    this.api.getUsers(this.limit).subscribe({
      next: users => {
        this.users.set(users);
        this.loading.set(false);
      },
      error: err => {
        this.error.set(err.message ?? 'Error loading users');
        this.loading.set(false);
      },
    });
  }

  onSubmit() {
    if (this.form.invalid) return;

    const value = this.form.value;
    this.saving.set(true);

    if (this.editingId()) {
      // UPDATE
      const dto = {
        email: value.email,
        name: value.name,
        role: value.role,
        avatar: value.avatar,
      };

      this.api.updateUser(this.editingId()!, dto).subscribe({
        next: updated => {
          this.users.update(list =>
            list.map(u => (u.id === updated.id ? updated : u)),
          );
          this.saving.set(false);
          this.resetForm();
        },
        error: err => {
          alert('Update failed: ' + (err.message ?? 'Unknown error'));
          this.saving.set(false);
        },
      });
    } else {
      // CREATE
      const dto = {
        email: value.email,
        name: value.name,
        password: value.password,
        role: value.role,
        avatar: value.avatar,
      };

      this.api.createUser(dto).subscribe({
        next: created => {
          this.users.update(list => [created, ...list]);
          this.saving.set(false);
          this.resetForm();
        },
        error: err => {
          alert('Create failed: ' + (err.message ?? 'Unknown error'));
          this.saving.set(false);
        },
      });
    }
  }

  editUser(user: User) {
    this.editingId.set(user.id);
    this.form.patchValue({
      email: user.email,
      name: user.name,
      password: '',
      role: user.role,
      avatar: user.avatar,
    });
    this.form.get('password')!.clearValidators();
    this.form.get('password')!.updateValueAndValidity();
  }

  resetForm() {
    this.editingId.set(null);
    this.emailAvailable.set(null);
    this.emailCheckMessage.set(null);

    this.form.reset({
      email: '',
      name: '',
      password: '',
      role: 'customer',
      avatar: 'https://i.pravatar.cc/150?img=1',
    });

    this.form.get('password')!.setValidators(Validators.required);
    this.form.get('password')!.updateValueAndValidity();
  }

  removeUser(user: User) {
    if (!confirm(`Delete user #${user.id}?`)) return;

    this.saving.set(true);

    this.api.deleteUser(user.id).subscribe({
      next: () => {
        this.users.update(list => list.filter(u => u.id !== user.id));
        this.saving.set(false);
        if (this.editingId() === user.id) {
          this.resetForm();
        }
      },
      error: err => {
        alert('Delete failed: ' + (err.message ?? 'Unknown error'));
        this.saving.set(false);
      },
    });
  }

  onCheckEmail() {
    const emailControl = this.form.get('email');
    if (!emailControl || emailControl.invalid) return;

    this.checkingEmail.set(true);
    this.emailAvailable.set(null);
    this.emailCheckMessage.set(null);

    this.api.checkEmail({ email: emailControl.value }).subscribe({
      next: res => {
        this.emailAvailable.set(res.isAvailable);
        this.emailCheckMessage.set(
          res.isAvailable ? 'Email is available' : 'Email is already taken',
        );
        this.checkingEmail.set(false);
      },
      error: err => {
        this.emailAvailable.set(null);
        this.emailCheckMessage.set(
          'Error checking email: ' + (err.message ?? 'Unknown error'),
        );
        this.checkingEmail.set(false);
      },
    });
  }


}
