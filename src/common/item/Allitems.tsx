import { Avatar, CardHeader, Container, Divider, Grid, List, ListItem, ListItemAvatar, ListItemButton, ListItemText, Tab, Tabs } from '@mui/material';
import React, { useContext } from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

// import DeleteIcon from '@mui/icons-material/Clear';
// import EditIcon from '@mui/icons-material/Edit';
// import EyeIcon from '@mui/icons-material/RemoveRedEyeOutlined';
// import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import { Button, CardActionArea, CardActions } from '@mui/material';
import { Margin } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import routes from '../../shared/constants/routes';
import GlobalContext from '../../shared/contexts/GlobalContext';
import HeartBrokenSharp from '@mui/icons-material/HeartBrokenSharp';
import RemoveRedEye from '@mui/icons-material/RemoveRedEye';
interface Props {
    data: any;
    tag: any;
    users: any;
}

export default function Allitems({ data, tag, users }: Props) {
    const novigate = useNavigate()
    const { token } = useContext<any>(GlobalContext)


    return (
        <>

            <Container>
                <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
                    <Tab label="Новые" />
                    <Tab label="Популярные" />
                </Tabs>
                <Grid container spacing={4}>
                    <Grid xs={8} item>
                        {

                            data && data.map((e: any) => (
                                <Card sx={{ maxWidth: 850, marginBottom: "20px" }} onClick={() => {
                                    if (token) {
                                        novigate(routes.ONEITEM + `/${e._id}`)
                                    } else {
                                        console.log(novigate(routes.LOGIN))
                                    }


                                }}>
                                    <CardActionArea>
                                        <CardHeader
                                            avatar={
                                                <Avatar aria-label="recipe">
                                                    {e?.user.name[0]}
                                                </Avatar>
                                            }

                                            title={e?.user.name}
                                            subheader="September 14, 2016"
                                        />


                                        <CardMedia
                                            component="img"
                                            height="340"
                                            image={e?.img}
                                            alt="green iguana"
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                                {e?.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" style={{ marginBottom: "10px" }}>
                                                {e?.discription.slice(0, 50)}...
                                            </Typography>

                                            {e?.tag.map((name: any) => (
                                                <Typography variant="body2" color="text.secondary">
                                                    #{name}
                                                </Typography>

                                            ))}

                                            <RemoveRedEye>

                                            </RemoveRedEye>
                                            <span style={{ marginRight: "13px", marginLeft: "3px" }}>{e?.view}</span>

                                            <HeartBrokenSharp>
                                            </HeartBrokenSharp>
                                            <span style={{ marginRight: "13px", marginLeft: "3px" }}>{e?.like}</span>
                                        </CardContent>


                                    </CardActionArea>

                                </Card>
                            ))

                        }
                    </Grid>

                    <Grid xs={4} item>


                        <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <h5 style={{
                                color: "black", fontWeight: "700", margin: "20px"
                            }}>Users</h5>

                            {users.length && users.map((e: any) => (

                                <>
                                    <ListItem alignItems="flex-start">
                                        <ListItemButton onClick={() => {
                                            if (token) {
                                                novigate(routes.USER + `/${e._id}`)
                                            } else {
                                                novigate(routes.LOGIN)
                                            }


                                        }}>
                                            <ListItemAvatar>
                                                <Avatar alt={e?.name} src="/static/images/avatar/1.jpg" />
                                            </ListItemAvatar>
                                            {e?.isAdmin ? <ListItemText
                                                primary={e.name + " (admin)"}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{ display: 'inline' }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                        >
                                                        </Typography>
                                                        {e?.email}
                                                    </React.Fragment>
                                                }
                                            /> :
                                                <ListItemText
                                                    primary={e.name}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                            </Typography>
                                                            {e?.email}
                                                        </React.Fragment>
                                                    }
                                                />}
                                        </ListItemButton>
                                    </ListItem>
                                    <Divider variant="inset" component="li" />
                                </>

                            ))}

                        </List>
                        <List
                            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', marginTop: "20px" }}
                            aria-label="contacts"
                        >
                            <h5 style={{
                                color: "black", fontWeight: "700", margin: "20px"
                            }}>Tags</h5>
                            {
                                tag && tag?.map((e: string) => (
                                    < ListItem disablePadding>
                                        <ListItemButton>
                                            <ListItemText primary={"#" + e} onClick={() => console.log(e)} />
                                        </ListItemButton>
                                    </ListItem>

                                ))
                            }
                        </List>
                    </Grid>


                </Grid>
            </Container>
        </>


    )
}
