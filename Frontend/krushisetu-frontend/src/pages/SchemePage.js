import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Leaf,
  Tag,
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  getAllSchemes,
  getByCategory,
  getByState
} from "../services/schemeService";

const SchemePage = () => {

  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("");
  const [state, setState] = useState("");
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ FIX: lang as state
  const [lang, setLang] = useState(localStorage.getItem("lang") || "en");

  const schemesPerPage = 8;

  // ✅ Fetch schemes when lang changes
  useEffect(() => {
    fetchSchemes();
  }, [lang]);

  const fetchSchemes = async () => {
    try {
      console.log("Fetching all schemes with lang:", lang); // debug
      const data = await getAllSchemes(lang);
      setSchemes(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIX: remove reload
  const changeLanguage = (newLang) => {
    localStorage.setItem("lang", newLang);
    setLang(newLang);
    setCurrentPage(1);
  };

  const handleCategoryChange = async (e) => {
    const value = e.target.value;
    setCategory(value);
    setState("");
    setCurrentPage(1);

    if (!value) return fetchSchemes();

    const data = await getByCategory(value, lang);
    setSchemes(data);
  };

  const handleStateChange = async (e) => {
    const value = e.target.value;
    setState(value);
    setCategory("");
    setCurrentPage(1);

    if (!value) return fetchSchemes();

    const data = await getByState(value, lang);
    setSchemes(data);
  };

  const filteredSchemes = schemes.filter((scheme) =>
    scheme.schemeName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredSchemes.length / schemesPerPage);
  const indexOfLast = currentPage * schemesPerPage;
  const indexOfFirst = indexOfLast - schemesPerPage;
  const currentSchemes = filteredSchemes.slice(indexOfFirst, indexOfLast);

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading)
    return <h2 style={{ textAlign: "center" }}>Loading Schemes...</h2>;

  return (
    <div className="container">

      <h2 className="main-heading">
        <Leaf size={30} />
        Government Schemes
      </h2>

      <div className="filters">

        {/* 🌐 Language Switch */}
        <select
          onChange={(e) => changeLanguage(e.target.value)}
          value={lang}
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="mr">Marathi</option>
        </select>

        <div className="search-box">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search schemes..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select value={category} onChange={handleCategoryChange}>
          <option value="">Filter by Category</option>
          <option value="Central Government">Central Government</option>
          <option value="Insurance">Insurance</option>
          <option value="Loan">Loan</option>
          <option value="Solar">Solar</option>
          <option value="Irrigation">Irrigation</option>
          <option value="Subsidy">Subsidy</option>
          <option value="Dairy">Dairy</option>
          <option value="Poultry">Poultry</option>
          <option value="Organic Farming">Organic Farming</option>
          <option value="Horticulture">Horticulture</option>
          <option value="Fisheries">Fisheries</option>
          <option value="Warehouse">Warehouse</option>
          <option value="Infrastructure">Infrastructure</option>
          <option value="Women Farmer">Women Farmer</option>
          <option value="SC/ST">SC/ST</option>
          <option value="Cold Storage">Cold Storage</option>
        </select>

        <select value={state} onChange={handleStateChange}>
          <option value="">Filter by State</option>
          <option value="All India">All India</option>
          <option value="Maharashtra">Maharashtra</option>
          <option value="Punjab">Punjab</option>
          <option value="Rajasthan">Rajasthan</option>
          <option value="Madhya Pradesh">Madhya Pradesh</option>
          <option value="Uttar Pradesh">Uttar Pradesh</option>
          <option value="Karnataka">Karnataka</option>
          <option value="Gujarat">Gujarat</option>
        </select>

      </div>

      <div className="grid">
        {currentSchemes.map((scheme) => (
          <div key={scheme.id} className="card">

            <img
              src={scheme.image}
              alt={scheme.schemeName}
            />

            <div className="card-body">
              <h3>{scheme.schemeName}</h3>

              <p className="category-text">
                <Tag size={16} />
                {scheme.category}
              </p>

              <p>{scheme.description?.substring(0, 100)}...</p>

              <Link to={`/scheme/${scheme.id}`} className="btn">
                View Details <ArrowRight size={16} />
              </Link>
            </div>

          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="pagination">

          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            <ChevronLeft size={18} /> Prev
          </button>

          <span className="page-info">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => changePage(currentPage + 1)}
          >
            Next <ChevronRight size={18} />
          </button>

        </div>
      )}

    </div>
  );
};

export default SchemePage;