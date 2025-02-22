import User from '../src/user/user.model.js'
import Category from '../src/category/category.model.js'
import { encrypt } from '../utils/encrypt.validatons.js'

export const initializeAdminUser = async () => {
    try {
        const adminExists = await User.findOne({ role: 'ADMIN' });

        if (!adminExists) {
            console.log('Creating user with ADMIN role')

            let password = process.env.PASSWORD
            await encrypt(password)

            const adminUser = new User(
                {
                    name: 'José Francisco',
                    surname: 'González Ordoñez',
                    username: 'jgonzalezA',
                    email: 'jgonzalez-2023195@kinal.edu.gt',
                    password: password,
                    phone: '+502 4137-9293',
                    role: 'ADMIN'
                }
            )

            await adminUser.save()
            console.log('ADMIN user successfully created')
        } else {
            console.log('Default ADMIN already created')
        }
    } catch (e) {
        console.error('General error when register ADMIN to system', e)
    }
}

export const initializeCategory = async()=> {
    try {
        const categoryExist = await Category.findOne({name: 'Entretenimiento'})
        if(!categoryExist) {
            console.log('Creating category on the system')
            const category = new Category(
                {
                    name: 'Entretenimiento',
                    description: 'Categoría encargada del manejo de Entretenimiento'
                }
            )
            await category.save()
            console.log('Category created to system');
        } else {
            console.log('Default Entretenimiento already created');
        }
    } catch (e) {
        console.error('General error when register category to system', e)
    }
}