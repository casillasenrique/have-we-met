import { NextResponse } from "next/server";
import { ObjectData, fetchObjectData } from "@/api/objectData";
import { getObjectId } from "@/api/objectData";

export type ObjectDataResponse = {
  status: "fulfilled" | "rejected";
  value: ObjectData;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { gameIds } = body;

    if (!Array.isArray(gameIds)) {
      return NextResponse.json(
        { error: "No game IDs provided" },
        { status: 400 }
      );
    }

    const objectIds = gameIds.map((id: number) => getObjectId(id));
    const nonNullObjectIds = objectIds.filter((id) => !!id);
    const objectPromises = (nonNullObjectIds as Array<number>).map((id) =>
      fetchObjectData(id)
    );

    const objects = await Promise.allSettled(objectPromises);
    return NextResponse.json(objects, { status: 200 });
  } catch (error) {
    console.error("Error handling POST request:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
