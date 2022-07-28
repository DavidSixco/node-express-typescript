import mongoose from 'mongoose';

export const dbCoinnection = async () => {
    try {
        await mongoose.connect(`${process.env.DB_CNN}`);
        console.log('Database was succcess initialized ');

    } catch (error) {
        console.log('Error', error);
        throw new Error('Error al inizializar la base de datos')
    }
};