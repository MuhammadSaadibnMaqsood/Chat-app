import React from 'react'
import useFriend from '../hooks/useFriend'
import FriendCard from '../components/FriendCard';

const FriendsPage = () => {

    const {frineds} = useFriend();
  return (
    <div>
        {frineds.map((friend)(
            <div>
                <FriendCard  friend ={frineds}/>

            </div>
        ))}
    </div>
  )
}

export default FriendsPage