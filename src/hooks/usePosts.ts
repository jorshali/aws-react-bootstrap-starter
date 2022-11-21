import { EnvConfig } from "../utility/EnvConfig";
import { useAxios } from "./useAxios";
import { useStores } from "./useStores";

export const usePosts = () => {
  const baseUrl = EnvConfig.get('awsBaseServiceUrl');

  const { createAxiosInstance } = useAxios();
  const { postStore } = useStores();

  const loadPosts = async () => {
    const axios = await createAxiosInstance();
    const result = await axios.get(`${baseUrl}`);
    
    console.log(result);

    postStore.posts = result.data;
  }

  return { loadPosts };
};