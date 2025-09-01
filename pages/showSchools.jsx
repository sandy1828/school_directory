// pages/showSchools.jsx
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await fetch("/api/schools");
      const json = await res.json();
      setSchools(json?.data || []);
      setLoading(false);
    })();
  }, []);

  return (
    <main className="container">
      <h1 className="title">Schools</h1>

      {loading ? (
        <p>Loading...</p>
      ) : schools.length === 0 ? (
        <p>No schools yet. Add one from <a href="/addSchool">Add School</a>.</p>
      ) : (
        <section className="grid">
          {schools.map((s) => (
            <article key={s.id} className="card">
              <div className="thumb">
                <img src={s.image} alt={s.name} />
              </div>
              <div className="info">
                <h2 className="name">{s.name}</h2>
                <p className="line">{s.address}</p>
                <p className="muted">{s.city}</p>
              </div>
            </article>
          ))}
        </section>
      )}

      <style jsx>{`
        .container { max-width: 1100px; margin: 0 auto; padding: 24px; }
        .title { font-size: 28px; font-weight: 700; margin-bottom: 16px; }
        .grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 16px;
        }
        .card {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fff;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .thumb { width: 100%; aspect-ratio: 4/3; overflow: hidden; }
        .thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .info { padding: 12px; display: grid; gap: 6px; }
        .name { font-size: 16px; font-weight: 700; margin: 0; }
        .line { margin: 0; font-size: 14px; }
        .muted { margin: 0; color: #6b7280; font-size: 13px; }
        @media (max-width: 1024px) { .grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px) { .grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 520px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
