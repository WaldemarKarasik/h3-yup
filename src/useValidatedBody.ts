import type { H3Event } from "h3";
import { H3Error, readBody, sendError } from "h3";
import { ObjectSchema } from "yup";

const DEFAULT_ERROR_MESSAGE = "Bad Request";
const DEFAULT_ERROR_STATUS = 400;

export default async function useValidateBody<T extends object>(
  schema: ObjectSchema<T>,
  event: H3Event
) {
  try {
    const body = await readBody(event);
    const validated = await schema.validate(body);
    return body;
  } catch (error: any) {
    const err = new H3Error();
    err.statusCode = DEFAULT_ERROR_STATUS;
    err.statusMessage = DEFAULT_ERROR_MESSAGE;
    err.data = { message: error.message };
    sendError(event, err);
  }
}
