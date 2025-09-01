// pages/addSchool.jsx
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm();

  const [serverMsg, setServerMsg] = useState("");

  const onSubmit = async (data) => {
    setServerMsg("");

    const formData = new FormData();
    Object.entries(data).forEach(([k, v]) => {
      formData.append(k, v);
    });

    const res = await fetch("/api/schools", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    if (json.success) {
      setServerMsg("✅ School added successfully!");
      reset();
    } else {
      setServerMsg(`❌ ${json.error || "Something went wrong"}`);
    }
  };

  return (
    <main className="container">
      <h1 className="title">Add School</h1>

      <form className="card" onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="grid">
          <label>
            School Name*
            <input
              type="text"
              placeholder="e.g., Sunrise Public School"
              {...register("name", { required: "School name is required", minLength: { value: 2, message: "Too short" } })}
            />
            {errors.name && <span className="err">{errors.name.message}</span>}
          </label>

          <label>
            Email*
            <input
              type="email"
              placeholder="contact@school.edu"
              {...register("email_id", {
                required: "Email is required",
                pattern: { value: /^\S+@\S+\.\S+$/, message: "Invalid email" },
              })}
            />
            {errors.email_id && <span className="err">{errors.email_id.message}</span>}
          </label>

          <label>
            Contact Number*
            <input
              type="tel"
              placeholder="10-15 digits"
              {...register("contact", {
                required: "Contact is required",
                pattern: { value: /^\d{7,15}$/, message: "Digits only (7-15)" },
              })}
            />
            {errors.contact && <span className="err">{errors.contact.message}</span>}
          </label>

          <label>
            City*
            <input
              type="text"
              placeholder="City"
              {...register("city", { required: "City is required" })}
            />
            {errors.city && <span className="err">{errors.city.message}</span>}
          </label>

          <label>
            State*
            <input
              type="text"
              placeholder="State"
              {...register("state", { required: "State is required" })}
            />
            {errors.state && <span className="err">{errors.state.message}</span>}
          </label>

          <label className="wide">
            Address*
            <textarea
              rows={3}
              placeholder="Street, Area, Landmark"
              {...register("address", { required: "Address is required", minLength: { value: 5, message: "Too short" } })}
            />
            {errors.address && <span className="err">{errors.address.message}</span>}
          </label>

          <label className="wide">
            School Image* (JPG/PNG)
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Image is required",
                validate: {
                  fileType: (v) => (v?.[0]?.type?.startsWith("image/") ? true : "Must be an image"),
                  fileSize: (v) => ((v?.[0]?.size || 0) <= 5 * 1024 * 1024 ? true : "Max 5MB"),
                },
              })}
            />
            {errors.image && <span className="err">{errors.image.message}</span>}
          </label>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : "Save School"}
        </button>

        {serverMsg && <p className="serverMsg">{serverMsg}</p>}
      </form>

      <style jsx>{`
        .container { max-width: 920px; margin: 0 auto; padding: 24px; }
        .title { font-size: 28px; font-weight: 700; margin-bottom: 16px; }
        .card { background: #fff; border: 1px solid #eaeaea; border-radius: 12px; padding: 16px; }
        .grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        label { display: flex; flex-direction: column; font-size: 14px; gap: 6px; }
        .wide { grid-column: 1 / -1; }
        input, textarea { border: 1px solid #ccc; border-radius: 8px; padding: 10px; font-size: 14px; }
        button { margin-top: 12px; padding: 12px 16px; border: none; background: #111827; color: #fff; border-radius: 10px; font-weight: 600; }
        .err { color: #b91c1c; font-size: 12px; }
        .serverMsg { margin-top: 10px; }
        @media (max-width: 640px) { .grid { grid-template-columns: 1fr; } }
      `}</style>
    </main>
  );
}
