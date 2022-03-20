const {Classes} = require("../../models");
const service = async (req, res) => {
    try {
        const requestDB = await Classes.destroy({
        where: {
            id: req.params.id,
            },
        });
        return res.json({
        msg: "Class deleted successfully",
        data: requestDB,
        });
    } catch (error) {
        return res.status(500).json({
        msg: error.toString(),
        });
        }
    };
    module.exports = { service };