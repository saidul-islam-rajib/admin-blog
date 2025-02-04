import { Component, OnInit } from '@angular/core';
import { Post, PostSection, PostTopic } from '../../core/interfaces/post';
import { PostApiService } from '../../core/services/post-api.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-post',
  imports: [CommonModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
})
export class PostComponent implements OnInit {
  postList: Post[] = [];

  constructor(private postService: PostApiService) {}

  ngOnInit(): void {
    this.getPostList();
  }

  getPostList() {
    this.postService.getPostList().subscribe({
      next: (response) => {
        this.postList = response;
        console.log('List of post : ', this.postList);
      },
      error: (err) => {
        console.log('Error while loading list of posts', err);
      },
    });
  }

  getPostSectionInformation(section: PostSection[]): string {
    if (!section || !Array.isArray(section) || section.length === 0) {
      return ''; // Return an empty string instead of null
    }

    return section
      .map((s, index) => {
        const items = s.items
          ?.map((item, i) => `&nbsp;&nbsp;- ${item.itemTitle}: ${item.itemDescription}`)
          .join('<br/>') || 'No items available';

        return `<b>${index + 1}. ${s.sectionTitle}</b><br/>${s.sectionDescription}<br/>${items}`;
      })
      .join('<br/><br/>');
  }


  getPostTopicInformation(topics: any[]) {
    if (!topics || !Array.isArray(topics)) {
      return '';
    }

    return topics
      .map((t: any, index: number) => `${index + 1}. ${t.topicTitle}`)
      .join('<br/>');
  }
}
