import React, { useEffect, useState } from 'react';

const divstyle = {
    border : '1px solid red',
    borderRadius: '15px',
    backgroundColor: 'yellow',
    padding : '20px'
}

const Parts = () => {
    const [parts, setParts] = useState([]);
    useEffect(()=>{
        fetch(`http://localhost:5000/ownParts`)
        .then(res => res.json())
        .then(data => setParts(data));
    },[]);

    const updatePartInfo = (event, index, partId) => {
        event.preventDefault();
        console.log(index, 'number index clicked. and part id is', partId);
        let unit ;
        let partUnit = window.prompt("please enter part unit : ", "PC");
        if (partUnit == null || partUnit === ""){
            console.log('user not have any age');
        } else {
            unit = partUnit;
            let data;
            data = [...parts];
            data[index].Unit = unit;
            console.log(data[index].Unit);
            const updatePart = {unit}
            // setUsers(users => ([
            //     // ...users,
            //     users[index].Age = userAge
                
            //     ])
            // )
            setParts(data)
            console.log(parts[index]._id);

            const url = `http://localhost:5000/ownParts/${parts[index]._id}`;
            fetch( url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updatePart)
                })
                .then(res => res.json())
                .then(data =>{
                console.log('succeed', data);
                //alert('part updated successfully!!!');
                // event.target.reset();
                });
        }


    }

    console.log(parts);
    return (
        <div>
            <h1>This is all parts info. total parts = {parts.length}</h1>
            {
                parts.map((part, index) => {
                    return (
                        <div style={divstyle} key={index}>
                            <h3>Index : {index}</h3>
                            <h3>part ID = {part._id}</h3>
                            <h3>part Object Id = {part.Object_ID}</h3>
                            <h4>part Name= {part.Material_Name}</h4>
                            <h4>Unit = {part.Unit}</h4> 
                            <button onClick={(event)=>updatePartInfo(event, index, part._id)}>Edit</button>
                        </div>

                    )
                })
            }
        </div>
    );
};

export default Parts;