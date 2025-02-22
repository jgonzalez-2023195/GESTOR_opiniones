import User from '../user/user.model.js'; // Ajusta la ruta según tu estructura
import { checkPassword, encrypt } from '../../utils/encrypt.validatons.js'; // Ajusta la ruta

export const updatUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { filename } = req.file
        const { oldPassword, newPassword, ...data } = req.body; // Separar contraseña del resto de los datos

        if (id !== req.user.uid) {
            return res.status(403).send({
                success: false,
                message: 'Unauthorized to update this profile'
            });
        }

        // Buscar el usuario
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({
                success: false,
                message: 'User not found'
            });
        }

        // Si se envían oldPassword y newPassword, actualizar la contraseña
        if (oldPassword && newPassword) {
            const isPasswordValid = await checkPassword(user.password, oldPassword);
            if (!isPasswordValid) {
                return res.status(400).send({
                    success: false,
                    message: 'Old password incorrect'
                });
            }
            user.password = await encrypt(newPassword);
        }

        if(filename){
            user.profilePicture = filename
        }
        // Guardar los cambios (esto actualiza tanto contraseña como otros campos si aplica)
        const updatedUser = await User.findByIdAndUpdate(id, data, {new: true});

        return res.status(200).send({
            success: true,
            message: 'User updated successfully',
            user: updatedUser
        });
    } catch (e) {
        console.error('Error updating user:', e);
        return res.status(500).send({
            success: false,
            message: 'Error updating user',
            error: e.message
        });
    }
};