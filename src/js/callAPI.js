import axios from "axios";
let cancelToken;

function getDataApi(url, params, methodName, ms) {
  if (typeof cancelToken != typeof undefined) {
    cancelToken.cancel("Many API");
  }
  cancelToken = axios.CancelToken.source();
  const config = {
    method: methodName,
    params: params,
    url: url,
    timeout: 5000,
    cancelToken: cancelToken.token,
  };

  //Delay return data Api
  if (ms) {
    return new Promise((resolve, reject) => {
      axios(config)
        .then((result) => {
          setTimeout(() => {
            resolve(result);
          }, ms);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  return axios(config);
}
export default getDataApi;
