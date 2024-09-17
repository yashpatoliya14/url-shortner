import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axiosInstance, {handleError} from '../utils'
function Home() {
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])
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
        <div className="bg-gray-100 lg:p-20 p-10 flex flex-col justify-center h-[90vh] sm:w-full">

            <h1 className='text-5xl text-center self-center text-slate-800 font-bold mb-16'>URL Encoder Online</h1>

            <div className='lg:px-20 flex flex-col justify-center gap-6'>
                <input
                    type="text"
                    name="redirectURL"
                    value={urlObject.redirectURL}
                    className='w-full border-2 h-40 text-xl font-semibold border-slate-400 rounded-xl p-4 mt-1 bg-transparent focus:outline-none focus:border-gray-800'
                    size={90}
                    onChange={change}
                    placeholder="Enter the URL to shorten"
                    disabled={loading} // Disable input when loading
                    id='url'
                />
                <button
                    onClick={handleUrl}
                    className='self-center bg-slate-900 text-white p-7 py-3 text-lg font-semibold rounded-lg'
                    disabled={!isValid} // Disable button when loading
                >
                    {loading ? "Generating..." : "Generate"}
                </button>
                {isValid ? <></> : <div class="invalid-feedback">
                    Please enter valid url.
                </div>}
                <div className="w-full border-2 h-40 text-xl font-semibold border-slate-400 rounded-xl p-4 mt-1 bg-transparent">
                <div className="col-auto">
                    {shortid && <h3>Short URL: <a href={`${domain}api/${shortid}`}>{`${domain}api/${shortid}`}</a></h3>}
                </div>
            </div>
            </div>
            

        </div>
    );
}

export default Home;
