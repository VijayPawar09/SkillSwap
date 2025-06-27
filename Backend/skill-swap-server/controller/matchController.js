const User = require('../models/User');

exports.findMatches = async (req, res) => {
  try {
    const currentUser = await User.findById(req.user.id);

    const teachMatches = await User.find({
      learnSkills: { $in: currentUser.teachSkills },
      _id: { $ne: currentUser._id, $nin: currentUser.matches }
    }).select('name email teachSkills learnSkills');

    const learnMatches = await User.find({
      teachSkills: { $in: currentUser.learnSkills },
      _id: { $ne: currentUser._id, $nin: currentUser.matches }
    }).select('name email teachSkills learnSkills');

    // Merge and deduplicate
    const allMatches = [...teachMatches, ...learnMatches];
    const uniqueMatches = allMatches.filter(
      (match, index, self) =>
        index === self.findIndex(m => m._id.toString() === match._id.toString())
    );

    res.status(200).json(uniqueMatches);
  } catch (error) {
    console.error("❌ Error in findMatches:", error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


exports.connectWithMatch = async (req, res) => {
  try {
    const { matchId } = req.body;
    
    await User.findByIdAndUpdate(req.user.id, {
      $addToSet: { matches: matchId }
    });
    
    await User.findByIdAndUpdate(matchId, {
      $addToSet: { matches: req.user.id }
    });
    
    res.status(200).json({ message: 'Connected successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};