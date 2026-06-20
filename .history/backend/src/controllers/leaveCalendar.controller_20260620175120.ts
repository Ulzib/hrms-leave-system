import { Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import prisma from "../lib/prisma";
import { Prisma, Status } from "@prisma/client";

//api/leaves/approved
// - startDate, endDate query param-r shuuj blno (yyyy-mm-dd)

const getApprovedLeaves = asyncHandler(async (req: Request, res: Response) => {
  const { startDate, endDate } = req.query;

  //prisma where nuhtsul - ehendee zubhun Approved shuune
  const whereCondition: Prisma.LeaveRequestWhereInput = {
    status: Status.APPROVED,
  };

  //startDate esvel endDate irsn bol ognoogoor shuune
  if (startDate || endDate) {
    whereCondition.startDate = {};

    if (startDate) {
      //startdate-s hoishih chuluug avna
      whereCondition.startDate.gte = new Date(startDate as string);
    }
    if (endDate) {
      const end = new Date(endDate as string);
      end.setDate(end.getDate() + 1);
      whereCondition.startDate.lte = end;
    }
  }

  const leaves = await prisma.leaveRequest.findMany({
    where: whereCondition,
    include: {
      user: {
        select: {
          id: true,
          username: true,
          profilePicture: true,
        },
      },
      requestType: {
        select: {
          name: true,
        },
      },
    },
    orderBy: { startDate: "desc" },
  });
  res.json(leaves);
});
export default getApprovedLeaves;
