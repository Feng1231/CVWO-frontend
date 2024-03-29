import { FC, useEffect, useState, useCallback } from "react";
import { CategoryPageProps, CategoryProps } from "../App.types";
import { useParams } from "react-router-dom";
import { Divider, Container } from "@mui/material";
import Header from "../components/Miscellaneous/Header";
import NonPinnedPost from "../components/Post/NonPinnedPost";
import PinnedPost from "../components/Post/PinnedPost";
import PrimarySearchAppBar from "../components/Forum/PrimarySearchAppBar";
import { fetchAllCategoryPosts } from "../components/Miscellaneous/apiRequests";
import NoPage from "./NoPage";

// display for each category created
const CategoryPage: FC<CategoryPageProps> = ( { user, handleLogout, handleModal } ) => {
    const [searchPost, setSearchPost] = useState('');
    let { category } = useParams();
    const [pinnedPosts, setPinnedPosts] = useState([]);
    const [categoryTopics, setCategoryTopics] = useState<CategoryProps[]>([]);
    const [loading, setLoading] = useState(true);

    const handleSearchPost = useCallback((search:string) => {
        setSearchPost(search.toLowerCase());
    },[setSearchPost]);

    const populatePinnedPosts = () => pinnedPosts.map(post => (
          <PinnedPost user={user} post={post} handleModal={handleModal}/>
      ));

    const populateCategoryPosts = () => categoryTopics.filter(categoryData => categoryData.name === category).map(categoryData => (
        <div key={categoryData.id}>
        <Divider />
        {categoryData.posts.filter(post => (post.title.toLowerCase().includes(searchPost) || searchPost==='') && !post.is_pinned).map(post => (
        
                <NonPinnedPost user={user} post={post} handleModal={handleModal}/>
            ))}
        </div>
    ));

    useEffect(() => {
        fetchAllCategoryPosts()
        .then(response => {
            if ('categories' in response && response.success) {
                setCategoryTopics(response.categories);
            }
            if ('pinned_posts' in response && response.success) {
                setPinnedPosts(response.pinned_posts);}
            if ('errors' in response && !response.success) handleModal(response.errors);
            setLoading(false);
        });
        
    }, [handleModal]);



    return loading ? <></> :!user.logged_in 
        ? (<NoPage statusCode={401} />)
        // if category in url does not exist, display no page
        : !categoryTopics.find(categoryData => categoryData.name === category)
            ? (<NoPage statusCode={404} />)
            : (<>
                <PrimarySearchAppBar user={user} categories={categoryTopics} handleLogout={handleLogout} handleModal={handleModal} handleSearchPost={handleSearchPost}/>
                <Container maxWidth='xl'>
                    <Header title={category}/>
                    <>{populatePinnedPosts()}</>
                    <>{populateCategoryPosts()}</>
                </Container>
            </>)
}

export default CategoryPage;