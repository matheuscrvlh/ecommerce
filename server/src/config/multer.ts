import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const baseDir = 'uploads/products'

        const uploadDir = path.join(__dirname, baseDir)
        fs.mkdirSync(upload, {recursive: true})

        req.uploadDir = uploadDir
        cb(null, uploadDir)
    },

    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + file.originalname

        cb(null, filename)
    }
})

const upload = multer({ })