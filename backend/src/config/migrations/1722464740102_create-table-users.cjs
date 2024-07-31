exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    name: {
      type: "varchar(30)",
      notNull: true,
    },
    username: {
      type: "varchar(30)",
      notNull: true,
      unique: true,
    },
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },
    password: {
      type: "varchar(60)",
      notNull: true,
    },
  });
};
