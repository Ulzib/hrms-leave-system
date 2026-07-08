import { Request } from "express";

//query-s sar,jil avna. bhgui bl odogin sar jil ashiglah
export const getMonthYear = (req: Request) => {
  const now = new Date();
  let month = now.getMonth() + 1;
  let year = now.getFullYear();

  if (req.query.month) {
    month = Number(req.query.month);
  }

  if (req.query.year) {
    year = Number(req.query.year);
  }

  return { month, year };
};

//tuhain hereglegchin reqType-r, tuhain sard avsn niit udur
export const sumDaysForMonth = async (
  userId: number,
  typeName: string,
  month: number,
  year: number,
) => {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 1);
};
