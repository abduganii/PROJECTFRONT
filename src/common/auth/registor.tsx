import React, { useContext } from "react";
import GlobalContext from '../../shared/contexts/GlobalContext';
import { setCookie } from 'typescript-cookie'

import {
    MDBContainer, MDBTabs,
    MDBTabsItem,
    MDBTabsLink,
    MDBTabsContent,
    MDBTabsPane,
    MDBBtn,
    MDBIcon,
    MDBInput,
    MDBCheckbox
} from 'mdb-react-ui-kit';
import { useForm } from "react-hook-form";
import { RegisterUser } from "../../shared/apis/authApi";
import { Link, useNavigate } from "react-router-dom";
import routes from "../../shared/constants/routes";

export const Rsegistor = () => {
    const navigate = useNavigate()
    const { setToken } = useContext<any>(GlobalContext)
    const { setUserId } = useContext<any>(GlobalContext)
    const { setIsAdmin } = useContext<any>(GlobalContext)
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const justifyActive: string = 'tab2'
    const [status, setStatus] = React.useState<number | null>(0);
    const registorSubmit = async (data: any) => {
        try {
            const res = await RegisterUser({ ...data })
            console.log(res.data.status)
            if (res.data.status === 404 || res.data.status === 400) {
                setStatus(res.data.status)
            } else {
                setStatus(res.data.status)
                setCookie("token", res.data.token)
                setToken(res.data.token)
            }
            if (res.data.token) {
                setUserId(res.data.user._id)
                setIsAdmin(res.data.user.isAdmin)
                navigate('/')
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <>
            <MDBContainer className="p-3 my-5 d-flex flex-column w-50">


                <MDBTabs pills justify className='mb-3 d-flex flex-row justify-content-between'>
                    <MDBTabsItem>
                        <MDBTabsLink >
                            <Link to={routes.LOGIN}>Login</Link>
                        </MDBTabsLink>
                    </MDBTabsItem>
                    <MDBTabsItem>
                        <MDBTabsLink  >
                            <Link to={routes.REGISTOR}>Register</Link>
                        </MDBTabsLink>
                    </MDBTabsItem>
                </MDBTabs>
                <MDBTabsPane show={justifyActive === 'tab2'}>

                    <div className="text-center mb-3">
                        <p>Sign un with:</p>

                        <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='facebook-f' size="sm" />
                                <svg width={"30px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 333333 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M197917 62502h52080V0h-52080c-40201 0-72909 32709-72909 72909v31250H83337v62507h41659v166667h62506V166666h52080l10415-62506h-62496V72910c0-5648 4768-10415 10415-10415v6z" fill="#3b5998" /></svg>
                            </MDBBtn>



                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='google' size="sm" />
                                <svg width={"30px"} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 326667 333333" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"><path d="M326667 170370c0-13704-1112-23704-3518-34074H166667v61851h91851c-1851 15371-11851 38519-34074 54074l-311 2071 49476 38329 3428 342c31481-29074 49630-71852 49630-122593m0 0z" fill="#4285f4" /><path d="M166667 333333c44999 0 82776-14815 110370-40370l-52593-40742c-14074 9815-32963 16667-57777 16667-44074 0-81481-29073-94816-69258l-1954 166-51447 39815-673 1870c27407 54444 83704 91852 148890 91852z" fill="#34a853" /><path d="M71851 199630c-3518-10370-5555-21482-5555-32963 0-11482 2036-22593 5370-32963l-93-2209-52091-40455-1704 811C6482 114444 1 139814 1 166666s6482 52221 17777 74814l54074-41851m0 0z" fill="#fbbc04" /><path d="M166667 64444c31296 0 52406 13519 64444 24816l47037-45926C249260 16482 211666 1 166667 1 101481 1 45185 37408 17777 91852l53889 41853c13520-40185 50927-69260 95001-69260m0 0z" fill="#ea4335" /></svg>
                            </MDBBtn>

                            <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                                <MDBIcon fab icon='github' size="sm" />
                                <svg width={"30px"} xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 640 640"><path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z" /></svg>
                            </MDBBtn>
                        </div>

                        <p className="text-center mt-3">or:</p>
                    </div>
                    <form onSubmit={handleSubmit(registorSubmit)}>

                        <MDBInput wrapperClass='mb-4' label='Name' id='form1' type='text' {...register("name", {
                            required: true,
                            minLength: 3,
                            maxLength: 250,
                        })} onChange={() => setStatus(0)} />
                        <MDBInput wrapperClass='mb-4' label='Email' id='form1' type={"email"}   {...register("email", {
                            required: true,
                        })} onChange={() => setStatus(0)} />
                        <MDBInput wrapperClass='mb-4' label='Password' id='form1'
                            type='password'   {...register("password", {
                                required: true,
                                minLength: 5,
                                maxLength: 250,
                            })}
                            onChange={() => setStatus(0)}
                            minLength={6}
                        />

                        {status === 404 ? <p style={{ color: "red" }}> Email already authorized</p> : ""}
                        <MDBBtn className="mb-4 w-100" >Sign up</MDBBtn>
                    </form>
                </MDBTabsPane>
            </MDBContainer>
        </>
    )
}




