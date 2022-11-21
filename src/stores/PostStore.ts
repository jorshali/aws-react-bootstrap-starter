import { makeAutoObservable } from "mobx";
import { Post } from "../models/Post";

export class PostStore {
  posts: Post[];

  constructor() {
    makeAutoObservable(this);
  }
}