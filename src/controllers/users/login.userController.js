const { Users } = require("../../models");
const { compareSync } = require("bcrypt");
const { createJWT } = require("../../middleware/jwt");

const service = async (req, res) => {
    try {
    const { email, password } = req.body;
        // find by email
    const user = await Users.findOne({
        where: {
            email,
        },
    });
    if (!user) {
        return res.status(404).json({
        msg: "email and password not match",
        });
    }
    // compare password
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({
        msg: "email and password not match",
        });
    }
    // create token
    const token = createJWT(user);

    // login success
    return res.json({
        msg: "login successfully",
        data: token,
    });
    } catch (error) {
        return res.status(500).json({
            msg: error.toString(),
        });
    }
};
module.exports = { service };