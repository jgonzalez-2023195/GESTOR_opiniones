import { body } from 'express-validator'
import { validateErrors } from './validate.errors.js'
import { comonPasswords, existEmail, existNameCat, existUserName, formatPhoneNumber, objectIdValid } from '../utils/db.validator.js'

export const registerUser = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .isLength({max: 30}).withMessage(`Can't be more than 30 characters`),
    body('surname', 'Surname cannot be empty')
        .notEmpty()
        .isLength({max: 30}).withMessage(`Can't be more than 30 characters`),        
    body('username', 'Username cannot be empty')
        .notEmpty()
        .isLength({min: 4, max: 10}).withMessage(`Username must be between 4 and 10 characters`)
        .custom(existUserName),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail().withMessage(`Enter a valid email`)
        .custom(existEmail),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword(
            {
                minLength: 8,
                minLowercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                minUppercase: 1
            }
        )
        .isLength({ min: 8 }).withMessage(`The password must be at least 8 characters long`)
    .custom(comonPasswords),
        body('phone', 'Mobile phone cannot be empty')
        .notEmpty()
        .custom(formatPhoneNumber),
    body('role')
        .optional()
        .isIn(['COMUNITY']).withMessage(`Role must be 'COMUNITY'`),
    validateErrors
]

export const registerUserAdmin = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .isLength({max: 30}).withMessage(`Can't be more than 30 characters`),
    body('surname', 'Surname cannot be empty')
        .notEmpty()
        .isLength({max: 30}).withMessage(`Can't be more than 30 characters`),        
    body('username', 'Username cannot be empty')
        .notEmpty()
        .isLength({min: 4, max: 10}).withMessage(`Username must be between 4 and 10 characters`)
        .custom(existUserName),
    body('email', 'Email cannot be empty')
        .notEmpty()
        .isEmail().withMessage(`Enter a valid email`)
        .custom(existEmail),
    body('password', 'Password cannot be empty')
        .notEmpty()
        .isStrongPassword(
            {
                minLength: 8,
                minLowercase: 1,
                minNumbers: 1,
                minSymbols: 1,
                minUppercase: 1
            }
        )
        .isLength({ min: 8 }).withMessage(`The password must be at least 8 characters long`)
    .custom(comonPasswords),
        body('phone', 'Mobile phone cannot be empty')
        .notEmpty()
        .custom(formatPhoneNumber),
    body('role')
        .optional()
        .isIn(['ADMIN', 'COMUNITY']).withMessage(`Role must be 'ADMIN' or 'COMUNITY'`),
    validateErrors
]

export const registerCategory = [
    body('name', 'Name cannot be empty')
        .notEmpty()
        .isLength({max: 20}).withMessage(`Can't be more than 20 characters`)
        .custom(existNameCat),
    body('description', 'Description cannot be empty')
        .notEmpty()
        .isLength({max: 50}).withMessage(`Can't be more than 50 characters`),
    body('parentCategory')
        .optional()
        .custom(objectIdValid),
    validateErrors
]

export const updateCategory = [
    body('name', 'Name cannot be empty')    
        .optional()
        .notEmpty()
        .isLength({max: 20}).withMessage(`Can't be more than 20 characters`),
    body('description', 'Description cannot be empty')
        .optional()
        .notEmpty()
        .isLength({max: 50}).withMessage(`Can't be more than 50 characters`),
    body('categoryPicture')
        .optional(),
    body('parentCategory')
        .optional()
        .custom(objectIdValid),
    validateErrors
]   

export const newPublication = [
    body('title', 'Title cannot be empty')
        .optional()
        .notEmpty()
        .isLength({min: 1}).withMessage('The title must be at last 1 character long'),
    body('text', 'Text cannot be empty')
        .optional()
        .notEmpty(),
    body('userPublication', 'User publication cannot be empty')
        .optional()
        .notEmpty(),
    body('category', 'Category cannot be empty')
        .optional()
        .notEmpty()
        .custom(objectIdValid),
    body('reactions')
        .optional()
        .isIn(['👍','❤️','😂','😢','😮']).withMessage(`Reaction must be '👍' or '❤️' or '😂' or '😢' or '😮'`),
    body('visibility', 'Visibility cannot be empty')
        .optional()
        .notEmpty(),
    body('mentions')
        .optional(),
    validateErrors
]

export const updatPublication = [
    body('title', 'Title cannot be empty')
        .optional()
        .notEmpty()
        .isLength({min: 1}).withMessage('The title must be at last 1 character long'),
    body('text', 'Text cannot be empty')
        .optional()
        .notEmpty(),
    body('userPublication', 'User publication cannot be empty')
        .optional()
        .notEmpty(),
    body('category', 'Category cannot be empty')
        .optional()
        .notEmpty()
        .custom(objectIdValid),
    body('reactions')
        .optional()
        .isIn(['👍','❤️','😂','😢','😮']).withMessage(`Reaction must be '👍' or '❤️' or '😂' or '😢' or '😮'`),
    body('visibility', 'Visibility cannot be empty')
        .optional()
        .notEmpty(),
    body('mentions')
        .optional(),
    validateErrors
]

export const newComment = [
    body('text', 'Text cannot be empty')
        .notEmpty(),
    body('publication', 'ObjectId publication cannot be empty')
        .notEmpty()
        .custom(objectIdValid),
    body('parentComment', 'ObjectId parent comment cannot be empty')
        .optional()
        .custom(objectIdValid),
    body('reactions')
        .optional()
        .isIn(['👍','❤️','😂','😢','😮']).withMessage(`Reaction must be '👍' or '❤️' or '😂' or '😢' or '😮'`),
    body('visibility')
        .optional()
        .isIn(['PUBLIC', 'PRIVATE']).withMessage(`Visibiliti must be 'PUBLIC' or 'PRIVATE'`),
    body('mentions')
        .optional()
        .custom(objectIdValid)
]