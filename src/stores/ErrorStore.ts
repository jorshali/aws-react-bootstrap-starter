import { AxiosError } from "axios";
import { makeAutoObservable } from "mobx";

const helpEmailAddress = 'jacob@focus.dev';

export interface ErrorDetail {
  title: string;
  description?: string;
  originalMessage?: string;
}

export class ErrorStore {
  hasError: boolean = false;
  error: Error;
  errorDetail: ErrorDetail | undefined;

  constructor() {
    makeAutoObservable(this);
  }

  isNetworkError() {
    if (this.error instanceof AxiosError) {
      return this.error.code === 'ERR_NETWORK';
    }

    return false;
  }

  getHelpEmail() {
    return helpEmailAddress;
  }

  handleError = (error: any) => {
    this.hasError = true;
    this.error = error;

    this.errorDetail = {
      title: 'Something went wrong.',
      description: '',
      originalMessage: error.message
    };

    console.error(error);
  }

  clearError = () => {
    this.hasError = false;
    this.errorDetail = undefined;
  }
}