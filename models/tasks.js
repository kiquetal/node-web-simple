module.exports=(sequelize, Datatype) => {

    const Tasks= sequelize.define("Tasks", {

        id: {
            type: Datatype.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: Datatype.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        done: {
            type: Datatype.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },{

        classMethods:{
            associate: (models) => {
                Tasks.belongsTo(models.Users);
            }
        }

    });
    return Tasks;
};