import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name cannot exceed 100 characters"],
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Please provide a valid email address",
      ],
      index: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    avatar: {
      type: String,
      default: "",
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * Convert user documents to JSON safely.
 *
 * Passwords are never exposed in API responses,
 * even if they were explicitly selected in a query.
 */
userSchema.methods.toJSON = function () {
  const user = this.toObject();

  delete user.password;

  return user;
};

/**
 * Return a safe user object for authentication responses.
 */
userSchema.methods.toSafeObject = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    avatar: this.avatar,
    createdAt: this.createdAt,
    updatedAt: this.updatedAt,
  };
};

/**
 * Normalize the email before saving.
 */
userSchema.pre("save", function (next) {
  if (this.email) {
    this.email = this.email.toLowerCase().trim();
  }

  if (this.name) {
    this.name = this.name.trim();
  }

  next();
});

/**
 * Index for email lookups.
 */
userSchema.index({
  email: 1,
});

/**
 * User model.
 */
const User = mongoose.model("User", userSchema);

export default User;