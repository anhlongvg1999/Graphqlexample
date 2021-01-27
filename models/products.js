module.exports = function(sequelize, DataTypes) {
	return sequelize.define('products', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		color: {
			type: DataTypes.STRING(256),
			allowNull: false
		},
		price: {
			type: DataTypes.STRING(256),
			allowNull: false
		}
	}, {
		tableName: 'products',
		timestamps: false
	});
};