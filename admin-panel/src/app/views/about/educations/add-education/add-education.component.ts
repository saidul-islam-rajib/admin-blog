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
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-education',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.scss',
})
export class AddEducationComponent {
  educationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
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

    // Disable endDate if isCurrentStudent is true
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

  // Getter for educationSections FormArray
  get educationSection(): FormArray {
    return this.educationForm.get('educationSection') as FormArray;
  }

  // Add a new education section
  addSection(): void {
    this.educationSection.push(
      this.fb.group({
        sectionDescripton: ['', Validators.required],
      })
    );
  }

  // Remove an education section by index
  removeSection(index: number): void {
    this.educationSection.removeAt(index);
  }

  // Handle form submission
  onSubmit(): void {
    if (this.educationForm.valid) {
      console.log('the form is valid');

      const formData = this.educationForm.value;
      console.log("form data : ", formData)

      this.http.post(environment.educationPost, formData)
        .subscribe({
          next: (response) => {
            console.log('Success:', response);
            alert('Education details submitted successfully!');
            this.educationForm.reset();
          },
          error: (error) => {
            console.error('Error:', error);
            alert('Failed to submit education details.');
          },
        });
    } else {
      console.error('Form is invalid');
    }
  }
}
