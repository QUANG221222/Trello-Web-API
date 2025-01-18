import { env } from '~/config/environment'
import { MongoClient, ServerApiVersion } from 'mongodb'

//Khởi tạo một đối tượng trelloDatabaseInstance ban đầu là null (vì chúng ta chưa connect)
let trelloDatabaseInstance = null

//Khởi tạo 1 đối tượng mongoClientInstance để connect tới MogoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  //Lưu ý: cái serverApi có từ phiên bản MongoDB 5.0.0 trở lên, có thể không cần dùng nó, còn nếu dùng nó là chúng ta chỉ định một cái stable API version của MongoDB
  //Đọc thêm ở đây: https://www.mongodb.com/docs/drivers/node/current/fundamentals/stable-api/
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

//Kết nối tới database
export const CONNECT_DB = async () => {
  //Gọi kết nói tới mongoDB Atlas với URI đã khai báo trong thân của mongoClientInstance
  await mongoClientInstance.connect()

  //Kết nối thành công thì lấy ra Database theo tên và được gán ngược nó vào lại vào biến trelloDatabaseInstance ở trên của chúng ta
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

//Đóng DB khi cần
export const CLOSE_DB = async () => {
  // console.log('code chay vao cho Close nay')
  await mongoClientInstance.close()
}

//Function GET_DB() (không async) này có nhiệm vụ export ra cái Trello Database sau khi đã connect thành công tới MongoDB để chúng ta sử dụng ở nhiều nơi khác nhau trong code.
//Lưu ý phải đảm bảo chỉ luôn gọi cái getDB này sau khi đã kết nối thành công tới MongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to MongoDB first')
  return trelloDatabaseInstance
}
