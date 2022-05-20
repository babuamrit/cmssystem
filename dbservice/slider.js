import getSession from "./session";

const config = {
  schema: "codedcms20x1",
  collection: "slider",
};

const addslider = async (data) => {
  try {
    const result = await getSession()
      .then((result) => {
        if (!result.success) {
          // handle failed db connection
          return { success: false };
        }
        return result.session;
      })
      .then((session) => {
        return session.getSchema(config.schema);
      })
      .then((schema) => {
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
            return collection
              .find("key", ":value")
              .bind("value", "slider")
              .fields("value")
              .execute()
              .then((response) => {
                return response.fetchOne();
              })
              .then((result) => {
                let temp = result;
                temp.push(data);
                return collection
                  .modify('key="slider"')
                  .set("value", temp)
                  .execute();
              });
          })
          .then(() => {
            return { success: true };
          });
      });
    if (result.success) {
      return result;
    }
    return { return: false };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
};

export default addslider;

export const updateslider = async (data) => {
  try {
    const result = await getSession()
      .then((result) => {
        if (!result.success) {
          // handle failed db connection
          return { success: false };
        }
        return result.session;
      })
      .then((session) => {
        return session.getSchema(config.schema);
      })
      .then((schema) => {
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
            return collection
              .modify('key="slider"')
              .set("value", data)
              .execute();
          })
          .then(() => {
            return { success: true };
          });
      });
    if (result.success) {
      return result;
    }
    return { return: false };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
};
