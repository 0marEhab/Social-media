import Post from "../../Components/SinglePost/Post";
import SinglePostSideBar from "../../Components/SinglePost/SinglePostSideBar";

export default function SinglePost() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-11 gap-10 bg-bg">
      <div className="col-span-11 md:col-span-8 lg:col-span-7 p-12 ">
        <Post />
      </div>
      <div className="col-span-11 md:col-span-8 lg:col-span-4 px-10">
        <SinglePostSideBar />
      </div>
    </div>
  );
}
