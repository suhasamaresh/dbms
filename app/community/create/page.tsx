"use client";
import React, { useState } from "react";
import axios from "axios";
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import { useSession } from "next-auth/react";

const firebaseConfig = {
  apiKey: "AIzaSyALYX_9uj-byA0WYlvspCHCOxgFV6SFB4Q",
  authDomain: "hackprojec-77a77.firebaseapp.com",
  projectId: "hackprojec-77a77",
  storageBucket: "hackprojec-77a77.appspot.com",
  messagingSenderId: "452533063595",
  appId: "1:452533063595:web:c70e8b64ce8a104ec50cee",
  measurementId: "G-M5FLQZ1D3T",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

const storage = firebase.storage();

const CommunityCreation = () => {
  const { data: session, status } = useSession();

  type FormData = {
    name: string;
    description: string;
    image: File | null;
  };

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    image: null,
  });

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "unauthenticated") {
    return <div>You must be logged in to create a community.</div>;
  }

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData({ ...formData, image: e.target.files[0] });
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      if (formData.image) {
        const imageRef = storage.ref().child(`images/${formData.image.name}`);
        await imageRef.put(formData.image);
        imageUrl = await imageRef.getDownloadURL();
      }

      const updatedFormData = {
        ...formData,
        image: imageUrl,
      };

      const response = await axios.post("/api/community", updatedFormData);
      console.log("Community created:", response.data);
    } catch (error) {
      console.error("Error creating community:", error);
    }
  };

  return (
    <div className="bg-black text-white flex min-h-screen flex-col items-center pt-32 sm:justify-center sm:pt-0">
      <div className="relative mt-16 w-full px-4 sm:px-6 lg:px-8">
        <div className="mx-5 border dark:border-b-white/50 dark:border-t-white/50 border-b-white/20 sm:border-t-white/20 shadow-[20px_0_20px_20px] shadow-slate-500/10 dark:shadow-white/20 rounded-lg border-white/20 border-l-white/20 border-r-white/20 sm:shadow-sm lg:rounded-xl lg:shadow-none">
          <div className="flex flex-col p-8">
            <h3 className="text-2xl font-semibold leading-6 tracking-tighter">
              Create a New Community
            </h3>
            <p className="mt-2 text-sm font-medium text-white/50">
              Fill in the details to create a new community.
            </p>
          </div>
          <div className="p-8 pt-0">
            <form onSubmit={handleSubmit}>
              <div>
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-4 pb-2 pt-3 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Community Name
                      </label>
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Community Name"
                      autoComplete="off"
                      className="block w-full border-0 bg-transparent p-0 text-base placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-4 pb-2 pt-3 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Description
                      </label>
                    </div>
                    <textarea
                      name="description"
                      placeholder="Community Description"
                      className="block w-full border-0 bg-transparent p-0 text-base placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                      rows={5}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-6">
                <div>
                  <div className="group relative rounded-lg border focus-within:border-sky-200 px-4 pb-2 pt-3 duration-200 focus-within:ring focus-within:ring-sky-300/30">
                    <div className="flex justify-between">
                      <label className="text-sm font-medium text-muted-foreground group-focus-within:text-white text-gray-400">
                        Community Image
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        type="file"
                        name="image"
                        className="block w-full border-0 bg-transparent p-0 text-base placeholder:text-muted-foreground/90 focus:outline-none focus:ring-0 sm:leading-7 text-foreground"
                        onChange={handleFileUpload}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-end gap-x-4">
                <button
                  className="font-semibold hover:bg-black hover:text-white hover:ring hover:ring-white transition duration-300 inline-flex items-center justify-center rounded-md text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white text-black h-12 px-6 py-2"
                  type="submit"
                >
                  Create Community
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommunityCreation;
