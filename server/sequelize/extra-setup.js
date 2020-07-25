function applyExtraSetup(sequelize) {
    const { task, user } = sequelize.models;

	user.hasMany(task);
	task.belongsTo(user);
}

module.exports = { applyExtraSetup };
