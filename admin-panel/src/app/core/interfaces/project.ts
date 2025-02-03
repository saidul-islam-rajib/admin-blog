export interface Project {
  projectId: string;
  postId: string;
  projectTitle: string;
  projectSummary: string;
  projectSrcLink: string;
  projectImage: string;
  displayDate: Date;
  startDate: Date;
  endDate: Date;
  projectSection: ProjectSection[];
}
export interface ProjectSection{
  postSectionId: string;
  topicId: string;
  topicName: string;
  projectTags: ProjectTagSection[];
}

export interface ProjectTagSection{
  tagId: string;
  projectTagName: string;
}
