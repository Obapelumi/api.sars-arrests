import { HttpContextContract } from "@ioc:Adonis/Core/HttpContext";
import Arrest from "App/Models/Reports/Arrest";
import StoreArrest from "App/Repos/Reports/StoreArrest";
import UpdateArrest from "App/Repos/Reports/UpdateArrest";
import StoreArrestValidator from "App/Validators/Reports/StoreArrestValidator";
import UpdateArrestValidator from "App/Validators/Reports/UpdateArrestValidator";

export default class ArrestsController {
  public async index({ request, response }: HttpContextContract) {
    var {
      page = 1,
      perPage = 10000,
      statuses,
      relationships = [],
      sortBy = "created_at",
      sortOrder = "desc"
    } = request.get();

    var query = Arrest.query().orderBy(sortBy, sortOrder);

    for (const relationship of relationships) query.preload(relationship);

    if (typeof statuses !== "undefined")
      query.apply((scopes) => scopes.statuses(statuses));

    const results = await query.paginate(page, perPage);

    return response.json(results);
  }

  public async store({ auth, request, response }: HttpContextContract) {
    const data = await request.validate(StoreArrestValidator);

    const arrest = await new StoreArrest().handle(data, auth);

    return response.json({ status: true, arrest });
  }

  public async show({ params, request, response }: HttpContextContract) {
    const { relationships = [] } = request.get();

    var query = Arrest.query().where("id", params.id);

    for (const relationship of relationships)
      query = query.preload(relationship);

    const arrest = await query.firstOrFail();

    return response.json({ status: true, arrest });
  }

  public async update({ params, request, response }: HttpContextContract) {
    const data = await request.validate(UpdateArrestValidator);

    const arrest = await new UpdateArrest().handle(params.id, data);

    return response.json({ status: true, arrest });
  }

  public async destroy({ params, response }: HttpContextContract) {
    var arrest = await Arrest.findOrFail(params.id);

    await arrest.delete();

    return response.json({ status: true, arrest });
  }
}
