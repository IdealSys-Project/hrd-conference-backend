export interface ResponsePayload {
  status: boolean;
  message: string;
  data?: any;
}

export const generateResponse = (
  status: boolean,
  message: string,
  data: any = null,
): ResponsePayload => ({
  status,
  message,
  data,
});
