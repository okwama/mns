import { createNestServer } from './main.nest';

let cachedServer: any;

export default async function handler(req: any, res: any) {
  if (!cachedServer) {
    cachedServer = await createNestServer();
  }
  return cachedServer(req, res);
} 