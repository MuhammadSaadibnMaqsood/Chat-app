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

    // Prevent sending request to self
    if (myId.toString() === recipientId) {
      return res
        .status(401)
        .json({ message: "You can't send request to yourself." });
    }

    const recipient = await User.findById(recipientId);

    if (!recipient) {
      return res.status(404).json({ message: "User not found." });
    }

    // Already friends?
    if (recipient.friends.includes(myId)) {
      return res
        .status(401)
        .json({ message: "You both are already friends." });
    }

    // Existing request check
    const existingReq = await FriendRequest.find({
      $or: [
        { sender: myId, recipient: recipientId },
        { sender: recipientId, recipient: myId },
      ],
    });

    if (existingReq.length > 0) {
      return res.status(400).json({
        message: "Friend request already exists between you and this user.",
      });
    }

    const friendReq = await FriendRequest.create({
      sender: myId,
      recipient: recipientId,
    });

    res.status(201).json(friendReq);
  } catch (error) {
    console.log("Error in sendFriendRequest controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
// ACCEPT REQS FUNCTION
export async function acceptFriendReq(req, res) {
  try {
    const { id: requestId } = req.params;

    const friendReq = await FriendRequest.findById(requestId);

    if (!friendReq) {
      return res.status(401).json({ message: "Friend request does not exist" });
    }

    if (friendReq.recipient.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "You are not authorized to accept this request" });
    }

    friendReq.status = "accepted";
    await friendReq.save();

    // Add each other to their friend list
    await User.findByIdAndUpdate(friendReq.sender, {
      $addToSet: { friends: friendReq.recipient },
    });
    await User.findByIdAndUpdate(friendReq.recipient, {
      $addToSet: { friends: friendReq.sender },
    });

    return res.status(200).json({ message: "Friend request accepted" });
  } catch (error) {
    console.log("Error in acceptFriendReq controller:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

//GET FIREND REQUESTS
export async function getFriendsRequest(req, res) {
  try {
    const incomingReq = await FriendRequest.find({
      recipient: req.user._id,
      status: "pending",
    }).populate(
      "sender",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    const acceptReq = await FriendRequest.find({
      sender: req.user._id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReq, acceptReq });
  } catch (error) {
    console.log("error in getFriendReq controller ", error);
    res.status(500).json({ message: "internal server error" });
  }
}

// GET OUTGOING FRIEND REQUESTS
export async function getOutgoingFriendReqs(req, res) {
  try {
    const outgoingReqs = await FriendRequest.find({
      sender: req.user._id,
      status: "pending",
    }).populate(
      "recipient",
      "fullName profilePic nativeLanguage learningLanguage"
    );

    res.status(200).json(outgoingReqs);
  } catch (error) {
    console.log("error in Outgoing req controller ", error);
    res.status(500).json({ message: "internal server error" });
  }
}
