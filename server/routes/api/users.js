const express = require('express');
let router = express.Router();
const { getUserPropsServer } = require('../../utils/tool');

const { User } = require('../../models/user_model');
const { Edit } = require('../../models/edit_model');
const { checkLoggedIn } = require('../../middleware/auth');
require('dotenv').config();


//register and signin google user
router.route('/google_oauth')
    .post(async (req, res) => {
        try {
            // 检查数据库有没有这个email？
            const googleEmail = req.body.googleUser.email;
            // console.log(req.body.googleUser)
            if (await User.emailTaken(googleEmail)) {
                // 帐号已经存在
                const user = await User.findOne({ email: googleEmail });
                const userDoc = getUserProps(user);
                const token = user.generateToken();
                res.cookie('resume-air-token', token).status(200).send(userDoc);
                return;
            } else {
                // 帐号并不存在
                const user = new User({
                    ...getUserProps(req.body.googleUser),
                    password: `${req.body.googleUser.email}${process.env.DB_SECRET}`
                });
                const editUser = new Edit({ userEmail: googleEmail });
                await user.save();
                await editUser.save();

                const newUser = await User.findOne({ email: req.body.googleUser.email });
                const token = newUser.generateToken();
                const userDoc = getUserProps(newUser);
                res.cookie('resume-air-token', token).status(200).send(userDoc);
                return;
            }
            // 如果有send token back to frontend
            // 如果没有, 注册新账号,send token back to frontend

        } catch (error) {
            console.log(error);
            res.json({ warning: 'google oauth error', error_message: error });
        }
    })

router.route('/web_oauth/register')
    .post(async (req, res) => {
        try {
            const userData = req.body.userData;
            // console.log(userData)
            const email = userData.email;
            const password = userData.password;
            if (await User.emailTaken(email)) {
                // 帐号已经存在
     
                res.json({ message: '帐号已经存在', signUp: false });

                return;
            } else {
                // 帐号并不存在
        
                const user = new User({
                    ...userData,
                    _id: email,
                    password: password
                });
                const editUser = new Edit({ userEmail: email });
                await user.save();
                await editUser.save();
                const newUser = await User.findOne({ email: email });
                const token = newUser.generateToken();
                const userDoc = newUser;
                res.cookie('resume-air-token', token)
                    .status(200)
                    .json({ message: '帐号并不存在', signUp: true, user: getUserPropsServer(userDoc) });
                // res.json({ message: '帐号并不存在,  注册成功' });
                return;
            }

        } catch (error) {
            console.log(error);
            res.json({ warning: 'web oauth sign up error', error_message: error });
        }
    })

router.route('/web_oauth/login')
    .post(async (req, res) => {
        try {
            const userData = req.body.userData;
            // console.log(userData)
            const email = userData.email;
            const password = userData.password;
            if (await User.emailTaken(email)) {
                // 帐号已经存在
                // console.log('帐号已经存在');
                const user = await User.findOne({ email: email });
                const compare = await user.comparePassword(password);

                if (!compare) return res.status(400).json({ message: '密码错误', signUp: false });

                const userDoc = user;
                const token = user.generateToken();
                // res.json({ message: '帐号已经存在', signUp: false });

                res.cookie('resume-air-token', token).status(200).json({ message: 'login success', signUp: true, user: getUserPropsServer(userDoc) });
                return;
            } else {
                // 帐号并不存在
                // console.log('帐号并不存在');
                // console.log({...userData, password: password})
                // const user = new User({
                //     ...userData,
                //     _id: email,
                //     password: password
                // });
                // await user.save();

                // const newUser = await User.findOne({ email: email });
                // const token = newUser.generateToken();
                // const userDoc = newUser;
                // res.cookie('resume-air-token', token)
                // .status(200)
                // .json({ message: '帐号并不存在', signUp: true, user: getUserPropsServer(userDoc) });
                // res.json({ message: '帐号并不存在,  注册成功' });
                res.status(400).json({ message: 'Bad password', signUp: false });
                return;
            }

        } catch (error) {
            console.log(error);
            res.json({ warning: 'web oauth login error', error_message: error });
        }
    })

//isauth => verify user then send back user data to client
router.route('/isauth')
    .get(checkLoggedIn, async (req, res) => {
        res.status(200).send(getUserProps(req.user));
    })

// 不能全部资料都储存, 预防用户更改他的资料
const getUserProps = (user) => ({
    _id: user._id,
    email: user.email,
    role: user.role,
})

module.exports = router