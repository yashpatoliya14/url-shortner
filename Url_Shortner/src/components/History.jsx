import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "../utils";

function History() {
    const [urls,setUrls]=useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); // To handle any error
    const [domain,setDomain]=useState('');
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
        <div className="row">
            <div className="col fs-4">
                {loading && <div className="row mt-5 justify-content-center">
                <div className="col-auto">
                <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
                </div>
            </div>} {/* Show loading state */}
                {error && <p className="text-danger">{error}</p>} {/* Show error message */}
                <table border={1} cellPadding={10} align='center'>
                    <thead>
                        <tr align='center'>
                            <th>Sr. no</th>
                            <th>Original URL</th>
                            <th>Short ID</th>
                            <th>Visit History</th>
                        </tr>
                    </thead>
                    <tbody>
                        {urls && urls.length > 0 ? (
                            urls.map((url, index) => (
                                <tr key={index} align='center'>
                                    <td>{index + 1}</td>
                                    <td>{url.redirectURL}</td>
                                    <td><a href={`${domain}api/${url.shortId}`}>{`${domain}${url.shortId}`}</a></td>
                                    <td>{url.visitHistory.length}</td>
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
    );
}

export default History;
