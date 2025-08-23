import pkg from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/user.model.js";

const { Inngest, serve } = pkg;

// Create a client to send and receive events
export const inngest = new Inngest({ id: "chatropic" });

const syncUser = inngest.createFunction(
  { id: "sync-user" },
  { event: "clerk/user.created" }, // make sure your event name matches Clerk
  async ({ event }) => {
    await connectDB();

    const { id, email_addresses, first_name, last_name, image_url } = event.data;
    const newUser = {
      clerkId: id,
      email: email_addresses[0]?.email_address,
      name: `${first_name || ""} ${last_name || ""}`,
      image: image_url,
    };

    await User.create(newUser);
  }
);

const deleteUserFromDB = inngest.createFunction(
  { id: "delete-user-from-db" },
  { event: "clerk/user.deleted" },
  async ({ event }) => {
    await connectDB();
    const { id } = event.data;
    await User.deleteOne({ clerkId: id });
  }
);

// Export functions and serve
export const functions = [syncUser, deleteUserFromDB];
export { serve };
