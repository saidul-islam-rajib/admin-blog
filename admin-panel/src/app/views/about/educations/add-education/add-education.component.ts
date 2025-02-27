import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import {
  NgxFileDropModule,
} from 'ngx-file-drop';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-add-education',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    NgxDropzoneModule,
    RouterModule
  ],
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.scss',
})
export class AddEducationComponent {
  educationForm: FormGroup;
  instituteLogoPreview: string | ArrayBuffer | null = null;
  files: File[] = [];

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.educationForm = this.fb.group({
      instituteName: ['', Validators.required],
      instituteLogo: [''],
      department: [''],
      isCurrentStudent: [false],
      startDate: ['', Validators.required],
      endDate: [''],
      educationSection: this.fb.array([]),
    });

    const isCurrentStudentControl = this.educationForm.get('isCurrentStudent');
    const endDateControl = this.educationForm.get('endDate');

    if (isCurrentStudentControl && endDateControl) {
      isCurrentStudentControl.valueChanges.subscribe((value) => {
        if (value) {
          endDateControl.disable();
        } else {
          endDateControl.enable();
        }
      });
    }
  }

  ngOnInit(): void {
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

  onSubmit(): void {
    if (this.educationForm.valid) {
      const formData = this.createFormData();
      console.log("valid form data : ", formData)

      this.http
        .post(
          environment.educationPost('2A52F7D6-7EB0-44D8-8513-3572375E3613'),
          formData
        )
        .subscribe({
          next: (response) => {
            alert('Education details submitted successfully!');
            this.educationForm.reset();
            this.router.navigate(['/education/list']);
          },
          error: (error) => {
            alert('Failed to submit education details.');
          },
        });
    } else {
      console.error('Form is invalid');
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
    for (let file of event.addedFiles) {
      const reader = new FileReader();
      reader.onload = () => {
        file.preview = reader.result;
        this.instituteLogoPreview = reader.result;
      };
      reader.readAsDataURL(file);
    }

    this.files.push(...event.addedFiles);

    if (this.files.length > 0) {
      this.educationForm.patchValue({ instituteLogo: this.files[0] });
    }
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
  }
}
