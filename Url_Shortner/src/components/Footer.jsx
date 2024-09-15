import { Link } from 'react-router-dom'
export default function Footer() {
    return (
        <>
            <div className='container p-5 m-5'>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
            </div>
            <div className='container p-5 m-5'>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
            </div>
            <div className='container p-5 m-5'>
                &nbsp;
                &nbsp;
                &nbsp;
                &nbsp;
            </div>
            <footer className="bg-dark text-light text-center  p-lg-5 p-md-3 p-2 ">

                <div className="container">
                    © 2024 Short Url - Tool to shorten a long link
                </div>
                <div className="container pt-3">
                    <div className="row justify-content-center">
                        <div className="col-2 text-center">
                            <Link to='/home'>Short Url</Link>
                        </div>
                        <div className="col-2 text-center">
                            <Link to='/history'>History</Link>
                        </div>
                        <div className="col-2 text-center">
                            <Link to='/contact'>Contact</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>

    )
}