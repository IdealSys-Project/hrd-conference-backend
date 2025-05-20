export interface ResponsePayload {
  status: boolean;
  message: string;
  data?: any;
}

export const generateResponse = (
  status: boolean,
  message: string,
  data?: any,
): ResponsePayload => ({
  status,
  message,
  ...(data !== null && data !== undefined && { data }),
});
