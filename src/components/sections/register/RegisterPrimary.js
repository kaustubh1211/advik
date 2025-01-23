"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";

const RegisterPrimary = () => {
  const [error, setError] = useState(null);



  //set all data in object
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password != formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    console.log(formData);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      if (response.ok) {
        alert("Registration successful! Please log in.");
        setFormData({
          name: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        window.location.href = "/login";
      } else {
        alert(result.message);
      }
    } catch (err) {
      console.log("Error-registeration" + err);
    }
  };
  return (
    <div className="ltn__login-area pb-110">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                Register <br />
                Your Account
              </h1>
              <p>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. <br />
                Sit aliquid, Non distinctio vel iste.
              </p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="account-login-inner">
              <form
                action="#"
                onSubmit={handleSubmit}
                className="ltn__form-box contact-form-box"
              >
                <input
                  type="text"
                  name="firstname"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  placeholder="Last Name"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Email*"
                  required
                />
                <input
                  type="password"
                  name="password"
                  placeholder="Password*"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
                <input
                  type="password"
                  name="confirmpassword"
                  placeholder="Confirm Password*"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <label className="checkbox-inline">
                  <input type="checkbox" /> I consent to Herboil processing my
                  personal data in order to send personalized marketing material
                  in accordance with the consent form and the privacy policy.
                </label>
                <label className="checkbox-inline">
                  <input type="checkbox" /> By clicking {`"create account"`}, I
                  consent to the privacy policy.
                </label>
                <div className="btn-wrapper">
                  <button
                    className="theme-btn-1 btn reverse-color btn-block"
                    type="submit"
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
              </form>
              <div className="by-agree text-center">
                <p>By creating an account, you agree to our:</p>
                <p>
                  <Link href="#">
                    TERMS OF CONDITIONS &nbsp; &nbsp; | &nbsp; &nbsp; PRIVACY
                    POLICY
                  </Link>
                </p>
                <div className="go-to-btn mt-50">
                  <Link href="/login">ALREADY HAVE AN ACCOUNT ?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPrimary;
