const express = require('express');
let router = express.Router();
const { checkLoggedIn } = require('../../middleware/auth');
const { Edit } = require('../../models/edit_model');

// save user edit data
router.route('/save')
    .get(checkLoggedIn, async (req, res) => {
        //使用user email 去 edits 找 userEmail 取得 edit data
        //将edit data 发回去client 更新 useFormik 
        let userEmail = res.locals.userData.email;
        const editData = await Edit.findOne({ userEmail });
        // console.log(editData);
        res.status(200).json(editData);
    })
    .post(checkLoggedIn, async (req, res) => {
        try {
            // find userEmail
            const editData = req.body.editData;
            // console.log(editData)
            const edit = await Edit.findOneAndUpdate(
                { userEmail: editData.userEmail },
                { "$set": {...editData} },
                { new: true }
            );
      

            if (!edit) return res.status(400).json({ error_messsage: 'save edit data error' });
            res.json({ editData });

        } catch (error) {
            // console.log('Post edit error');
            res.json({ warning: 'Save edit data error', error_message: error });
        }
    });

// update user image
router.route('/update_image')
    .get(checkLoggedIn, async (req, res) => {
        // get image url
        try {
            let userEmail = res.locals.userData.email;
            const editData = await Edit.findOne({ userEmail });
            // console.log(editData);
            res.status(200).json(editData);

        } catch (error) {
            console.log(error);
            res.status(400).json({ error });
        }
    })
    .post(checkLoggedIn, async (req, res) => {
        try {
            const imageUrl = req.body.image;
            const email = res.locals.userData.email;;
            // console.log({ imageUrl, email });
            const edit = await Edit.findOneAndUpdate(
                { userEmail: email },
                { "$set": { image: imageUrl } },
                { new: true }
            )
            // const edit = await Edit.updateOne(
            //     { userEmail: email },
            //     { "$set": { image: imageUrl } }
          
            // )
            res.status(200).json({ msg: 'Update image done' });
        } catch (error) {
            console.log('Update image error');
            res.json({ warning: 'Update image error', error_message: error });
        }
    })

// get user resume data
router.route('/resume_data')
    .post(async (req, res) => {
        try {
            const id = req.body.id;
            const data = await Edit.findById(id);
            res.json(data);
        } catch (error) {
            console.log('Get resume data error');
            res.json({ warning: 'Get resume data error', error_message: error });
        }

    })

module.exports = router;

