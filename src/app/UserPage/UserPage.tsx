import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Header from '../../common/header/Header'
import User from '../../common/user/User';
import { GetcollectionById, GetOneUser } from '../../shared/apis/authApi';
import routes from '../../shared/constants/routes';
import GlobalContext from '../../shared/contexts/GlobalContext';
export default function UserPage() {
    const novigate = useNavigate()
    const { token, setToken } = useContext<any>(GlobalContext)
    const [users, setUser] = useState<any>();
    const [collection, setCollection] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchUser = async () => {
            const data = await GetOneUser();
            if (data.status == 400 && data.message == "Not authention") {
                setToken(false)
                novigate(routes.LOGIN)
            } else {
                setUser(data.user);
                setIsLoading(false);
            }
        }

        fetchUser()
            .then((err) => {
                console.log("err");
            })


        const fetchcollectionById = async () => {
            const { collection } = await GetcollectionById("userId");

            setCollection(collection);
            setIsLoading(false);
        }
        fetchcollectionById()
            .then(() => {
                console.log("component did mount");
            });

    }, []);

    useEffect(() => {
        console.log("component did mount or update");
        console.log(`isLoading = ${isLoading}`);
    }, [isLoading]);

    return (
        <>
            <Header />
            {isLoading
                ? <span>Loading...</span>
                : <User datas={users} collection={collection} owner={true} />
            }
        </>
    )
}
