export const getUser = async (req, res) => {
    let userID = req.params.id;
    if(!userID) userID = req.user.id;
    const user = await User.findById(userID);
    if (!user) throw new HttpException(404, "User not found");

    return res.status(200).json({
        user
    });
};