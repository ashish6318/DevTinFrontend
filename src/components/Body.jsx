import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect, useState, useCallback } from "react";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);

  // Fetch user only if not already available
  const fetchUser = useCallback(async () => {
    if (userData) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(`${BASE_URL}/profile/view`, {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.response?.status === 401) {
        navigate("/login");
      }
      console.error("Error fetching user:", err);
    } finally {
      setLoading(false);
    }
  }, [userData, dispatch, navigate]); // ✅ Added dependencies

  useEffect(() => {
    fetchUser();
  }, [fetchUser]); // ✅ Depend on `fetchUser` to avoid re-renders

  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      <main className="flex-1 p-4">
        {loading ? <p className="text-center">Loading...</p> : <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Body;

