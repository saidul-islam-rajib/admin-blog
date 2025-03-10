import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/authentications/auth.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { HttpClient } from '@angular/common/http';
import { ImageService } from '../../../../core/services/common/image.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-add-edit-publication',
  imports: [CommonModule, ReactiveFormsModule, NgxDropzoneModule, RouterModule],
  templateUrl: './add-edit-publication.component.html',
  styleUrl: './add-edit-publication.component.scss',
})
export class AddEditPublicationComponent implements OnInit {
  publicationForm!: FormGroup;
  publicationImagePreview: string | ArrayBuffer | null = null;
  files: File[] = [];
  isEditMode = false;
  publicationId: string | null = null;
  loggedUserId: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private toast: NgToastService,
    private auth: AuthService,
    private imageService: ImageService
  ) {
    this.loggedUserId = this.auth.getUserIdFromToken();
  }

  ngOnInit(): void {
    this.initializeForm();

    this.route.paramMap.subscribe((params) => {
      this.publicationId = params.get('id');
      if (this.publicationId) {
        this.isEditMode = true;
        this.loadPublicationDetails(this.publicationId);
      }
    });
  }

  initializeForm(): void {
    this.publicationForm = this.fb.group({
      title: ['', Validators.required],
      summary: ['', Validators.required],
      journalName: ['', Validators.required],
      publicationImage: [''],
      date: ['', Validators.required],
      keys: this.fb.array([
        this.fb.group({
          key: ['', Validators.required],
        }),
      ]),
    });
  }

  get keys(): FormArray {
    return this.publicationForm.get('keys') as FormArray;
  }
  addSection(): void {
    this.keys.push(
      this.fb.group({
        key: ['', Validators.required],
      })
    );
  }
  onSubmit(): void {
    if (this.publicationForm.invalid) {
      this.toast.warning('Invalid form');
      return;
    }
    const formData = this.createFormData();
    console.log("form data is : ", formData)
    if (this.isEditMode) {
      this.http
        .put(
          environment.updatePublication(this.publicationId!, this.loggedUserId),
          formData
        )
        .subscribe({
          next: () => {
            this.toast.success('Updated successfully');
            this.router.navigate(['/publication/list']);
          },
          error: () => {
            this.toast.danger('Failed to update');
          },
        });
    } else {
      this.http
        .post(environment.postPublication(this.loggedUserId), formData)
        .subscribe({
          next: (data) => {
            this.toast.success('Added successfully');
            this.publicationForm.reset();
            this.router.navigate(['/publication/list']);
          },
          error: () => {
            this.toast.danger('Failed to create new post');
          },
        });
    }
  }

  private createFormData(): FormData {
    const formData = new FormData();
    formData.append('title', this.publicationForm.get('title')?.value);
    formData.append('summary', this.publicationForm.get('summary')?.value);
    formData.append(
      'journalName',
      this.publicationForm.get('journalName')?.value
    );
    formData.append('date', this.publicationForm.get('date')?.value);
    this.addPublicationKeysToFormData(formData);
    this.addPublicationImageToFormData(formData);
    return formData;
  }

  private addPublicationKeysToFormData(formData: FormData): void {
    const keys = this.publicationForm.get('keys')?.value;
    keys.forEach((section: any, index: number) => {
      formData.append(`keys[${index}].key`, section.key);
    });
  }

  private addPublicationImageToFormData(formData: FormData): void {
    const publicationImageFile =
      this.publicationForm.get('publicationImage')?.value;
    if (publicationImageFile instanceof File) {
      formData.append(
        'publicationImage',
        publicationImageFile,
        publicationImageFile.name
      );
    } else if (this.publicationImagePreview) {
      formData.append(
        'publicationImage',
        this.publicationImagePreview as string
      );
    }
  }

  onSelect(event: any) {
    this.files = [];
    const newFile = event.addedFiles[0];

    if (newFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.publicationImagePreview = reader.result;
      };
      reader.readAsDataURL(newFile);
      this.files.push(newFile);
      this.publicationForm.patchValue({ publicationImage: newFile });
    }
  }

  private loadPublicationDetails(id: string): void {
    this.http.get<any>(environment.getPublicationDetails(id)).subscribe({
      next: (data) => {
        this.publicationForm.patchValue({
          title: data.title,
          summary: data.summary,
          journalName: data.journalName,
          date: data.date.split('T')[0],
          publicationImage: data.publicationImage || null,
        });
        if (data.keys) {
          this.publicationForm.setControl(
            'keys',
            this.fb.array(
              data.keys.map((key: any) =>
                this.fb.group({
                  key: [key.key, Validators.required],
                })
              )
            )
          );
        }

        if (data.publicationImage) {
          this.publicationImagePreview = `${environment.baseUrl}${data.publicationImage}`;
        }
      },
    });
  }

  removeSection(index: number): void {
    this.keys.removeAt(index);
  }
  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
