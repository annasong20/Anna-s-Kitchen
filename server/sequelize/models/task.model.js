const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
	sequelize.define('task', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
	    description: {
		allowNull: false,
		type: DataTypes.STRING,
		unique: false,
	    },
	    status: {
		allowNull: false,
		type: DataTypes.STRING,
		unique: false,
		validate: {
		    isIn: [['NOT STARTED', 'IN PROGRESS', 'COMPLETE']]
		}
	    }
	});
};
