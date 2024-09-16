import { Link } from 'react-router-dom'
export default function Footer() {
    return (
        <div className='bg-slate-900 p-20'>
            <footer className="flex flex-col gap-5 text-white">

                <div className="self-center text-2xl text-gray-300">
                    © 2024 Short Url - Tool to shorten a long link
                </div>
                <div className="flex md:flex-row flex-col md:gap-20 gap-4 justify-center my-7 text-xl">
                    <div className="col-2 text-center hover:border-b p-2">
                        <Link to='/home'>Short Url</Link>
                    </div>
                    <div className="col-2 text-center hover:border-b p-2">
                        <Link to='/history'>History</Link>
                    </div>
                    <div className="col-2 text-center hover:border-b p-2">
                        <Link to='/contact'>Contact</Link>
                    </div>
                </div>
            </footer>
        </div>

    )
}