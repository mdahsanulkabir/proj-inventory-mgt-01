import React, { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";

// The forwardRef is important!!
// Dropdown needs access to the DOM node in order to position the Menu
const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children}
      &#x25bc;
    </a>
  ));
  
  // forwardRef again here!
  // Dropdown needs access to the DOM of the Menu to measure it
  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      const [value, setValue] = useState('');
  
      return (
        <div
          ref={ref}
          style={style}
          className={className}
          aria-labelledby={labeledBy}
        >
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

const ThirdPartyBOMSearch = () => {
  const [ownParts, setOwnParts] = useState([]);
  const [selectedPart, setSelectedPart] = useState({})
  const [showDetail, setShowDetail] = useState("none");
  useEffect(() => {
    fetch(`http://localhost:5000/ownParts`)
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
            <Dropdown.Toggle as={CustomToggle} variant="success" id="dropdown-basic">
            Select part
            </Dropdown.Toggle>
            <Dropdown.Menu as={CustomMenu} style={{maxHeight: "500px", overflowY: "scroll"}}>
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

export default ThirdPartyBOMSearch;
