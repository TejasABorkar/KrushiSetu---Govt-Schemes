import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getById } from "../services/schemeService";
import { Tag, MapPin, FileText, CheckCircle, ArrowLeft } from "lucide-react";

const SchemeDetails = () => {

  const { id } = useParams();
  const navigate = useNavigate();

  const [scheme, setScheme] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FIX: lang as state
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  // ✅ Sync lang when component loads
  useEffect(() => {
    const storedLang = localStorage.getItem("lang") || "en";
    setLang(storedLang);
  }, []);

  // ✅ Fetch scheme when id OR lang changes
  useEffect(() => {
    const fetchScheme = async () => {
      try {
        console.log("Fetching scheme with lang:", lang); // debug

        const data = await getById(id, lang);
        setScheme(data);

      } catch (error) {
        console.error("Error fetching scheme:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [id, lang]);

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Loading Scheme...</h2>;

  if (!scheme)
    return <h2 style={{ textAlign: "center" }}>Scheme Not Found</h2>;

  return (
    <div className="details-container">

      <button className="back-btn" onClick={() => navigate(-1)}>
        <ArrowLeft size={20} /> Back
      </button>

      <h2 className="details-title">{scheme.schemeName}</h2>

      {/* ✅ FIX: image path */}
      <img
        src={scheme.image}
        alt={scheme.schemeName}
        onError={(e) => (e.target.src = "/images/schemes/default.jpg")}
      />

      <p>
        <Tag size={20} className="icon" />
        <strong> Category:</strong> {scheme.category}
      </p>

      <p>
        <MapPin size={20} className="icon" />
        <strong> State:</strong> {scheme.state}
      </p>

      <p>
        <FileText size={20} className="icon" />
        <strong> Description:</strong> {scheme.description}
      </p>

      <p>
        <CheckCircle size={20} className="icon" />
        <strong> Eligibility:</strong> {scheme.eligibility}
      </p>

      <p>
        <strong>📄 Required Documents:</strong> {scheme.requiredDocuments}
      </p>

      <a
        href={scheme.officialLink}
        target="_blank"
        rel="noreferrer"
        className="btn"
      >
        Apply on Official Website
      </a>

    </div>
  );
};

export default SchemeDetails;