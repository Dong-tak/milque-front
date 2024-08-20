// types.ts
export interface Content {
  contentImage: string;
}

export interface Post {
  postId: number;
  media: string;
  type: string;
  comments: Comment[];
  contentUrl: string;
  date: string;
  thumbnail: string;
  title: string;
  description: string;
}

export interface ApiResponse {
  data: {
    posts: Post[];
    notifications: number;
  };
  success: boolean;
  message: string;
  status: number;
}

export interface Comment {
  id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}
