import { createConvoService,getConvoService } from "../services/convo.service.js";
export const createConvo = async (req, res, next) => {
  try {
    const { participantId } = req.body;

    const conversation = await createConvoService(
      req.user.id,
      participantId
    );

    return res.status(201).json({
      success: true,
      conversation,
    });
  } catch (error) {
    next(error);
  }
};
export const getConvo = async (req, res, next) => {
  try {
    const conversations = await getConvoService(req.user.id);

    return res.status(200).json({
      success: true,
      conversations,
    });
  } catch (error) {
    next(error);
  }
};