    import { useForm } from "react-hook-form";
    import { useState } from "react";
    import Link from "next/link";

    const statesWithCities = {
    Maharashtra: [
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
    ],
    Delhi: ["Delhi", "New Delhi"],
    Karnataka: ["Bengaluru", "Mysuru", "Hubballi", "Belagavi"],
    TamilNadu: ["Chennai", "Coimbatore", "Madurai", "Tiruchirappalli"],
    WestBengal: ["Kolkata", "Howrah", "Durgapur", "Asansol"],
    Telangana: ["Hyderabad", "Warangal", "Nizamabad"],
    Gujarat: [
        "Ahmedabad",
        "Surat",
        "Vadodara",
        "Rajkot",
        "Bhavnagar",
        "Jamnagar",
        "Gandhinagar",
    ],
    Rajasthan: [
        "Jaipur",
        "Jodhpur",
        "Udaipur",
        "Kota",
        "Ajmer",
        "Bikaner",
        "Alwar",
    ],
    UttarPradesh: [
        "Lucknow",
        "Kanpur",
        "Varanasi",
        "Agra",
        "Ghaziabad",
        "Noida",
        "Meerut",
    ],
    Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Munger", "Darbhanga"],
    MadhyaPradesh: [
        "Bhopal",
        "Indore",
        "Gwalior",
        "Jabalpur",
        "Ujjain",
        "Sagar",
        "Rewa",
    ],
    Kerala: [
        "Thiruvananthapuram",
        "Kochi",
        "Kozhikode",
        "Thrissur",
        "Alappuzha",
        "Kottayam",
    ],
    Assam: [
        "Guwahati",
        "Dibrugarh",
        "Silchar",
        "Jorhat",
        "Nagaon",
        "Tezpur",
        "Barpeta",
    ],
    Haryana: ["Gurugram", "Faridabad", "Panchkula", "Ambala", "Hisar", "Rohtak"],
    HimachalPradesh: [
        "Shimla",
        "Dharamshala",
        "Manali",
        "Kullu",
        "Solan",
        "Mandi",
        "Kasauli",
    ],
    Jharkhand: [
        "Ranchi",
        "Jamshedpur",
        "Dhanbad",
        "Bokaro",
        "Hazaribagh",
        "Deoghar",
    ],
    Sikkim: ["Gangtok", "Namchi", "Mangan", "Jorethang"],
    Manipur: ["Imphal", "Thoubal", "Churachandpur", "Bishnupur", "Kakching"],
    Nagaland: ["Kohima", "Dimapur", "Mokokchung", "Wokha", "Mon"],
    Mizoram: ["Aizawl", "Lunglei", "Champhai", "Kolasib", "Serchhip"],
    AndamanNicobar: ["Port Blair", "Car Nicobar", "Mayabunder", "Diglipur"],
    DamanDiu: ["Daman", "Silvassa"],
    Lakshadweep: ["Kavaratti", "Agatti", "Minicoy"],
    JammuKashmir: ["Srinagar", "Jammu", "Leh", "Kargil"],
    Chandigarh: ["Chandigarh"],
    };

    export default function AddSchool() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm();

    const [serverMsg, setServerMsg] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [cities, setCities] = useState([]);

    const handleStateChange = (e) => {
        const state = e.target.value;
        setSelectedState(state);
        setCities(statesWithCities[state] || []);
    };

    const onSubmit = async (data) => {
        setServerMsg("");

        // Handle board array
        const boards = [];
        if (data.board_state) boards.push("State");
        if (data.board_cbse) boards.push("CBSE");
        if (data.board_international) boards.push("International");
        data.board = boards;
        delete data.board_state;
        delete data.board_cbse;
        delete data.board_international;

        // Convert hostel to boolean
        data.hostel = data.hostel === "Yes" ? true : false;

        // Prepare FormData
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) => {
        if (key === "image") formData.append(key, value[0]);
        else formData.append(key, value);
        });

        try {
        const res = await fetch("/api/schools", {
            method: "POST",
            body: formData,
        });
        const json = await res.json();
        if (json.success) {
            setServerMsg("✅ School added successfully!");
            reset();
            setSelectedState("");
            setCities([]);
        } else {
            setServerMsg(`❌ ${json.error || "Something went wrong"}`);
        }
        } catch (err) {
        console.error(err);
        setServerMsg("❌ Network error");
        }
    };

    return (
        <main className="container">
        <h1 className="title">Add School</h1>
        <form
            onSubmit={handleSubmit(onSubmit)}
            encType="multipart/form-data"
            className="card"
        >
            <div className="grid">
            <label>
                School Name*
                <input
                type="text"
                {...register("name", { required: true, minLength: 2 })}
                />
                {errors.name && <span className="err">Required</span>}
            </label>

            <label>
                Email*
                <input type="email" {...register("email_id", { required: true })} />
                {errors.email_id && <span className="err">Required</span>}
            </label>

            <label>
                Contact*
                <input type="tel" {...register("contact", { required: true })} />
                {errors.contact && <span className="err">Required</span>}
            </label>

            <label>
                State*
                <select
                {...register("state", {
                    required: true,
                    onChange: handleStateChange,
                })}
                defaultValue=""
                >
                <option value="">-- Select State --</option>
                {Object.keys(statesWithCities).map((s) => (
                    <option key={s} value={s}>
                    {s}
                    </option>
                ))}
                </select>
                {errors.state && <span className="err">Required</span>}
            </label>

            <label>
                City*
                <select {...register("city", { required: true })}>
                <option value="">-- Select City --</option>
                {cities.map((c) => (
                    <option key={c} value={c}>
                    {c}
                    </option>
                ))}
                </select>
                {errors.city && <span className="err">Required</span>}
            </label>

            <label className="wide">
                Address*
                <textarea
                {...register("address", { required: true, minLength: 5 })}
                />
                {errors.address && <span className="err">Required</span>}
            </label>

            <label className="wide">
                School Image*
                <input
                type="file"
                accept=".jpg,.jpeg,.png"
                {...register("image", { required: true })}
                />
                {errors.image && <span className="err">Required</span>}
            </label>

            <fieldset className="wide">
                <legend>Board</legend>
                <label>
                <input type="checkbox" {...register("board_state")} /> State
                </label>
                <label>
                <input type="checkbox" {...register("board_cbse")} /> CBSE
                </label>
                <label>
                <input type="checkbox" {...register("board_international")} />{" "}
                International
                </label>
            </fieldset>

            <label>
                Type
                <select {...register("type")}>
                <option value="">-- Select Type --</option>
                <option value="Public">Public</option>
                <option value="Private">Private</option>
                </select>
            </label>

            <label>
                Hostel Facility
                <select {...register("hostel")}>
                <option value="">-- Select --</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                </select>
            </label>

            <label>
                Website
                <input type="url" {...register("website")} />
            </label>

            <label>
                Average Fees
                <input type="number" {...register("fees")} />
            </label>

            <label>
                Medium of Instruction
                <select {...register("medium")}>
                <option value="">-- Select --</option>
                <option value="English">English</option>
                <option value="Hindi">Hindi</option>
                <option value="Marathi">Marathi</option>
                <option value="Gujarati">Gujarati</option>
                </select>
            </label>

            <label>
                School Level
                <select {...register("level")}>
                <option value="">-- Select --</option>
                <option value="UGC">UGC</option>
                <option value="PGC">PGC</option>
                <option value="SSC">SSC</option>
                <option value="HSC">HSC</option>
                </select>
            </label>
            </div>

            <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save School"}
            </button>

            {serverMsg && <p className="serverMsg">{serverMsg}</p>}
        </form>

        {/* Back to Home Button */}
        <div className="backBtnWrapper">
            <Link href="/" className="backBtn">
            ⬅ Back to Home
            </Link>
        </div>

        <style jsx>{`
            .container {
            max-width: 920px;
            margin: auto;
            padding: 24px;
            }
            .title {
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 16px;
            }
            .card {
            background: #fff;
            border: 1px solid #eaeaea;
            border-radius: 12px;
            padding: 16px;
            }
            .grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            }
            label,
            fieldset {
            display: flex;
            flex-direction: column;
            gap: 6px;
            font-size: 14px;
            }
            .wide {
            grid-column: 1/-1;
            }
            input,
            select,
            textarea {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            font-size: 14px;
            }
            fieldset {
            border: 1px solid #ccc;
            border-radius: 8px;
            padding: 10px;
            }
            legend {
            font-weight: 600;
            margin-bottom: 6px;
            }
            button {
            margin-top: 12px;
            padding: 12px 16px;
            border: none;
            background: #111827;
            color: #fff;
            border-radius: 10px;
            font-weight: 600;
            }
            .err {
            color: #b91c1c;
            font-size: 12px;
            }
            .serverMsg {
            margin-top: 10px;
            }
            .backBtnWrapper {
            margin-top: 20px;
            text-align: center;
            }
            .backBtn {
            display: inline-block;
            padding: 10px 20px;
            background: #f3f4f6;
            color: #111827;
            border-radius: 8px;
            text-decoration: none;
            font-weight: 600;
            }
            .backBtn:hover {
            background: #e5e7eb;
            }
            @media (max-width: 640px) {
            .grid {
                grid-template-columns: 1fr;
            }
            }
        `}</style>
        </main>
    );
    }
