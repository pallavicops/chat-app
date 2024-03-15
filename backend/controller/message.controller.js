import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"


export const sendMessage = async(req, res)=>{
try {
    const {message} = req.body;
    const {id:receiverId}=req.params;
    const senderId = req.user._id;

let conversation = await Conversation.findOne({
    participants:{$all:[senderId, receiverId]},

})
if(!conversation){
    conversation= await Conversation.create({
        participants:[senderId, receiverId],
    })
}

const newMessage = new Message({
    senderId,
    receiverId,
    message,
})
if(newMessage){
    conversation.messages.push(newMessage._id);
}

//SOCKET IO FuncTIONALITY WILL GO HERE

// This will save one by and like conversation saved in 1s then newMessagewill be saved in 2s.
// await conversation.save();
// await newMessage.save();

await Promise.all([conversation.save(),newMessage.save()])  //this will run parallel

res.status(201).json(newMessage);

} catch (error) {
    console.log("Error in sendMessage controller :",error.message)
    res.status(500).json({error:"Internal server reeor"});
    
}


     
};

export const getMessages = async (req, res) => {
	try {
		const { id: userToChatId } = req.params;
		const senderId = req.user._id;

		const conversation = await Conversation.findOne({
			participants: { $all: [senderId, userToChatId] },
		}).populate("messages"); // NOT REFERENCE BUT ACTUAL MESSAGES

		if (!conversation) return res.status(200).json([]);

		const messages = conversation.messages;

		res.status(200).json(messages);
	} catch (error) {
		console.log("Error in getMessages controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
	}
};