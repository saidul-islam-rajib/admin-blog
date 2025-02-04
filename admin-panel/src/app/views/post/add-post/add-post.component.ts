import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PostApiService } from '../../../core/services/post-api.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-post',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
})
export class AddPostComponent implements OnInit {
  educationForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private apiService: PostApiService
  ) {}

  ngOnInit(): void {
    this.educationForm = this.fb.group({
      instituteName: ['', Validators.required],
      instituteLogo: ['', Validators.required],
      department: ['', Validators.required],
      isCurrentStudent: [false],
      startDate: ['', Validators.required],
      endDate: [''],
      educationSections: this.fb.array([this.createEducationSection()]),
    });
  }

  get educationSections(): FormArray {
    return this.educationForm.get('educationSections') as FormArray;
  }

  createEducationSection(): FormGroup {
    return this.fb.group({
      sectionDescription: ['', Validators.required],
    });
  }

  addEducationSection(): void {
    this.educationSections.push(this.createEducationSection());
  }

  removeEducationSection(index: number): void {
    this.educationSections.removeAt(index);
  }

  onSubmit(): void {
    if (this.educationForm.valid) {
      console.log("valid form: ", this.educationForm.value);

      this.apiService.getPostList().subscribe({
        next: (response) => {
          console.log("Response data list : ", response)
        }
      })
    } else {
      this.educationForm.markAllAsTouched();
    }
  }
}
