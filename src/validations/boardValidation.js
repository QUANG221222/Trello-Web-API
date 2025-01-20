import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'

const createNew = async (req, res, next) => {
  /**
   * Note: Mặc định chúng ta không cần phải custom massage ở phía BE làm gì vì để cho FE validate và custom message phía FE cho đẹp
   * Backend chỉ cần validate đảm bảo dữ liệu: Chuẩn xác, và trả về message mặc định từ thư viện là được.
   * Quan trọng: việc Validate dữ liệu BẮT BUỘC phải có ở phía Back-end vì đây là điểm cuối để lưu trữ dữ liệu vào Database.
   * Và thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệu ở cả Back-end và Front-end.
   */
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (nhatquangdev)',
      'string.empty': 'Title is not allowed to be empty (nhatquangdev)',
      'string.min':
        'Title length must be at least 3 characters long (nhatquangdev)',
      'string.max':
        'Title length must be less than or equal to 5 characters long (nhatquangdev)',
      'string.trim':
        'Title must not have leading or trailing whitespace (nhatquangdev)'
    }),
    description: Joi.string().required().min(3).max(255).trim().strict()
  })
  try {
    //Method là post. Khi ta post dữ liệu lên thì phải nhận ở phía backend là req.body
    // console.log('req.body', req.body)
    //Chỉ định abortEarly: false để trường hợp có nhiều lỗi validation thì trả về tất cả lỗi
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    //Validate dữ liệu xong xuôi hợp lệ thì cho request đi tiếp sang controller
    next()
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: new Error(error).message
    })
  }
}

export const boardValidation = {
  createNew
}
