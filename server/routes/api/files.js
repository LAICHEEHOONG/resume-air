const express = require('express');
let router = express.Router();
const path = require('path');
const multer = require('multer')
const formidableMiddleware = require('express-formidable');
require('dotenv').config();


const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: 'duhukuukg',
    api_key: '546153873273874',
    api_secret: `${process.env.CN_API_SECRET}`
});

// cludinary resume air
router.route('/image_upload')
    .post(formidableMiddleware(), async (req, res) => {
        try {
            // req.files.file.path

            const upload = await cloudinary.uploader.upload(req.files.file.path, {
                public_id: `${Date.now()}`,
                folder: 'resume_air_image',
                gravity: 'face'
            });
            // console.log(upload);


            res.status(200).json({
                public_id: upload.public_id,
                url: upload.url
            })
        } catch (error) {
            res.status(400).json({ error });
        }
    })

// cloudinary 简单
router.route('/testupload')
    .post(formidableMiddleware(), async (req, res) => {
        try {
            // req.files.file.path

            const upload = await cloudinary.uploader.upload(req.files.file.path, {
                public_id: `${Date.now()}`,
                folder: 'test_uploads'
            });
            // console.log(upload);

            res.status(200).json({
                public_id: upload.public_id,
                url: upload.url
            })
        } catch (error) {
            res.status(400).json({ error });
        }
    })

// cloudinary 多功能
router.route('/testupload2')
    .post(formidableMiddleware(), async (req, res) => {
        try {
            // req.files.file.path

            const upload = await cloudinary.uploader.upload(req.files.file.path, {
                public_id: `${Date.now()}`,
                folder: 'test_uploads',
                aspect_ration: '1',
                radius: 'max',
                crop: 'thumb',
                gravity: 'face'
                // responsive_breakpoints: {
                //     create_derived: true,
                //     bytes_step: 20000,
                //     min_width: 200,
                //     max_width: 1000,
                //     //max_images: 5
                // }
            });

            res.status(200).json(upload);
        } catch (error) {
            res.status(400).json({ error });
        }
    })


// multer configs
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, file.originalname);
        //cb(null, Date.now() + path.extname(file.originalname)); //可以如此更换文件名字
    }


});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}

const upload = multer({ storage: storage, fileFilter: fileFilter })

router.route('/multerupload')
    .post(upload.single('file'), async (req, res) => {
        try {
            res.status(200).json({ msg: 'uploaded!!' });
        } catch (error) {
            res.status(400).json({ error });
        }
    })






module.exports = router;