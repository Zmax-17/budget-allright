import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import supabase from "../services/supabase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To display loading

  // Check session on startup
  useEffect(() => {
    const getSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        console.log("Initial session:", session?.user);
        setUser(session?.user ?? null);
      } catch (error) {
        console.error("Error fetching session:", error);
        setUser(null);
      } finally {
        setLoading(false); // Finish loading
      }
    };
    getSession();

    // Subscribe to state changes
    const { data: listener } =
      supabase.auth.onAuthStateChange((_event, session) => {
        console.log("Auth state changed:", session?.user);
        setUser(session?.user ?? null);
      });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const signup = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (!error) setUser(data.user);
    return { error };
  };

  const login = async (email, password) => {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    if (error) throw error;
    setUser(data.user);
    return { data, error };
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem("supabase.auth.token");
      setUser(null);
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, signup, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error(
      "useAuth must be used within an AuthProvider"
    );
  }
  return context;
};

export default AuthProvider;
