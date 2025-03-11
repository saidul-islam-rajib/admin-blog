import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../../core/services/authentications/auth.service';
import { ImageService } from '../../../core/services/common/image.service';
import { CommonModule } from '@angular/common';
import { NgxDropzoneModule } from 'ngx-dropzone';

@Component({
  selector: 'app-add-edit-post',
  imports: [CommonModule, ReactiveFormsModule, NgxDropzoneModule, RouterModule],
  templateUrl: './add-edit-post.component.html',
  styleUrl: './add-edit-post.component.scss',
})
export class AddEditPostComponent {
  postForm!: FormGroup;
  postImagePreview: string | ArrayBuffer | null = null;
  files: File[] = [];
  isEditMode = false;
  postId: string | null = null;
  loggedUserId: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toast: NgToastService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private imageService: ImageService
  ) {
    this.loggedUserId = this.auth.getUserIdFromToken();
  }

  ngOnInit(): void {
    this.initializeForm();

    this.route.paramMap.subscribe((params) => {
      this.postId = params.get('id');
      if (this.postId) {
        this.isEditMode = true;
      }
    });
  }

  initializeForm(): void {
    this.postForm = this.fb.group({
      postTitle: ['', Validators.required],
      postImage: [''],
      postAbstract: ['', Validators.required],
      conclusion: ['', Validators.required],
      readingMinute: ['', Validators.required],

      sections: this.fb.array([
        this.fb.group({
          sectionTitle: ['', Validators.required],
          sectionImage: [''],
          sectionDescription: ['', Validators.required],
          items: this.fb.array([
            this.fb.group({
              itemTitle: ['', Validators.required],
              itemImage: [''],
              itemDescription: ['', Validators.required],
            }),
          ]),
        }),
      ]),
      topicIds: this.fb.array([
        this.fb.group({
          topicTitle: ['', Validators.required],
        }),
      ]),
    });
  }

  get sections(): FormArray {
    return this.postForm.get('sections') as FormArray;
  }

  addSection(): void {
    this.sections.push(
      this.fb.group({
        key: ['', Validators.required],
      })
    );
  }
  removeSection(index: number): void {
    this.sections.removeAt(index);
  }

  onSubmit(): void {
    if (this.postForm.invalid) {
      this.toast.warning('Invalid form');
      return;
    }
    const formData = this.createFormData();
  }

  private createFormData(): FormData {
    const formData = new FormData();
    formData.append('postTitle', this.postForm.get('postTitle')?.value);
    formData.append('postAbstract', this.postForm.get('postAbstract')?.value);
    formData.append('conclusion', this.postForm.get('conclusion')?.value);
    formData.append('readingMinute', this.postForm.get('readingMinute')?.value);
    formData.append(
      'createdDateTime',
      this.postForm.get('createdDateTime')?.value
    );
    formData.append(
      'updatedDateTime',
      this.postForm.get('updatedDateTime')?.value
    );
    this.addPostSectionsToFormData(formData);
    this.addPostImageToFormData(formData);
    return formData;
  }

  private addPostSectionsToFormData(formData: FormData): void {
    const sections = this.postForm.get('sections')?.value;
    sections.forEach((section: any, index: number) => {
      formData.append(`sections[${index}].sectionTitle`, section.sectionTitle);
      formData.append(
        `sections[${index}].sectionDescription`,
        section.sectionDescription
      );
      formData.append(`sections[${index}].sectionImage`, section.sectionImage);
    });
  }

  private addPostImageToFormData(formData: FormData): void {
    const interestImageFile = this.postForm.get('postImage')?.value;
    if (interestImageFile instanceof File) {
      formData.append('postImage', interestImageFile, interestImageFile.name);
    } else if (this.postImagePreview) {
      formData.append('postImage', this.postImagePreview as string);
    }
  }

  onSelect(event: any) {
    this.files = [];
    const newFile = event.addedFiles[0];

    if (newFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.postImagePreview = reader.result;
      };
      reader.readAsDataURL(newFile);
      this.files.push(newFile);
      this.postForm.patchValue({ image: newFile });
    }
  }

  getImage(logo: any): string {
    const imgUrl = this.imageService.getImage(logo);
    return imgUrl;
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
