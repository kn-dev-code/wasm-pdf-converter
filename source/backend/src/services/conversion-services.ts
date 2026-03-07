import ConversionModel from "../models/conversion-model";
import UserModel from "../models/user-model";
import { ForbiddenException, InternalServerException, NotFoundException} from "../utils/app-error";



export const createConversionService = async (data: any, user: any) => {
  const fileNum = await ConversionModel.countDocuments({ userId: user._id });

  const limit = user.planType === 'pro' ? 500 : 50;

  if (fileNum >= limit) {
    throw new ForbiddenException(`Limit reached for ${user.planType} plan.`);
  }

  return await ConversionModel.create({
    ...data,
    userId: user._id,
  });
};