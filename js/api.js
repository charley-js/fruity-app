const fruityAPI = axios.create({
  baseURL: "https://fruity-be.onrender.com",
});

export const handleSpin = () => {
  return fruityAPI.get("/spin").then((res) => {
    console.log(res.data);
    return res.data;
  });
};
