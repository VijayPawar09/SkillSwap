const Message = require('../models/Message');

exports.saveMessage = async (req, res) => {
  try {
    const { roomId, sender, content } = req.body;

    if (!roomId || !sender || !content) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newMessage = new Message({ roomId, sender, content });
    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in saveMessage:", error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { roomId } = req.params;

    const messages = await Message.find({ roomId })
      .sort('createdAt')
      .populate('sender', 'name');

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessages:", error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};
