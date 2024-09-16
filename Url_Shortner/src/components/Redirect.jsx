import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import axiosInstance from '../utils';

function Redirect() {
    const { shortid } = useParams();
    console.log(shortid);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOriginalUrl = async () => {
            try {
                const res = await axiosInstance.get(`/api/${shortid}`,);
                const { redirectURL,status} = res.data;
                if (status) {
                    window.location.href = redirectURL;
                }
            } catch (error) {
                console.error("Error fetching URL:", error);
                navigate('/404'); // Redirect to a 404 page if the URL is not found
            }
        };

        fetchOriginalUrl();
    }, [shortid, navigate]);

    return (
        <div>
            Redirecting...
        </div>
    );
}

export default Redirect;
