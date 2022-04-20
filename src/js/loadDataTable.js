import formatDate from "../help/formatDate.js";
import setValue from "../help/value";

const loadDataTable = ({ data }) => {
  const rowData = data.map((stock) => {
    const COMPUTED_VALUE1 = 10000;
    const COMPUTED_VALUE2 = 1000;
    const computedPercent = setValue(stock.percentage, COMPUTED_VALUE1);
    const shareVolume = setValue(stock.share_volume, COMPUTED_VALUE1);
    const priceStart = setValue(stock.price_range.start, COMPUTED_VALUE2);
    const priceEnd = setValue(stock.price_range.end, COMPUTED_VALUE2);
    const lastUpdate = formatDate(stock.last_update);
    const transactionDate = formatDate(stock.transaction_date);
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
            <button><span class="icon-download"></button>
          </div>
          <table>
            <tbody></tbody>
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
  const tableTag = document.getElementById("table");
  const trData = rowData.join("");
  const bodyTable = document.createElement("tbody");
  bodyTable.innerHTML = trData;
  tableTag.appendChild(bodyTable);
  return new Promise((resolve) => {
    const nameEle = document.querySelectorAll("#nameRow");
    resolve(nameEle);
  });
};
export default loadDataTable;
