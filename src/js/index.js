import axios from "axios";
import "../scss/index.scss";
import callAPI from "./callAPI";
import loadDataTable from "./loadDataTable";
import loadDetailName from "./loadDetailName";

const URL = "https://625e6617873d6798e2a685a1.mockapi.io/stock";

callAPI(URL, {}, "get")
  .then(loadDataTable)
  .then(loadDetailName)
  .catch((thrown) => {
    if (axios.isCancel(thrown)) {
      console.log("Request canceled", thrown.message);
    } else {
      console.log("Cancel error");
    }
  });
