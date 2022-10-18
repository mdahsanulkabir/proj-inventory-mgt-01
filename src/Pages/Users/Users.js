import React from 'react';
import { useState, useEffect } from 'react';

const divstyle = {
    border : '1px solid red',
    borderRadius: '15px',
    backgroundColor: 'yellow',
    padding : '20px'
}

const Users = () => {
    const [users, setUsers] = useState([])
    useEffect(()=>{
        fetch(`http://localhost:5000/users`)
        .then(res => res.json())
        .then(data => setUsers(data));
    },[]);

    const updateUserInfo = (event, index, userId) => {
        event.preventDefault();
        console.log(index, 'number index clicked. and user id is', userId);
        let userAge ;
        let userAgeData = window.prompt("please enter age : ", "0");
        if (userAgeData == null || userAgeData === ""){
            console.log('user not have any age');
        } else {
            userAge = parseInt(userAgeData);
            let data;
            data = [...users];
            data[index].Age = userAge;
            console.log(data[index].Age);
            const updateUser = {userAge}
            // setUsers(users => ([
            //     // ...users,
            //     users[index].Age = userAge
                
            //     ])
            // )
            setUsers(data)
            console.log(users[index]._id);

            const url = `http://localhost:5000/users/${users[index]._id}`;
            fetch( url, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(updateUser)
                })
                .then(res => res.json())
                .then(data =>{
                console.log('succeed', data);
                alert('users updated successfully!!!');
                // event.target.reset();
                });
        }


    }

    console.log(users);
    return (
        <div>
            <h1>This is all user info. total user = {users.length}</h1>
            {
                users.map((user, index) => {
                    return (
                        <div style={divstyle} key={index}>
                            <h3>User ID = {user._id}</h3>
                            <h3>User Name = {user.name}</h3>
                            <h4>user inner id = {user.id}</h4>
                            <h4>User email = {user.email}</h4>
                            <h4>Phone = {user.phone}</h4>
                            <h4>Age = {user.Age}</h4> 
                            <button onClick={(event)=>updateUserInfo(event, index, user._id)}>Edit</button>
                        </div>

                    )
                })
            }
        </div>
    );
};

export default Users;