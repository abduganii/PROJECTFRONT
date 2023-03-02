import { PhotoCamera } from '@mui/icons-material'
import { Autocomplete, Button, Card, CircularProgress, IconButton, Input, TextField } from '@mui/material'
import { Box } from '@mui/system'
import { MDBBtn, MDBContainer } from 'mdb-react-ui-kit'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { AddItemByUser, GetcollectionById, GetcollectionByName } from '../../shared/apis/authApi'
import routes from '../../shared/constants/routes'
import GlobalContext from '../../shared/contexts/GlobalContext'


export default function FromItem() {
    const navigate = useNavigate()
    const [username, setUsername] = useState<any>()
    const [recipientId, setRecipientId] = useState<any>()
    const [collection, setCollection] = useState<any>();
    const [status, setStatus] = useState<any>()
    const [loading, setLoading] = useState<any>()
    const [imgUrl, setImgurl] = useState<any>(null)
    const { register, handleSubmit, control, formState: { errors } } = useForm();


    const { id } = useParams()
    const FeetchcollectionByName = async (name: any) => {
        const { collection } = await GetcollectionByName({ name: name });

        setCollection(collection);

    }

    const HandleAddItem = async (data: any) => {

        const obj = { ...data, collectionId: recipientId, img: imgUrl }

        const newData = await AddItemByUser({ ...obj }, id);
        if (newData?.data.status == 500) {
            alert("colaction uncreated.");
            setStatus(newData?.data.status)
        } else {
            alert("colaction successfully created.");
            setStatus(0)
            navigate(routes.HOME)
        }
    }

    const handleFileSelected = async (e: any) => {
        setLoading(true)
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        const res = await fetch("https://malter.onrender.com/upload", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());

        setLoading(false)
        setImgurl("https://malter.onrender.com" + res.url)

    }

    return (
        <>
            <MDBContainer className="py-5 h-100">
                <Box>
                    <Card variant="outlined" style={{ padding: "30px" }}>


                        <Button variant="contained" component="label" >
                            upload img
                            <input hidden accept="image/*" multiple type="file" onChange={handleFileSelected} />
                        </Button>
                        {loading ? <CircularProgress /> : ""}
                        {loading == false ? <img src={imgUrl} width={200} alt="" /> : ""}
                        <form onSubmit={handleSubmit(HandleAddItem)}>
                            <br />
                            <Input placeholder="Item Name" style={{ margin: "20px 0" }}{...register("name", {
                                required: true,
                            })} />
                            <br />
                            <Input placeholder="Tags" style={{ marginBottom: "20px" }} {...register("tag", {
                                required: true,
                            })} /> <br />
                            <Input placeholder="Colaction" value={username} onChange={(e) => {
                                setStatus(0)
                                setUsername(e.target.value)
                            }} onKeyUp={(e: any) => FeetchcollectionByName(e.target.value)} style={{ marginBottom: "20px" }} /><br />

                            {status === 500 || status === 404 ? <p style={{ "color": "red" }}> collection not found</p> : ""}
                            {collection?.map((e: any) => (
                                <div key={e?.id} className='dropListdaws'>
                                    <p onClick={() => {
                                        setRecipientId(e?._id)
                                        setUsername(e?.name)
                                    }}>{e?.name}</p>
                                </div>
                            ))}

                            <Input placeholder="Avtor" style={{ marginBottom: "20px" }}  {...register("avtor", {
                                required: true,

                            })} /><br />
                            <TextField fullWidth label="discription" id="fullWidth" {...register("discription", {
                                required: true,

                            })} />
                            <MDBBtn style={{ marginTop: "20px" }} >Add</MDBBtn>
                        </form>
                    </Card>
                </Box>
            </MDBContainer>
        </>
    )
}
