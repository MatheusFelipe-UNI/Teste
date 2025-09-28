module.exports = (sequelize, DataTypes) => {
   const Retiradas = sequelize.define("Retiradas", {}, {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
      createdAt: "data_retirada",
      updatedAt: false   
   });

   Retiradas.associate = (models) => {
      Retiradas.hasMany(models.Itens_retiradas, {
         constraint: true,
         foreignKey: "fk_id_aquisicao",
         as: "item_aquisicao"         
      });

      Retiradas.belongsTo(models.Users, {
         constraint: true,
         foreignKey: "fk_id_user",
         as: "user"
      });
   }

   return Retiradas;
}