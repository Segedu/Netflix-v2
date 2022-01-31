import { useState, useEffect } from "react";
import axios from "axios";

const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData()
        return () => {
            setData()
        }
    }, [url]);

    function getData() {
        setIsLoading(true)
        axios.get(url)
            .then(response => {
                setData(response.data);
                setIsLoading(false);
            }).catch(error => { setError(error) })
    }
    return [data, error, isLoading];
}

export default useFetch;