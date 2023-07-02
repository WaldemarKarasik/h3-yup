import type { H3Event } from "h3";
import { H3Error, sendError } from "h3";

export default function sendH3Error(
  statusCode: number,
  statusMessage: string,
  data: any,
  event: H3Event
): void {
  const error = new H3Error();
  error.statusCode = statusCode;
  error.statusMessage = statusMessage;
  error.data = data;
  sendError(event, error);
}
