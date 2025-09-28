module.exports = (sequelize, DataTypes) => {
   const LotesMedicamentos = sequelize.define("Lotes_medicamentos", {
      quantidade: {
         type: DataTypes.INTEGER(11),
         allowNull: false,
      },
      data_validade: {
         type: DataTypes.DATEONLY,
         allowNull: false,
      },
   }, {
      freezeTableName: true,
      timestamps: true,
      underscored: true      
   });

   LotesMedicamentos.associate = (models) => {
      LotesMedicamentos.belongsTo(models.Medicamentos, {
         constraint: true,
         foreignKey: "fk_id_medicamento",
         as: "medicamento"
      });
   }

   return LotesMedicamentos;
};
