"use client";

import Link from "next/link";
import React from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import { useEffect } from "react";
import useSweetAlert from "@/hooks/useSweetAlert";
import { useState } from "react";
import '.././../../assets/css/custom.css'


const LoginPrimary = () => {
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);

  const alertS = useSweetAlert();
 
  const { data: session } = useSession();
  useEffect(() => {
    // Prevent mismatches by waiting for client hydration
    console.log("Session:", session);
  }, [session]);

  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      if (result?.error) {
        setError("Invalid email or password");
      } else {
        // alert("Login successful!");
      }
    } catch (err) {
      console.log(err);
    }
  };
  // Ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only render after client-side hydration
  if (!isClient) {
    return null;
  }
  if (session) {
    return (
      <div className={" text-center"}>
        <div className="account-create text-center pt-00">
          <h1>WELCOME {session.user.name}!</h1>
          <p>You are already signed in.</p>
          <button
            className="theme-btn-1 btn reverse-color btn-block"
            type="submit"
            onClick={() => {
              signOut();
            }}
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="ltn__login-area pb-65">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                Sign In <br />
                To Your Account
              </h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
                Sit aliquid, Non distinctio vel iste.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <div className="account-login-inner">
              <div className="text-center">

              <button
                onClick={() => signIn("google", { callbackUrl: "/" })}
                className="login-with-google-btn"
                >
                Login with Google
              </button>
                </div>
              <form
                onSubmit={handleLogin}
                className="ltn__form-box contact-form-box"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="email*"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password*"
                  required
                />

                {error && <p style={{ color: "red" }}>{error}</p>}

                <div className="btn-wrapper mt-0">
                  <button
                    className="theme-btn-1 btn btn-block w-100"
                    type="submit"
                  >
                    SIGN IN
                  </button>
                </div>

                <div className="go-to-btn mt-20">
                  <Link
                    href="#"
                    title="Wishlist"
                    data-bs-toggle="modal"
                    data-bs-target="#ltn_forget_password_modal"
                  >
                    <small>FORGOTTEN YOUR PASSWORD?</small>
                  </Link>
                </div>
              </form>
            </div>
          </div>
          <div className="col-lg-6">
            <div className="account-create text-center pt-50">
              <h4>{"DON'T"} HAVE AN ACCOUNT?</h4>
              <p>
                Add items to your wishlistget personalised recommendations{" "}
                <br />
                check out more quickly track your orders register
              </p>
              <div className="btn-wrapper">
                <Link href="/register" className="theme-btn-1 btn black-btn">
                  CREATE ACCOUNT
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPrimary;
