import axios from "axios";

export function getData(route, setData) {
    axios
        .get(`/${route}`)
        .then(response => {
            console.log(response.data);
            setData(response.data)
        })
        .catch(error => {
            console.log(error.message, "you are in getting movies/Tv shows catch");
        });
}