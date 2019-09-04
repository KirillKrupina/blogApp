import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';

import {PostsService} from '../../shared/posts.service';
import {Post} from '../../shared/interfaces';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  postsSub: Subscription;
  deleteSub: Subscription;
  searchPost = '';

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string) {
    this.deleteSub = this.postsService.remove(id).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== id);
    });
  }

  ngOnDestroy() {
   if (this.postsSub) { this.postsSub.unsubscribe(); }
   if (this.deleteSub) { this.deleteSub.unsubscribe(); }
  }

}
