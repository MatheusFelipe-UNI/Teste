module.exports = (sequelize, DataTypes) => {
   const ItensRetiradas = sequelize.define("Itens_retiradas", {
      quantidade_solicitada: {
         type: DataTypes.INTEGER(11),
         allowNull: false,
      },
   }, {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
      updatedAt: false      
   });

   ItensRetiradas.associate = (models) => {
      ItensRetiradas.belongsTo(models.Medicamentos, {
         constraint: true,
         foreignKey: "fk_id_medicamento",
         as: "medicamento"         
      });

      ItensRetiradas.belongsTo(models.Retiradas, {
         constraint: true,
         foreignKey: "fk_id_retirada",
         as: "retirada"         
      });
   }

   return ItensRetiradas;
};
