import User from "../models/User.js";
import FriendRequest from "../models/friendsRequest.js";

//GET RECOMMENDED FUNCTION
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
//GET MY FRIENDS FUNCTION
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
//SEND REQ FUNCTION
export async function sendFriendRequest(req, res) {
  try {
    const myId = req.user._id;

    const { id: recipientId } = req.params;

    //prevent to send req yourself
    if (myId === recipientId) {
      return res
        .status(401)
        .json({ message: "You cant send request to yourself" });
    }

    const recipient = await User.find(recipientId);

    if (!recipient) {
      return res.status(404).json({ message: "User Not Existed" });
    }

    //Check they are already friend or not ?

    if (recipient.friends.includes(myId)) {
      return res.status(401).json({ message: "You Both are already friends" });
    }

    // check the request is already sent or not ?

    const existingReq = FriendRequest.find({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipient, recipient: myId },
      ],
    });

    if (existingReq) {
      return res.status(400).json({
        message: "Friend req is already exist between you and this user.",
      });
    }

    const friendReq = FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendReq);
  } catch (error) {
    console.log("error in send req controller ", error);
    res.status(500).json({ message: "internal server error" });
  }
}
// ACCEPT REQS FUNCTION
export async function acceptFriendReq(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendReq = FriendRequest.findById(requestId);

    if (!friendReq) {
      res.status(401).json({ message: "Friend req does not exist" });
    }

    if (friendReq.recipient.toString() !== req.user.id) {
      res
        .status(401)
        .json({ message: "You are not aithorize to accept this req" });
    }

    friendReq.status = "accepted";
    await friendReq.save();

    //Add each other to their friend list

    await User.findByIdAndUpdate(friendReq.sender, {
      $addToset: { friends: friendReq.recipient },
    });
    await User.findByIdAndUpdate(friendReq.recipient, {
      $addToset: { friends: friendReq.sender },
    });

    res.status(200).json({ message: "Friend req accepted" });
  } catch (error) {
    console.log("error in accept req controller ", error);
    res.status(500).json({ message: "internal server error" });
  }
}
//GET FIREND REQUESTS
export async function getFriendsRequest(req, res) {
  try {
    const incomingReq = FriendRequest.findById({
      recipient: req.user,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptReq = FriendRequest.findById({
      sender: req.user,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReq, acceptReq });
  } catch (error) {
    console.log("error in getFriendReq controller ", error);
    res.status(500).json({ message: "internal server error" });
  }
}
// GET OUTGOING FRIEND REQUESTS
export async function getOutgoingFriendReqs(params) {
  try {
    const outgoingReqs = FriendRequest.findById({
      sender: req.user,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    resizeBy.status(200).json(outgoingReqs);
  } catch (error) {
    console.log("error in Outgoing req controller ", error);
    res.status(500).json({ message: "internal server error" });
  }
}
