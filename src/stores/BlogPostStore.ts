import { makeAutoObservable } from "mobx";
import { BlogPost } from "../models/BlogPost";

export class BlogPostStore {
  posts: BlogPost[];

  constructor() {
    makeAutoObservable(this);
  }
}