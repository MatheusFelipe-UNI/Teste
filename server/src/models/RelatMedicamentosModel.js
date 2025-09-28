module.exports = (sequelize, DataTypes) => {
   const RelatoriosMedicamentos = sequelize.define(
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

   RelatoriosMedicamentos.associate = (models) => {
      RelatoriosMedicamentos.belongsTo(models.Aquisicoes, {
         constraint: true,
         foreignKey: "fk_id_aquisicao",
         as: "aquisicao"         
      })
   }

   return RelatoriosMedicamentos;
};
