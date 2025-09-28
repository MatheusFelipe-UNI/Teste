module.exports = (sequelize, DataTypes) => {
   const Aquisicoes = sequelize.define("Aquisicoes", {
      fornecedor: {
         type: DataTypes.STRING(180),
         allowNull: false,
      },
      status: {
         type: DataTypes.ENUM("SOLICITADO", "ENVIADO", "ENTREGUE"),
         allowNull: false,
      },
      data_entrega: {
         type: DataTypes.DATE,
         allowNull: true,
      },
   }, {
      freezeTableName: true,
      timestamps: true,
      underscored: true,
      // Altera o nome do createdAt
      createdAt: "data_solicitacao",
      //Desativa o updatedAt
      updatedAt: false
   });

   Aquisicoes.associate = (models) => {
      Aquisicoes.hasOne(models.Relatorios_medicamentos, {
         constraint: true,
         foreignKey: "fk_id_aquisicao",
         as: "relatorio_aquisicao"
      })

      Aquisicoes.hasMany(models.Itens_aquisicoes, {
         constraint: true,
         foreignKey: "fk_id_aquisicao",
         as: "item_aquisicao"
      });

      Aquisicoes.belongsTo(models.Users, {
         constraint: true,
         foreignKey: "fk_id_user",
         as: "user"
      });

      Aquisicoes.belongsTo(models.Laboratorios, {
         constraint: true,
         foreignKey: "fk_id_laboratorio",
         as: "laboratorio"         
      });
   }

   return Aquisicoes;
};
