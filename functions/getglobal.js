const config = {
  schema: "codedcms20x1",
  collection: "global",
  collection1: "menu",
};
import getSession from "../dbservice/session";

const getglobal = async () => {
  const data = await getSession()
    .then((result) => {
      if (!result.success) {
        // handle failed db connection
        return { success: false };
      }
      return result.session;
    })
    .then((session) => {
      var schema = session.getSchema(config.schema);
      return schema
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
          return collection
            .find("key", ":value")
            .bind("value", "global")

            .execute()
            .then((response) => {
              return response.fetchOne();
            })
            .then((result) => {
              const lpage = JSON.parse(JSON.stringify(result));
              session.close();
              // console.log(page);
              return lpage;
            });
        });
    });
};

export default getglobal;
