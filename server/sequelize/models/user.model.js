const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('user', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		username: {
			allowNull: false,
			type: DataTypes.STRING,
			unique: true,
		},
	    lastVisitedUrl: {
		allowNull: true,
		type: DataTypes.STRING,
		unique: false,
	    },
	    lastVisitedTime: {
		allowNull: true,
		type: DataTypes.DATE,
		unique: false,
	    }
	});
};
