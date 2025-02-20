import multer, { diskStorage } from "multer"
import { dirname, extname, join } from 'path'
import { fileURLToPath } from "url"

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
const MIMETYPES = ["image/jpeg", "image/png", "image/jpg", "image/avif", "image/webp"]
const MAX_SIZE = 20000000

const multerConfig = (destinationPath)=> {
    return multer(
        {
            storage: diskStorage(
                {
                    destination: (req, file, cb)=> {
                        const fullPath = join(CURRENT_DIR, destinationPath)
                        console.log(fullPath)
                        req.file = fullPath
                        cb(null, fullPath)
                    },
                    filename: (req, file, cb)=> {
                        const fileExtension = extname(file.originalname)
                        const filename = file.originalname.split(fileExtension)[0]
                        cb(null, `${filename}-${Date.now()}${fileExtension}`)
                    }
                }
            ),
            fileFilter: (req, file, cb)=> {
                if(MIMETYPES.includes(file.mimetype)) cb(null, true)
                    else cb(new Error(`Only ${MIMETYPES.join(" ")} are allowed`))
            },
            limits: {
                fileSize: MAX_SIZE
            }
        }
    )
}

export const uploadProfilePicture = multerConfig('../uploads/img/user')