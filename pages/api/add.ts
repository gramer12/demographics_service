import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../libs/server/client";
import { Population } from "@prisma/client";
import { useEffect, useState } from "react";
interface Data {
  ok: boolean;
  error?: String;
  result?: Population;
}

const fetchData = async (accessToken: string, year: string) => {
  const data = await fetch(
    `https://sgisapi.kostat.go.kr/OpenAPI3/stats/population.json?accessToken=${accessToken}&year=${year}&low_search=1`
  )
    .then((res: any) => res.json())
    .then((json: any) => json.result);

  return data;
};

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse<Data>
) {
  const [population, setPopulation] = useState([]);

  if (request.method !== "GET") {
    response.status(405).json({
      ok: false,
      error: `지원하지 않는 메서드 입니다. : ${request.method}`,
    });
    return;
  }

  try {
    useEffect(() => {
      fetchData("8d36d7b5-edf4-4264-82b5-9221c021c416", "2020").then((data) =>
        setPopulation(data)
      );
    }, []);
    console.log(population);
    // const Population = await client.population.create({
    //   data: {
    //     result:{

    //     }
    // },
    // });
    response.status(200).json({ ok: true });
  } catch (err) {
    response.status(200).json({ ok: false, error: `${err}` });
  } finally {
    //예외가 있던ㅇ벗던 실행되는 블럭
    await client.$disconnect();
  }
}
