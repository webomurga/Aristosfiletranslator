import React from 'react';

const Billing = () => {
  return (
    <div className="billing-container">
      <div className="card">
        <div className="card-header">
          <h2>Select Your Subscription Plan</h2>
        </div>
        <div className="card-body pricing-content">
          <div className="pricing-table">
            <div className="pricing-header">
              <h4 className="title">Translation Solutions for Enterprises</h4>
              <span className="description">
                Affordable, web-based document translation service tailored for major corporations facing time and resource constraints.
                It caters to businesses seeking swift translations without the hefty expense of hiring professional translators.
              </span>
            </div>
            <div className="enterprise-call">
              <span>Come and get your translation now!</span>
              <a href="http://localhost:3001" className="btn">
                Get Translations For Enterprise
              </a>
            </div>
          </div>

          <div className="pricing-options">
            {/* Free Plan */}
            <div className="pricing-plan">
              <div className="pricing-header">
                <h4>Free</h4>
              </div>
              <div className="price">
                <h2><span>$0</span><span>/mo</span></h2>
              </div>
              <ul className="pricing-features">
                <li>$0.005 / word - AI Translation</li>
                <li>100+ Languages</li>
                <li>PDF size upload: <strong>Up to 20 Mb</strong></li>
                <li>Other documents size upload: <strong>Up to 20 Mb</strong></li>
                <li>Max Number of Pages: <strong>20</strong></li>
                <li>Supported formats: .DOCx, .PDF, .XLSx, .PPTx, .IDML, .TXT, .JPG, .PNG, .CSV</li>
                <li>24 Hour File Storage Only</li>
                <li>PDF Editor Access</li>
                <li>PDF to DOCX Converter</li>
                <li>Email Support</li>
                <li>Team Access</li>
                <li>Cancel any time</li>
              </ul>
              <button className="btn selected-btn" disabled>Selected</button>
            </div>

            {/* Storage Plan */}
            <div className="pricing-plan">
              <div className="pricing-header">
                <h4>Storage</h4>
              </div>
              <div className="price">
                <h2><span>$14.99</span><span>/mo</span></h2>
              </div>
              <ul className="pricing-features">
                <li>$0.005 / word - AI Translation</li>
                <li>100+ Languages</li>
                <li>PDF size upload: <strong>Up to 100 Mb</strong></li>
                <li>Other documents size upload: <strong>Up to 20 Mb</strong></li>
                <li>Max Number of Pages: <strong>100</strong></li>
                <li>Unlimited File Storage</li>
                <li>PDF Editor Access</li>
                <li>PDF to DOCX Converter</li>
                <li>Email Support</li>
                <li>Team Access</li>
                <li>Unlimited Free Previews for PDF</li>
                <li>Glossary Feature Available</li>
                <li>Cancel any time</li>
              </ul>
              <button className="btn select-btn">Select Plan</button>
            </div>

            {/* Pro Plan */}
            <div className="pricing-plan">
              <div className="pricing-header">
                <h4>Pro</h4>
              </div>
              <div className="price">
                <h2><span>$49.99</span><span>/mo</span></h2>
              </div>
              <ul className="pricing-features">
                <li>$0.004 / word - AI Translation</li>
                <li>100+ Languages</li>
                <li>PDF size upload: <strong>Up to 1000 Mb</strong></li>
                <li>Other documents size upload: <strong>Up to 100 Mb</strong></li>
                <li>Max Number of Pages: <strong>5000</strong></li>
                <li>Unlimited File Storage</li>
                <li>PDF Editor Access</li>
                <li>PDF to DOCX Converter</li>
                <li>Email Support</li>
                <li>Team Access: &lt;5</li>
                <li>Unlimited Free Previews for PDF</li>
                <li>Glossary Feature Available</li>
                <li>Cancel any time</li>
              </ul>
              <button className="btn select-btn">Select Plan</button>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          .billing-container {
            padding: 30px;
            margin-left: 135px; /* Ensure consistent margin with other pages */
            background-color: #fcfcfa;
            animation: fadeIn 0.6s ease-out;
          }

          .card {
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            transition: box-shadow 0.3s ease;
            margin: 0 auto; /* Center the card */
          }

          .card:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          }

          .card-header {
            background-color: #008b8b;
            color: #fff;
            padding: 20px;
            text-align: center;
            border-radius: 8px 8px 0 0;
          }

          .card-header h2 {
            margin: 0 !important;
          }

          .pricing-content {
            padding: 20px;
          }

          .pricing-table {
            margin-bottom: 30px;
            text-align: center;
          }

          .pricing-header h4 {
            font-size: 20px;
            font-weight: bold;
          }

          .description {
            font-size: 16px;
            color: #333;
            margin: 10px 0;
          }

          .enterprise-call {
            margin-top: 20px;
          }

          .enterprise-call span {
            display: block;
            font-size: 18px;
            margin-bottom: 10px;
          }

          .btn {
            background-color: #008b8b;
            color: #fff;
            padding: 12px 20px;
            border-radius: 5px;
            text-decoration: none;
            display: inline-block;
            cursor: pointer;
            transition: background-color 0.3s, box-shadow 0.3s;
          }

          .btn:hover {
            background-color: #007b7b;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
          }

          .pricing-options {
            display: flex;
            justify-content: space-between;
            gap: 20px;
            flex-wrap: wrap; /* Ensure responsiveness on smaller screens */
          }

          .pricing-plan {
            width: 32%;
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
            text-align: center;
            transition: box-shadow 0.3s ease;
            margin-bottom: 20px;
          }

          .pricing-plan:hover {
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .pricing-header h4 {
            margin-bottom: 15px;
            font-size: 22px;
          }

          .price h2 {
            font-size: 30px;
            color: #008b8b;
          }

          .pricing-features {
            list-style: none;
            padding: 0;
            margin: 20px 0;
            text-align: left;
          }

          .pricing-features li {
            margin: 10px 0;
            font-size: 16px;
          }

          .pricing-features li strong {
            font-weight: bold;
          }

          .select-btn {
            background-color: #008b8b;
            color: #fff;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .select-btn:hover {
            background-color: #007b7b;
          }

          .selected-btn {
            background-color: #ccc;
            cursor: not-allowed;
          }

          .selected-btn:hover {
            background-color: #ccc;
          }

          * {
            -ms-overflow-style: none;
          }

          ::-webkit-scrollbar {
            display: none;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Billing;
