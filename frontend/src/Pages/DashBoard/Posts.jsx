import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faPager} from "@fortawesome/free-solid-svg-icons";
import Loading from "../../Components/Layout/Loading";
import axios from "axios";
import summaryApi from '../../../common';
import PostCard from '../../Components/DashBoard/postCard';
import SideBar from '../../Components/DashBoard/SideBar';

function Posts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axios.get(
              summaryApi.posts.url,
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            );
            setPosts(response.data);
          } catch (error) {
            setError("Failed to fetch posts");
          } finally {
            setLoading(false);
          }
        };
    
        fetchPosts();
      }, []);
      console.log(posts)

      const content = posts.map(post=>(
        <PostCard post={post} key={post.id}/>
      ))
  return (
    <div className="min-h-screen bg-gray-100 p-10">
        <SideBar/>
        <h1 className="text-xl font-semibold mb-2">DashBoard</h1>
        <p className='text-l mb-6'>
            <FontAwesomeIcon icon={faPager}/> / posts
        </p>
        <div className="grid grid-cols-3 gap-6 ">
            {content}
        </div>

    </div>
  )
}

export default Posts