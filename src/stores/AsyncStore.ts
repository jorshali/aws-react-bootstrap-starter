import { makeAutoObservable } from "mobx";
import { ErrorStore } from "./ErrorStore";

export class AsyncStore {
  loading = false;

  constructor(private errorStore: ErrorStore) {
    makeAutoObservable(this);
  }

  resetLoading() {
    this.loading = false;
  }

  showLoading = async (asyncFunction: () => Promise<any>) => {
    this.loading = true;

    return new Promise<void>((resolve, reject) => {
      asyncFunction()
        .then(() => {
          this.resetLoading();
          resolve();
        })
        .catch((error) => {
          this.resetLoading();
          this.errorStore.handleError(error);
          resolve();
        })
    })
  }
}