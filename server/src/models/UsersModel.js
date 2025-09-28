module.exports = (sequelize, DataTypes) => {
   const Users = sequelize.define("Users", {
      usuario: {
         type: DataTypes.STRING(45),
         allowNull: false,
      },
      senha: {
         type: DataTypes.STRING(220),
         allowNull: false,
      },
      nivel_acesso: {
         type: DataTypes.INTEGER(11),
         allowNull: false,
      },
      status: {
         type: DataTypes.ENUM("ATIVO", "INATIVO"),
         allowNull: false,
      },
   }, {
      // Mantém o nome do modelo como nome da Tabela
      freezeTableName: true,
      // cria o created_at e updated_at a nível do sequelize 
      timestamps: true,
      // permite que os campos criados pelo sequelize utilize _ ao invés de Camelcase 
      underscored: true
   });

   Users.associate = (models) => {
      Users.hasMany(models.Retiradas, {
         constraint: true,
         foreignKey: "fk_id_user", 
         as: "user_retirada"
      });
      
      Users.hasMany(models.Aquisicoes, {
         constraint: true,
         foreignKey: "fk_id_user",
         as: "user_aquisicao"
      });
   }

   return Users;
};
