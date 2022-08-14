import "./blog.css";

import {useParams} from "react-router-dom";
import {BlogObject, Blogs} from "../../api/model";
import {LegacyRef, useEffect, useRef, useState} from "react";
import Header from "../../components/Header/Header";
import Footer from "../../components/footer/Footer";

export default function Blog()
{
    const {id} = useParams();
    const rootRef = useRef<HTMLDivElement>();

    const [blog, setBlog] = useState<BlogObject>();

    useEffect(() =>
    {
        if(id)
            Blogs.get(id).then((blog) => setBlog(blog as BlogObject));
    }, []);

    useEffect(() =>
    {

        if(rootRef.current)
            rootRef.current.innerHTML = blog?.html || "Loading...";

    }, [blog, rootRef]);

    return (
        <>
            <Header/>
            <div ref={rootRef as LegacyRef<HTMLDivElement>} className="blog"/>
            <Footer/>
        </>);
}
