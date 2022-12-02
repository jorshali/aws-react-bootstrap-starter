import React from 'react';
import { AsyncStore } from '../stores/AsyncStore';

import { AuthenticationStore } from '../stores/AuthenticationStore';
import { ErrorStore } from '../stores/ErrorStore';
import { BlogPostStore } from '../stores/BlogPostStore';

const errorStore = new ErrorStore();
const asyncStore = new AsyncStore(errorStore);
const authenticationStore = new AuthenticationStore();
const blogPostStore = new BlogPostStore();

const storesContext = React.createContext({
  errorStore,
  asyncStore,
  authenticationStore,
  blogPostStore
});

export const useStores = () => {
  return React.useContext(storesContext);
}