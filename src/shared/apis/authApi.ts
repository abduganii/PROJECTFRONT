import urls from "../constants/urls";

import axios from "../../axios";

export const Loginuser = (data: any) =>
    axios.post(urls.LOGIN, data);

export const RegisterUser = (data: any) =>
    axios.post(urls.REGISTOR, data)


export const GetItems = async () => {
    const response = await axios.get(urls.ITEMS);
    return response.data;
}

export const GetItemsone = async (id: any) => {
    const response = await axios.get(urls.ITEMSONE + `/${id}`,);
    return response.data;
}

export const GetTags = async () => {
    const response = await axios.get(urls.TAG);
    return response.data;
}

export const GetAllUsers = async (id: any) => {
    const response = await axios.get(urls.USERS + `/${id}`);
    return response.data;
}

export const GetItemsById = async (id: any) => {

    const response = await axios.get(urls.ITEMS + `/${id}`,);

    return response.data;
}
export const GetItemsByUser = async (id: any) => {

    const response = await axios.get(urls.ITEMSUSER + `/${id}`,);

    return response.data;
}


export const GetOneUser = async () => {
    const response = await axios.get(urls.USERONE,);
    return response.data;
}


export const GetUser = async (id: any) => {
    const response = await axios.get(urls.USER + `/${id}`,);
    return response.data;
}
export const GetUsers = async () => {
    const response = await axios.get(urls.USER);
    return response.data;
}

export const BlockUser = (id: any, data: any) => axios.put(urls.USERBLOCK + `/${id}`, data)
export const UserToAdmin = (id: any, data: any) => axios.put(urls.USERTOADMIN + `/${id}`, data)


export const DeleteUser = (id: any) => axios.delete(urls.USER + `/${id}`)



export const GetcollectionById = async (id: any) => {
    const response = await axios.get(urls.COLLECTIONBYID + `/${id}`,);
    return response.data;
}


export const GetcollectionByName = async (data: any) => {
    const response = await axios.post(urls.COLLECTIONBYNAME, data);
    return response.data;
}


export const AddCollectionByuser = (data: any) => axios.post(urls.COLLECTION, data)

export const UpdateCollectionByuser = (data: any, id: any) => axios.put(urls.COLLECTION + `/${id}`, data)

export const DeleteCollectionByuser = (id: any) => axios.delete(urls.COLLECTION + `/${id}`)

export const AddItemByUser = (data: any, id: any) => axios.post(urls.ITEMS + `/${id}`, data)

export const UpdateItem = (id: any, data: any) => axios.put(urls.ITEMS + `/${id}`, data)

export const DeleteItem = (id: any) => axios.delete(urls.ITEMS + `/${id}`)


export const SearchItem = async (data: any) => {
    const response = await axios.post(urls.SEARCHITEM, data);
    return response.data;
}



export const GetCommet = async (id: any) => {
    const response = await axios.get(urls.COMMENT + `/${id}`,);
    return response.data;
}
export const AddComment = (data: any) => axios.post(urls.COMMENT, data)