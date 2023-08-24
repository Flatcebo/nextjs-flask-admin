import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const cate: any = params.get("cate");
  const year: any = params.get("year");
  const theme: any = params.get("theme");
  const offset: any = params.get("offset");
  const count: any = params.get("count");
  const keyword: any = params.get("keyword");
  console.log("param =====>", params);

  if (keyword.length < 1) {
    return NextResponse.json({ ok: true });
  }

  let Boat: any = prisma.tB_Innak_Boat_23;

  switch (year) {
    case "2023선상낚시":
      Boat = prisma.tB_Innak_Boat_23;
      break;
    case "2022선상낚시":
      Boat = prisma.tB_Innak_Boat_22;
      break;
    case "2021선상낚시":
      Boat = prisma.tB_Innak_Boat_21;
      break;
    case "2023갯바위":
      Boat = prisma.tB_Innak_Rock_23;
      break;
    case "2022갯바위":
      Boat = prisma.tB_Innak_Rock_22;
      break;
    case "2021갯바위":
      Boat = prisma.tB_Innak_Rock_21;
      break;
  }

  let categories: any = await Boat.findMany({
    select: {
      userId: true,
      title: true,
      userName: true,
      mainNumber: true,
    },
    // 검색기능 입력한 키워드 값을 해당 컬럼들에 조회한다
    where: {
      OR: [
        { userId: { contains: keyword } },
        { userName: { contains: keyword } },
        { title: { contains: keyword } },
        { mainNumber: { contains: keyword } },
      ],
    },
    skip: offset ? parseInt(offset) : undefined,
    take: count ? parseInt(count) : 20,
  });
  // return NextResponse.json({categories });

  try {
    switch (cate) {
      case "전체":
        categories = await Boat.findMany({
          select: {
            userId: true,
            title: true,
            userName: true,
            mainNumber: true,
          },
          // 검색기능 입력한 키워드 값을 해당 컬럼들에 조회한다
          where: {
            OR: [
              { userId: { contains: keyword } },
              { userName: { contains: keyword } },
              { title: { contains: keyword } },
              { mainNumber: { contains: keyword } },
            ],
          },
          skip: offset ? parseInt(offset) : undefined,
          take: count ? parseInt(count) : 20,
        });
        return NextResponse.json({ categories });

      case "업체명":
        categories = await Boat.findMany({
          select: {
            userId: true,
            title: true,
            userName: true,
            mainNumber: true,
          },
          where: {
            OR: [{ userName: { contains: keyword } }],
          },
          skip: offset ? parseInt(offset) : undefined,
          take: count ? parseInt(count) : 20,
        });
        return NextResponse.json({ categories });
      case "유저 아이디":
        categories = await Boat.findMany({
          select: {
            userId: true,
            title: true,
            userName: true,
            mainNumber: true,
          },
          where: {
            OR: [{ userId: { contains: keyword } }],
          },
          skip: offset ? parseInt(offset) : undefined,
          take: count ? parseInt(count) : 20,
        });
        return NextResponse.json({ categories });

      case "글제목":
        categories = await Boat.findMany({
          select: {
            userId: true,
            title: true,
            userName: true,
            mainNumber: true,
          },
          where: {
            OR: [{ title: { contains: keyword } }],
          },
          skip: offset ? parseInt(offset) : undefined,
          take: count ? parseInt(count) : 20,
        });
        return NextResponse.json({ categories });
      case "대표번호":
        categories = await Boat.findMany({
          select: {
            userId: true,
            title: true,
            userName: true,
            mainNumber: true,
          },
          where: {
            OR: [{ mainNumber: { contains: keyword } }],
          },
          skip: offset ? parseInt(offset) : undefined,
          take: count ? parseInt(count) : 20,
        });

        return NextResponse.json({ categories });
    }
  } catch (error) {
    // return res.status(200).json({ ok: true, descs });
    // return NextResponse.json({ allCate_Boat_22 });
    return NextResponse.json({ error: "내부 서버 오류가 발생했습니다" });
  } finally {
    await prisma.$disconnect();
  }
}
