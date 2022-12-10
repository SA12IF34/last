import {useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from './api/api';


const Home = ({articles, setArticles}) => {


  const navigator = useNavigate();

  useEffect(() => {

    async function getArticles() {
      const articlesResponse = await api.get('saifapis/articles/');
      const articlesData = await articlesResponse.data;
      setArticles(articlesData);
      
    }

    getArticles();

  }, [])
  


  return (
    <section className='Home'>
        <div>
          {articles.map(article => {
            
            return (
              <>
                <Link to={`/blog/read-${article.title}`}>
                  <div className='articles'>
                    <h2>{article.title}</h2><br />
                    <h4>By {article.author_name}</h4>
                  </div>
                </Link>
              </>
            )
          })}
        </div>
    </section>
  )
}

export default Home; 