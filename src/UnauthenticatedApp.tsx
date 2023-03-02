import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './app/home/Home';
import { Login } from './common/auth/login';
import { Rsegistor } from './common/auth/registor';
import routes from './shared/constants/routes';



export const UnauthenticatedApp = () => {
    return <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path={routes.LOGIN} element={<Login />} />
            <Route path={routes.REGISTOR} element={< Rsegistor />} />
        </Routes>
    </>;
};


