export interface Education {
  instituteName: string;
  instituteLogo: string;
  department: string;
  startDate: Date;
  endDate: Date;
  educationSection: EducationSection[];
}

export interface EducationSection{
  educationSectionId: string;
  sectionDescription: string;
}
