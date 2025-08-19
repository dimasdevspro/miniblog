import styles from './Dashboard.module.css';

import { Link } from 'react-router-dom';

import { useState } from 'react'; // já deve estar importado
// hooks
import { useAuthValue } from '../../contexts/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';
const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  const { documents: posts, loading, error } = useFetchDocuments('posts', null, uid);

  const [successMessage, setSuccessMessage] = useState("");
  const [deleteError, setDeleteError] = useState("");
  // Hook para deletar documentos
  const { deleteDocument, response } = useDeleteDocument("posts");

  {response.error && <p className="error">{response.error}</p>}

  return (
    <div className={styles.dashboard}>
      <h2>Dashboard</h2>
      <p>Gerencie os seus posts</p>

      {loading && <p>Carregando...</p>}
      {posts.length === 0 && !loading && (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn">
            Criar primeiro post
          </Link>
        </div>
      )}

      {posts.length > 0 && !loading && (
        <>
          <div className={styles.post_header}>
            <span>Título</span>
            <span>Ações</span>
          </div>

          {posts.map((post) => (
            <div key={post.id} className={styles.post_row}>
              <p>{post.title}</p>
              <div className={styles.actions}>
                <Link to={`/posts/${post.id}`} className="btn btn-outline">
                  Ver
                </Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btn-outline">
                  Editar
                </Link>
                <button
                  onClick={() => deleteDocument(post.id)}
                  className="btn btn-outline btn-danger"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
