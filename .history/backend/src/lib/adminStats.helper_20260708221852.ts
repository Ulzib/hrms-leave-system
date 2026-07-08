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
