// pages/api/schools/index.js
import formidable from "formidable";
import fs from "fs";
import path from "path";
import supabase from "@/lib/supabase";

export const config = {
  api: {
    bodyParser: false, // important for file upload
  },
};

const uploadDir = path.join(process.cwd(), "public", "schoolImages");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

function parseForm(req) {
  const form = formidable({
    multiples: false,
    uploadDir,
    keepExtensions: true,
    filename: (name, ext, part) => {
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
  if (req.method === "GET") {
    try {
      const { search, city, board, type, hostel } = req.query;

      let query = supabase.from("schools").select("*");

      // Supabase filter conditions
      if (search) query = query.ilike("name", `%${search}%`);
      if (city) query = query.eq("city", city);
      if (board) query = query.eq("board", board);
      if (type) query = query.eq("type", type);
      if (hostel) query = query.eq("hostel", hostel);

      const { data, error } = await query.order("id", { ascending: false });

      if (error) throw error;

      // prepend image path
      const mappedData = data.map((r) => ({
        ...r,
        image: r.image ? `/schoolImages/${r.image}` : null,
      }));

      res.status(200).json({ success: true, data: mappedData });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: e.message });
    }
  } else if (req.method === "POST") {
    try {
      const { fields, files } = await parseForm(req);

      const {
        name,
        address,
        city,
        state,
        contact,
        email_id,
        board,
        type,
        hostel,
        website,
        fees,
        medium,
        level,
      } = fields;

      if (!name || !address || !city || !state || !contact || !email_id) {
        return res.status(400).json({ success: false, error: "Missing required fields" });
      }

      const fileObj = files?.image;
      if (!fileObj) return res.status(400).json({ success: false, error: "Image is required" });

      const file = Array.isArray(fileObj) ? fileObj[0] : fileObj;
      const savedFileName = path.basename(file.newFilename || file.filepath || file.originalFilename);

      const { data, error } = await supabase
        .from("schools")
        .insert([
          {
            name,
            address,
            city,
            state,
            contact,
            email_id,
            board: board || null,
            type: type || null,
            hostel: hostel || null,
            website: website || null,
            fees: fees ? Number(fees) : null,
            medium: medium || null,
            level: level || null,
            image: savedFileName,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      res.status(201).json({ success: true, data });
    } catch (e) {
      console.error(e);
      res.status(500).json({ success: false, error: e.message });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end("Method Not Allowed");
  }
}
