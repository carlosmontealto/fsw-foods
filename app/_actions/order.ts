"use server";

import { revalidatePath } from "next/cache";

import { Prisma } from "@prisma/client";
import { db } from "../_lib/prisma";

export const createOrder = async (data: Prisma.OrderCreateInput) => {
  await db.order.create({ data });
  revalidatePath("/my-orders");
};
