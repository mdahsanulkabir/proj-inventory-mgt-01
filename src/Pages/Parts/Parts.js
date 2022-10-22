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
        fetch(`https://srp-planning.onrender.com/api/rms`)
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

            const url = `https://srp-planning.onrender.com/api/rms/${parts[index]._id}`;
            fetch( url, {
                method: 'PATCH',
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
                            <h3>part Object Id = {part.object_id}</h3>
                            <h4>part Name= {part.material_name}</h4>
                            <h4>Unit = {part.unit}</h4> 
                            <button onClick={(event)=>updatePartInfo(event, index, part._id)}>Edit</button>
                        </div>

                    )
                })
            }
        </div>
    );
};

export default Parts;