import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../../../core/services/authentications/auth.service';
import { ImageService } from '../../../../core/services/common/image.service';
import { environment } from '../../../../../environments/environment';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-interest',
  imports: [CommonModule, ReactiveFormsModule, NgxDropzoneModule, RouterModule],
  templateUrl: './add-edit-interest.component.html',
  styleUrl: './add-edit-interest.component.scss',
})
export class AddEditInterestComponent implements OnInit {
  interestForm!: FormGroup;
  interestImagePreview: string | ArrayBuffer | null = null;
  files: File[] = [];
  isEditMode = false;
  interestId: string | null = null;
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
      this.interestId = params.get('id');
      if (this.interestId) {
        this.isEditMode = true;
        this.loadInterestDetails(this.interestId);
      }
    });
  }

  initializeForm(): void {
    this.interestForm = this.fb.group({
      title: ['', Validators.required],
      image: [''],
      keys: this.fb.array([
        this.fb.group({
          key: ['', Validators.required]
        })
      ])
    });
    
  }

  get keys(): FormArray {
    return this.interestForm.get('keys') as FormArray;
  }

  addSection(): void {
    this.keys.push(
      this.fb.group({
        key: ['', Validators.required],
      })
    );
  }
  removeSection(index: number): void {
    this.keys.removeAt(index);
  }

  private loadInterestDetails(id: string): void {
    this.http.get<any>(environment.getInterestDetails(id)).subscribe({
      next: (data) => {
        this.interestForm.patchValue({
          title: data.title,
          image: data.image || null,
        });
  
        if (data.keys) {
          this.interestForm.setControl(
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
  
        if (data.image) {
          this.interestImagePreview = `${environment.baseUrl}${data.image}`;
        }
      },
      error: () => {
        this.toast.danger('Failed to load interest details');
      },
    });
  }
  

  onSubmit(): void {
    if (this.interestForm.invalid) {
      this.toast.warning('Invalid form');
      return;
    }
    const formData = this.createFormData();
    console.log('form data : ', formData);
    if (this.isEditMode) {
      this.http
        .put(
          environment.updateInterest(this.interestId!, this.loggedUserId),
          formData
        )
        .subscribe({
          next: () => {
            this.toast.success('Updated successfully');
            this.router.navigate(['/interest/list']);
          },
          error: () => {
            this.toast.danger('Failed to update');
          },
        });
    } else {
      this.http
        .post(environment.postInterest(this.loggedUserId), formData)
        .subscribe({
          next: () => {
            this.toast.success('Added successfully');
            this.interestForm.reset();
            this.router.navigate(['/interest/list']);
          },
          error: () => {
            this.toast.danger('Failed to create new post');
          },
        });
    }
  }

  private createFormData(): FormData {
    const formData = new FormData();
    formData.append('title', this.interestForm.get('title')?.value);
    this.addInterestKeysToFormData(formData);
    this.addInterestImageToFormData(formData);
    return formData;
  }

  private addInterestKeysToFormData(formData: FormData): void {
    const keys = this.interestForm.get('keys')?.value;
    keys.forEach((section: any, index: number) => {
      formData.append(`keys[${index}].key`, section.key);
    });
  }

  private addInterestImageToFormData(formData: FormData): void {
    const interestImageFile = this.interestForm.get('image')?.value;
    if (interestImageFile instanceof File) { // Check if the value is a File object
      formData.append('image', interestImageFile, interestImageFile.name);
    } else if (this.interestImagePreview) { // Use preview URL if no new image is selected
      formData.append('image', this.interestImagePreview as string);
    }
  }

  onSelect(event: any) {
    this.files = [];
    const newFile = event.addedFiles[0];

    if (newFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.interestImagePreview = reader.result;
      };
      reader.readAsDataURL(newFile);
      this.files.push(newFile);
      this.interestForm.patchValue({ image: newFile });
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
