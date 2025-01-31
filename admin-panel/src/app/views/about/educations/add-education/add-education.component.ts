import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-add-education',
  imports: [
    CommonModule, ReactiveFormsModule
  ],
  templateUrl: './add-education.component.html',
  styleUrl: './add-education.component.scss',
})
export class AddEducationComponent {
  educationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.educationForm = this.fb.group({
      instituteName: ['', Validators.required],
      instituteLogo: [''],
      department: [''],
      isCurrentStudent: [false],
      startDate: ['', Validators.required],
      endDate: [''],
      educationSections: this.fb.array([]),
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
  get educationSections(): FormArray {
    return this.educationForm.get('educationSections') as FormArray;
  }

  // Add a new education section
  addSection(): void {
    this.educationSections.push(
      this.fb.group({
        sectionDescription: [''],
      })
    );
  }

  // Remove an education section by index
  removeSection(index: number): void {
    this.educationSections.removeAt(index);
  }

  // Handle form submission
  onSubmit(): void {
    if (this.educationForm.valid) {
      console.log(this.educationForm.value);
      // Send the form data to your backend here
    } else {
      console.error('Form is invalid');
    }
  }
}
