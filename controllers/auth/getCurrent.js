const getCurrent = async (req, res) => {
    const { email, role, name, avatarURL, _id } = req.user;
    res.json({
        _id,
        name,
        email,
        role,
        avatarURL
    })
};

module.exports = getCurrent;