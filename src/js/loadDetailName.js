import callAPI from "./callAPI";
const URL_API_DETAIL =
  "https://625ce68595cd5855d6178b7b.mockapi.io/detail_data";
function loadDetailName(eleHasPopup) {
  Array.from(eleHasPopup).forEach((ele) => {
    ele.onmouseenter = () => {
      callAPI(
        URL_API_DETAIL,
        {
          id: Math.floor(Math.random() * 3 + 1),
        },
        "get"
      )
        .then((response) => {
          console.log(response);
          renderDetail(response, ele);
        })
        .catch((error) => {
          console.error(error);
        });
    };
  });
}
function renderDetail({ data }, ele) {
  const container = ele.querySelector("#namePopUp table tbody");
  const dataDetailHtml = data
    .map((item) => {
      const { MCH, MSN, TCB } = item;
      const totalValue = MCH.value + MSN.value + TCB.value;
      return `
        <tr>
          <th>TICKER</th>
          <th>QUANTITY</th>
          <th>PERCENTAGE</th>
          <th>UPDATE DATE</th>
          <th>VALUE <i>(million VND)</i></th>
        </tr>
        <tr>
          <th>MSN</th>
          <td>${MSN.quantity}</td>
          <td>${MSN.percentage}</td>
          <td>${MSN.update_date}</td>
          <td>${MSN.value}</td>
        </tr>
        <tr>
          <th>TCB</th>
          <td>${TCB.quantity}</td>
          <td>${TCB.percentage}</td>
          <td>${TCB.update_date}</td>
          <td>${TCB.value}</td>
        </tr>
        <tr>
          <th>MCH</th>
          <td>${MCH.quantity}</td>
          <td>${MCH.percentage}</td>
          <td>${MCH.update_date}</td>
          <td>${MCH.value}</td>
        </tr>
        <tr>
        <th colspan="4"><i>Total</i></th>
          <td>${totalValue}</td>
        </tr>
    `;
    })
    .join(" ");
  container.innerHTML = dataDetailHtml;
}

export default loadDetailName;
