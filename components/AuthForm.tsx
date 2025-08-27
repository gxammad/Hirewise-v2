"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { FaGooglePlusG, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MailIcon, LockIcon } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BriefcaseIcon, UserIcon } from "lucide-react";
import ButtonLoading from "@/components/ButtonLoading";

interface AuthFormProps {
  type: "login" | "signup";
  bgImage?: string;
}

export default function AuthForm({ type, bgImage }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("USER");
  const [activePanel, setActivePanel] = useState(type === "signup" ? "signup" : "login");
  const [isDesktop, setIsDesktop] = useState(true);
  const router = useRouter();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState({ login: false, signup: false });
  const [shake, setShake] = useState(false); // State for shake animation

  useEffect(() => {
    setMounted(true);
    setIsDesktop(window.innerWidth >= 640);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  const showToast = (
    message: string,
    type: "success" | "error",
    autoCloseMs = 2000
  ) => {
    const options = {
      position: "top-right",
      autoClose: autoCloseMs,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: theme === "dark" ? "dark" : "light",
    };
    if (type === "success") {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const handleSubmit = async (e: React.FormEvent, formType: "login" | "signup") => {
    e.preventDefault();
    if (loading.login || loading.signup) return;

    setLoading((s) => ({ ...s, [formType]: true }));
    setShake(false); // Reset shake before submission

    try {
      const res = await fetch(`/api/auth/${formType}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      setLoading((s) => ({ ...s, [formType]: false }));

      if (res.ok) {
        const data = await res.json();

        if (formType === "signup") {
          showToast("Successfully registered", "success");
        } else {
          showToast("Welcome to HIREWISE", "success");
        }

        if (data?.redirect) {
          setTimeout(() => {
            router.push(data.redirect);
          }, 1200);
        }
      } else {
        let errMsg = "Something went wrong";
        try {
          const body = await res.json();
          if (body?.message) errMsg = body.message;
          if (errMsg.includes("invalid credentials") || errMsg.includes("wrong password")) {
            setShake(true); // Trigger shake animation for invalid credentials or wrong password
            setTimeout(() => setShake(false), 500); // Reset shake after 500ms
          }
        } catch {
          // ignore
        }
        showToast(errMsg, "error");
      }
    } catch (err) {
      setLoading((s) => ({ ...s, [formType]: false }));
      const message = err instanceof Error ? err.message : "Unknown error occurred";
      showToast(message, "error");
    }
  };

  if (!mounted) return null;

  const backgroundImage = bgImage || (theme === "dark" ? "/auth-dark.jpg" : "/auth-light.jpg");

  const buttonBaseClasses =
    "px-6 py-2 rounded-xl font-semibold transition-colors duration-300 bg-transparent border-2 border-gray-800 text-gray-800 dark:border-white dark:text-white";
  const buttonHoverClasses =
    "hover:bg-gray-800 hover:text-white hover:border-gray-800 dark:hover:bg-white dark:hover:text-gray-800 dark:hover:border-white";

  const signInButtonClasses = `${buttonBaseClasses} ${buttonHoverClasses}`;
  const signUpButtonClasses = `${buttonBaseClasses} ${buttonHoverClasses}`;

  const iconBaseClasses =
    "p-3 rounded-full cursor-pointer text-gray-800 border border-gray-800 bg-transparent dark:bg-transparent dark:text-white dark:border-white transition-colors duration-300";
  const iconHoverClasses = "hover:bg-gray-800 hover:text-white dark:hover:bg-white dark:hover:text-gray-800";

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={theme === "dark" ? "dark" : "light"}
      />

      <div
        className="flex items-center justify-center min-h-screen w-full bg-cover bg-center transition-colors duration-500"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div
          className="relative w-full max-w-[900px] min-h-[550px] rounded-xl overflow-hidden shadow-lg bg-white/10 dark:bg-black/20 backdrop-blur-lg transition-colors duration-500 mx-4 sm:mx-6"
          style={{ boxShadow: "0 4px 15px rgba(0,0,0,0.2)" }}
        >
          {(activePanel === "login" || isDesktop) && (
            <motion.div
              className={`w-full sm:w-1/2 h-full p-6 sm:p-10 sm:absolute sm:top-0 sm:left-0 sm:${activePanel === "signup" ? "-translate-x-full" : "translate-x-0"} transition-transform duration-[1600ms] ease-in-out`}
              animate={{ x: 0 }}
              initial={false}
            >
              <form onSubmit={(e) => handleSubmit(e, "login")} className="flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-white">Sign In</h1>

                <div className="flex space-x-3 mb-4 text-lg">
                  {[
                    { Icon: FaGooglePlusG, label: "Sign in with Google" },
                    { Icon: FaFacebookF, label: "Sign in with Facebook" },
                    { Icon: FaGithub, label: "Sign in with GitHub" },
                    { Icon: FaLinkedinIn, label: "Sign in with LinkedIn" },
                  ].map(({ Icon, label }) => (
                    <a key={label} href="#" className={`${iconBaseClasses} ${iconHoverClasses}`} aria-label={label}>
                      <Icon size={20} />
                    </a>
                  ))}
                </div>

                <span className="text-sm mb-4 text-gray-600 dark:text-gray-200">or use your account</span>

                <motion.div
                  className="relative mb-3 w-full"
                  animate={{ x: shake ? [0, -10, 10, -10, 10, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 pl-10 rounded bg-white/20 dark:bg-black/20 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white focus:outline-none text-sm sm:text-base"
                    required
                  />
                </motion.div>
                <motion.div
                  className="relative mb-3 w-full"
                  animate={{ x: shake ? [0, -10, 10, -10, 10, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 pl-10 rounded bg-white/20 dark:bg-black/20 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white focus:outline-none text-sm sm:text-base"
                    required
                  />
                </motion.div>
                <a href="#" className="text-sm mb-4 text-gray-600 dark:text-gray-200 hover:underline">
                  Forgot your password?
                </a>

                {loading.login ? (
                  <ButtonLoading fullWidth />
                ) : (
                  <button type="submit" className={`${signInButtonClasses} w-full text-sm sm:text-base`} disabled={loading.login}>
                    Sign In
                  </button>
                )}

                <div className="mt-4 sm:hidden">
                  <p className="text-sm text-gray-600 dark:text-gray-200">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setActivePanel("signup")}
                      className="text-gray-600 dark:text-white hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>
                </div>
              </form>
            </motion.div>
          )}

          {(activePanel === "signup" || isDesktop) && (
            <motion.div
              className={`w-full sm:w-1/2 h-full p-6 sm:p-10 sm:absolute sm:top-0 sm:right-0 sm:${activePanel === "login" ? "translate-x-full" : "translate-x-0"} transition-transform duration-[1600ms] ease-in-out`}
              animate={{ x: 0 }}
              initial={false}
            >
              <form onSubmit={(e) => handleSubmit(e, "signup")} className="flex flex-col items-center justify-center h-full text-center">
                <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-800 dark:text-white">Create Account</h1>

                <div className="flex space-x-3 mb-4 text-lg">
                  {[
                    { Icon: FaGooglePlusG, label: "Sign up with Google" },
                    { Icon: FaFacebookF, label: "Sign up with Facebook" },
                    { Icon: FaGithub, label: "Sign up with GitHub" },
                    { Icon: FaLinkedinIn, label: "Sign up with LinkedIn" },
                  ].map(({ Icon, label }) => (
                    <a key={label} href="#" className={`${iconBaseClasses} ${iconHoverClasses}`} aria-label={label}>
                      <Icon size={20} />
                    </a>
                  ))}
                </div>

                <span className="text-sm mb-4 text-gray-600 dark:text-gray-100">or use your email for registration</span>

                <motion.div
                  className="relative mb-3 w-full"
                  animate={{ x: shake ? [0, -10, 10, -10, 10, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white" />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 pl-10 rounded bg-white/20 dark:bg-black/20 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white focus:outline-none text-sm sm:text-base"
                    required
                  />
                </motion.div>
                <motion.div
                  className="relative mb-3 w-full"
                  animate={{ x: shake ? [0, -10, 10, -10, 10, 0] : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <LockIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-white" />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 pl-10 rounded bg-white/20 dark:bg-black/20 border border-gray-300 dark:border-gray-700 text-gray-800 dark:text-white placeholder-gray-500 dark:placeholder-white focus:outline-none text-sm sm:text-base"
                    required
                  />
                </motion.div>
                <div className="mb-4 w-full">
                  <Select value={role} onValueChange={(val) => setRole(val)}>
                    <SelectTrigger className="w-full p-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 bg-white/20 dark:bg-black/20 text-gray-800 dark:text-white focus:ring-2 focus:ring-blue-500 text-sm sm:text-base">
                      <SelectValue placeholder="Select your role" />
                    </SelectTrigger>
                    <SelectContent className="rounded-lg shadow-lg">
                      <SelectItem value="USER" className="flex items-center gap-2">
                        <UserIcon className="h-4 w-4 dark:text-white" />
                        Job Seeker
                      </SelectItem>
                      <SelectItem value="ADMIN" className="flex items-center gap-2">
                        <BriefcaseIcon className="h-4 w-4 dark:text-white" />
                        Recruiter
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {loading.signup ? (
                  <ButtonLoading fullWidth />
                ) : (
                  <button type="submit" className={`${signUpButtonClasses} w-full text-sm sm:text-base`} disabled={loading.signup}>
                    Sign Up
                  </button>
                )}

                <div className="mt-4 sm:hidden">
                  <p className="text-sm text-gray-600 dark:text-gray-200">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setActivePanel("login")}
                      className="text-gray-600 dark:text-white hover:underline"
                    >
                      Sign In
                    </button>
                  </p>
                </div>
              </form>
            </motion.div>
          )}

          <motion.div
            className={`absolute top-0 w-1/2 h-full hidden sm:flex items-center justify-center p-10 text-center bg-gray-100 dark:bg-gray-900 transition-colors duration-500`}
            initial={false}
            animate={{
              x: activePanel === "signup" ? 0 : "100%",
            }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              duration: 0.6,
            }}
          >
            <div className="flex flex-col items-center">
              <Image
                src={theme === "dark" ? "/logowhite.png" : "/logoblack.png"}
                alt="Logo"
                width={200}
                height={200}
                className="mb-4"
              />
              {activePanel === "signup" ? (
                <>
                  <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Welcome to HIREWISE</h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Enter your personal details to use all site features</p>
                  <button onClick={() => setActivePanel("login")} className="px-6 py-2 border border-black dark:border-white text-black dark:text-white rounded hover:opacity-80 transition">
                    Sign In
                  </button>
                </>
              ) : (
                <>
                  <h1 className="text-2xl font-bold mb-4 text-black dark:text-white">Welcome to HIREWISE</h1>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">Register with your details to use all site features</p>
                  <button onClick={() => setActivePanel("signup")} className="px-6 py-2 border border-black dark:border-white text-black dark:text-white rounded hover:opacity-80 transition">
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}