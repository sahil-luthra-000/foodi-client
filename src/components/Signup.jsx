import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaFacebookF, FaGithub, FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { AuthContext } from "../contexts/AuthProvider";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Signup = () => {
  const { signUpWithGmail, createUser, updateUserProfile } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;

    createUser(email, password)
      .then((result) => {
        // Signed up successfully
        const user = result.user;
        console.log("User created: ", user);

        // Update profile
        updateUserProfile(data.name, data.photoURL)
          .then(() => {
            const userInfor = {
              name: data.name,
              email: data.email,
            };

            // Post user information to backend
            console.log("Submitting user info: ", userInfor);
            axiosPublic
              .post("/users", userInfor)
              .then((response) => {
                console.log("Signup response: ", response.data);
                alert("Signin successful!");
                navigate(from, { replace: true });
              })
              .catch((error) => {
                console.error("Axios error: ", error.response?.data || error.message);
              });
          })
          .catch((error) => {
            console.error("Update profile error: ", error.message);
          });
      })
      .catch((error) => {
        console.error("Create user error: ", error.message);
      });
  };

  // Sign up with Google
  const handleRegister = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };

        axiosPublic
          .post("/users", userInfor)
          .then((response) => {
            console.log("Google signup response: ", response.data);
            alert("Signin successful!");
            navigate(from, { replace: true });
          })
          .catch((error) => {
            console.error("Axios error: ", error.response?.data || error.message);
          });
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5">
        <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="font-bold text-lg">Please Create An Account!</h3>

          {/* Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="input input-bordered"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>

          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Password"
              className="input input-bordered"
              {...register("password", { required: "Password is required" })}
            />
            {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          </div>

          {/* Submit Button */}
          <div className="form-control mt-6">
            <input type="submit" className="btn bg-green text-white" value="Sign up" />
          </div>

          <div className="text-center my-2">
            Have an account?{" "}
            <Link to="/login">
              <button className="ml-2 underline">Login here</button>
            </Link>
          </div>
        </form>

        {/* Social Logins */}
        <div className="text-center space-x-3">
          <button onClick={handleRegister} className="btn btn-circle hover:bg-green hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaFacebookF />
          </button>
          <button className="btn btn-circle hover:bg-green hover:text-white">
            <FaGithub />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
