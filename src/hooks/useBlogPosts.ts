import { EnvConfig } from "../utility/EnvConfig";
import { useAxios } from "./useAxios";
import { useStores } from "./useStores";

export const useBlogPosts = () => {
  const baseUrl = EnvConfig.get('awsBaseServiceUrl');

  const { createAxiosInstance } = useAxios();
  const { blogPostStore } = useStores();

  const loadPosts = async () => {
    const axios = await createAxiosInstance();
    const result = await axios.get(`${baseUrl}/blogposts`);
    
    console.log(result);

    blogPostStore.posts = result.data;
  }

  return { loadPosts };
};