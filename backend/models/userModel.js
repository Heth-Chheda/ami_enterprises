import mongoose from "mongoose";

// ------------------ Address Schema ---------------------
/**
 * @typedef {Object} AddressSchema
 * @property {string} ApartmentNumber - Apartment or house number.
 * @property {string} Street - Street name.
 * @property {string} Area - Area or locality.
 * @property {string} City - City name.
 * @property {string} State - State name.
 * @property {string} PinCode - Postal code.
 * @property {boolean} isDefault - Whether this is the default address.
 */
const addressSchema = mongoose.Schema(
  {
    ApartmentNumber: {
      // Apartment or house number
      type: String,
      required: true,
      trim: true,
    },
    Street: {
      // Street name
      type: String,
      required: true,
      trim: true,
    },
    Area: {
      // Area or locality
      type: String,
      required: true,
      trim: true,
    },
    City: {
      // City name
      type: String,
      required: true,
      trim: true,
    },
    State: {
      // State name
      type: String,
      required: true, // Fixed typo: "requied" → "required"
      trim: true,
    },
    PinCode: {
      // Postal code
      type: String,
      required: true,
      trim: true,
    },
    isDefault: {
      // Marks if this is the default address
      type: Boolean,
      default: false,
    },
  },
  { _id: false } // Prevents creation of an automatic ID for each address object
);

// ------------------ User Schema ---------------------
/**
 * @typedef {Object} UserSchema
 * @property {string} name - User's full name.
 * @property {string} email - User's email (unique).
 * @property {string} mobileNumber - User's mobile number (unique).
 * @property {string} password - Hashed password (not selected by default).
 * @property {Date} dateOfBirth - User's date of birth.
 * @property {"male" | "female" | "others"} gender - User's gender.
 * @property {AddressSchema[]} addresses - List of user addresses.
 * @property {"customer" | "admin"} user_role - User's role.
 * @property {boolean} accountVerified - Whether the account is verified.
 * @property {"active" | "inactive" | "blocked"} status - User account status.
 * @property {Date} createdAt - Timestamp when the user was created.
 * @property {Date} updatedAt - Timestamp when the user was last updated.
 */
const userSchema = mongoose.Schema(
  {
    name: {
      // User's full name
      type: String,
      required: true,
      trim: true,
    },
    email: {
      // User's email (must be unique)
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    mobileNumber: {
      // User's mobile number (must be unique)
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      // Hashed password (excluded from selection)
      type: String,
      required: true,
      select: false,
    },
    dateOfBirth: {
      // Date of birth
      type: Date,
      required: true,
    },
    gender: {
      // User's gender
      type: String,
      enum: ["male", "female", "others"],
      default: "male",
      required: true,
    },
    addresses: [addressSchema], // List of user addresses
    profileImageUrl: {
      // URL of the user's profile picture
      type: String,
      trim: true,
      default: "https://example.com/default-profile.png", // Example default image
    },
    user_role: {
      // User's role (customer or admin)
      type: String,
      enum: ["customer", "admin"],
      default: "customer", // Fixed typo: "user" → "customer"
    },
    accountVerified: {
      // Whether the account is verified
      type: Boolean,
      default: false,
    },
    status: {
      // User account status
      type: String,
      enum: ["active", "inactive", "blocked"],
      default: "active",
    },
    verificationCode: Number,
    verificationCodeExpiry: Date,
    resetPasswordToken: String,
    resetPasswordExpiry: Date,
  },
  {
    timestamps: true,
  } // Auto-generates createdAt and updatedAt fields
);

userSchema.methods.generateVerificationCode = function () {
  function generateRandomSixDigitCode() {
    const firstDigit = Math.floor(Math.random() * 9) + 1;
    const remainingDigits = Math.floor(Math.random() * 100000)
      .toString()
      .padStart(5, "0");

    return parseInt(firstDigit + remainingDigits);
  }

  const verficationCode = generateRandomSixDigitCode();
  this.verificationCode = verficationCode;
  this.verificationCodeExpiry = Date.now() + 10 * 60 * 1000; // 10 minutes expiry of the verification code

  return verficationCode;
};

const User = mongoose.model("User", userSchema);
export default User;
