import { Request, Response } from "express";
import db from "../utils/db/db.js";
import {
  CreateEntryInput,
  UpdateEntryInput,
} from "../validators/entrySchema.js";
import { handleAsync } from "../utils/handleAsync.js";
import { Prisma } from "@prisma/client";

const typeMap: Record<string, "MOVIE" | "TV_SHOW"> = {
  MOVIE: "MOVIE",
  TV_SHOW: "TV_SHOW",
  Movie: "MOVIE",
  "TV Show": "TV_SHOW",
};


type EntryType = keyof typeof typeMap;
type SortOrder = "asc" | "desc";
type SortField = "createdAt" | "budget" | "title";

interface GetEntriesQuery {
  type?: EntryType;
  sortBy?: SortField;
  order?: SortOrder;
  minBudget?: string;
  maxBudget?: string;
  startDate?: string;
  endDate?: string;
  cursor?: string;
  limit?: string;
}

export const createEntry = handleAsync(
  async (req: Request<{}, {}, CreateEntryInput>, res: Response) => {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const data = req.body;
    console.log("body in createEntry ::", data);

    const normalizedType = typeMap[data.type];

    const entry = await db.entry.create({
      data: {
        userId: req.user.id,
        title: data.title,
        type: normalizedType,
        director: data.director,
        budget: data.budget ?? 0,
        location: data.location ?? "",
        duration: data.duration ?? "",
        yearOrTime: data.yearOrTime ? new Date(data.yearOrTime) : new Date(),
        picture: data.picture,
      },
    });

    console.log("Entry created ::", entry);
    res.status(201).json({ success: true, entry });
  },
  "CreateEntry"
);


export const getEntries = handleAsync(
  async (
    req: Request<{}, {}, {}, GetEntriesQuery>,
    res: Response
  ): Promise<void> => {
    if (!req.user) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const {
      type,
      sortBy = "createdAt",
      order = "desc",
      minBudget,
      maxBudget,
      startDate,
      endDate,
      cursor,
      limit = "10",
    } = req.query;

    const take = Math.min(Number(limit) || 10, 50);

    const whereClause: Prisma.EntryWhereInput = {
      userId: req.user.id,
    };

    if (type && typeMap[type]) {
      whereClause.type = typeMap[type];
    }

    if (minBudget || maxBudget) {
      whereClause.budget = {
        ...(minBudget ? { gte: Number(minBudget) } : {}),
        ...(maxBudget ? { lte: Number(maxBudget) } : {}),
      };
    }

    if (startDate || endDate) {
      whereClause.createdAt = {
        ...(startDate ? { gte: new Date(startDate) } : {}),
        ...(endDate ? { lte: new Date(endDate) } : {}),
      };
    }

    const validSortFields: SortField[] = ["createdAt", "budget", "title"];
    const sortField: SortField = validSortFields.includes(sortBy)
      ? sortBy
      : "createdAt";

    const entries = await db.entry.findMany({
      where: whereClause,
      orderBy: { [sortField]: order },
      take: take + 1,
      ...(cursor ? { skip: 1, cursor: { id: Number(cursor) } } : {}),
    });

    const hasNextPage = entries.length > take;
    const nextCursor = hasNextPage ? entries[take - 1].id : null;

    res.json({
      success: true,
      entries: hasNextPage ? entries.slice(0, take) : entries,
      nextCursor,
    });
  },
  "GetEntries"
);

export const getEntryById = handleAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const entry = await db.entry.findUnique({
    where: { id: Number(id) },
  });

  if (!entry) {
    res.status(404).json({ success: false, message: "Entry not found" });
    return;
  }

  res.json({ success: true, entry });
}, "GetEntryById");

export const updateEntry = handleAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  const { id } = req.params;
  const data = req.body;

  // Checking if the entry exists and belongs to the logged-in user
  const existing = await db.entry.findUnique({ where: { id: Number(id) } });
  if (!existing || existing.userId !== req.user.id) {
    res
      .status(404)
      .json({ success: false, message: "Entry not found or access denied" });
    return;
  }

  const updated = await db.entry.update({
    where: { id: Number(id) },
    data: {
      ...data,
      type: data.type ? typeMap[data.type] : undefined,
      year: data.year !== undefined ? String(data.year) : undefined,
    },
  });

  res.json({ success: true, entry: updated });
}, "UpdateEntry");

export const deleteEntry = handleAsync(async (req: Request, res: Response) => {
  if (!req.user) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  const { id } = req.params;

  const existing = await db.entry.findUnique({ where: { id: Number(id) } });
  if (!existing || existing.userId !== req.user.id) {
    res
      .status(404)
      .json({ success: false, message: "Entry not found or access denied" });
    return;
  }

  await db.entry.delete({ where: { id: Number(id) } });
  res.json({ success: true, message: "Entry deleted successfully" });
}, "DeleteEntry");
