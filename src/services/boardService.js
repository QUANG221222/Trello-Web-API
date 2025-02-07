/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  try {
    //Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng model để xử lý lưu bản ghi newBoard vào trong Database
    const createBoard = await boardModel.createNew(newBoard)
    // console.log(createBoard)

    // Lấy bản ghi board sau khi gọi (tùy mục đích dự án mà có cần bước này hay không)
    const getNewBoard = await boardModel.findOneById(createBoard.insertedId)
    // console.log(getNewBoard)
    //Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án...vv
    //Bắn email, notification về cho admin khi có 1 cái board mới được tạo...vv

    //Trả kết quả về, trong Service luôn phải có return
    return getNewBoard
  } catch (error) {
    throw error
  }
}

export const boardService = {
  createNew
}
