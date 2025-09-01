// pages/api/schools/index.js
import { getPool } from "@/lib/db";
import fs from "fs";
import path from "path";
import formidable from "formidable";

export const config = {
  api: {
    bodyParser: false, // we use formidable for multipart
  },
};

const uploadDir = path.join(process.cwd(), "public", "schoolImages");

// ensure upload dir exists
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

function parseForm(req) {
  const form = formidable({
    multiples: false,
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part, form) => {
      const ts = Date.now();
      const safe = part.originalFilename?.replace(/\s+/g, "_") || "image";
      return `${ts}_${safe}`;
    },
  });

  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}

export default async function handler(req, res) {
  const pool = getPool();

  if (req.method === "GET") {
    try {
      const [rows] = await pool.query(
        "SELECT id, name, address, city, state, contact, image, email_id FROM schools ORDER BY id DESC"
      );

      // If using cloud storage, rewrite image URLs
      const useCloud = String(process.env.USE_CLOUD_STORAGE).toLowerCase() === "true";
      const cloudBase = process.env.CLOUD_BASE_URL || "";

      const data = rows.map((r) => ({
        ...r,
        image: useCloud ? `${cloudBase}/${r.image}` : `/schoolImages/${r.image}`,
      }));

      res.status(200).json({ success: true, data });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: "DB fetch failed" });
    }
    return;
  }

  if (req.method === "POST") {
    try {
      const { fields, files } = await parseForm(req);

      const name = String(fields.name || "").trim();
      const address = String(fields.address || "").trim();
      const city = String(fields.city || "").trim();
      const state = String(fields.state || "").trim();
      const contact = String(fields.contact || "").trim();
      const email_id = String(fields.email_id || "").trim();

      // Basic server validations (complementing client-side)
      if (!name || !address || !city || !state || !/^\d{7,15}$/.test(contact) || !/^\S+@\S+\.\S+$/.test(email_id)) {
        return res.status(400).json({ success: false, error: "Invalid form data" });
      }

      // file handling
      const fileObj = files?.image;
      if (!fileObj) {
        return res.status(400).json({ success: false, error: "Image is required" });
      }

      // formidable v3 can give either file or array
      const file = Array.isArray(fileObj) ? fileObj[0] : fileObj;
      const savedFileName = path.basename(file.newFilename || file.filepath || file.originalFilename);

      // If you deployed and want cloud: upload to bucket here instead.
      // For assignment: store filename only; we’ll serve from /public/schoolImages
      const insertSql =
        "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
      const params = [name, address, city, state, contact, savedFileName, email_id];

      await pool.execute(insertSql, params);
      res.status(201).json({ success: true, message: "School added successfully" });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: "Failed to add school" });
    }
    return;
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end("Method Not Allowed");
}
