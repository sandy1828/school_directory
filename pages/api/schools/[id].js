import supabase from "@/lib/supabase";

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { data, error } = await supabase
      .from("schools")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;

    const mappedData = {
      ...data,
      image: data.image ? `/schoolImages/${data.image}` : null,
    };

    return res.status(200).json({ success: true, data: mappedData });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ success: false, error: e.message });
  }
}
