const { createCoreRouter } = require("@strapi/strapi").factories;
const defaultRouter = createCoreRouter("api::asset.asset");

const customRouter = (innerRouter, extraRoutes = []) => {
  let routes;
  return {
    get prefix() {
      return innerRouter.prefix;
    },
    get routes() {
      if (!routes) routes = innerRouter.routes.concat(extraRoutes);
      return routes;
    },
  };
};

const myExtraRoutes = [
  {
    method: "POST",
    path: "/assetUpload/UploadUserProfilePic",
    handler: "api::asset.asset.UploadUserProfilePic",
  },
  {
    method: "GET",
    path: "/assetUpload/GetUserProfilePic/:id",
    handler: "api::asset.asset.GetUserProfilePic",
  },
  {
    method: "GET",
    path: "/assetUpload/GetEventPics/:id",
    handler: "api::asset.asset.GetEventPics",
  },
];

module.exports = customRouter(defaultRouter, myExtraRoutes);
