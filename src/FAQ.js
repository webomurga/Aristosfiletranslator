import React, { useState } from 'react';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the currently open question
    } else {
      setActiveIndex(index); // Open the clicked question
    }
  };

  const faqs = [
    { question: "Why did my document fail?", answer: "Here is the answer to why your document might have failed." },
    { question: "Why am I being charged monthly subscription?", answer: "This answer explains why you're being charged monthly." },
    { question: "Do You Work with Enterprise Customers?", answer: "Here is the answer about enterprise customers." },
    { question: "What is 'Translate with AI' Option?", answer: "This option helps with translating using AI." },
    { question: "My 14 Day Trial is Over?", answer: "Learn more about what happens when your trial ends." },
    { question: "What Payment Types Do You Accept?", answer: "We accept various payment methods including credit cards, PayPal, etc." },
    { question: "How can I delete my account?", answer: "Follow these steps to delete your account." },
    { question: "Do You Have a Mobile APP?", answer: "We do have a mobile app available for download." },
    { question: "What Subscription Plans Do You Offer?", answer: "Here are the different subscription plans we offer." },
    { question: "Why am I asked to pay more if I bought a subscription plan?", answer: "Here’s why you might be asked to pay more even with a subscription." },
    { question: "How can I get a refund for a bad translation?", answer: "If you're unsatisfied with your translation, here’s how to request a refund." },
    { question: "How can I get the error in my document fixed?", answer: "Here’s how to address document errors." },
    { question: "Where is the verification email?", answer: "Check your inbox or spam folder for the verification email." },
  ];

  return (
    <div className="faq-container">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <div className="faq-question" onClick={() => toggleAccordion(index)}>
              <span className="faq-icon">{activeIndex === index ? '-' : '+'}</span>
              <span>{faq.question}</span>
            </div>
            <div
              className={`faq-answer ${activeIndex === index ? 'show' : ''}`}
            >
              {activeIndex === index && <p>{faq.answer}</p>}
            </div>
          </div>
        ))}
      </div>

      <style>
        {`
          .faq-container {
            padding: 30px;
            margin-left: 135px;
            background: #fcfcfa;
            min-height: 100vh;
            overflow: hidden;
            animation: fadeIn 0.6s ease-out;
          }

          .faq-title {
            font-size: 32px;
            color: #008b8b;
            margin-bottom: 20px;
            font-weight: bold;
          }

          .faq-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          .faq-item {
            border-bottom: 1px solid #ccc;
            padding: 15px 0;
          }

          .faq-question {
            font-size: 18px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: color 0.2s ease, box-shadow 0.2s ease;
          }

          .faq-icon {
            font-size: 20px;
            color: #008b8b;
          }

          .faq-question:hover {
            color: #005f5f;
            box-shadow: 0px 2px 4px rgba(0, 139, 139, 0.3);
          }

          .faq-answer {
            font-size: 16px;
            color: #333;
            margin-top: 10px;
            padding-left: 30px;
            opacity: 0;
            max-height: 0;
            overflow: hidden;
            transition: opacity 0.3s ease, max-height 0.3s ease;
          }

          .faq-answer.show {
            opacity: 1;
            max-height: 500px; /* Ensure it's large enough to fit the content */
          }

          .faq-item:last-child {
            border-bottom: none;
          }
          * {
          -ms-overflow-style: none;
        }

        ::-webkit-scrollbar {
          display: none;
        }

          @keyframes fadeIn {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default FAQ;
