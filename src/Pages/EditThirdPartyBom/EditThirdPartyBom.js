import React from 'react';
import { useState } from 'react';
import useLoadParts from '../../Hooks/useLoadParts';

const divStyle={
    marginLeft: '20px',
};

const EditThirdPartyBom = () => {
    const { parts } = useLoadParts();
    const [rmEditedPart, setRmEditedPart] = useState({partId:'', rmList:[], display: 'none'})
    const [fieldLists, setFieldLists] = useState([{rmId: '', rmQty: 0},]);

    const handleFormChange = (event, index) => {
        let data = [...fieldLists];

        //if the updated field is rmId then it will get the material name of that raw material
        if(event.target.name === 'rmId') {
            const rm = parts.find(part => part._id === event.target.value);
            data[index].rmName = rm.material_name;
        }
        data[index][event.target.name] = event.target.value;
        setFieldLists(data);
        let rmList = data;
        setRmEditedPart(prevState => ({
            ...prevState,
            rmList
        }))

        console.log(event.target.name, event.target.value);
    };

    const formSubmit = (event) => {
        event.preventDefault();
        console.log('Get the Edited part  ', rmEditedPart);
        
        //reset input values
        setFieldLists([{rmId: '', rmQty: 0},]);
        setRmEditedPart({partId:'', rmList:[], display: 'none'});
        document.getElementById("partId").value = '';
    }

    const addMore = (event) => {
        event.preventDefault();
        let newRm = {
            rmId : '',
            rmQty: 0
        }
        setFieldLists([...fieldLists, newRm])
    }

    const remove = (event, index) => {
        event.preventDefault();
        let data = [...fieldLists];
        data = fieldLists.splice(index, 1)
        setFieldLists(data);

        let data2 = rmEditedPart;
        data2 = rmEditedPart.rmList.splice(index, 1);
        setRmEditedPart(data2);
    }

    return (
        <div>
            <h1>Edit Third party BOM</h1>

            <form >
                <label htmlFor="partId">Choose a Part to edit BOM:</label> <br />
                <select name="partName" id="partId" onChange={(event) => setRmEditedPart(prevState => ({
                                                                                        ...prevState,
                                                                                        partId: event.target.value,
                                                                                    }))}>
                    <option value=""></option>
                    {
                        parts.map(part => <option key={part._id} value={part._id}>{part.material_name}</option>)
                    }
                </select>

                <br />
                <br />

                {
                    fieldLists.map((fieldList ,index) => {

                        return (
                            <div key={index}>
                                <label htmlFor="rmId">RM NAME</label>
                                <select name="rmId" id="rmId" value={fieldList.rmId} onChange={(event) => handleFormChange(event, index)}>
                                <option value=""></option>
                                    {
                                        parts.map(part =>  <option key={part._id} value={part._id}>{part.material_name}</option>)           
                                    }
                                </select>
                                <label htmlFor="rmQty" style={divStyle}>RM Quantity : </label>
                                <input type="number" name="rmQty" id="rmQty" value={fieldList.rmQty} onChange={(event) => handleFormChange(event, index)}/>
                                <button onClick={(event) => remove (event, index)}>Remove This RM</button>
                                <button onClick={addMore}>Add More RM in Recipe</button> <br />
                            </div>
                        )
                    })
                }
                

                <br />
                <br />
                <input onClick={formSubmit} type="submit" value="Submit"></input>
            </form>

            {/* Show the edited part */}
            {/* <div >
                <h2>Part Name = {rmEditedPart.partId}</h2>
                {
                    rmEditedPart.rmList.map((rm, index) => <li key={index}>{rm.rmId} Rmqty={rm.rmQty}</li>)
                }
            </div> */}

        </div>
    );
};

export default EditThirdPartyBom;