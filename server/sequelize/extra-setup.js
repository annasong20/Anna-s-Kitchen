function applyExtraSetup(sequelize) {
    const { friend, task, user } = sequelize.models;

	user.hasMany(task);
    task.belongsTo(user);
    
    user.belongsToMany(user, { through: 'friend', as: 'Parents', foreignKey: 'parentId' });
    user.belongsToMany(user, { through: 'friend', as: 'Siblings', foreignKey: 'siblingId' });
}

module.exports = { applyExtraSetup };
