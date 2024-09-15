import { Link } from "react-router-dom"
export default function Contact(){
    return(
        <div className="container">
            <div className="row justify-content-center my-5">
                <div className="col-12 text-center my-5">
                    <span className="h4 rounded bg-info-subtle p-1">Yash C. Patoliya
                    </span>
                </div>
                <div className="col-12 h4 text-center">
                    <span className="text-dark me-1"><i class="bi bi-envelope-at-fill"></i></span> <span className="fw-bold">yashpatoliya14@gmail.com</span>
                    
                </div>
                <div className="col-12 h4 text-center">
                    <span className="text-dark me-1"><i class="bi bi-whatsapp"></i></span> <span className="fw-bold">+91 7043333359</span>
                    
                </div>
                <div className="col-12 h4 text-center">
                    <Link to='https://www.linkedin.com/in/yash-patoliya-b810632b4/' className="">
                        <span className="text-dark me-1"><i class="bi bi-linkedin"></i></span> <span className="fw-bold">Yash Patoliya</span>
                    </Link>
                </div>
            </div>
        </div>  

    )
}