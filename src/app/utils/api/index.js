import axiosInstance from "../axios";

const fetchNearbyPlaces = async (radius,type,key) => {
  const response = await axiosInstance.get(`/place/nearbysearch/json?location=24.90737193213271%2C66.9669267883356&radius=${radius}&type=${type}&key=${key}`);
  return response;
};

const fetchselectedAddress = async (key, lat, lng) => {
  const response = await axiosInstance.get(`/geocode/json?latlng=${lat},${lng}&key=${key}`);
  return response;
};
export {
  fetchNearbyPlaces,fetchselectedAddress
};
