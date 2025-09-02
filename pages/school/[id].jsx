import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function SchoolDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [school, setSchool] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    (async () => {
      setLoading(true);
      const res = await fetch(`/api/schools/${id}`);
      const json = await res.json();
      setSchool(json?.data || null);
      setLoading(false);
    })();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!school) return <p>School not found.</p>;

  return (
    <main className="container">
      {/* ✅ Back Button */}
      <button className="back-btn" onClick={() => router.back()}>
        ⬅ Back
      </button>

      <h1 className="title">{school.name}</h1>
      <div className="info-box">
        {school.image && (
          <img src={school.image} alt={school.name} className="banner" />
        )}

        <div className="details">
          <p>
            <strong>Board:</strong> {school.board}
          </p>
          <p>
            <strong>Type:</strong> {school.type}
          </p>
          <p>
            <strong>Hostel:</strong> {school.hostel}
          </p>
          <p>
            <strong>Address:</strong> {school.address}, {school.city},{" "}
            {school.state}
          </p>
          <p>
            <strong>Contact:</strong> {school.contact}
          </p>
          <p>
            <strong>Email:</strong> {school.email_id}
          </p>
          <p>
            <strong>Website:</strong>
            <a href={school.website} target="_blank" rel="noreferrer">
              {school.website}
            </a>
          </p>
          <p>
            <strong>Avg. Fees:</strong> ₹{school.fees} per year
          </p>
          <p>
            <strong>Medium:</strong> {school.medium}
          </p>
          <p>
            <strong>Level:</strong> {school.level}
          </p>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 24px;
        }
        .title {
          font-size: 28px;
          font-weight: bold;
          margin-bottom: 16px;
        }
        .info-box {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .banner {
          width: 100%;
          border-radius: 12px;
        }
        .details {
          font-size: 16px;
          line-height: 1.6;
        }
        .details p {
          margin: 8px 0;
        }
        .details a {
          color: #2563eb;
          text-decoration: underline;
        }
        .back-btn {
          background: #2563eb;
          color: white;
          border: none;
          padding: 8px 16px;
          border-radius: 6px;
          cursor: pointer;
          margin-bottom: 16px;
        }
        .back-btn:hover {
          background: #1e40af;
        }
      `}</style>
    </main>
  );
}
