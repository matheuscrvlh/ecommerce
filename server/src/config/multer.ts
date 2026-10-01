import multer from 'multer'
import path from 'node:path'
import fs from 'node:fs'

export const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const baseDir = 'uploads/products'

        const uploadDir = path.join(import.meta.dirname, baseDir)
        fs.mkdirSync(uploadDir, {recursive: true})

        req.uploadDir = uploadDir
        cb(null, uploadDir)
    },

    filename: (req, file, cb) => {
        const filename = Date.now() + '-' + file.originalname

        cb(null, filename)
    }
})

export const upload = multer({ storage })