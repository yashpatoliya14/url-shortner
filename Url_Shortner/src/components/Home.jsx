import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance, {handleError} from '../utils'
function Home() {
    const navigate = useNavigate();
    const [shortid, setShortid] = useState('');
    const [urlObject, setUrlObject] = useState({ redirectURL: '' });
    const [loading, setLoading] = useState(false);
    const [domain,setDomain]= useState(true);
    
    const [isValid,setIsValid]= useState(true);
    const change = (e) => {
        const { name, value } = e.target;
        const input =document.getElementById('url');
        
        if(value.includes('http:/') || value.includes('https:/')){
            setUrlObject({ ...urlObject, [name]: value });
            setIsValid(true);
            input.classList.remove('is-invalid');            
        }else
        {
            setIsValid(false);
            setUrlObject({ ...urlObject, [name]: value });
            input.classList.add('is-invalid');            
            
        }
    };

    

    const handleUrl = async (e) => {
        e.preventDefault();

        if (!urlObject.redirectURL.trim()) {
            handleError("Please enter a valid URL");
            return;
        }
        
        try {
            setLoading(true);
            const res = await axiosInstance.post('/api/url', urlObject);
            const {Id,domain,status} = res.data;
            if(status){
                setDomain(domain)
                setShortid(Id);
            }
            setUrlObject({ redirectURL: '' }); // Reset the input field after generation
        } catch (error) {
            console.error('Error generating URL:', error);
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className="container-fluid">
            
            <div className="row justify-content-center pt-5">
                <div className="col-auto">
                    <div className='input-group'>
                        <input
                            type="text"
                            name="redirectURL"
                            value={urlObject.redirectURL}
                            className='form-control border-3'
                            size={90}
                            onChange={change}
                            placeholder="Enter the URL to shorten"
                            disabled={loading} // Disable input when loading
                            id='url'
                        />
                        <button 
                            onClick={handleUrl} 
                            className='btn btn-success'
                            disabled={!isValid} // Disable button when loading
                            >
                            {loading ? "Generating..." : "Generate"}
                        </button>
                            {isValid?<></>:<div class="invalid-feedback">
    Please enter valid url.
  </div>}
                    </div>
                </div>
            </div>
            <div className="row justify-content-center p-5">
                <div className="col-auto">
                    {shortid && <h3>Short URL: <a href={`${domain}api/${shortid}`}>{`${domain}${shortid}`}</a></h3>}
                </div>
            </div>
            
        </div>
    );
}

export default Home;
