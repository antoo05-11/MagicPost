module.exports = (sequelize, DataTypes) => {
    const Address = sequelize.define("address", {
        addressID: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        communeID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Commune',
                key: 'communeID'
            }
        },
        districtID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'District', 
                key: 'districtID'
            }
        },
        provinceID: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Province',
                key: 'provinceID'
            }
        },
        detail: {
            type: DataTypes.STRING
        },
        type: {
            type: DataTypes.ENUM,
            values: ['goodsPoint', 'transactionPoint', 'customerAddress']
        }
    }, {
        id: false,
        timestamps: false,
        createdAt: false,
        updatedAt: false,
    })

    return Address;
}