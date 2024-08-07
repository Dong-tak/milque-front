// types.ts
export interface Content {
  contentImage: string;
}

export interface Post {
  postId: number;
  media: string;
  type: string;
  comment: string;
  content: Content[];
  contentUrl: string;
  likes: number;
  comments: number;
  shares: number;
  date: string;
}

export interface ApiResponse {
  data: {
    alarms: any[];
    posts: Post[];
  };
  success: boolean;
  message: string;
  status: number;
}
