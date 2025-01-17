import { useState, useEffect } from 'react'
import './style/App.scss'

function UserList() {
    const [myData, setMyData] = useState<any>(null);

    useEffect(() => {
        fetch("http://localhost:3001/users/")
            .then(response => response.json())
            .then(data => setMyData(data));
    }, []);

        if (!myData) {
            return <div>Waiting</div>
        }
        return (
            <div>
                <h1>Users</h1>
                <div className ="UserList">
                {myData.results.map((user: any, index: number) =>
                    <div className="user" key={index}>
                        <img src={user.profileImageUrl} ></img>
                        <p>{user.name}</p>
                        <p>{user.email}</p>
                        <p>{user.username}</p>
                        <p>{user.id}</p>
                    </div>
                )}
            </div>
        </div>
        );
    }
export default UserList;



