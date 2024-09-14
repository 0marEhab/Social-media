import Post from "../../Components/SinglePost/Post";
import SinglePostSideBar from "../../UI/singlePost/SinglePostSideBar";
export default function singlePost() {
  return (
    <div className="grid grid-cols-11 gap-10 bg-bg">
      <div className="col-span-7 p-12 ">
        <Post />
      </div>
      <div className="col-span-4 px-10">
        <SinglePostSideBar />
      </div>
    </div>
  );
}
