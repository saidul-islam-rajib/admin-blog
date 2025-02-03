export interface Interest {
  interestId: string;
  userId: string;
  title: string;
  keys: InterestKey[];
}

export interface InterestKey{
  interestKeyId: string;
  key: string;
}
