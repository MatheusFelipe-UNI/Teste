module.exports = (sequelize, DataTypes) => {
   const RelatoriosMedicamento = sequelize.define(
      "Relatorios_medicamentos",
      {
         situacao: {
            type: DataTypes.ENUM("SOLICITADO", "ENVIADO", "RECEBIDO"),
            allowNull: false,
         },
      },
      {
         freezeTableName: true,
         timestamps: true,
         underscored: true,
         updatedAt: false
      }
   );

   RelatoriosMedicamento.associate = (models) => {
      RelatoriosMedicamento.belongsTo(models.Aquisicoes, {
         constraint: true,
         foreignKey: "fk_id_aquisicao",
         as: "aquisicao"         
      })
   }

   return RelatoriosMedicamento;
};
