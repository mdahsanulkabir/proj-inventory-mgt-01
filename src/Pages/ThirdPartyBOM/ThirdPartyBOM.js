import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

const ThirdPartyBOM = () => {
  const [ownParts, setOwnParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState({})
  const [showDetail, setShowDetail] = useState("none");
  const [showCheckingDetail, setShowCheckingDetail] = useState("none");
  useEffect(() => {
    fetch(`https://srp-planning.onrender.com/api/rms`)
      .then((res) => res.json())
      .then((data) => setOwnParts(data));
  }, []);

  console.log(ownParts);

  const showDetailDiv = id =>{
    setShowDetail("block");
    document.getElementById("showDetail").style.display = showDetail;
    setSelectedPart(ownParts.find(part => part._id === id ))
  }
  const hideDetail = () => {
    setShowDetail("none");
    document.getElementById("showDetail").style.display = showDetail;
  }

  return (
    <div>
      <h1 className="text-center">Third party BOM entry</h1>
      <br />
      <div style={{display: "flex", justifyContent: "space-between" }}>
        <Dropdown style={{flexBasis : "500px"}}>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
            Select part
            </Dropdown.Toggle>
            <Dropdown.Menu style={{maxHeight: "500px", overflowY: "scroll"}}>
            {
                ownParts.map( part => <Dropdown.Item  onMouseOver={()=>showDetailDiv(part._id)} onMouseLeave={hideDetail} key={part._id}>{part.Material_Name}</Dropdown.Item>)
            }
            </Dropdown.Menu>
        </Dropdown>
        <div id="showDetail" style={{flexBasis : "auto", display : showDetail}}>
            {/* <h3>Id: {selectedPart?._id}</h3> */}
            <h4>Object ID: {selectedPart?.Object_ID}</h4>
            <h4>Name: {selectedPart?.Material_Name}</h4>
            <h4>SIS Code : {selectedPart?.SIS_CODE}</h4>
            <h4>Source Category: {selectedPart?.Source_Category}</h4>
            <h4>RM Category: {selectedPart?.RM_Category}</h4>
        </div>
      </div>
    </div>
  );
};

export default ThirdPartyBOM;
