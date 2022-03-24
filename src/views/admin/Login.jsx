import { useState, useEffect } from "react"
import adminLogin from "../../libs/api-requests/admins-requests";
import { useNavigate } from "react-router-dom";
import checkLoggedIn from "../../libs/sessions-utils";

const LoginForm = ({ onSubmitForm }) => {
    const [username, setUsername] = useState('');    
    const [password, setPassword] = useState('');    
    const [email, setEmail] = useState('');

    return(
        <form className="form" style={{width:'100%'}} onSubmit={e => onSubmitForm(e, username, password, email)}>
            <div className="form-group">
                <input 
                    type="text" 
                    placeholder="Username" 
                    className="form-control" 
                    onChange={e => setUsername(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <input 
                    type="email" 
                    placeholder="Email" 
                    className="form-control" 
                    onChange={e => setEmail(e.target.value)} 
                />
            </div>
            <div className="form-group">
                <input 
                    type="password" 
                    placeholder="Password" 
                    className="form-control" 
                    onChange={e => setPassword(e.target.value)} 
                />
            </div>
            <button className="btn btn-primary" type="submit" style={{width: '100%'}}>LOGIN</button>
        </form>
    )
}

function Login() {
    const navigate = useNavigate();

    const handleSubmit = async (e, username, password, email) => {
        e.preventDefault();
        const response = await adminLogin(username, password, email);

        if(response.id){
            localStorage.setItem('admin_key', response.admin_key)
            localStorage.setItem('username', response.username)
            navigate('/chipottle-admin/sales')
        }
    }

    useEffect(() => {
        if(checkLoggedIn()) navigate('/chipottle-admin/sales')
    }, []);

    return ( 
        <div className="container-sm mt-5">
            <div className="container" style={{width: 'clamp(280px, 60%, 500px)'}}>
                <h3 className="text-center mt-5">Chipottle admin</h3>
                <LoginForm onSubmitForm={handleSubmit}/>
            </div>
        </div>
    );
}

export default Login;