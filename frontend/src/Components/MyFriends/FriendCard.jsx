import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck,faRemove } from '@fortawesome/free-solid-svg-icons';
import summaryApi from "../../../common/index";
import { handleDeleteFriend } from '../../Utils/friends';

export default function FriendCard({ friend, onRemoveFriend, isDeleteOptionVisible, onToggleDeleteOption }) {
  const handleDelete = async () => {
    await handleDeleteFriend(friend._id);
    onRemoveFriend(friend._id);
  };

  return (
    <div className="bg-white rounded-3xl p-5 flex flex-col justify-center items-center">
      <img
        src={friend._id ? `${summaryApi.domain.url}/${friend.profilePic}` : ""}
        alt={friend.name}
        className="w-16 h-16 rounded-2xl object-cover"
      />
      <h6 className="mt-3 font-bold text-gray-900">{friend.name}</h6>
      <p className="text-sm font-normal text-gray-500">{friend.email}</p>

      {!isDeleteOptionVisible ? (
        <button
          className="flex space-x-2 items-center mt-5 bg-[#53D769] px-3 py-1 rounded-lg text-white"
          onClick={onToggleDeleteOption}
        >
          <FontAwesomeIcon icon={faCheck} />
          Friends
        </button>
      ) : (
        <button
          className="flex space-x-2 items-center mt-5 bg-red-500 px-3 py-1 rounded-lg text-white"
          onClick={handleDelete}
        >
          <FontAwesomeIcon icon={faRemove} />
          Remove Friend
        </button>
      )}
    </div>
  );
}
