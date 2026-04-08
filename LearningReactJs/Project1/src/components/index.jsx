import { useState } from "react";
import "./styles.css";
import data from "./data";

export default function Accordian() {
  console.log(data);
  const [selected, setSelected] = useState(null);
  const [multipleIds, setMultipleIds] = useState([]);
  const [enableMultiselection, setEnableMultiSelection] = useState(false);

  function handleMultiSelection(getCurrentId) {
    setMultipleIds((prev)=>(prev.includes(getCurrentId)?prev.filter((item)=>item!==getCurrentId):[...prev,getCurrentId]));
  }

  function handleSingleSelection(getCurrentId) {
    setSelected(getCurrentId === selected ? null : getCurrentId);

    console.log(selected);
    console.log(getCurrentId);
  }

  return (
    <div className="wrapper">
      <button onClick={() => enableMultiselection===true?setEnableMultiSelection(false):setEnableMultiSelection(true)}>
        Enable Multiselection
      </button>

      <div className="accordian">
        {data && data.length > 0 ? (
          data.map((dataItem, idx) => (
            <div className="item" key={dataItem.id}>
              <div
                className="title"
                onClick={
                  enableMultiselection === true
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
              >
                <h3>{dataItem.question}</h3>
                <span>+</span>
              </div>
              {enableMultiselection === true ? (
                multipleIds.includes(dataItem.id) && (
                  <div>{dataItem.answer}</div>
                )
              ) : selected === dataItem.id ? (
                <div>{dataItem.answer}</div>
              ) : null}
            </div>
          ))
        ) : (
          <div>No Data Found</div>
        )}
      </div>
    </div>
  );
}
