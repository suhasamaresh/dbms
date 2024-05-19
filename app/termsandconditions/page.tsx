import React from "react";

const TermsAndConditionsPage = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col items-center justify-center p-4 pt-24">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
        <div className="text-left">
          <p className="mb-4">
            By creating an event on our platform, you agree to the following
            terms and conditions:
          </p>
          <ul className="list-disc pl-6">
            <li>
              The event must be legitimate and must not promote hate speech,
              violence, or discrimination based on race, gender, religion, or
              any other characteristic.
            </li>
            <li>
              You are responsible for providing accurate and up-to-date
              information about the event, including its title, description,
              organizer details, and location.
            </li>
            <li>
              The deadline provided for the event must be realistic and
              achievable.
            </li>
            <li>
              If the event is online, you must provide a valid registration
              link and ensure that the event complies with all relevant online
              regulations.
            </li>
            <li>
              Any sponsors associated with the event must be legitimate and
              must not engage in illegal or unethical practices.
            </li>
            <li>
              You agree not to use our platform for any illegal activities or
              activities that violate our community guidelines.
            </li>
            <li>
              You are responsible for ensuring that the event complies with all
              applicable laws and regulations in your jurisdiction.
            </li>
            <li>
              The event must not infringe upon the intellectual property rights
              of any third party.
            </li>
            <li>
              You agree to indemnify and hold harmless our platform and its
              affiliates from any claims, damages, or liabilities arising out
              of your event.
            </li>
            <li>
              We reserve the right to remove or suspend any event that violates
              these terms and conditions without prior notice.
            </li>
          </ul>
          <p className="mt-8">
            By creating an event, you acknowledge that you have read, understood
            and agreed to these terms and conditions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditionsPage;
