import './SignupSuccess.css';
import {Link} from 'react-router-dom';


function SignupSuccess() {

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="card mt-3 mb-3">
                        <h3 className="mt-2">Votre compte a été créé avec succès !</h3>
                        <p className="text-center">Vous pouvez maintenant vous <Link to="/">connecter</Link>.</p>
                    </div>
                </div>
            </div>
        </div>
    )    
}


export default SignupSuccess;
