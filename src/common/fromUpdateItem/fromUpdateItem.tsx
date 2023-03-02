import { PhotoCamera } from '@mui/icons-material'
import { Autocomplete, Button, Card, CircularProgress, IconButton, Input, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { MDBBtn, MDBContainer, MDBInput } from 'mdb-react-ui-kit'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

import { UpdateItem } from '../../shared/apis/authApi'
import routes from '../../shared/constants/routes'


export default function FromUdateItem() {
    const navigate = useNavigate()
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [item, setItem] = useState<any>(JSON.parse(window.localStorage.getItem("data") || '{}') || {})

    const [name, setName] = useState<any>(item?.name)
    const [tag, setTag] = useState<any>(item?.tag)
    const [avtor, setAvtor] = useState<any>(item?.avtor)
    const [discription, setDiscription] = useState<any>(item?.discription)

    const HandleAddItem = async (data: any) => {
        const obj = { name: name, tag: tag[0], avtor: avtor, discription: discription }
        const newData = await UpdateItem(item._id, obj);
        if (newData.status == 500) {
            alert("you cant update");
        }
        if (newData?.data.status == 500) {
            alert("Item uncreated.");
        } else {
            alert("colaction successfully updates.");
            setName("")
            setTag("")
            setAvtor("")
            setDiscription("")
            window.localStorage.removeItem("data")
            navigate(routes.ONEITEM + `/${item._id}`)
        }
    }
    return (
        <>
            <MDBContainer className="py-5 h-100">
                <Box>
                    <Card variant="outlined" style={{ padding: "30px" }}>
                        hello
                        {item ? <form onSubmit={handleSubmit(HandleAddItem)}>
                            <img src={item?.img} width={200} alt="" />
                            <br />
                            <Input placeholder="Item Name" value={name} onChange={(e) => setName(e.target.value)} style={{ margin: "20px 0" }} required />
                            <br />
                            <Input placeholder="Tags" value={tag} onChange={(e) => setTag(e.target.value)} style={{ marginBottom: "20px" }} required /> <br />
                            <p style={{ margin: "0 20px 20px 0 " }} >{item?.collectio?.name}</p>

                            <Input placeholder="Avtor" value={avtor} onChange={(e) => setAvtor(e.target.value)} style={{ marginBottom: "20px" }} required /><br />
                            <TextField fullWidth label="discription" value={discription} onChange={(e) => setDiscription(e.target.value)} id="fullWidth" required />
                            <MDBBtn style={{ marginTop: "20px" }} >Add</MDBBtn>
                        </form> : ""}
                    </Card>
                </Box>
            </MDBContainer>
        </>
    )
}
