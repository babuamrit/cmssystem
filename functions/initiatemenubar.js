import getSession from "../dbservice/session";

const config = {
  schema: "codedcms20x1",
  collection: "menu",
};

const menuinitiate = (res) => {
  getSession()
    .then((result) => {
      if (!result.success) {
        // handle failed db connection
        return { success: false };
      }
      return result.session;
    })
    .then((session) => {
      var schema = session.getSchema(config.schema);
      schema
        .existsInDatabase()
        .then((exists) => {
          if (exists) {
            return schema;
          }
          return session.createSchema(config.schema);
        })
        .then((schema) => {
          return schema.createCollection(config.collection, {
            reuseExisting: true,
          });
        })
        .then((collection) => {
          return collection.add({ key: "menu", menu: [] }).execute();
        })
        .then(() => {
          res.status(200).json({ success: true }).end();
        });
    });
};

export default menuinitiate;
