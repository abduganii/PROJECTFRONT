import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../common/header/Header'
import User from '../../common/user/User';
import { GetcollectionById, GetUser } from '../../shared/apis/authApi';
import routes from '../../shared/constants/routes';
import GlobalContext from '../../shared/contexts/GlobalContext';
export default function OneUser() {

    const novigate = useNavigate()
    const [users, setUser] = useState<any>();
    const [collection, setCollection] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);
    const { setToken } = useContext<any>(GlobalContext)
    const { isAdmin } = useContext<any>(GlobalContext)
    const { id } = useParams()
    useEffect(() => {
        const fetchUser = async () => {
            const data = await GetUser(id);
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
            const { collection } = await GetcollectionById(id)

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

    console.log(Boolean(isAdmin))

    return (
        <>
            <Header />
            {isLoading
                ? <span>Loading...</span>
                : <User datas={users} collection={collection} owner={isAdmin} />
            }
        </>
    )
}
