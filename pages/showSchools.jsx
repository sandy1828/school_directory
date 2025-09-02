// pages/showSchools.jsx
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [board, setBoard] = useState("");
  const [type, setType] = useState("");
  const [hostel, setHostel] = useState("");

  // All major cities of India
  const cities = [
    "Mumbai",
    "Navi Mumbai",
    "Pune",
    "Nagpur",
    "Thane",
    "Nashik",
    "Aurangabad",
    "Solapur",
    "Kolhapur",
    "Amravati",
    "Delhi",
    "New Delhi",
    "Bengaluru",
    "Mysuru",
    "Hubballi",
    "Belagavi",
    "Chennai",
    "Coimbatore",
    "Madurai",
    "Tiruchirappalli",
    "Kolkata",
    "Howrah",
    "Durgapur",
    "Asansol",
    "Hyderabad",
    "Warangal",
    "Nizamabad",
    "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Jamnagar",
    "Gandhinagar",
    "Jaipur",
    "Jodhpur",
    "Udaipur",
    "Kota",
    "Ajmer",
    "Bikaner",
    "Alwar",
    "Lucknow",
    "Kanpur",
    "Varanasi",
    "Agra",
    "Ghaziabad",
    "Noida",
    "Meerut",
    "Patna",
    "Gaya",
    "Bhagalpur",
    "Muzaffarpur",
    "Munger",
    "Darbhanga",
    "Bhopal",
    "Indore",
    "Gwalior",
    "Jabalpur",
    "Ujjain",
    "Sagar",
    "Rewa",
    "Thiruvananthapuram",
    "Kochi",
    "Kozhikode",
    "Thrissur",
    "Alappuzha",
    "Kottayam",
    "Guwahati",
    "Dibrugarh",
    "Silchar",
    "Jorhat",
    "Nagaon",
    "Tezpur",
    "Barpeta",
    "Chandigarh",
    "Gurugram",
    "Faridabad",
    "Panchkula",
    "Ambala",
    "Hisar",
    "Rohtak",
    "Shimla",
    "Dharamshala",
    "Manali",
    "Kullu",
    "Solan",
    "Mandi",
    "Kasauli",
    "Ranchi",
    "Jamshedpur",
    "Dhanbad",
    "Bokaro",
    "Hazaribagh",
    "Deoghar",
    "Gangtok",
    "Namchi",
    "Mangan",
    "Jorethang",
    "Imphal",
    "Thoubal",
    "Churachandpur",
    "Bishnupur",
    "Kakching",
    "Kohima",
    "Dimapur",
    "Mokokchung",
    "Wokha",
    "Mon",
    "Aizawl",
    "Lunglei",
    "Champhai",
    "Kolasib",
    "Serchhip",
    "Port Blair",
    "Car Nicobar",
    "Mayabunder",
    "Diglipur",
    "Daman",
    "Silvassa",
    "Kavaratti",
    "Agatti",
    "Minicoy",
    "Srinagar",
    "Jammu",
    "Leh",
    "Kargil",
  ];

  useEffect(() => {
    fetchSchools();
  }, [search, city, board, type, hostel]);

  const fetchSchools = async () => {
    setLoading(true);
    let query = new URLSearchParams();

    if (search) query.append("search", search);
    if (city) query.append("city", city);
    if (board) query.append("board", board);
    if (type) query.append("type", type);
    if (hostel) query.append("hostel", hostel);

    const res = await fetch(`/api/schools?${query.toString()}`);
    const json = await res.json();
    setSchools(json?.data || []);
    setLoading(false);
  };

  return (
    <main className="container">
      {/* 🔙 Back to home */}
      <div className="backBtn">
        <Link href="/">
          <button>⬅ Back to Home</button>
        </Link>
      </div>

      <h1 className="mainTitle">School Search</h1>
      <p className="subTitle">Find the right school for your child.</p>

      {/* 🔎 Search bar */}
      <div className="searchBar">
        <input
          type="text"
          placeholder="School Name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={fetchSchools}>Search</button>
      </div>

      {/* 🏷️ Filters */}
      <div className="filters">
        <select onChange={(e) => setCity(e.target.value)} value={city}>
          <option value="">Choose City</option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select onChange={(e) => setBoard(e.target.value)} value={board}>
          <option value="">Choose Board</option>
          <option>CBSE</option>
          <option>ICSE</option>
          <option>State</option>
        </select>

        <select onChange={(e) => setType(e.target.value)} value={type}>
          <option value="">Choose Type</option>
          <option>Public</option>
          <option>Private</option>
        </select>

        <select onChange={(e) => setHostel(e.target.value)} value={hostel}>
          <option value="">Hostel Facility</option>
          <option>Yes</option>
          <option>No</option>
        </select>
      </div>

      {/* 🎓 Schools list */}
      {loading ? (
        <p>Loading...</p>
      ) : schools.length === 0 ? (
        <p>No schools found.</p>
      ) : (
        <section className="grid">
          {schools.map((s) => (
            <Link href={`/school/${s.id}`} key={s.id}>
              <article className="card">
                <div className="thumb">
                  <img
                    src={s.image}
                    alt={s.name}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                </div>
                <div className="info">
                  <h2 className="name">{s.name}</h2>
                  <p className="line">{s.address}</p>
                  <p className="muted">{s.city}</p>
                </div>
              </article>
            </Link>
          ))}
        </section>
      )}

      <style jsx>{`
        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 24px;
        }
        .backBtn {
          margin-bottom: 20px;
        }
        .backBtn button {
          padding: 8px 14px;
          background: #2563eb;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
        }
        .backBtn button:hover {
          background: #1e40af;
        }
        .mainTitle {
          font-size: 32px;
          font-weight: 700;
          text-align: center;
        }
        .subTitle {
          text-align: center;
          color: #6b7280;
          margin-bottom: 24px;
        }
        .searchBar {
          display: flex;
          justify-content: center;
          margin-bottom: 20px;
        }
        .searchBar input {
          padding: 10px;
          border: 1px solid #d1d5db;
          border-radius: 6px 0 0 6px;
          flex: 1;
          max-width: 400px;
        }
        .searchBar button {
          padding: 10px 18px;
          background: #22c55e;
          color: #fff;
          border: none;
          cursor: pointer;
          border-radius: 0 6px 6px 0;
        }
        .filters {
          display: flex;
          gap: 16px;
          justify-content: center;
          margin-bottom: 24px;
        }
        .filters select {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          background: #4ade80;
          color: white;
          font-weight: 600;
        }
        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 16px;
        }
        .card {
          border: 1px solid #e5e7eb;
          border-radius: 12px;
          background: #fff;
          overflow: hidden;
          cursor: pointer;
          transition: transform 0.2s;
        }
        .card:hover {
          transform: scale(1.02);
        }
        .thumb {
          width: 100%;
          aspect-ratio: 4/3;
          overflow: hidden;
        }
        .thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .info {
          padding: 12px;
        }
        .name {
          font-size: 18px;
          font-weight: 700;
          margin: 0;
        }
        .line {
          margin: 0;
          font-size: 14px;
        }
        .muted {
          margin: 0;
          color: #6b7280;
          font-size: 13px;
        }
      `}</style>
    </main>
  );
}
