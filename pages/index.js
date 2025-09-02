import Link from "next/link";

export default function Home() {
  return (
    <main className="container">
      <div className="card">
        <h1 className="title">📚 School Directory</h1>
        <p className="subtitle">Welcome! Please choose an action below:</p>

        <div className="actions">
          <Link href="/addSchool" className="btn add">
            ➕ Add a School
          </Link>
          <Link href="/showSchools" className="btn view">
            🏫 View Schools
          </Link>
        </div>
      </div>

      <style jsx>{`
        .container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #e0f2fe, #f1f5f9);
          padding: 2rem;
        }
        .card {
          background: #fff;
          padding: 2rem 3rem;
          border-radius: 16px;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
          text-align: center;
          max-width: 500px;
          width: 100%;
          animation: fadeIn 0.6s ease-in-out;
        }
        .title {
          font-size: 2.2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: #111827;
        }
        .subtitle {
          font-size: 1.1rem;
          margin-bottom: 2rem;
          color: #374151;
        }
        .actions {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        .btn {
          display: inline-block;
          padding: 0.9rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 10px;
          text-decoration: none;
          transition: transform 0.2s, background 0.3s;
          color: #fff;
        }
        .btn.add {
          background: #2563eb;
        }
        .btn.add:hover {
          background: #1d4ed8;
          transform: translateY(-2px);
        }
        .btn.view {
          background: #10b981;
        }
        .btn.view:hover {
          background: #059669;
          transform: translateY(-2px);
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 640px) {
          .card {
            padding: 1.5rem 1.5rem;
          }
          .title {
            font-size: 1.8rem;
          }
        }
      `}</style>
    </main>
  );
}
