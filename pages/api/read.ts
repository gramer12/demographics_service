import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
import { Population } from "@prisma/client";
interface Data {
  ok: boolean;
  error?: String;
  regoin?: String;
}
export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  if (request.method !== "GET") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다. : ${request.method}`,
    });
    return;
  }

  try {
    const regoin = await client.population.findUnique({
      where: {
        imga_ppltn: "zzzz",
      },
    });
    console.log(regoin);
    response.status(200).json({ ok: true });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  } finally {
    //예외가 있던ㅇ벗던 실행되는 블럭
    await client.$disconnect();
  }
}
