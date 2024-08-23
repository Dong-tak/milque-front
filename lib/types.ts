// types.ts
export interface Content {
  contentImage: string;
}

export interface PostDetail {
  data: {
    postId: number;
    media: string;
    type: string;
    comments: Comment[];
    title: string;
    date: string;
    description: string;
    thumbnail: string;
    contentUrl: string;
    success: boolean;
    message: string;
  };
}

export interface PostFeed {
  postId: number;
  media: string;
  type: string;
  comments: Comment[];
  title: string;
  date: string;
  description: string;
  thumbnail: string;
  contentUrl: string;
  success: boolean;
  message: string;
}

export interface ApiResponse {
  data: {
    posts: PostFeed[];
    notifications: number;
  };
  success: boolean;
  message: string;
}

export interface Comment {
  id: number;
  comment: string;
  created_at: string;
  updated_at: string;
  is_deleted: boolean;
}
