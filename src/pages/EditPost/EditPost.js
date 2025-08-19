import styles from './EditPost.module.css';

import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../contexts/AuthContext';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocument } from '../../hooks/useFetchDocument';

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState(''); 
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState('');

  // Pre-populate the form with existing post data
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setImage(post.image);
      setBody(post.body);
      const textTags = setTags(post.tagsArray.join(', '));

      setTags(textTags);
    }
  }, [post]);
  const { updateDocument, response } = useUpdateDocument('posts');
  
  const navigate = useNavigate();
  
  const { user } = useAuthValue();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    // validate image URL
    try {
      new URL(image);
    } catch (error) {
      setFormError('A imagem precisa ser uma URL.');
    }

    // criar o array de tags
    const tagsArray = tags.split(',').map((tag) => tag.trim().toLowerCase());

    // checar todos os valores
    if(!title || !image || !body || !tags){
      setFormError('Por favor, preencha todos os campos!');
    }
    
    if(formError) return;

    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    };

    updateDocument(id, data);

    // redirecionar para a home page
    navigate('/dashboard');
    };

  return (
    <div className={styles.edit_post}>
        {
          post && (
            <>
            <h2>Editando post: {post.title}</h2>
        <p>Altere os dados do post como desejar</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="">
            <span>Título:</span>
            <input 
            type="text"
            name="title"
            required
            placeholder='Pense num bom título...'
            onChange={(e)=> setTitle(e.target.value)}
            value={title} />
          </label>
          <label htmlFor="">
            <span>Imagem:</span>
            <input 
            type="text"
            name="image"
            required
            placeholder='Insira uma imagem que representa  o seu post...'
            onChange={(e)=> setImage(e.target.value)}
            value={image} />
          </label>
          <p className={styles.preview_title}>Preview da imagem atual:</p>
          <img className={styles.image_preview} src={post.image} alt={post.title}/>
          <label htmlFor="">
            <span>Conteúdo:</span>
            <textarea
            name="body" 
            required
            placeholder='Insira o conteúdo do post'
            onChange={(e)=> setBody(e.target.value)}
            value={body}/>
          </label>
          <label htmlFor="">
            <span>Tags:</span>
            <input 
            type="text"
            name="tags"
            required
            placeholder='Insira as tags separadas por vírgula'
            onChange={(e)=> setTags(e.target.value)}
            value={tags} />
          </label>
        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && <button className="btn" disabled>Aguarde...</button>}
        {response.error && <p className={styles.error}>{response.error}</p>}
        {formError && <p className={styles.error}>{formError}</p>}
        </form>
            </>
          )

        }
    </div>
  )
}

export default EditPost