export interface AdditionalSkill {
  additionalSkillId: string;
  userId: string;
  title: string;
  keys: AdditionalSkillKey[];
}

export interface AdditionalSkillKey{
  additionalSkillKeyId: string;
  key: string;
}

