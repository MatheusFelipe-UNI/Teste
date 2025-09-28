module.exports = (sequelize, DataTypes) => {
   const Laboratorios = sequelize.define("Laboratorios", {
      nome_laboratorio: {
         type: DataTypes.STRING(100),
         allowNull: false,
      },
      cnpj: {
         type: DataTypes.STRING(18),
         allowNull: false,
      },
      endereco: {
         type: DataTypes.STRING(200),
         allowNull: false,
      },
   }, {
      freezeTableName: true,
      timestamps: true,
      underscored: true
   });

   Laboratorios.associate = (models) => {
      Laboratorios.hasMany(models.Aquisicoes, {
         constraint: true,
         foreignKey: "fk_id_laboratorio",
         as: "aquisicao"
      });
      
      Laboratorios.hasMany(models.Medicamentos, {
         constraint: true,
         foreignKey: "fk_id_laboratorio",
         as: "medicamento"
      });
   }

   return Laboratorios;
};
