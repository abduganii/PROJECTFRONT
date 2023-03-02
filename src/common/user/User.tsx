import React, { useContext, useEffect, useState } from 'react'
import { AddCollectionByuser, DeleteCollectionByuser, GetItemsById, GetItemsByUser, UpdateCollectionByuser } from '../../shared/apis/authApi';
import { Avatar, Button, CardActionArea, CardHeader, SvgIcon, TextField } from '@mui/material';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardText, MDBCardBody, MDBCardImage, MDBBtn, MDBTypography } from 'mdb-react-ui-kit'

import { useNavigate, useParams } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import { useForm } from 'react-hook-form';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
interface Props {
  datas: any;
  collection: any;
  owner: any;
}

export default function User({ datas, collection, owner }: Props) {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [item, setItem] = useState(["null"])
  const [add, setAdd] = useState(false)
  const [update, setUpdate] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const [colactionId, setColactionId] = useState()
  useEffect(() => {
    const fetchItemUser = async (id: any) => {
      const data = await GetItemsByUser(id);
      setItem(data.Item);
      setIsLoading(false)
    }
    fetchItemUser(datas?._id)

  }, []);

  const fetchItem = async (id: any) => {
    const data = await GetItemsById(id);
    setItem(data.Item);
    setIsLoading(false)
  }





  const handleConlaction = async (data: any) => {
    await AddCollectionByuser({ ...data, userId: datas._id });
    alert("colaction successfully created.");
    setAdd(false)
  }

  const DeleteColoction = async (id: any) => {
    await DeleteCollectionByuser(id)
    alert("colaction successfully deletes.");
  }

  const updateConlaction = async (data: any) => {
    await UpdateCollectionByuser({ ...data }, colactionId);
    alert("colaction successfully update.");
    setUpdate(false)
  }




  useEffect(() => {

    console.log("component did mount or update");
    console.log(`isLoading = ${isLoading}`);
  }, [isLoading]);



  const navigate = useNavigate()

  return (

    <div className="gradient-custom-2" style={{ backgroundColor: 'rgba(0, 0, 0, 0.04)' }}>
      <MDBContainer className="py-5 h-100">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol lg="9" xl="7">
            <MDBCard>
              <div className="rounded-top text-white d-flex flex-row" style={{ backgroundColor: '#000', height: '200px' }}>
                <div className="ms-4 mt-5 d-flex flex-column" style={{ width: '150px' }}>
                  {false ? <CardHeader
                    avatar={
                      <Avatar style={{ width: '150px', height: '150px', zIndex: '1', fontSize: "100px", marginLeft: "-20px" }} aria-label="recipe">
                        {datas?.name[0]}
                      </Avatar>
                    }

                  /> :
                    <MDBCardImage src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp"
                      alt="Generic placeholder image" className="mt-4 mb-2 img-thumbnail" fluid style={{ width: '150px', zIndex: '1', borderRadius: "50%" }} />}

                  {owner == "true" || owner == true ? <MDBBtn outline color="dark" style={{ height: '36px', overflow: 'visible' }} onClick={() => navigate(routes.SETUSER)}>
                    Edit profile
                  </MDBBtn> : ""}
                </div>
                <div className="ms-3" style={{ marginTop: '130px' }}>
                  <MDBTypography tag="h5">{datas?.name} </MDBTypography>
                  <MDBCardText>{datas?.email}</MDBCardText>
                </div>
              </div>
              <div className="p-4 text-black" style={{ backgroundColor: '#f8f9fa' }}>

              </div>
              <MDBCardBody className="text-black p-4">
                <div className="mb-5">
                  <p className="lead fw-normal mb-1">collection</p>
                  <div className="p-4" style={{ backgroundColor: '#f8f9fa' }}>

                    {add ? <>
                      <form onSubmit={handleSubmit(handleConlaction)}>
                        <TextField
                          id="outlined-basic"
                          label="Outlined"
                          variant="outlined"
                          type="text"
                          {...register("name", {
                            required: true,

                          })}
                        />

                        <MDBBtn>Add</MDBBtn>
                      </form>
                    </> : update == false ? <>
                      <div style={{ backgroundColor: '#f8f9fa', display: "flex", flexWrap: "wrap" }}>
                        {
                          collection && collection.map((e: any) => (
                            <CardActionArea style={{ width: "240px", display: "flex", justifyContent: "space-between", marginRight: "10px" }}>
                              <MDBCardText onClick={() => {
                                setIsLoading(true)
                                fetchItem(e._id)

                              }} className="font-italic mb-1">{e?.name}</MDBCardText>

                              {
                                owner == "true" || owner == true ? <div>
                                  <SvgIcon component={UpdateIcon} inheritViewBox onClick={() => {
                                    setUpdate(true)
                                    setColactionId(e?._id)
                                  }} />
                                  <SvgIcon component={DeleteIcon} inheritViewBox onClick={() => DeleteColoction(e._id)} />
                                </div> : ""
                              }
                            </CardActionArea>
                          ))
                        }
                      </div>

                      <br />
                      {owner == "true" || owner == true ? <Button variant="contained" onClick={() => setAdd(true)} >Add</Button> : ""}

                      {collection?.length == 0 ? <h1>No collection</h1> : ""}

                    </> : <>
                      <form onSubmit={handleSubmit(updateConlaction)}>
                        <TextField
                          id="outlined-basic"
                          label="Outlined"
                          variant="outlined"
                          type="text"
                          {...register("name", {
                            required: true,
                          })}
                        />

                        <MDBBtn>Add</MDBBtn>
                      </form>
                    </>
                    }

                  </div>
                </div>
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <MDBCardText className="lead fw-normal mb-0">Recent photos</MDBCardText>
                  <MDBCardText className="mb-0"><a href="#!" className="text-muted">Show all</a></MDBCardText>
                </div>
                {
                  owner == true || owner == "true" ? <Button onClick={() => navigate(routes.ADDITEM + `/${datas._id}`)}>
                    <h2>  Add Item</h2>
                  </Button> : ""}

                <MDBRow>
                  {isLoading ? <span> loading...</span> : <>
                    {item && item?.map((e: any) => (
                      <CardActionArea className="w-50">
                        <MDBCol className="mb-2" onClick={() => navigate(routes.ONEITEM + `/${e?._id}`)}>
                          <img src={e?.img} width={200}
                            alt={e?.name} />
                        </MDBCol>
                      </CardActionArea>
                    ))}
                  </>}

                  {item?.length == 0 ? <h1>NO ITEMS</h1> : ""}
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div >
  )
}
