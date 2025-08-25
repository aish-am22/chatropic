import { generateScreenToken } from "../config/stream.js";

export const getScreenToken = async (req, res) => {
    try {
        const token = generateScreenToken(req.auth().userId);
        res.status(200).json({token})
    } catch (error) {
        console.log("Error generating stream token", error)
        res.status(500).json({
        message: "Error generating stream token"})
    }

}
    
