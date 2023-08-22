import axiosInstance from "../axios";

const fetchNearbyPlaces = async (radius,type,key) => {
  24.90737193213271, 66.9669267883356
  const response = await axiosInstance.get(`/nearbysearch/json?location=24.90737193213271%2C66.9669267883356&radius=${radius}&type=${type}&key=${key}`);
  return response;
};
export {
  fetchNearbyPlaces
};
