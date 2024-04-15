const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Route d'inscription
router.post('/register', async(req, res) => {
    try {
        const searchUser = await User.findOne({email : req.body.email})
        if ( searchUser ) {
            return res
                .status(403)
                .json({status : 403, message : `L'utilisateur portant l'email : ${req.body.email} existe déjà`})
        }
        const user = new User(req.body)
        console.log(req.body)
        const newUser = await user.save()
        return res
            .status(201)
            .json({status : 201, message : `L'utilisateur ${newUser.email} à bien été créé`})
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
})

// Route de connexion
router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({email : req.body.email})
        if ( !user ) {
            return res
                .status(400)
                .json({status : 400, message : "Identifiants invalide"})
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password)
        if ( !isMatch ) {
            return res
                .status(400)
                .json({status : 400, message : "Identifiants invalide"})
        }
        const payload = {
            id : user._id,
            email : user.email,
            role : user.role,
        }
        const token = jwt.sign(payload,process.env.SECRET_KEY, {expiresIn : "12h"})
        return res
            .status(200)
            .json({status : 200, message : "Vous êtes connecté(e)", token : token, role : payload.role})
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
})


// Route pour récupérer tous les utilisateurs

router.get('/all_users', async(req, res) => {
    try {
        const userList = await User.find({}, [
            "email", 
            "role"
        ])
        if ( userList.length == 0 ) {
            return res
                .status(200)
                .json({status : 200, message : "Pas d'utilisateurs trouvés"})
        }
        return res
            .status(200)
            .json({status : 200, result : userList})
    } catch (error) {
        res.sendStatus(500)
        console.log(error)
    }
})

// Route pour récupérer un utilisateur par son identifiant
router.get('/user_by_id/:id', async(req, res) => {
    try {
        const user = await User.findById(req.params.id).select([
            "email",
            "role"
        ])
        if ( !user ) {
            return res
                .status(400)
                .json({status : 400, message : "Cet utilisateur n'existe pas"})
        }
        return res
            .status(200)
            .json({status : 200, result : user})
    } catch (error) {
       res.sendStatus(500)
       console.log(error) 
    }
})

// Mettre à jour un utilisateur
router.put('/user_update/:id', async(req, res) => {
    try {
        const updatedUserData = req.body
        const user = await User.findById(req.params.id)
        if ( !user ) {
            return res
                .status(404)
                .json({status : 404, message : "Utilisateur non trouvé"})
        }
        Object.assign(user, updatedUserData)
        const updatedUser = await user.save()
        return res
            .status(200)
            .json({status : 200, result : updatedUser})
    } catch (error) {
        return res
            .status(500)
            .json({status : 500, message : "Erreur lors de la mise à jour de l'utilisateur"})
    }
})

module.exports = router