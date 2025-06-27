const User = require('../models/User');

exports.updateSkills = async (req, res) => {
  try {
    console.log('req.user:', req.user);
    console.log('req.body:', req.body);

    const { teachSkills, learnSkills } = req.body;

    if (!teachSkills || !learnSkills) {
      return res.status(400).json({ message: 'Missing skills data' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { teachSkills, learnSkills },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    console.log('Updated user:', user);
    res.status(200).json(user);
  } catch (error) {
    console.error('❌ Error in updateSkills:', error.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
};


exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};