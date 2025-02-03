export interface TopicWithTag {
  topicId: string;
  topicName: string;
  tagInformation: TagInformation[]
}

export interface TagInformation{
  tagId: string;
  tagName: string;
}
