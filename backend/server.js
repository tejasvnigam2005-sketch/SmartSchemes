const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const BusinessScheme = require('./models/BusinessScheme');
const EducationScheme = require('./models/EducationScheme');

// Load env vars
dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL, // Vercel URL in production
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl, etc)
    if (!origin) return callback(null, true);
    if (allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recommend', require('./routes/recommend'));
app.use('/api/business-schemes', require('./routes/businessSchemes'));
app.use('/api/education-schemes', require('./routes/educationSchemes'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// ─── Auto-seed if database is empty ─────────────────────
async function autoSeed() {
  try {
    const bizCount = await BusinessScheme.countDocuments();
    const eduCount = await EducationScheme.countDocuments();

    if (bizCount === 0 || eduCount === 0) {
      console.log('📦 Database empty, auto-seeding...');

      // Inline seed data
      const businessSchemes = [
        {
          name: "Pradhan Mantri MUDRA Yojana (PMMY)",
          description: "Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises. Three categories: Shishu, Kishore, and Tarun.",
          minAge: 18, maxAge: 65, minIncome: 0, maxIncome: 1500000,
          businessType: ['startup', 'msme', 'retail', 'services', 'manufacturing'],
          minInvestment: 0, maxInvestment: 1000000, states: ['all'],
          benefits: ["Collateral-free loans up to ₹10 lakh", "Low interest rates", "No processing fee", "Flexible repayment tenure of 5-7 years", "MUDRA Card for working capital"],
          eligibility: ["Indian citizen aged 18-65", "Non-corporate small business entity", "Has a business plan", "No previous loan default"],
          applicationProcess: ["Visit nearest bank branch or NBFC", "Fill MUDRA loan application form", "Submit business plan and identity docs", "Bank evaluates and sanctions", "Disbursement within 7-10 days"],
          deadline: "Ongoing", website: "https://www.mudra.org.in", fundingAmount: "Up to ₹10 Lakh", ministry: "Ministry of Finance",
          tags: ['mudra', 'loan', 'small business', 'micro enterprise', 'collateral free']
        },
        {
          name: "Startup India Seed Fund Scheme (SISFS)",
          description: "Provides financial assistance to startups for proof of concept, prototype development, product trials, market entry, and commercialization.",
          minAge: 21, maxAge: 55, minIncome: 0, maxIncome: 5000000,
          businessType: ['startup', 'technology'], minInvestment: 100000, maxInvestment: 5000000, states: ['all'],
          benefits: ["Grants up to ₹20 lakh for validation", "Loans up to ₹50 lakh for market launch", "Mentorship and networking", "Access to government tenders", "Tax exemptions for 3 years"],
          eligibility: ["DPIIT-recognized startup", "Not more than 2 years old", "Technology-driven business model", "Not received >₹10 lakh from other govt schemes"],
          applicationProcess: ["Register on Startup India portal", "Apply through eligible incubator", "Submit business plan", "Expert committee evaluation", "Fund disbursement through incubator"],
          deadline: "March 2026", website: "https://seedfund.startupindia.gov.in", fundingAmount: "Up to ₹50 Lakh", ministry: "DPIIT, Ministry of Commerce",
          tags: ['startup', 'seed fund', 'innovation', 'technology', 'incubator']
        },
        {
          name: "PM Vishwakarma Yojana",
          description: "End-to-end support for traditional artisans and craftspeople through recognition, skill training, toolkit incentives, credit access, and market support.",
          minAge: 18, maxAge: 60, minIncome: 0, maxIncome: 800000,
          businessType: ['manufacturing', 'services', 'retail'], minInvestment: 0, maxInvestment: 300000, states: ['all'],
          benefits: ["PM Vishwakarma certificate and ID card", "Skill training: ₹500/day stipend", "Toolkit incentive up to ₹15,000", "Collateral-free loan up to ₹3 lakh at 5% interest", "Marketing support through GeM portal"],
          eligibility: ["Traditional artisan or craftsperson", "Working in one of 18 identified trades", "Registered on PM Vishwakarma portal", "Age 18+ years"],
          applicationProcess: ["Register at pmvishwakarma.gov.in", "Verification by Gram Panchayat/ULB", "Attend skill training", "Apply for toolkit and credit", "Access marketing platforms"],
          deadline: "Ongoing (5-year scheme)", website: "https://pmvishwakarma.gov.in", fundingAmount: "Up to ₹3 Lakh + ₹15,000 toolkit", ministry: "Ministry of MSME",
          tags: ['artisan', 'craftspeople', 'skill', 'toolkit', 'traditional']
        },
        {
          name: "Stand-Up India Scheme",
          description: "Facilitates bank loans between ₹10 lakh and ₹1 crore for SC/ST and women entrepreneurs for greenfield enterprises.",
          minAge: 18, maxAge: 65, minIncome: 0, maxIncome: 3000000,
          businessType: ['startup', 'msme', 'manufacturing', 'services', 'retail'], minInvestment: 1000000, maxInvestment: 10000000, states: ['all'],
          benefits: ["Loans from ₹10 lakh to ₹1 crore", "Composite loan for term + working capital", "Repayment up to 7 years", "Margin money up to 25%", "Competitive interest rates"],
          eligibility: ["SC/ST and/or women entrepreneurs", "Age 18+", "Setting up greenfield enterprise", "51% shareholding by SC/ST/woman", "Not in default to any bank"],
          applicationProcess: ["Visit standupmitra.in portal", "Register and fill application", "Connect with nearest bank", "Submit project report", "Loan sanctioned within 30 days"],
          deadline: "Extended till 2028", website: "https://www.standupmitra.in", fundingAmount: "₹10 Lakh to ₹1 Crore", ministry: "Ministry of Finance",
          tags: ['women', 'sc', 'st', 'greenfield', 'bank loan']
        },
        {
          name: "CGTMSE - Credit Guarantee for MSEs",
          description: "Provides collateral-free credit facility to micro and small enterprises with guarantee coverage up to 85% of the loan amount.",
          minAge: 18, maxAge: 65, minIncome: 0, maxIncome: 5000000,
          businessType: ['msme', 'manufacturing', 'services', 'startup'], minInvestment: 0, maxInvestment: 5000000, states: ['all'],
          benefits: ["Collateral-free loans up to ₹5 crore", "85% guarantee coverage", "Both new and existing MSEs eligible", "No third-party guarantee needed", "Lower cost of credit"],
          eligibility: ["Micro or Small Enterprise per MSME Act", "Both new and existing enterprises", "Manufacturing or service sector", "Viable business project"],
          applicationProcess: ["Apply through eligible lending institution", "Submit business proposal", "Institution evaluates", "Guarantee cover from CGTMSE", "Loan disbursed without collateral"],
          deadline: "Ongoing", website: "https://www.cgtmse.in", fundingAmount: "Up to ₹5 Crore", ministry: "Ministry of MSME",
          tags: ['collateral free', 'guarantee', 'msme', 'credit']
        },
        {
          name: "PM Kisan Samman Nidhi Yojana",
          description: "Direct income support of ₹6,000 per year to all farmer families, paid in three equal installments.",
          minAge: 18, maxAge: 75, minIncome: 0, maxIncome: 600000,
          businessType: ['agriculture'], minInvestment: 0, maxInvestment: 500000, states: ['all'],
          benefits: ["₹6,000/year direct bank transfer", "Three installments of ₹2,000", "Direct to farmer's account", "All landholding farmers eligible", "KCC integration"],
          eligibility: ["Small and marginal farmer family", "Must own cultivable land", "Not a constitutional post holder", "Not a current/former minister/MP/MLA", "Professional income within limit"],
          applicationProcess: ["Visit local CSC", "Register at pmkisan.gov.in", "Provide Aadhaar, bank, land records", "State government verifies", "Amount credited to bank"],
          deadline: "Ongoing", website: "https://pmkisan.gov.in", fundingAmount: "₹6,000/year", ministry: "Ministry of Agriculture",
          tags: ['farmer', 'kisan', 'agriculture', 'income support']
        },
        {
          name: "Atal Innovation Mission - Incubation Centres",
          description: "Establishes world-class incubation centres with grant-in-aid up to ₹10 crore for fostering innovation and entrepreneurship.",
          minAge: 21, maxAge: 50, minIncome: 0, maxIncome: 10000000,
          businessType: ['startup', 'technology'], minInvestment: 500000, maxInvestment: 50000000, states: ['all'],
          benefits: ["Grant-in-aid up to ₹10 crore over 5 years", "Access to mentors", "State-of-the-art infrastructure", "Global innovation networking", "Connect with angel investors/VCs"],
          eligibility: ["Higher educational or R&D institutes", "Corporate sector eligible", "Space and infrastructure readiness", "Demonstrated innovation focus"],
          applicationProcess: ["Apply through AIM portal", "Submit detailed proposal", "Expert committee evaluation", "Site visit and due diligence", "Grant disbursement in tranches"],
          deadline: "Periodic calls", website: "https://aim.gov.in", fundingAmount: "Up to ₹10 Crore", ministry: "NITI Aayog",
          tags: ['innovation', 'incubation', 'atal', 'startup ecosystem']
        },
        {
          name: "SIDBI SMILE Fund",
          description: "Soft loans to MSMEs for setting up new enterprises or expansion/modernization of existing manufacturing units.",
          minAge: 21, maxAge: 60, minIncome: 0, maxIncome: 8000000,
          businessType: ['msme', 'manufacturing', 'startup'], minInvestment: 1000000, maxInvestment: 25000000, states: ['all'],
          benefits: ["Soft loans up to ₹25 crore", "~2% lower interest rates", "Up to 10 years repayment", "Manufacturing modernization support", "Quick processing"],
          eligibility: ["Registered MSME unit", "Manufacturing sector focus", "Viable business plan", "Satisfactory credit history"],
          applicationProcess: ["Apply through SIDBI portal", "Submit project report", "SIDBI evaluates", "Terms agreed", "Disbursement by milestones"],
          deadline: "Ongoing", website: "https://www.sidbi.in", fundingAmount: "Up to ₹25 Crore", ministry: "Ministry of Finance (SIDBI)",
          tags: ['sidbi', 'soft loan', 'make in india', 'manufacturing']
        },
        {
          name: "Agriculture Infrastructure Fund (AIF)",
          description: "Financing for post-harvest management infrastructure and community farming assets with interest subvention and credit guarantee.",
          minAge: 18, maxAge: 70, minIncome: 0, maxIncome: 2000000,
          businessType: ['agriculture'], minInvestment: 100000, maxInvestment: 20000000, states: ['all'],
          benefits: ["Loans up to ₹2 crore with 3% subvention", "Credit guarantee under CGTMSE", "Repayment moratorium", "Covers warehouses, cold storage", "FPOs and agri-entrepreneurs eligible"],
          eligibility: ["Farmers, FPOs, PACS", "Agri-entrepreneurs, Startups", "State agencies and APMCs", "Viable infrastructure project"],
          applicationProcess: ["Register on AIF portal", "Select project type", "Choose lending bank", "Bank evaluates", "Interest subvention auto-applied"],
          deadline: "Until 2025-26", website: "https://agriinfra.dac.gov.in", fundingAmount: "Up to ₹2 Crore + interest subvention", ministry: "Ministry of Agriculture",
          tags: ['agriculture', 'infrastructure', 'cold storage', 'warehouse']
        },
        {
          name: "EPCG Scheme (Export Promotion Capital Goods)",
          description: "Import capital goods at zero customs duty for export production, with export obligation of 6x duty saved over 6 years.",
          minAge: 21, maxAge: 65, minIncome: 500000, maxIncome: 100000000,
          businessType: ['export', 'manufacturing'], minInvestment: 5000000, maxInvestment: 100000000, states: ['all'],
          benefits: ["Zero customs duty on capital goods", "New and second-hand goods eligible", "Boost manufacturing competitiveness", "6-year export obligation period", "Technology upgradation support"],
          eligibility: ["Manufacturer or merchant exporter", "EOU/SEZ unit or status holder", "Must commit to export obligations", "Valid IEC required"],
          applicationProcess: ["Apply on DGFT portal", "Submit EPCG authorization", "Import at zero duty", "Fulfill export obligation in 6 years", "Submit export evidence"],
          deadline: "Ongoing", website: "https://www.dgft.gov.in", fundingAmount: "Zero customs duty on capital goods", ministry: "Ministry of Commerce",
          tags: ['export', 'capital goods', 'customs', 'international trade']
        }
      ];

      const educationSchemes = [
        {
          name: "PM Vidyalaxmi Scheme",
          description: "Collateral-free, guarantor-free educational loans for students admitted to top quality higher education institutions.",
          minAge: 17, maxAge: 30, educationLevel: ['ug', 'pg', 'diploma'], category: ['all'],
          minIncome: 0, maxIncome: 800000, fieldOfStudy: ['all'], states: ['all'],
          benefits: ["Collateral-free loans up to ₹10 lakh", "3% interest subvention during moratorium", "Full tuition coverage", "75% government credit risk guarantee", "Simple digital application"],
          eligibility: ["Admitted to NIRF top-ranked institutions", "NAAC A+ graded institutions", "Family income up to ₹8 lakh", "Indian citizen", "First-time higher education loan"],
          applicationProcess: ["Visit pmvidyalaxmi.gov.in", "Register with academic details", "Select institution and course", "Apply to multiple banks", "Loan processed in 15 days"],
          deadline: "Ongoing", website: "https://pmvidyalaxmi.gov.in", scholarshipAmount: "Loan up to ₹10 Lakh + 3% subvention", ministry: "Ministry of Education",
          tags: ['education loan', 'collateral free', 'higher education']
        },
        {
          name: "NSP Central Sector Scholarship",
          description: "Merit-based scholarship for UG and PG students from non-creamy layer families across India.",
          minAge: 16, maxAge: 25, educationLevel: ['ug', 'pg'], category: ['all'],
          minIncome: 0, maxIncome: 800000, fieldOfStudy: ['all'], states: ['all'],
          benefits: ["₹12,000/year for UG (3 years)", "₹20,000/year for PG", "Direct bank transfer", "Covers tuition and maintenance", "Renewable on performance"],
          eligibility: ["Top 20% in board exam", "Family income <₹8 lakh", "Regular student in recognized institution", "50% attendance maintained", "Indian national"],
          applicationProcess: ["Register on scholarships.gov.in", "Fill application", "Upload documents", "Institute verification", "Scholarship disbursed"],
          deadline: "October-December annually", website: "https://scholarships.gov.in", scholarshipAmount: "₹12,000-₹20,000/year", ministry: "Ministry of Education",
          tags: ['scholarship', 'merit', 'central', 'undergraduate']
        },
        {
          name: "Post-Matric Scholarship for SC Students",
          description: "Scholarship for Scheduled Caste students pursuing post-matriculation education. Covers maintenance allowance and non-refundable fees.",
          minAge: 15, maxAge: 35, educationLevel: ['school', 'ug', 'pg', 'phd', 'diploma'], category: ['sc'],
          minIncome: 0, maxIncome: 250000, fieldOfStudy: ['all'], states: ['all'],
          benefits: ["Full tuition fee reimbursement", "Monthly maintenance ₹550-₹1,200", "Reader charges for blind students", "Study tour charges", "Thesis printing charges"],
          eligibility: ["Scheduled Caste category", "Family income ≤₹2.5 lakh", "Studying in recognized institution", "Passed qualifying exam", "Not receiving other scholarship"],
          applicationProcess: ["Apply through NSP", "Upload caste certificate + income proof", "Submit fee receipt", "Institute forwards application", "State govt approves and disburses"],
          deadline: "August-November annually", website: "https://scholarships.gov.in", scholarshipAmount: "Full tuition + ₹550-₹1,200/month", ministry: "Ministry of Social Justice",
          tags: ['sc', 'post-matric', 'scheduled caste', 'maintenance']
        },
        {
          name: "INSPIRE Scholarship (SHE)",
          description: "Merit-based scholarship for meritorious students studying natural and basic sciences at BSc and MSc levels.",
          minAge: 17, maxAge: 27, educationLevel: ['ug', 'pg'], category: ['all'],
          minIncome: 0, maxIncome: 10000000, fieldOfStudy: ['science', 'mathematics', 'engineering'], states: ['all'],
          benefits: ["₹80,000/year scholarship", "₹20,000 summer research project", "Exposure to scientific research", "5-year support (BSc+MSc)", "Purely merit-based"],
          eligibility: ["Top 1% in Class 12 boards", "JEE/NEET qualified", "KVPY/Olympiad medal winners", "Pursuing BSc/Int.MSc in sciences", "Studying in recognized institution"],
          applicationProcess: ["Apply at online-inspire.gov.in", "Upload Class 12 marksheet", "Select institution and course", "DST verification", "Scholarship disbursed annually"],
          deadline: "September-November annually", website: "https://online-inspire.gov.in", scholarshipAmount: "₹80,000/year + ₹20,000 mentorship", ministry: "Dept of Science & Technology",
          tags: ['science', 'inspire', 'research', 'merit']
        },
        {
          name: "PMSSS for J&K and Ladakh",
          description: "Scholarship for students from J&K and Ladakh to pursue undergraduate courses outside the UT.",
          minAge: 17, maxAge: 25, educationLevel: ['ug'], category: ['all'],
          minIncome: 0, maxIncome: 800000, fieldOfStudy: ['all'], states: ['jammu & kashmir', 'ladakh'],
          benefits: ["Academic fee up to ₹3 lakh/year (engineering)", "Maintenance allowance ₹1 lakh/year", "5,000 students supported annually", "Professional and general courses", "Hostel support"],
          eligibility: ["Domicile of J&K or Ladakh", "Passed 10+2 from J&K/Ladakh", "Family income <₹8 lakh", "Admitted outside J&K/Ladakh", "Not availing other central scholarship"],
          applicationProcess: ["Register on AICTE PMSSS portal", "Fill application + upload docs", "Participate in counselling rounds", "Confirm admission", "Scholarship disbursed after joining"],
          deadline: "April-June annually", website: "https://www.aicte-india.org/pmsss", scholarshipAmount: "Up to ₹3 Lakh tuition + ₹1 Lakh maintenance", ministry: "AICTE / Ministry of Education",
          tags: ['jammu kashmir', 'ladakh', 'pmsss', 'undergraduate']
        },
        {
          name: "Maulana Azad National Fellowship",
          description: "Fellowship for minority community students pursuing M.Phil and Ph.D with monthly stipend and contingency grants.",
          minAge: 20, maxAge: 40, educationLevel: ['pg', 'phd'], category: ['minority'],
          minIncome: 0, maxIncome: 600000, fieldOfStudy: ['all'], states: ['all'],
          benefits: ["₹31,000/month JRF (2 years)", "₹35,000/month SRF", "HRA per university norms", "₹10,000-₹20,500/year contingency", "Full research support"],
          eligibility: ["Minority community member", "Admitted to M.Phil/Ph.D", "Qualified UGC-NET/JRF", "Family income ≤₹6 lakh"],
          applicationProcess: ["Apply through UGC portal", "Submit minority certificate", "Upload NET/JRF qualification", "UGC evaluates and selects", "Monthly disbursement"],
          deadline: "January-March annually", website: "https://www.ugc.ac.in", scholarshipAmount: "₹31,000-₹35,000/month + HRA", ministry: "University Grants Commission",
          tags: ['minority', 'fellowship', 'phd', 'research']
        },
        {
          name: "Pragati Scholarship for Girls (AICTE)",
          description: "Scholarship for girl students in AICTE approved technical education institutions to promote women in STEM.",
          minAge: 17, maxAge: 25, educationLevel: ['ug', 'diploma'], category: ['all'],
          minIncome: 0, maxIncome: 800000, fieldOfStudy: ['engineering', 'technology', 'architecture', 'pharmacy'], states: ['all'],
          benefits: ["₹50,000/year scholarship", "₹2,000/month incidentals", "4-year support for degree", "3-year support for diploma", "Direct bank credit"],
          eligibility: ["Girl student in 1st year degree/diploma", "AICTE approved institution", "Family income ≤₹8 lakh", "Max 2 girls per family", "75% attendance required"],
          applicationProcess: ["Apply on NSP", "Fill academic details", "Upload documents", "Institute + state verification", "Scholarship credited"],
          deadline: "October-December annually", website: "https://www.aicte-india.org", scholarshipAmount: "₹50,000/year", ministry: "AICTE",
          tags: ['girl student', 'women', 'technical education', 'pragati']
        },
        {
          name: "Pre-Matric Scholarship for OBC Students",
          description: "Support for OBC students in classes 1-10 to prevent dropouts and encourage continuation of education.",
          minAge: 6, maxAge: 18, educationLevel: ['school'], category: ['obc'],
          minIncome: 0, maxIncome: 250000, fieldOfStudy: ['all'], states: ['all'],
          benefits: ["₹25-₹100/month maintenance", "Ad-hoc grant for books + stationery", "Hostel maintenance for hostellers", "Covers Class 1-10", "Renewable annually"],
          eligibility: ["OBC category", "Family income ≤₹2.5 lakh", "Govt or recognized school", "Passed previous exam", "Not receiving other pre-matric scholarship"],
          applicationProcess: ["Apply through NSP", "Upload OBC certificate", "Submit school details", "Institute verification", "State govt disburses"],
          deadline: "August-October annually", website: "https://scholarships.gov.in", scholarshipAmount: "₹25-₹100/month + book grant", ministry: "Ministry of Social Justice",
          tags: ['obc', 'pre-matric', 'school', 'dropout prevention']
        },
        {
          name: "Ishan Uday – NE Region Scholarship",
          description: "UGC scholarship for students from North Eastern states pursuing degree courses away from home state.",
          minAge: 17, maxAge: 25, educationLevel: ['ug'], category: ['all'],
          minIncome: 0, maxIncome: 450000, fieldOfStudy: ['all'], states: ['assam', 'arunachal pradesh', 'manipur', 'meghalaya', 'mizoram', 'nagaland', 'sikkim', 'tripura'],
          benefits: ["₹5,400/month for general courses", "₹7,800/month for technical courses", "10-month annual support", "10,000 fresh scholarships/year", "Study outside home state"],
          eligibility: ["NE state domicile", "Passed 12th from NE institution", "Family income ≤₹4.5 lakh", "Admitted to recognized institution", "Not availing other UGC scholarship"],
          applicationProcess: ["Apply through NSP", "Upload domicile certificate", "Submit admission + income proof", "UGC verification", "DBT disbursement"],
          deadline: "October-December annually", website: "https://scholarships.gov.in", scholarshipAmount: "₹5,400-₹7,800/month", ministry: "UGC",
          tags: ['northeast', 'ne region', 'ishan uday', 'undergraduate']
        },
        {
          name: "NMMSS - National Means-cum-Merit Scholarship",
          description: "Scholarships for meritorious students from economically weaker sections to reduce dropout at Class 8 and encourage higher secondary completion.",
          minAge: 12, maxAge: 18, educationLevel: ['school'], category: ['all'],
          minIncome: 0, maxIncome: 350000, fieldOfStudy: ['all'], states: ['all'],
          benefits: ["₹12,000/year (₹1,000/month)", "Class 9 to 12 support", "Direct bank transfer", "1 lakh scholarships nationally", "Renewable on passing"],
          eligibility: ["Studying in Class 8 govt/aided school", "55% marks in Class 7", "Family income <₹3.5 lakh", "Must qualify NMMS exam", "Govt/aided school student"],
          applicationProcess: ["Register on NSP", "Appear for NMMS exam", "Submit qualifying documents", "State SNA verifies", "Scholarship from Class 9"],
          deadline: "August-November annually", website: "https://scholarships.gov.in", scholarshipAmount: "₹12,000/year", ministry: "Ministry of Education",
          tags: ['merit', 'means', 'school', 'dropout prevention']
        }
      ];

      if (bizCount === 0) {
        await BusinessScheme.insertMany(businessSchemes);
        console.log(`   ✅ Seeded ${businessSchemes.length} business schemes`);
      }
      if (eduCount === 0) {
        await EducationScheme.insertMany(educationSchemes);
        console.log(`   ✅ Seeded ${educationSchemes.length} education schemes`);
      }
      console.log('   🎉 Auto-seeding complete!\n');
    }
  } catch (error) {
    console.error('   ⚠️  Auto-seed error (non-critical):', error.message);
  }
}

// Start server
const PORT = process.env.PORT || 5000;

async function startServer() {
  await connectDB();
  await autoSeed();

  app.listen(PORT, () => {
    console.log(`🚀 SmartSchemes API running on port ${PORT}`);
    console.log(`📡 Health check: http://localhost:${PORT}/api/health\n`);
  });
}

startServer();
