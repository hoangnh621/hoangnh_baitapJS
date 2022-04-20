import moment from "moment";
import "../scss/index.scss";
import getDataStock from "./getDataStock";

const bodyTag = document.getElementById("body");
bodyTag.addEventListener("load", getDataStock);
const dataStock = JSON.parse(localStorage.getItem("dataStock")) || [];
const updateRowTable = (data) => {
  if (data.length > 0) {
    let rowData = [];
    rowData = data.map((stock) => {
      const computedPercent = (stock.percentage / 10000).toFixed(2);
      const shareVolume = (stock.share_volume / 10000).toFixed(2);
      const priceStart = (stock.price_range.start / 1000).toFixed(2);
      const priceEnd = (stock.price_range.end / 1000).toFixed(2);
      const lastUpdate = moment(stock.last_update).format("MM/DD/YYYY");
      const transactionDate = moment(stock.transaction_date).format(
        "MM/DD/YYYY"
      );
      return `
        <tr>
          <td id="nameRow">
          <div id="namePopUp">
            <div>
              <div>
                <span>
                <input type="radio" name="namePopUp">
                Historical deals
                </span>
                <span>
                <input type="radio" name="namePopUp">
                Ownership
                </span>
              </div>
              <button>Download</button>
            </div>
            <table>
              <tr>
                <th>TICKER</th>
                <th>QUANTITY</th>
                <th>PERCENTAGE</th>
                <th>UPDATE DATE</th>
                <th>VALUE <i>(million VND)</i></th>
              </tr>
              <tr>
                <th>MSN</th>
                <td>1122</td>
                <td>1122</td>
                <td>1122</td>
                <td>1122</td>
              </tr>
              <tr>
                <th>TCB</th>
                <td>1122</td>
                <td>1122</td>
                <td>1122</td>
                <td>1122</td>
              </tr>
              <tr>
                <th>MCH</th>
                <td>1122</td>
                <td>1122</td>
                <td>1122</td>
                <td>1122</td>
              </tr>
              <tr>
                <th colspan="4"><i>TOTAL</i></th>
                <td>1122</td>
              </tr>
            </table>
          </div>
          ${stock.name}
          </td>
          <td>${stock.shares}</td>
          <td>${computedPercent}%</td>
          <td>${lastUpdate}</td>
          <td style=${shareVolume - 5 > 0 ? "" : "color:red"}>
          ${shareVolume - 5 > 0 ? `+` : `-`} ${shareVolume}
          </td>
          <td>${priceStart < priceEnd ? priceStart : priceEnd}-${
        priceEnd > priceStart ? priceEnd : priceStart
      }</td>
          <td>${transactionDate}</td>
        </tr>
        `;
    });
    return rowData;
  }
};
const tableTag = document.getElementById("table");
const trData = updateRowTable(dataStock).join("");
const bodyTable = document.createElement("tbody");
bodyTable.innerHTML = trData;
tableTag.appendChild(bodyTable);
