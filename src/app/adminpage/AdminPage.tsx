import React, { useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import Header from '../../common/header/Header'
import UsersList from '../../common/usersList/UsersList'
import routes from '../../shared/constants/routes'
import GlobalContext from '../../shared/contexts/GlobalContext'

export default function AdminPage() {

    const { isAdmin } = useContext<any>(GlobalContext)
    const navigate = useNavigate()

    return (
        <>
            <Header />
            {
                isAdmin == true || isAdmin == "true" ? <UsersList /> : <button onClick={() => navigate(routes.HOME)}> Go to Home page</button>
            }

        </>
    )
}
