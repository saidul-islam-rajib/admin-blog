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
  postList = [
    {
      postId: '3ae00dff-2d33-43da-ae99-889cda5599ff',
      postTitle: 'Testing Purpose Post',
      postAbstract: 'This is a test post about various topics.',
      readingMinute: 15,
      topicIds: [1, 2, 3],
      userId: 'User A',
      sections: [
        { sectionTitle: 'Introduction', sectionDescription: 'This is the introduction. Another sample post with a different topicAnother sample post with a different topicAnother sample post with a different topic' },
        { sectionTitle: 'Details', sectionDescription: 'This section contains detailed information.' },
      ]
    },
    {
      postId: 'a123d1b7-7119-4a6d-b65f-e037dcdb9281',
      postTitle: 'Post Title 1',
      postAbstract: 'Another sample post with a different topic.',
      readingMinute: 10,
      topicIds: [4, 5],
      userId: 'User B',
      sections: [
        { sectionTitle: 'Overview', sectionDescription: 'This section provides an overview.' }
      ]
    },
    {
      postId: 'b456d1b7-7119-4a6d-b65f-e037dcdb9299',
      postTitle: 'Post Title 2',
      postAbstract: 'This post has no sections.',
      readingMinute: 8,
      topicIds: [6],
      userId: 'User C',
      sections: []
    }
  ];

  constructor(private postService: PostApiService) {}

  ngOnInit(): void {
    //this.getPostList();
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
