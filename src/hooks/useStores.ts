import React from 'react';
import { AsyncStore } from '../stores/AsyncStore';

import { AuthenticationStore } from '../stores/AuthenticationStore';
import { ErrorStore } from '../stores/ErrorStore';
import { PostStore } from '../stores/PostStore';

const errorStore = new ErrorStore();
const asyncStore = new AsyncStore(errorStore);
const authenticationStore = new AuthenticationStore();
const postStore = new PostStore();

const storesContext = React.createContext({
  errorStore,
  asyncStore,
  authenticationStore,
  postStore
});

export const useStores = () => {
  return React.useContext(storesContext);
}