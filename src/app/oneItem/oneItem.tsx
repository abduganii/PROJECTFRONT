import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Header from '../../common/header/Header'
import Oneitem from '../../common/item/oneitem'
import { GetItemsone } from '../../shared/apis/authApi'
import routes from '../../shared/constants/routes'
import GlobalContext from '../../shared/contexts/GlobalContext'

export default function OneItem() {
    const { token, setToken } = useContext<any>(GlobalContext)

    const novigate = useNavigate()
    const { id }: any = useParams<string>()
    const [item, setItem] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const fetchItem = async () => {
            const data = await GetItemsone(id);
            if (data.status == 400 && data.message == "Not authention") {
                setToken(false);
                novigate(routes.LOGIN);
            } else {
                setItem(data);
                setIsLoading(false);
            }
        }

        fetchItem()
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
                : <Oneitem data={item} />
            }

        </>
    )
}
