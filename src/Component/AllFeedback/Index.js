import React, { useState, useEffect } from 'react';
import axios from "axios";

const Index = () => {
  const [allfeedback, setAllFeedback] = useState([]); // Initialize as an empty array

  const fetchData = async () => {
    try {
      const response = await axios.get("https://feedback-sepia-eight.vercel.app/");
      
      setAllFeedback(response.data); // Make sure this is an array
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array means this effect will only run once after the initial render

  return (<div class="bg-white py-6 sm:py-8 lg:py-12">
    <div class="mx-auto max-w-screen-2xl px-4 md:px-8">
      <div class="mb-10 md:mb-16">
        <h2 class="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">ALL FEEDBACKS</h2>

        <p class="mx-auto max-w-screen-md text-center text-gray-500 md:text-lg">In this section you will all person name along with their comments.</p>
      </div>
      <div class="grid gap-4 sm:grid-cols-2 md:gap-8 xl:grid-cols-3">
        {allfeedback.map((feedback, index) => (
             <div key={index} class="flex flex-col rounded-lg border p-4 md:p-6">
              <h2 className="mb-4 text-center text-xl font-bold text-gray-800 md:mb-6 lg:text-xl">{feedback.name}</h2>
              <p className="mx-auto max-w-screen-md rounded bg-blue text-center text-gray-500 md:text-lg">
                {feedback.msg}
              </p>
            </div>
        ))}
      </div> </div>
  </div>

  );
};

export default Index;
