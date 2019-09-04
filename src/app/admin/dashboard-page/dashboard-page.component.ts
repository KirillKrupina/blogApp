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

  constructor(private postsService: PostsService) { }

  ngOnInit() {
    this.postsSub = this.postsService.getAll().subscribe(posts => {
      this.posts = posts;
    });
  }

  remove(id: string) {}

  ngOnDestroy() {
   if (this.postsSub) { this.postsSub.unsubscribe(); }
  }

}
