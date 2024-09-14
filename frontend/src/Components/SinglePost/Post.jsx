import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiShareForwardFill } from "react-icons/ri";
import { AiOutlineHeart } from "react-icons/ai";
import { BiComment } from "react-icons/bi";
export default function Post() {
  var post = {
    user: {
      username: "Omar Ehab",
      img: "https://randomuser.me/api/portraits/men/5.jpg",
    },
    time: "5min ago",
    img: "https://picsum.photos/650/350",
    title:
      "The Best Fashion Instagrams of the Week: Céline Dion, Lizzo, and More",
    content:
      "f you are looking for a break from the cold, take a cue from Lizzo: This week, the singer headed to Disneyland in warm and sunny California. She dressed up for the occasion in pure Minnie Mouse style perfection, including a cartoon merch sweatshirt from the artist Shelby Swain, cycling shorts, and adorable pulled-up polka dot socks. All the way over in Montreal, Céline Dion also had quite the wardrobe moment. For a concert, the singer wore a pair of fringed, XXL-flared cowboy jeans by Ukrainian label Ksenia Schnaider. The Kiev-based designer is responsible for other viral denim creations, like her asymmetrical jeans that launched earlier this year. Fun fact: The daring Dion has worn a pair of those, too!Of course, back in New York, there was Marc Jacobs. The designer has been having quite the year when it comes to flexing his fashion muscles on the ’gram. This week, he channeled The Wizard Of Oz with a full-green look that included some shimmery Sies Marjan pants, and a pair of platform boots to anchor the ensemble.",
    likes: 326,
    comments: 148,
  };
  return (
    <div className="flex flex-col justify-start items-start">
      <di className="text-secondary opacity-65 bg-gray-200 w-24 h-14 rounded-xl flex justify-center items-center gap-3 mb-10 ">
        &lt;
        <button className="text-xl ">Back</button>
      </di>
      <div className="flex justify-between items-center w-full mb-10">
        <div className="flex items-center gap-3">
          <img src={post.user.img} className="w-16 h-16 rounded-xl"></img>
          <div>
            <p>{post.user.username}</p>
            <p className="opacity-50">{post.time}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <AiOutlineHeart className="cursor-pointer" />
          <p>{post.likes}</p>
          <BiComment className="cursor-pointer" />
          <p>{post.comments}</p>
          <RiShareForwardFill className="cursor-pointer" /> share
          <BiDotsVerticalRounded className="text-3xl cursor-pointer" />
        </div>
      </div>
      <div className=" m-auto ">
        <img src={post.img} className="w-full rounded-2xl"></img>
      </div>
      <div className="p-10">
        <p className="text-4xl font-bold mb-6">{post.title}</p>
        <p>{post.content}</p>
      </div>
    </div>
  );
}
