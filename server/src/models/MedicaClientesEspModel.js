module.exports = (sequelize, DataTypes) => {
   const MedicamentosClientesEspeciais = sequelize.define(
      "Medicamentos_clientes_especiais",
      {},
      {
         freezeTableName: true,
         timestamps: true,
         underscored: true,
      }
   );

   MedicamentosClientesEspeciais.associate = (models) => {
      MedicamentosClientesEspeciais.belongsTo(models.Clientes_especiais, {
         constraint: true,
         foreignKey: "fk_id_cliente_especial",
         as: "cliente",
      });
      MedicamentosClientesEspeciais.belongsTo(models.Medicamentos, {
         constraint: true,
         foreignKey: "fk_id_medicamento",
         as: "medicamento",
      });
   };

   return MedicamentosClientesEspeciais;
};
