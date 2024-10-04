import { useEffect, useState, useCallback } from 'react';

import './styles.css';

import { loadPosts } from '../../utils/loadPosts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';


export const Home = () => {
  
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postPerPage] = useState(6);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postPerPage >= allPosts.length;

  const filteredPosts = !!searchValue ? 
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          searchValue.toLowerCase()
        );
      })
      : posts;

      const handleLoadPosts = useCallback (async (page, postPerPage) => {
        const postAndPhotos = await loadPosts();
        
        setPosts(postAndPhotos.slice(page, postPerPage));
        setAllPosts(postAndPhotos);
      }, []);

      useEffect(() => {
        handleLoadPosts(0, postPerPage);
      }, [handleLoadPosts, postPerPage]);
    
      const loadMorePosts = () => {
        const nextPage = page + postPerPage;
        const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage)
        posts.push(...nextPosts)
    
        setPosts(posts);
        setPage(nextPage);
      }
    
      const handleChange = (e) => {
        const { value } = e.target;
        setSearchValue(value);
      }

  return (
    <section className='container'>
      <div className='search-container'>
        {!!searchValue && (
          <>
            <h1>Search Value: {searchValue}</h1>
          </>
        )}
        <TextInput 
          searchValue={searchValue} 
          handleChange={handleChange}
        />
      </div>


        {filteredPosts.length > 0 && (
          <Posts posts = {filteredPosts} />
        )}

        {filteredPosts.length === 0 && (
          <p>Não existem posts</p>
        )}
      <div className="button-container">
      {!searchValue && (
        <Button 
          text = "Load more posts"
          onClick = {loadMorePosts}
          disabled = {noMorePosts}
        />
      )}
      </div>
      
    </section>
    
  );
}
//export class Home2 extends Component {

  

  //async componentDidMount() {
   // await this.loadPosts();
  //}
//}
