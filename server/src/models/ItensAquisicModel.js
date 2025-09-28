module.exports = (sequelize, DataTypes) => {
   const ItensAquisicoes = sequelize.define("Itens_aquisicoes", {
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

   ItensAquisicoes.associate = (models) => {
      ItensAquisicoes.belongsTo(models.Aquisicoes, {
         constraint: true,
         foreignKey: "fk_id_aquisicao",
         as: "aquisicao"         
      });
      ItensAquisicoes.belongsTo(models.Medicamentos, {
         constraint: true,
         foreignKey: "fk_id_medicamento",
         as: "medicamento"         
      });
   }

   return ItensAquisicoes;
};
