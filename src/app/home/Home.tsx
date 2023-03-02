import React, { useContext, useEffect, useState } from 'react'



import Header from '../../common/header/Header'
import Allitems from '../../common/item/Allitems';
import { GetAllUsers, GetItems, GetTags } from '../../shared/apis/authApi';
import GlobalContext from '../../shared/contexts/GlobalContext';

export default function Home() {
    const { items } = useContext<any>(GlobalContext)
    const [item, setItem] = useState([]);
    const [tag, setTag] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { userId } = useContext<any>(GlobalContext)
    console.log(items)
    useEffect(() => {
        const fetchItems = async () => {
            const { Item } = await GetItems();
            setItem(Item);
            setIsLoading(false);
        }
        const fetchTag = async () => {
            const tag = await GetTags()
            setTag(tag)
            setIsLoading(false);
        }
        const fetchUsers = async () => {
            const { user } = await GetAllUsers(userId)
            setUsers(user)
            setIsLoading(false);
        }

        fetchTag()
            .then(() => {
                console.log("component did mount");
            });
        fetchItems()
            .then(() => {
                console.log("component did mount");
            });
        fetchUsers()
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
                : <Allitems data={item} tag={tag} users={users} />
            }
        </>
    )
}
