import style from './CreateArticle.module.css';
import globalStyle from '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function CreateArticle() {


    const [articleInputData, setArticleInputData] = useState('');
    const [file, setFile] = useState('');


    let picturePreview;
    if (file) {
        picturePreview = <img className = "picture" src={URL.createObjectURL(file)}/>
    
    }

    return (
        <div className = {[{style.container}, 'container']}>
        <form> 
            <div className="form-group mt-3">
                <label  htmlFor="content">Créer une publication</label>
                <textarea className="form-control mt-4" onInput={e => articleInputData(e.target.value)} id="content" rows="3" placeholder="Quoi de neuf?" required></textarea>
            </div>

            <div className="form-group mt-3">
                <input className="form-control-file" onChange={e => setFile(e.target.files[0])} aria-label="envoi image" accept="image/*" type="file" id="image"/>
            </div>

            <div className="preview_picture">
                {picturePreview}
            </div>

            <p> Veuillez écrire un contenu ou partager une image</p>
            
            <button className ="btn btn-primary mt-4 mb-4" >Partager</button>
        </form>
   </div>  
    );
}
 
export default CreateArticle; 

