import User from "../models/User.js";

export async function getRecommendedUsers(req, res) {
  try {
    const currentUser = req.user;

    const recommended = await User.find({
      $and: [
        { _id: { $ne: currentUser._id } },
        { _id: { $nin: currentUser.friends } },
        { isOnBoarded: true },
      ],
    }).select("-password");

    res.status(200).json(recommended);
  } catch (error) {
    console.log("error in recommending controller ", error);
    res.status(500).json({ message: "internal server error" });
  }
}
export async function getMyFriends(req, res) {
  try {
    const currentUser = req.user;

    console.log(currentUser._id);

    const user = await User.findById(currentUser._id)
      .select("friends")
      .populate(
        "friends",
        "fullName profilePic nativeLanguage learningLanguage"
      );

    res.status(200).json(user.friends);
  } catch (error) {
    console.log("error in myFriends controller ", error);
    res.status(500).json({ message: "internal server error" });
  }
}
export async function sendFriendRequest(req, res) {
    try {
        const myId = req.user._id;

        const {id:recipientId} = req.params

        //prevent to send req yourself
        if (myId === recipientId) {
            return res.status(401).json({message: 'You cant send request to yourself'});
        }

        const recipient = await User.find(recipientId);

        if (!recipient) {
            return res.status(404).json({message: 'User Not Existed'});
        }

        if (recipient.friends.includes(myId)) {
            return res.status(401).json({message: 'You Both are already friends'});
        }

    } catch (error) {
        
    }
}
