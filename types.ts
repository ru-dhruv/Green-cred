
export interface User {
  username: string;
  displayName: string;
  points: number;
  id: string;
}

export interface Action {
  id: string;
  userId: string;
  username: string;
  type: string;
  points: number;
  date: string;
  image?: string;
  description?: string;
  aiInsight?: string;
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userIcon: string;
  type: string;
  description: string;
  image?: string;
  date: string;
  likes: string[]; // usernames
  comments: Comment[];
}

export interface Comment {
  id: string;
  username: string;
  text: string;
  date: string;
}

export interface Reward {
  id: number;
  name: string;
  description: string;
  cost: number;
  icon: string;
}

export interface NGO {
  id: number;
  name: string;
  description: string;
  link: string;
  icon: string;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  content: string;
  link?: string;
  date: string;
}
