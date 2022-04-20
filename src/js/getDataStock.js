import axios from "axios";

const getDataStock = () => {
  const URL = "https://625e6617873d6798e2a685a1.mockapi.io/stock";
  const config = {
    timeout: 5000,
  };
  axios
    .get(URL, config)
    .then((response) => {
      localStorage.setItem("dataStock", JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log("error", error);
    });
};

export default getDataStock;
