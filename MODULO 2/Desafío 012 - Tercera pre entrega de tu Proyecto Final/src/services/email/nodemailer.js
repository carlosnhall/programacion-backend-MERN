import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "meieneier6@gmail.com",
    pass: "gysekugvzeoqbohc",
  },
  tls: { rejectUnauthorized: false },
});
