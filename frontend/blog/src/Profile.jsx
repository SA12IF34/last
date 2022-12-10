import React, {useEffect, useState} from 'react';
import api from './api/api';



const Profile = () => {

    const [userData, setUserData] = useState({});
    const [userArticles, setUserArticles] = useState([]);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("auth"));

        async function getUserData() {
            const response = await api.get(`apis/users/${user.username}/`);
            const data = await response.data;
            setUserData(data);
        };

        async function getUserArticles () {
            const response = await api.get(`saifapis/created-articles/${user.username}/`);
            const data = await response.data;
            setUserArticles(data);
        };

        getUserData();
        getUserArticles();

    }, [])

  return (
    <section className='Profile'>
        <div className='UserData'>
            <h2>Hello {userData.username}</h2>
            <div>
                <h3>Username : {userData.username}</h3><br />
                <h3>Email : {userData.email}</h3>
            </div>
        </div>
        <div className='UserArticles'>
            <h2>Your Articles</h2>
            <div className='scroll'>
                {userArticles ? userArticles.map(a => {
                    return (
                        <>
                            <h3>{a.title}</h3>
                            <br />
                        </>
                    )
                }) : (
                    <>
                        <h1>you haven't created any article</h1>
                    </>
                )

                }
            </div>
        </div>
    </section>
  )
}

export default Profile;