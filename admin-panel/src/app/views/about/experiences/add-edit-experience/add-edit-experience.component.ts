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
import { ImageService } from '../../../../core/services/common/image.service';
import { AuthService } from '../../../../core/services/authentications/auth.service';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { CommonModule } from '@angular/common';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-add-edit-experience',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxDropzoneModule, RouterModule],
  templateUrl: './add-edit-experience.component.html',
  styleUrl: './add-edit-experience.component.scss',
})
export class AddEditExperienceComponent implements OnInit {
  experienceForm!: FormGroup;
  experienceLogoPreview: string | ArrayBuffer | null = null;
  files: File[] = [];
  isEditMode = false;
  loggedUserId: string;
  experienceId: string | null = null;

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
      this.experienceId = params.get('id');
      if(this.experienceId){
        this.isEditMode = true;
        this.loadExperienceDetails(this.experienceId);
      }
    })
  }

  initializeForm(): void {
    this.experienceForm = this.fb.group({
      companyName: ['', Validators.required],
      shortName: [''],
      companyLogo: [''],
      designation: [''],
      isCurrentEmployee: [false],
      isFullTimeEmployee: [false],
      startDate: ['', Validators.required],
      endDate: [''],
      experienceSection: this.fb.array([]),
    });

    this.experienceForm
      .get('isCurrentEmployee')
      ?.valueChanges.subscribe((value) => {
        if (value) {
          this.experienceForm.get('endDate')?.disable();
        } else {
          this.experienceForm.get('endDate')?.enable();
        }
      });
  }

  get experienceSection(): FormArray {
    return this.experienceForm.get('experienceSection') as FormArray;
  }

  addSection(): void {
    this.experienceSection.push(
      this.fb.group({
        sectionDescription: ['', Validators.required],
      })
    );
  }
  removeSection(index: number): void {
    this.experienceSection.removeAt(index);
  }

  private loadExperienceDetails(experienceId: string): void {
    this.http
      .get<any>(environment.getExperienceDetails(experienceId))
      .subscribe({
        next: (data) => {
          this.experienceForm.patchValue({
            companyName: data.companyName,
            shortName: data.shortName,
            designation: data.designation,
            isCurrentEmployee: data.isCurrentEmployee,
            isFullTimeEmployee: data.isFullTimeEmployee,
            startDate: data.startDate.split('T')[0],
            endDate: data.endDate.split('T')[0],
          });

          if (data.experienceSection) {
            data.experienceSection.forEach((section: any) => {
              this.experienceSection.push(
                this.fb.group({
                  sectionDescription: [
                    section.sectionDescription,
                    Validators.required,
                  ],
                })
              );
            });
          }

          if (data.companyLogo) {
            this.experienceLogoPreview = data.companyLogo;
          }
        },
        error: () => {
          this.toast.danger('Failed to load education details');
        },
      });
  }

  onSubmit(): void {
    if (this.experienceForm.invalid) {
      this.toast.warning('Invalid form');
      return;
    }
    const formData = this.createFormData();

    if (this.isEditMode) {
      this.http
        .put(
          environment.updateEducation(this.experienceId!, this.loggedUserId),
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
        .post(environment.experiencePost(this.loggedUserId), formData)
        .subscribe({
          next: () => {
            this.toast.success('Added successfully');
            this.experienceForm.reset();
            this.router.navigate(['/experience/list']);
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
      'companyName',
      this.experienceForm.get('companyName')?.value
    );
    formData.append(
      'shortName',
      this.experienceForm.get('shortName')?.value
    );
    formData.append('designation', this.experienceForm.get('designation')?.value);
    formData.append(
      'isCurrentEmployee',
      this.experienceForm.get('isCurrentEmployee')?.value
    );
    formData.append(
      'isFullTimeEmployee',
      this.experienceForm.get('isFullTimeEmployee')?.value
    );
    formData.append('startDate', this.experienceForm.get('startDate')?.value);
    formData.append('endDate', this.experienceForm.get('endDate')?.value);

    this.addExperienceSectionsToFormData(formData);
    this.addCompanyLogoToFormData(formData);
    return formData;
  }

  private addExperienceSectionsToFormData(formData: FormData): void {
    const experienceSection = this.experienceForm.get('experienceSection')?.value;
    experienceSection.forEach((section: any, index: number) => {
      if (section.sectionDescription) { // Ensure it's not null
        formData.append(
          `experienceSection[${index}].sectionDescription`,
          section.sectionDescription
        );
      }
    });
  }

  private addCompanyLogoToFormData(formData: FormData): void {
    const companyLogoFile = this.experienceForm.get('companyLogo')?.value;
    if (companyLogoFile) {
      formData.append(
        'companyLogo',
        companyLogoFile,
        companyLogoFile.name
      );
    }
  }

  onSelect(event: any) {
    this.files = [];
    const newFile = event.addedFiles[0];

    if (newFile) {
      const reader = new FileReader();
      reader.onload = () => {
        this.experienceLogoPreview = reader.result;
      };
      reader.readAsDataURL(newFile);
      this.files.push(newFile);
      this.experienceForm.patchValue({ companyLogo: newFile });
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  getImage(logo: any): string {
    return this.imageService.getImage(logo);
  }
}
