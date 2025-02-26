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
import { DomSanitizer } from '@angular/platform-browser';
import {
  FileSystemFileEntry,
  NgxFileDropEntry,
  NgxFileDropModule,
} from 'ngx-file-drop';

@Component({
  selector: 'app-add-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxFileDropModule],
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.scss',
})
export class AddEducationComponent {
  educationForm: FormGroup;
  instituteLogoPreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private sanitizer: DomSanitizer
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
        sectionDescripton: ['', Validators.required],
      })
    );
  }

  removeSection(index: number): void {
    this.educationSection.removeAt(index);
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.educationForm.patchValue({ instituteLogo: file });
      this.previewImage(file);
    }
  }

  dropped(files: NgxFileDropEntry[]): void {
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {
          this.educationForm.patchValue({ instituteLogo: file });
          this.previewImage(file);
        });
      }
    }
  }

  previewImage(file: File): void {
    const reader = new FileReader();
    reader.onload = () => {
      this.instituteLogoPreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    if (this.educationForm.valid) {
      const formData = this.createFormData();

      this.http
        .post(
          environment.educationPost('1B06E929-655D-479B-8F96-6A30A7BE8851'),
          formData
        )
        .subscribe({
          next: (response) => {
            alert('Education details submitted successfully!');
            this.educationForm.reset();
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
        `educationSection[${index}].sectionDescripton`,
        section.sectionDescripton
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
}
