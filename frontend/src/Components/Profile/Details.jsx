import React from 'react';
import { FaRegEnvelope, FaEllipsisV,FaFlag,FaCalendar,FaFontAwesomeFlag     } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Details({name,email,birthDate,country,friends,profilePic,postsCount}) {
   
    const user = {
        profilePic: "https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_108x108.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=9058c0c71a30a8f73b5b3cf331f5e04e98a929a8bc3f4a332a20cd7d78b2e3c0&X-Amz-SignedHeaders=host",
        name: "Edward Ford",
        username: "@edwardford",
        postsCount: 518,
        friendsCount: "22k",
        about: "Travel, Adventure & Lifestyle\nPhotographer & Digital Influencer\nNikon Ambassador\nLet's Work: user@mail.com",
        friends: [
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_44x44.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=08e77f365f1330e96c580010f9ee7cebf486d7047354ac03bd76480afe750de6&X-Amz-SignedHeaders=host"},
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_47.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=aa23c8439b7346ec0a5c6df7e30be69e52420d7fd286ae61660ccc424837da1c&X-Amz-SignedHeaders=host"},
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_48.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=5c34140ee138bc42800a546ed113d2497d18ea1733efc9b3058ae1939ee40179&X-Amz-SignedHeaders=host"},
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_49.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=a36b8a2c5f49c1b10673a891b61dbe4a510ade86c6de332c9b4530dc369e53db&X-Amz-SignedHeaders=host"},
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_50.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=9cb5a1e77fa541dc147873121aa592b3001c0d2b83075c938049ff4d9cc1393a&X-Amz-SignedHeaders=host"},
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_44x44.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=08e77f365f1330e96c580010f9ee7cebf486d7047354ac03bd76480afe750de6&X-Amz-SignedHeaders=host"},
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_47.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=aa23c8439b7346ec0a5c6df7e30be69e52420d7fd286ae61660ccc424837da1c&X-Amz-SignedHeaders=host"},
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_48.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=5c34140ee138bc42800a546ed113d2497d18ea1733efc9b3058ae1939ee40179&X-Amz-SignedHeaders=host"},
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_49.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=a36b8a2c5f49c1b10673a891b61dbe4a510ade86c6de332c9b4530dc369e53db&X-Amz-SignedHeaders=host"},
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_50.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=9cb5a1e77fa541dc147873121aa592b3001c0d2b83075c938049ff4d9cc1393a&X-Amz-SignedHeaders=host"},
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_44x44.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=08e77f365f1330e96c580010f9ee7cebf486d7047354ac03bd76480afe750de6&X-Amz-SignedHeaders=host"},
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_47.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=aa23c8439b7346ec0a5c6df7e30be69e52420d7fd286ae61660ccc424837da1c&X-Amz-SignedHeaders=host"},
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_48.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=5c34140ee138bc42800a546ed113d2497d18ea1733efc9b3058ae1939ee40179&X-Amz-SignedHeaders=host"},
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_49.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=a36b8a2c5f49c1b10673a891b61dbe4a510ade86c6de332c9b4530dc369e53db&X-Amz-SignedHeaders=host"},
        {image:"https://dhws-production.s3.ap-south-1.amazonaws.com/60d476bc92d3a3001575d2ee/60d47a1992d5640016253693/62fc8f61cebc110014aa83dd/appSource/images/img_avatar_50.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQODH4IWPZWQNPYGZ%2F20240918%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20240918T220741Z&X-Amz-Expires=25200&X-Amz-Signature=9cb5a1e77fa541dc147873121aa592b3001c0d2b83075c938049ff4d9cc1393a&X-Amz-SignedHeaders=host"}
   
        ]
    };
    const friendsCount =friends.length;

    return (
        <>
            <div className="w-96 bg-white rounded-3xl  overflow-hidden">
                {/* Profile Image */}
                <div className="flex justify-center pt-6">
                    <img
                        className="w-36 h-26 rounded-lg"
                        //need to changed later after fixing uploading
                        src={user.profilePic}
                        alt="Profile"
                    />
                </div>

                {/* Name and Username */}
                <div className="text-center mt-4">
                    <h2 className="text-xl font-bold">{name}</h2>
                    <p className="text-gray-500">{email}</p>
                </div>

                {/* Posts and Friends */}
                <div className="flex justify-center space-x-6 mt-4 text-sm text-gray-600">
                    <div className="text-center">
                        <div className="flex items-center space-x-1 cursor-pointer">
                            <span className="font-bold">{postsCount}</span>
                            <p>Posts</p>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center space-x-1 cursor-pointer">
                            <span className="font-bold">{friendsCount}</span>
                            <p>Friends</p>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-center space-x-4 mt-6">
                    <button className="bg-green-500 font-serif text-white text-l px-4 py-2 rounded-lg flex items-center">
                        <svg
                            className="w-4 h-4 mr-2"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                            />
                        </svg>
                        Friends
                    </button>
                    <Link to="/chat">
                        <button className="p-3">
                            <FaRegEnvelope size={26} />
                        </button>
                    </Link>
                    <Link to="/settings">
                    <button className="border-2 border-gray-200 p-4 rounded-lg">
                        <FaEllipsisV size={11.5} />
                    </button>
                    </Link>
                </div>

                {/* About Section */}
                <div className="text-left px-10 py-12">
                    <h3 className="text-sm font-semibold text-gray-700 font-serif">ABOUT</h3>
                    
                    {/* Flex container for the icon and country name */}
                    <div className="flex items-center">
                        <FaFlag size={18} className="mr-3" />
                        <p className="text-sm text-gray-600 mt-2 font-semibold">{country}</p>
                    </div>
                    <div className="flex items-center">
                        <FaCalendar size={18} className="mr-3" />
                        <p className="text-sm text-gray-600 mt-2 font-semibold">{birthDate.split("T")[0]}</p>
                    </div>
                </div>


                {/* Friends List */}
                <div className="px-10 py-4">
                    <h3 className="text-sm font-semibold text-gray-700 font-serif mb-4">Friends</h3>
                    <div className="flex space-x-2">
                        <div className="grid grid-cols-5 gap-4 ">
                            {friends.map((friend, index) => (
                                <img
                                    key={index}
                                    className="w-18 h-12 rounded-lg"
                                    src={friend.profilePic}
                                    alt={friend.name}
                                    title={friend.name}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
