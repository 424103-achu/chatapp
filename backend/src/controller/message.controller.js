import { sendMessageService,getMessageService } from "../services/message.service.js";
import ApiError from "../utils/error.js";
export const sendMessage = async (req, res, next) => {
  try {
    const { conversationId, content } = req.body;
    
    const message = await sendMessageService(
      req.user.id,
      conversationId,
      content,
    );

    return res.status(201).json({
      success: true,
      message,
    });
  } catch (error) {
    next(error);
  }
};
export const getMessage=async(req,res,next)=>{
    try{
        const {conversationId}=req.params;
        const messages=await getMessageService(
            req.user.id,
            conversationId
        )
        return res.status(200).json({
            success:true,
            messages
        });
    }catch(error){
        next(error);
    }
}
