import { useState, useEffect } from "react";
import api from "../api/axios"


const useApi = (endpoint, options = {}, deps = []) => {
  const [data, setData] = useState(null);//backend bata data fetch data variable store hunxa 
  const [loading, setLoading] = useState(true);//back bata data frontend ma aunu agdi
  const [error, setError] = useState(null);//eg frontend error ayo vane  file error boundry .jsx


  useEffect(() => {//
    let mounted = true;
    setLoading(true);

    api(endpoint, options)
      .then((res) => {
        if (mounted) setData(res.data);
      })
      .catch((err) => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });


    return () => {
      mounted = false;
    };
  }, deps);


  return { data, loading, error };
};


export default useApi;
