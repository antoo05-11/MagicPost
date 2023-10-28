const db = require('../../models')
export const Commune = db.communes;

export const getAllCommunes = async (req, res) => {
    Commune.findAll().then(result => {
        res.json(result);
    })
}