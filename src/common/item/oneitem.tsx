import { Avatar, Card, CardActionArea, CardContent, CardHeader, CardMedia, IconButton, Button, SvgIcon, TextField, Typography } from '@mui/material'
import { Container } from '@mui/system';
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import UpdateIcon from '@mui/icons-material/Update';
import GlobalContext from '../../shared/contexts/GlobalContext';
import { AddComment, DeleteItem, GetCommet } from '../../shared/apis/authApi';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import SendIcon from '@mui/icons-material/Send';
import Message from '@mui/icons-material/Message';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
import HeartBrokenSharp from '@mui/icons-material/HeartBrokenSharp';


interface Props {
    data: any;

}
export default function Oneitem({ data }: Props) {
    const { userId } = useContext<any>(GlobalContext)
    const { isAdmin } = useContext<any>(GlobalContext)
    const navigate = useNavigate()
    const [comment, setComment] = useState([])
    const [text, setText] = useState("")
    useEffect(() => {
        const fetchComment = async () => {
            const { Commentes } = await GetCommet(data._id);
            setComment(Commentes);
            console.log(Commentes)
        }
        fetchComment()


    }, []);



    return (
        <Container>
            <Card sx={{ maxWidth: 1200, marginTop: "20px" }} >
                <CardActionArea style={{ display: "flex", justifyContent: "space-between" }} >
                    <CardHeader onClick={() => {
                        navigate(routes.USER + "/" + data.user._id)
                    }}
                        avatar={
                            <Avatar aria-label="recipe">
                                {data?.user.name[0]}
                            </Avatar>
                        }

                        title={data?.user.name}
                        subheader="September 14, 2016"
                    />
                    {
                        data.user._id == userId || isAdmin == "true" ? <div style={{ display: "flex" }}>
                            <CardActionArea>
                                <SvgIcon style={{ margin: "0 20px" }} component={UpdateIcon} inheritViewBox onClick={() => {
                                    navigate(routes.UPDATEITEM + `/${data._id}`)
                                    window.localStorage.setItem("data", JSON.stringify(data))
                                }
                                } />
                            </CardActionArea>
                            <CardActionArea>

                                <SvgIcon style={{ margin: "0 20px" }} component={DeleteIcon} inheritViewBox onClick={() => {
                                    DeleteItem(data._id)
                                    alert("item Deleted")
                                    navigate(routes.HOME)
                                }} />
                            </CardActionArea>
                        </div> : ""
                    }
                </CardActionArea>
                <CardMedia
                    component="img"
                    height="340"
                    image={data?.img}
                    alt="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div" style={{ marginBottom: "0px" }}>
                        {data?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginBottom: "5px" }} >
                        {data?.collectio?.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" style={{ marginBottom: "10px" }}>
                        {data?.discription}
                    </Typography>

                    {data && data?.tag?.map((name: any) => (
                        <Typography variant="body2" color="text.secondary">
                            #{name}
                        </Typography>

                    ))}


                    <RemoveRedEye>

                    </RemoveRedEye>
                    <span style={{ marginRight: "13px", marginLeft: "3px" }}>{data?.view}</span>

                    <HeartBrokenSharp>
                    </HeartBrokenSharp>
                    <span style={{ marginRight: "13px", marginLeft: "3px" }}>{data?.like}</span>
                    <Message>
                    </Message>
                    <span style={{ marginRight: "13px", marginLeft: "3px" }}>{comment?.length}</span>

                </CardContent>
            </Card>
            <React.Fragment>
                <CssBaseline />
                <Paper square sx={{ pb: '50px' }}>
                    <List sx={{ mb: 2 }}>
                        {comment.length && comment.map((e: any) => (
                            <React.Fragment key={e?._id}>
                                <ListItem button>
                                    <ListItemAvatar>
                                        <Avatar aria-label="recipe">
                                            {e?.user.name[0]}
                                        </Avatar>

                                    </ListItemAvatar>
                                    <ListItemText primary={e?.user.name} secondary={e?.text} />
                                </ListItem>
                            </React.Fragment>
                        ))}
                        ...........................................................................
                    </List>

                    <TextField id="outlined-basic" label="Outlined" variant="outlined" value={text} onChange={(e) => setText(e?.target.value)} />
                    <Button variant="contained" onClick={() => {
                        AddComment({ itemId: data?._id, text: text })
                        alert("messege sended")
                    }} endIcon={<SendIcon />}>
                        Send
                    </Button>
                </Paper>

            </React.Fragment>
        </ Container >
    )
}
