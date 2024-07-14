import { baseAxios } from "@/utils/axios";
import config from "@/utils/config";

const apiKey = config.NEWS_API_KEY;

const getNews = async (params) => {
  try {
    const res = await baseAxios.get(`/v2/top-headlines?apiKey=${apiKey}`, { params });
    return res.data;
  } catch (err) {
    console.error("Error:", err);
  }
};


export {
  getNews
};
