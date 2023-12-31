import type { H3Event } from "h3";
import { readBody } from "h3";
import { ObjectSchema } from "yup";
import sendH3Error from "./sendH3Error";

const DEFAULT_ERROR_MESSAGE = "Bad Request";
const DEFAULT_ERROR_STATUS = 400;

export default async function useValidatedBody<T extends object>(
  schema: ObjectSchema<T>,
  event: H3Event
) {
  try {
    const body = await readBody(event);
    await schema.validate(body);
    return body;
  } catch (error: any) {
    sendH3Error(
      DEFAULT_ERROR_STATUS,
      DEFAULT_ERROR_MESSAGE,
      { message: error.message },
      event
    );
  }
}
