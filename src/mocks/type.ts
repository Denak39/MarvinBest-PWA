export interface Sentence {
  id: number;
  sentence: string;
  user: User;
}

export interface User {
  id: number;
  name: string;
}
