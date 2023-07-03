import { H3Event, getQuery } from "h3";
import { ObjectSchema } from "yup";
import { sendH3Error } from ".";

const DEFAULT_ERROR_MESSAGE = "Bad Request";
const DEFAULT_ERROR_STATUS = 400;

export default async function useValidatedQuery<T extends object>(
  schema: ObjectSchema<T>,
  event: H3Event
) {
  try {
    const query = await getQuery(event);
    await schema.validate(query);
    return query;
  } catch (error: any) {
    sendH3Error(
      DEFAULT_ERROR_STATUS,
      DEFAULT_ERROR_MESSAGE,
      { message: error.message },
      event
    );
  }
}
