import { CommonModule } from '@angular/common';
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
import { NgxDropzoneModule } from 'ngx-dropzone';
import { environment } from '../../../../../environments/environment';
import { AuthService } from '../../../../core/services/authentications/auth.service';
import { ImageService } from '../../../../core/services/common/image.service';

@Component({
  selector: 'app-add-edit-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxDropzoneModule, RouterModule],
  templateUrl: './add-edit-education.component.html',
  styleUrl: './add-edit-education.component.scss',
})
export class AddEditEducationComponent implements OnInit {
  educationForm!: FormGroup;
  instituteLogoPreview: string | ArrayBuffer | null = null;
  files: File[] = [];
  isEditMode = false;
  educationId: string | null = null;
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

    // Check if it's edit mode
    this.route.paramMap.subscribe((params) => {
      this.educationId = params.get('id');
      console.log('Educationn id from route : ', this.educationId);
      if (this.educationId) {
        this.isEditMode = true;
        this.loadEducationDetails(this.educationId);
      }
    });

    // Handle enabling/disabling End Date field
    this.educationForm
      .get('isCurrentStudent')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.educationForm.get('endDate')?.disable();
        } else {
          this.educationForm.get('endDate')?.enable();
        }
      });
  }

  initializeForm(): void {
    this.educationForm = this.fb.group({
      instituteName: ['', Validators.required],
      instituteLogo: [''],
      department: [''],
      isCurrentStudent: [false],
      startDate: ['', Validators.required],
      endDate: [''],
      educationSection: this.fb.array([]),
    });
  }

  get educationSection(): FormArray {
    return this.educationForm.get('educationSection') as FormArray;
  }

  addSection(): void {
    this.educationSection.push(
      this.fb.group({
        sectionDescription: ['', Validators.required],
      })
    );
  }

  removeSection(index: number): void {
    this.educationSection.removeAt(index);
  }

  private loadEducationDetails(educationId: string): void {
    this.http.get<any>(environment.getEducationDetails(educationId)).subscribe({
      next: (data) => {
        console.log("Educational Details data : ", data)
        this.educationForm.patchValue({
          instituteName: data.instituteName,
          department: data.department,
          isCurrentStudent: data.isCurrentStudent,
          startDate: data.startDate.split('T')[0],
          endDate: data.endDate.split('T')[0],
        });

        // Load education sections
        if (data.educationSection) {
          data.educationSection.forEach((section: any) => {
            this.educationSection.push(
              this.fb.group({
                sectionDescription: [
                  section.sectionDescription,
                  Validators.required,
                ],
              })
            );
          });
        }

        // Load institute logo
        if (data.instituteLogo) {
          console.log('inside here: ', data.instituteLogo);
          this.instituteLogoPreview = data.instituteLogo;
        }
      },
      error: () => {
        this.toast.danger('Failed to load education details');
      },
    });
  }

  onSubmit(): void {
    if (this.educationForm.invalid) {
      this.toast.warning('Invalid form');
      return;
    }
    const formData = this.createFormData();

    if (this.isEditMode) {
      this.http
        .put(
          environment.updateEducation(this.educationId!, this.loggedUserId),
          formData
        )
        .subscribe({
          next: () => {
            this.toast.success('Updated successfully');
            this.router.navigate(['/education/list']);
          },
          error: () => {
            this.toast.danger('Failed to update');
          },
        });
    } else {
      this.http
        .post(environment.educationPost(this.loggedUserId), formData)
        .subscribe({
          next: () => {
            this.toast.success('Added successfully');
            this.educationForm.reset();
            this.router.navigate(['/education/list']);
          },
          error: () => {
            this.toast.danger('Failed to create new post');
          },
        });
    }
  }

  private createFormData(): FormData {
    const formData = new FormData();
    formData.append(
      'instituteName',
      this.educationForm.get('instituteName')?.value
    );
    formData.append('department', this.educationForm.get('department')?.value);
    formData.append(
      'isCurrentStudent',
      this.educationForm.get('isCurrentStudent')?.value
    );
    formData.append('startDate', this.educationForm.get('startDate')?.value);
    formData.append('endDate', this.educationForm.get('endDate')?.value);
    this.addEducationSectionsToFormData(formData);
    this.addInstituteLogoToFormData(formData);
    return formData;
  }

  private addEducationSectionsToFormData(formData: FormData): void {
    const educationSections = this.educationForm.get('educationSection')?.value;
    educationSections.forEach((section: any, index: number) => {
      formData.append(
        `educationSection[${index}].sectionDescription`,
        section.sectionDescription
      );
    });
  }

  private addInstituteLogoToFormData(formData: FormData): void {
    const instituteLogoFile = this.educationForm.get('instituteLogo')?.value;
    if (instituteLogoFile) {
      formData.append(
        'instituteLogo',
        instituteLogoFile,
        instituteLogoFile.name
      );
    }
  }

  onSelect(event: any) {
    this.files = [];
    const newFile = event.addedFiles[0];

    if (newFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.instituteLogoPreview = reader.result;
      };
      reader.readAsDataURL(newFile);
      this.files.push(newFile);
      this.educationForm.patchValue({ instituteLogo: newFile });
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  getImage(logo: any): string {
    return this.imageService.getImage(logo);
  }
}
