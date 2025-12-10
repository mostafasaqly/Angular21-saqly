import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpDemoService, Post } from './http-demo.service';

@Component({
  selector: 'http-list',
  imports: [ FormsModule],
  template: `
    <h2>GET – Posts list</h2>

    <button (click)="load()">Reload</button>

    @if (loading()) {
      <p>Loading...</p>
    } @else if (error()) {
      <p class="error">Error: {{ error() }}</p>
    } @else {
      <ul>
        @for (p of posts(); track p.id) {
          <li>
            <strong>{{ p.id }}.</strong>

            @if (editingId() === p.id) {
              <!-- edit mode -->
              <div class="edit-block">
                <input [(ngModel)]="editTitle" />
                <textarea rows="2" [(ngModel)]="editBody"></textarea>

                <button (click)="saveEdit(p)" [disabled]="saving()">Save</button>
                <button (click)="cancelEdit()" [disabled]="saving()">Cancel</button>
              </div>
            } @else {
              <!-- view mode -->
              {{ p.title }}

              <button (click)="startEdit(p)">Edit</button>
              <button (click)="deletePost(p)" [disabled]="saving()">Delete</button>
            }
          </li>
        }

      </ul>
    }
  `,
  styles: [`
    .error { color: #f44336; }
    ul { padding-left: 1.2rem; }
    li { margin-bottom: .5rem; }
    .edit-block {
      display: flex;
      flex-direction: column;
      gap: .25rem;
      margin-top: .25rem;
      max-width: 480px;
    }
    .edit-block input,
    .edit-block textarea {
      padding: .25rem .4rem;
    }
  `],
})
export class HttpListComponent implements OnInit {
  posts = signal<Post[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // edit state
  editingId = signal<number | null>(null);
  saving = signal(false);
  editTitle = '';
  editBody = '';

  constructor(private api: HttpDemoService) {}

  ngOnInit() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);

    this.api.getPosts().subscribe({
      next: posts => {
        this.posts.set(posts);
      },
      error: err => {
        this.error.set(err.message ?? 'Unknown error');
      },
      complete: () => {
        this.loading.set(false);
        console.log(' [complete http list component ] finished loaded posts');

      }
    });
  }


  // ---------- EDIT ----------
  startEdit(post: Post) {
    this.editingId.set(post.id);
    this.editTitle = post.title;
    this.editBody = post.body;
  }

  cancelEdit() {
    this.editingId.set(null);
  }

  saveEdit(original: Post) {
    if (!this.editTitle.trim()) return;

    this.saving.set(true);

    this.api.updatePost(original.id, {
      title: this.editTitle,
      body: this.editBody,
    }).subscribe({
      next: updated => {
        // update local list
        this.posts.update(list =>
          list.map(p => (p.id === updated.id ? { ...p, ...updated } : p)),
        );
        this.saving.set(false);
        this.editingId.set(null);
      },
      error: err => {
        alert('Update failed: ' + (err.message ?? 'Unknown error'));
        this.saving.set(false);
      },
    });
  }

  // ---------- DELETE ----------
  deletePost(post: Post) {
    const ok = confirm(`Delete post #${post.id}?`);
    if (!ok) return;

    this.saving.set(true);

    this.api.deletePost(post.id).subscribe({
      next: () => {
        this.posts.update(list => list.filter(p => p.id !== post.id));
        this.saving.set(false);
      },
      error: err => {
        alert('Delete failed: ' + (err.message ?? 'Unknown error'));
        this.saving.set(false);
      },
    });
  }
}
