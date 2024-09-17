import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../utils";
import { useNavigate } from "react-router-dom";

function History() {
    const [urls,setUrls]=useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // To handle any error
    const [domain,setDomain]=useState('');
    const navigate = useNavigate();
    useEffect(()=>{
        if(!localStorage.getItem('token')){
            navigate('/login');
        }
    },[])
    useEffect(() => {
        const fetchUrls = async () => {
            try {
                setLoading(true);
                const res = await axiosInstance.get('/api/home'); // Fetch URLs from the API
                const {allurls,domain,status} = res.data;
                console.log(domain);
                
                if(status){
                    setDomain(domain);
                    setUrls(allurls); // Update context with fetched data
                }
            } catch (error) {
                console.error('Error fetching URLs:', error);
                setError('Failed to fetch URLs. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchUrls(); // Call the fetch function on component mount
    }, []); // Dependency array includes setUrls to prevent infinite loop

    return (
        <div className="flex flex-col ">
            <h1 className='lg:text-5xl text-3xl text-center self-center text-slate-800 font-bold lg:mb-16 mb-4 mt-5'>History</h1>
            <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div class="overflow-hidden">
                    <div className="flex flex-col gap-6">
                        {loading && <div className="flex justify-center">
                            <div className="col-auto">
                                <div className="spinner-border text-info" role="status">
                                    <span className="visually-hidden text-2xl text-slate-900">Loading...</span>
                                </div>
                            </div>
                        </div>} {/* Show loading state */}
                        {/* {error && <p className="text-red-800 text-center font-bold">{error}</p>} Show error message */}
                        <table className="min-w-full table-auto border-separate border-spacing-2 border-slate-500">
                            <thead>
                                <tr className="lg:text-2xl text-lg text-white border border-slate-600 bg-slate-600">
                                    <th className="px-5 py-2 border border-slate-600">Sr. no</th>
                                    <th className="px-5 border border-slate-600">Original URL</th>
                                    <th className="px-5 border border-slate-600">Short ID</th>
                                    <th className="px-5 border border-slate-600">Visit History</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                                {urls && urls.length > 0 ? (
                                    urls.map((url, index) => (
                                        <tr key={index} className="text-xl text-white border border-slate-600 bg-slate-100">
                                            <td className="p-4 text-center text-slate-900 ">{index + 1}</td>
                                            <td className="p-4 text-center text-slate-900 ">{url.redirectURL}</td>
                                            <td className="p-4 text-center text-slate-900 "><a href={`${domain}api/${url.shortId}`}>{`${domain}${url.shortId}`}</a></td>
                                            <td className="p-4 text-center text-slate-900 ">{url.visitHistory.length}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" align='center'>No URLs available</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default History;
