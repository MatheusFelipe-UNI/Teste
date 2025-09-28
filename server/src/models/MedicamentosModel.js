module.exports = (sequelize, DataTypes) => {
   const Medicamentos = sequelize.define("Medicamentos", {
      id: {
         type: DataTypes.INTEGER(11),
         primaryKey: true,
         autoIncrement: false,
         allowNull: false,
      },
      nome: {
         type: DataTypes.STRING(500),
         allowNull: false,
      },
      indicacao_uso: {
         type: DataTypes.TEXT,
         allowNull: false,
      },
      categoria: {
         type: DataTypes.ENUM("CONVENIO", "POPULAR"),
         allowNull: false,
      },
      tipo_unidade: {
         type: DataTypes.STRING(50),
         defaultValue: "CAIXAS",
         allowNull: false,
      },
      quantidade_minima: {
         type: DataTypes.INTEGER(11),
         allowNull: false,
      },
      quantidade_total: {
         type: DataTypes.INTEGER(11),
         defaultValue: 0,
         allowNull: false,
      },
      img: {
         type: DataTypes.STRING,
         allowNull: false,
      },
   }, {
      freezeTableName: true,
      timestamps: true,
      underscored: true
   });

   Medicamentos.associate = (models) => {
      // Fornece sua chave primária para essas tabelas
      Medicamentos.hasMany(models.Clientes_especiais, {
         constraint: true,
         foreignKey: "fk_id_medicamento",
         as: "medicamento_cliente_especial"
      });

      Medicamentos.hasMany(models.Lotes_medicamentos, {
         constraint: true,
         foreignKey: "fk_id_medicamento",
         as: "medicamento_lote"
      });

      Medicamentos.hasMany(models.Itens_aquisicoes, {
         constraint: true,
         foreignKey: "fk_id_medicamento",
         as: "medicamento_aquisicao"
      });

      Medicamentos.hasMany(models.Itens_retiradas, {
         constraint: true,
         foreignKey: "fk_id_medicamento",
         as: "medicamento_retirada"
      });

      // Possui uma chave estrangeira que referencia essa(s) tabela(s)
      Medicamentos.belongsTo(models.Laboratorios, {
         constraint: true,
         foreignKey: "fk_id_laboratorio",
         as: "laboratorio"
      });
   }

   return Medicamentos;

};
