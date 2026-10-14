const User = require('../models/user.model');

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.render('index', { users });
    } catch (err) {
        res.status(500).send({ message: 'Co loi xay ra khi lay danh sach nguoi dung.'});
    }
};

const renderAddUserForm = (req, res) => {
    res.render('add');
};

const createNewUser = async (req, res) => {
    const { name, email, age, address} = req.body;
    const newUser = new User({name, email, age, address});
    try {
        await newUser.save();
        res.redirect('/');
    } catch (err) {
        res.status(400).send({ message: 'Co loi xay ra khi them nguoi dung.'});
    }
};

const renderEditUserForm = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).send({ message: 'Nguoi dung khong ton tai.'});
        res.render('edit', { user});
    } catch (err) {
        res.status(500).send({ message: 'Co loi xay ra khi hien thi form chinh sua. '});
    }
};

const updateExistingUser = async (req, res) => {
    const userId = req.params.id;
    const { name, email, age, address} = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, { name, email, age, address}, {new: true });
        if (!updatedUser) return res.status(400).send({ message: 'Nguoi dung khong ton tai.'});
        res.redirect('/');
    } catch (err) {
        res.status(400).send({ message: 'Co loi xay ra khi cap nhat nguoi dung.'});
    }
};

const deleteExistingUser = async (req, res) => {
    const userId = req.params.id;
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) return res.status(400).send({ message: 'Nguoi dung khong ton tai.'});
        res.redirect('/');
    } catch (err) {
        res.status(500).send({ message: 'Co loi xay ra khi xoa nguoi dung.'});
    }
};

module.exports = {
    getAllUsers,
    renderAddUserForm,
    createNewUser,
    renderEditUserForm,
    updateExistingUser,
    deleteExistingUser,
};