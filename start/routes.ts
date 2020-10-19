/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes/index.ts` as follows
|
| import './cart'
| import './customer'
|
*/

import Route from "@ioc:Adonis/Core/Route";

/**
 * Auth
 */
Route.group(() => {
  Route.get("/", "OAuthController.index");

  Route.get("/me", "OAuthController.me").middleware(["auth"]);

  Route.post("oauth/login", "OAuthController.userLogin");
  Route.post("oauth/logout", "OAuthController.userLogout").middleware(["auth"]);

  Route.get(
    "oauth/twitter/request-token",
    "TwitterAuthController.getRequestToken"
  );

  Route.post(
    "oauth/twitter/access-token",
    "TwitterAuthController.getAccessToken"
  );

  Route.post("password/send-reset-code", "PasswordController.sendCode");
  Route.post("password/verify-and-reset", "PasswordController.verifyAndReset");
  Route.post("password/change", "PasswordController.change").middleware([
    "auth"
  ]);
}).namespace("App/Controllers/Http/Auth");

Route.resource("users", "People/UsersController").apiOnly();

Route.resource("arrests", "Reports/ArrestsController")
  .apiOnly()
  .middleware({
    index: [],
    store: ["auth"],
    update: ["auth"],
    destroy: ["auth"]
  });
