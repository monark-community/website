# Title case audit (September 2026)

The owner asked for English titles in Title Case and French titles with a capital on the first word only. This page lists every string that changed so it can be reviewed. 447 strings changed: 321 in English and 126 in French. The tables give the file and line, before and after.

## Rules applied

**What counts as a title:** page titles (H1 and the metadata title), section headings (H2, H3), card and feature titles, step titles, FAQ section titles, the "who fits" and "what Monark expects" list headings, project category headings, project titles and milestone titles (they are the headings of the project roadmap accordion), and the headings inside news articles and project pages.

**Not titles, left as they were:** buttons and calls to action, links (including the navigation menu items and footer links), eyebrows (small uppercase labels), labels, badges and status pills, form labels and placeholders, FAQ questions (they are sentences), taglines and leads, alt text, table cells and error messages. Comments in the code were not touched.

**English: Title Case, Chicago Manual of Style.** Capitalise the first and last words, the first word after a colon, and every major word (nouns, pronouns, verbs including "Is" and "Are", adjectives, adverbs, subordinating conjunctions such as "If", "Before" and "Like" when it means "as if"). Lowercase articles (a, an, the), coordinating conjunctions (and, but, or, nor, for, so, yet), "to" in infinitives, and prepositions of any length (at, by, for, from, in, of, on, to, via, with, about, beyond, behind, through, like...). In hyphenated compounds both parts take a capital ("Real-World", "Sprint-Based", "Zero-Knowledge") except articles and prepositions inside ("End-of-Degree", "Pay-per-Access"); a particle that works as an adverb keeps its capital ("Hands-On", "Sign-In", "Check-In"). Brand and product names, acronyms and mixed-case words stay exactly as written: Monark, Web3, DeFi, DAO, NFTs, ZK, dApp, QuickBooks, Université de Sherbrooke.

**French: sentence case.** Only the first word takes a capital, plus proper nouns, brand and product names and acronyms (Monark, Web3, DeFi, DAO, NFT, IPFS, QuickBooks, Université de Sherbrooke). After a colon the next word is lowercase, as French typography expects ("Phase 0 : construction de la communauté"). English terms kept in French titles are lowercased like any other common noun ("contrats pay-per-access", "modèle paymaster").

Two typos were fixed on the way: "Required Ressources" (one project page) and "(Optionnal)" (one milestone).

The brand guidelines (§4 and §8 of `monark-brand-guidelines.md`), the /brand page's typography intro and the brand kit's README now state the same rule: English headings in Title Case, French headings in sentence case, buttons in sentence case in both languages.

## Cases for the owner to decide

These follow Chicago strictly but may read oddly. Each is a one-word change if you prefer the other form.

- **Prepositions of five letters or more stay lowercase**, which Chicago requires but AP style would capitalise: "A Community behind You", "Built in the Open, like the Rest of Monark", "Why Decentralization Matters, beyond the Hype", "Real-World Web3: Use Cases beyond NFTs", "Empowering Communities through Collaboration", "Projects Moving through Monark", "Trust through Transparency", "New Projects under Monark's Wing", "An Ecosystem around the Students", "Tell Us about Your Idea".
- **"Like" as a conjunction** is capitalised: "Smart Contracts Explained Like You're 5" (it means "as if"). "Before" in "What Needs to Happen Before Web3 Becomes Everyday Tech" is a conjunction too, so it is capitalised.
- **A stranded preposition** is capitalised: "What We're Looking For in a Partner", "Who Is Web3 Actually For?", "Monark Is a Good Match For".
- **Prefixes:** "Co-Develop and Test", "Multi-Wallet", "Multi-Approval" capitalise the part after the hyphen, as the brief asks; strict Chicago would write "Co-develop" and "Multi-wallet". "Systems for Co-ops" was left as is, because "co-op" is one word.
- **"Worth"** is treated as a major word: "A Mission Worth Sharing", "Got an Idea Worth Building?".
- **Card titles that repeat a navigation label:** the home page and participate cards now say "Industry Representative", while the navigation menu and the About page's role chips keep "Industry representative", because they are links and labels.
- **French project titles that start with an English word** keep only that word capitalised: "DeFi emprunt", "Gamification et système d'incitation (optionnel)".
- **Roadmap phases in French** lose the capital after the colon: "Phase 1 : construction de la communauté (suite)".

## Changed strings

### English: site copy (i18n files) (174)

| File | Before | After |
| --- | --- | --- |
| `app/[locale]/donation/page.i18n.ts:10` | Support our projects | Support Our Projects |
| `app/[locale]/error/[code]/errors.i18n.ts:44` | Bad request | Bad Request |
| `app/[locale]/error/[code]/errors.i18n.ts:49` | Sign-in needed | Sign-In Needed |
| `app/[locale]/error/[code]/errors.i18n.ts:53` | Access restricted | Access Restricted |
| `app/[locale]/error/[code]/errors.i18n.ts:58` | Page not found | Page Not Found |
| `app/[locale]/error/[code]/errors.i18n.ts:63` | Action not allowed | Action Not Allowed |
| `app/[locale]/error/[code]/errors.i18n.ts:67` | Request timed out | Request Timed Out |
| `app/[locale]/error/[code]/errors.i18n.ts:72` | Conflicting change | Conflicting Change |
| `app/[locale]/error/[code]/errors.i18n.ts:77` | Page removed | Page Removed |
| `app/[locale]/error/[code]/errors.i18n.ts:81` | I'm a teapot | I'm a Teapot |
| `app/[locale]/error/[code]/errors.i18n.ts:85` | Too many requests | Too Many Requests |
| `app/[locale]/error/[code]/errors.i18n.ts:90` | Something went wrong | Something Went Wrong |
| `app/[locale]/error/[code]/errors.i18n.ts:95` | Not available yet | Not Available Yet |
| `app/[locale]/error/[code]/errors.i18n.ts:99` | Bad gateway | Bad Gateway |
| `app/[locale]/error/[code]/errors.i18n.ts:104` | Temporarily unavailable | Temporarily Unavailable |
| `app/[locale]/error/[code]/errors.i18n.ts:108` | Gateway timeout | Gateway Timeout |
| `components/common/layout/footer/contact/contact.i18n.ts:12` | Let's talk! | Let's Talk! |
| `components/pages/about/about.i18n.ts:113` | A Web3 ecosystem that is open to everyone, and built together | A Web3 Ecosystem That Is Open to Everyone, and Built Together |
| `components/pages/about/about.i18n.ts:126` | Three barriers hold Web3 back. We remove them. | Three Barriers Hold Web3 Back. We Remove Them. |
| `components/pages/about/about.i18n.ts:134` | A steep learning curve | A Steep Learning Curve |
| `components/pages/about/about.i18n.ts:137` | Mentorship and learning | Mentorship and Learning |
| `components/pages/about/about.i18n.ts:143` | High development costs | High Development Costs |
| `components/pages/about/about.i18n.ts:146` | Open source and rewards | Open Source and Rewards |
| `components/pages/about/about.i18n.ts:152` | No structured path | No Structured Path |
| `components/pages/about/about.i18n.ts:160` | Value stays with the people who build | Value Stays with the People Who Build |
| `components/pages/about/about.i18n.ts:166` | Open tools, shared learning and open governance | Open Tools, Shared Learning and Open Governance |
| `components/pages/about/about.i18n.ts:172` | One shared platform | One Shared Platform |
| `components/pages/about/about.i18n.ts:178` | Essential modules | Essential Modules |
| `components/pages/about/about.i18n.ts:184` | Education with universities | Education with Universities |
| `components/pages/about/about.i18n.ts:190` | Open, democratic governance | Open, Democratic Governance |
| `components/pages/about/about.i18n.ts:197` | Our mission and vision | Our Mission and Vision |
| `components/pages/about/about.i18n.ts:216` | What guides our work | What Guides Our Work |
| `components/pages/about/about.i18n.ts:246` | Build the next step with us | Build the Next Step with Us |
| `components/pages/about/members-section/members.i18n.ts:20` | The team | The Team |
| `components/pages/brand/brand.i18n.ts:153` | Monark brand | Monark Brand |
| `components/pages/brand/brand.i18n.ts:169` | The logo in every shape | The Logo in Every Shape |
| `components/pages/brand/brand.i18n.ts:182` | Mark only | Mark Only |
| `components/pages/brand/brand.i18n.ts:186` | Mono, dark | Mono, Dark |
| `components/pages/brand/brand.i18n.ts:190` | Mono, white | Mono, White |
| `components/pages/brand/brand.i18n.ts:203` | Give it room, keep it whole | Give It Room, Keep It Whole |
| `components/pages/brand/brand.i18n.ts:207` | Clear space | Clear Space |
| `components/pages/brand/brand.i18n.ts:213` | Minimum size | Minimum Size |
| `components/pages/brand/brand.i18n.ts:228` | Cream, espresso and one flat orange | Cream, Espresso and One Flat Orange |
| `components/pages/brand/brand.i18n.ts:232` | Monark orange | Monark Orange |
| `components/pages/brand/brand.i18n.ts:236` | Cream, the light theme | Cream, the Light Theme |
| `components/pages/brand/brand.i18n.ts:237` | Espresso, the dark theme | Espresso, the Dark Theme |
| `components/pages/brand/brand.i18n.ts:268` | Design tokens | Design Tokens |
| `components/pages/brand/brand.i18n.ts:273` | Nunito Sans, for everything | Nunito Sans, for Everything |
| `components/pages/brand/brand.i18n.ts:278` | Web scale | Web Scale |
| `components/pages/brand/brand.i18n.ts:288` | Trajan, only in the wordmark | Trajan, Only in the Wordmark |
| `components/pages/brand/brand.i18n.ts:295` | The butterfly, then the name | The Butterfly, Then the Name |
| `components/pages/brand/brand.i18n.ts:298` | Monark products | Monark Products |
| `components/pages/brand/brand.i18n.ts:306` | Independent products | Independent Products |
| `components/pages/brand/brand.i18n.ts:310` | Credit badges | Credit Badges |
| `components/pages/brand/brand.i18n.ts:315` | Clear words, real people | Clear Words, Real People |
| `components/pages/brand/brand.i18n.ts:323` | Lead with the outcome | Lead with the Outcome |
| `components/pages/brand/brand.i18n.ts:328` | Explain terms once | Explain Terms Once |
| `components/pages/brand/brand.i18n.ts:333` | Optimistic, never hype | Optimistic, Never Hype |
| `components/pages/brand/brand.i18n.ts:338` | Buttons start with a verb | Buttons Start with a Verb |
| `components/pages/brand/brand.i18n.ts:356` | Press or partnership request? | Press or Partnership Request? |
| `components/pages/donation/donation-form/donation-form.i18n.ts:18` | Make a donation | Make a Donation |
| `components/pages/donation/donation-leaderboard/donation-leaderboard.i18n.ts:21` | Available donation networks | Available Donation Networks |
| `components/pages/homepage/about-section/about-section.i18n.ts:19` | Empowering communities through collaboration | Empowering Communities through Collaboration |
| `components/pages/homepage/faq-section/faq-section.i18n.ts:22` | Questions, answered | Questions, Answered |
| `components/pages/homepage/why-section/why-section.i18n.ts:28` | Join the flight | Join the Flight |
| `components/pages/homepage/why-section/why-section.i18n.ts:31` | Launching tomorrow's founders | Launching Tomorrow's Founders |
| `components/pages/homepage/why-section/why-section.i18n.ts:38` | Bridging the early-stage gap | Bridging the Early-Stage Gap |
| `components/pages/homepage/why-section/why-section.i18n.ts:45` | Aligned and fair by design | Aligned and Fair by Design |
| `components/pages/homepage/why-section/why-section.i18n.ts:70` | Industry representative | Industry Representative |
| `components/pages/learn/learn.i18n.ts:126` | Learn Web3 by building real projects | Learn Web3 by Building Real Projects |
| `components/pages/learn/learn.i18n.ts:131` | Start from where you are | Start from Where You Are |
| `components/pages/learn/learn.i18n.ts:138` | Your degree project, in Web3 | Your Degree Project, in Web3 |
| `components/pages/learn/learn.i18n.ts:155` | From prototype to fundable product | From Prototype to Fundable Product |
| `components/pages/learn/learn.i18n.ts:172` | Explore Web3 at low cost | Explore Web3 at Low Cost |
| `components/pages/learn/learn.i18n.ts:191` | The Monark docs | The Monark Docs |
| `components/pages/learn/learn.i18n.ts:203` | Learn with others | Learn with Others |
| `components/pages/learn/learn.i18n.ts:220` | Ready to build? | Ready to Build? |
| `components/pages/news/news.i18n.ts:91` | Matching stories | Matching Stories |
| `components/pages/news/news.i18n.ts:65` | Monark news | Monark News |
| `components/pages/news/news.i18n.ts:69` | Beyond the hype | Beyond the Hype |
| `components/pages/news/news.i18n.ts:77` | Web3, explained | Web3, Explained |
| `components/pages/news/news.i18n.ts:80` | More news | More News |
| `components/pages/news/news.i18n.ts:82` | No news yet | No News Yet |
| `components/pages/news/news.i18n.ts:80` | More news | More News |
| `components/pages/participate/ambassador.i18n.ts:26` | Grow the Monark community where you live | Grow the Monark Community Where You Live |
| `components/pages/participate/ambassador.i18n.ts:35` | A role at the heart of the community | A Role at the Heart of the Community |
| `components/pages/participate/ambassador.i18n.ts:39` | Rewards for your impact | Rewards for Your Impact |
| `components/pages/participate/ambassador.i18n.ts:45` | A community behind you | A Community behind You |
| `components/pages/participate/ambassador.i18n.ts:51` | A local hub to build | A Local Hub to Build |
| `components/pages/participate/ambassador.i18n.ts:57` | A mission worth sharing | A Mission Worth Sharing |
| `components/pages/participate/ambassador.i18n.ts:63` | Details are still to come | Details Are Still to Come |
| `components/pages/participate/ambassador.i18n.ts:70` | How to get involved | How to Get Involved |
| `components/pages/participate/ambassador.i18n.ts:75` | Join the community | Join the Community |
| `components/pages/participate/ambassador.i18n.ts:80` | Tell us where you are | Tell Us Where You Are |
| `components/pages/participate/ambassador.i18n.ts:90` | Grow a local hub | Grow a Local Hub |
| `components/pages/participate/ambassador.i18n.ts:98` | People who want Web3 to work for their community | People Who Want Web3 to Work for Their Community |
| `components/pages/participate/ambassador.i18n.ts:99` | You might be a good fit if | You Might Be a Good Fit If |
| `components/pages/participate/ambassador.i18n.ts:105` | What an ambassador does | What an Ambassador Does |
| `components/pages/participate/ambassador.i18n.ts:114` | Built in the open, like the rest of Monark | Built in the Open, like the Rest of Monark |
| `components/pages/participate/ambassador.i18n.ts:120` | What Monark is building and why | What Monark Is Building and Why |
| `components/pages/participate/ambassador.i18n.ts:136` | Want to represent Monark? | Want to Represent Monark? |
| `components/pages/participate/developer.i18n.ts:19` | Turn your Web3 idea into a product you can fund | Turn Your Web3 Idea into a Product You Can Fund |
| `components/pages/participate/developer.i18n.ts:31` | What a young Web3 project needs to get off the ground | What a Young Web3 Project Needs to Get off the Ground |
| `components/pages/participate/developer.i18n.ts:37` | 4 to 12 month support cycles | 4 to 12 Month Support Cycles |
| `components/pages/participate/developer.i18n.ts:42` | Sprint-based mentorship | Sprint-Based Mentorship |
| `components/pages/participate/developer.i18n.ts:48` | Administrative and legal templates | Administrative and Legal Templates |
| `components/pages/participate/developer.i18n.ts:54` | Technical guidance and tools | Technical Guidance and Tools |
| `components/pages/participate/developer.i18n.ts:60` | Web3 workshops | Web3 Workshops |
| `components/pages/participate/developer.i18n.ts:66` | Funding preparation | Funding Preparation |
| `components/pages/participate/developer.i18n.ts:72` | You keep full ownership | You Keep Full Ownership |
| `components/pages/participate/developer.i18n.ts:79` | From a first conversation to a grant application | From a First Conversation to a Grant Application |
| `components/pages/participate/developer.i18n.ts:82` | Tell us about your idea | Tell Us about Your Idea |
| `components/pages/participate/developer.i18n.ts:87` | Join the next cohort | Join the Next Cohort |
| `components/pages/participate/developer.i18n.ts:92` | Build in sprints | Build in Sprints |
| `components/pages/participate/developer.i18n.ts:97` | Apply for grants | Apply for Grants |
| `components/pages/participate/developer.i18n.ts:105` | Made for builders at the very start | Made for Builders at the Very Start |
| `components/pages/participate/developer.i18n.ts:106` | The program is for you if | The Program Is for You If |
| `components/pages/participate/developer.i18n.ts:113` | What Monark expects | What Monark Expects |
| `components/pages/participate/developer.i18n.ts:122` | Projects moving through Monark | Projects Moving through Monark |
| `components/pages/participate/developer.i18n.ts:151` | Questions from developers | Questions from Developers |
| `components/pages/participate/developer.i18n.ts:180` | Got an idea worth building? | Got an Idea Worth Building? |
| `components/pages/participate/industry.i18n.ts:13` | Industry partners | Industry Partners |
| `components/pages/participate/industry.i18n.ts:19` | Test what Web3 can do for your sector, at a fraction of the cost | Test What Web3 Can Do for Your Sector, at a Fraction of the Cost |
| `components/pages/participate/industry.i18n.ts:37` | An early, hands-on look at Web3 in your industry | An Early, Hands-On Look at Web3 in Your Industry |
| `components/pages/participate/industry.i18n.ts:43` | Proofs of concept, fast | Proofs of Concept, Fast |
| `components/pages/participate/industry.i18n.ts:49` | Access to talent | Access to Talent |
| `components/pages/participate/industry.i18n.ts:55` | Hands-on collaboration | Hands-On Collaboration |
| `components/pages/participate/industry.i18n.ts:67` | A path to scale | A Path to Scale |
| `components/pages/participate/industry.i18n.ts:73` | Early exposure | Early Exposure |
| `components/pages/participate/industry.i18n.ts:81` | Four steps from a challenge to results | Four Steps from a Challenge to Results |
| `components/pages/participate/industry.i18n.ts:84` | Share your challenge or idea | Share Your Challenge or Idea |
| `components/pages/participate/industry.i18n.ts:88` | Monark assembles a team | Monark Assembles a Team |
| `components/pages/participate/industry.i18n.ts:92` | Co-develop and test | Co-Develop and Test |
| `components/pages/participate/industry.i18n.ts:97` | Get results and insights | Get Results and Insights |
| `components/pages/participate/industry.i18n.ts:105` | What we're looking for in a partner | What We're Looking For in a Partner |
| `components/pages/participate/industry.i18n.ts:108` | Good partners bring | Good Partners Bring |
| `components/pages/participate/industry.i18n.ts:114` | Sectors we can explore together | Sectors We Can Explore Together |
| `components/pages/participate/industry.i18n.ts:124` | Web3 solutions for real sectors | Web3 Solutions for Real Sectors |
| `components/pages/participate/industry.i18n.ts:153` | Questions from industry partners | Questions from Industry Partners |
| `components/pages/participate/industry.i18n.ts:178` | Let's start the conversation | Let's Start the Conversation |
| `components/pages/participate/participate-shared.i18n.ts:66` | Other ways to participate | Other Ways to Participate |
| `components/pages/participate/participate-shared.i18n.ts:85` | Industry representative | Industry Representative |
| `components/pages/participate/university.i18n.ts:13` | Universities and students | Universities and Students |
| `components/pages/participate/university.i18n.ts:19` | Real Web3 projects for students, from the classroom to launch | Real Web3 Projects for Students, from the Classroom to Launch |
| `components/pages/participate/university.i18n.ts:36` | Three ways to work with Monark | Three Ways to Work with Monark |
| `components/pages/participate/university.i18n.ts:42` | End-of-degree projects | End-of-Degree Projects |
| `components/pages/participate/university.i18n.ts:56` | Blockchain associations | Blockchain Associations |
| `components/pages/participate/university.i18n.ts:86` | An end-of-degree project with Monark, step by step | An End-of-Degree Project with Monark, Step by Step |
| `components/pages/participate/university.i18n.ts:89` | Pick or pitch a project | Pick or Pitch a Project |
| `components/pages/participate/university.i18n.ts:94` | Align with your professors | Align with Your Professors |
| `components/pages/participate/university.i18n.ts:99` | Build in sprints, with mentors | Build in Sprints, with Mentors |
| `components/pages/participate/university.i18n.ts:104` | Go further | Go Further |
| `components/pages/participate/university.i18n.ts:112` | For students, professors and clubs | For Students, Professors and Clubs |
| `components/pages/participate/university.i18n.ts:113` | Monark is a good match for | Monark Is a Good Match For |
| `components/pages/participate/university.i18n.ts:120` | What Monark expects | What Monark Expects |
| `components/pages/participate/university.i18n.ts:129` | It started at the Université de Sherbrooke | It Started at the Université de Sherbrooke |
| `components/pages/participate/university.i18n.ts:142` | The Monark project catalogue | The Monark Project Catalogue |
| `components/pages/participate/university.i18n.ts:155` | Questions from students and universities | Questions from Students and Universities |
| `components/pages/participate/university.i18n.ts:180` | Bring Web3 to your campus | Bring Web3 to Your Campus |
| `components/pages/project/projects-list.i18n.ts:97` | Deliverables & desired functionalities | Deliverables & Desired Functionalities |
| `components/pages/project/projects-list.i18n.ts:103` | Matching projects | Matching Projects |
| `components/pages/project/projects-list.i18n.ts:118` | Work & payments | Work & Payments |
| `components/pages/project/projects-list.i18n.ts:122` | Managing your crypto | Managing Your Crypto |
| `components/pages/project/projects-list.i18n.ts:126` | Trust & privacy | Trust & Privacy |
| `components/pages/project/projects-list.i18n.ts:130` | Commerce & records | Commerce & Records |
| `components/pages/project/projects-list.i18n.ts:138` | Communities & governance | Communities & Governance |
| `components/pages/project/projects-list.i18n.ts:142` | Other projects | Other Projects |
| `components/pages/roadmap/roadmap.i18n.ts:44` | Phase 0: Community building | Phase 0: Community Building |
| `components/pages/roadmap/roadmap.i18n.ts:53` | Use cases and projects | Use Cases and Projects |
| `components/pages/roadmap/roadmap.i18n.ts:58` | Local ecosystem development | Local Ecosystem Development |
| `components/pages/roadmap/roadmap.i18n.ts:63` | Social media program | Social Media Program |
| `components/pages/roadmap/roadmap.i18n.ts:70` | Phase 1: Community building (continued) | Phase 1: Community Building (Continued) |
| `components/pages/roadmap/roadmap.i18n.ts:74` | Ambassador program | Ambassador Program |
| `components/pages/roadmap/roadmap.i18n.ts:79` | Local initiatives | Local Initiatives |

### French: site copy (i18n files) (3)

| File | Before | After |
| --- | --- | --- |
| `components/pages/roadmap/roadmap.i18n.ts:127` | Phase 0 : Construction de la communauté | Phase 0 : construction de la communauté |
| `components/pages/roadmap/roadmap.i18n.ts:153` | Phase 1 : Construction de la communauté (suite) | Phase 1 : construction de la communauté (suite) |
| `components/pages/roadmap/roadmap.i18n.ts:179` | Phase 2 : Expansion du Web3 | Phase 2 : expansion du Web3 |

### English: news articles (68)

| File | Before | After |
| --- | --- | --- |
| `content/en/news/pioneer-in-university-projects-mentorship/page.mdx:4` | A pioneer in supporting university projects in decentralized accounting | A Pioneer in Supporting University Projects in Decentralized Accounting |
| `content/en/news/pioneer-in-university-projects-mentorship/page.mdx:25` | How Monark supports student projects | How Monark Supports Student Projects |
| `content/en/news/pioneer-in-university-projects-mentorship/page.mdx:31` | New projects under Monark's wing | New Projects under Monark's Wing |
| `content/en/news/pioneer-in-university-projects-mentorship/page.mdx:35` | An ecosystem around the students | An Ecosystem around the Students |
| `content/en/news/pioneer-in-university-projects-mentorship/page.mdx:41` | What students take away | What Students Take Away |
| `content/en/news/real-world-web3-use-cases-that-aren-t-just-nfts/page.mdx:4` | Real-world Web3: use cases beyond NFTs | Real-World Web3: Use Cases beyond NFTs |
| `content/en/news/real-world-web3-use-cases-that-aren-t-just-nfts/page.mdx:20` | Community currencies | Community Currencies |
| `content/en/news/real-world-web3-use-cases-that-aren-t-just-nfts/page.mdx:24` | Supply chain tracking | Supply Chain Tracking |
| `content/en/news/real-world-web3-use-cases-that-aren-t-just-nfts/page.mdx:28` | Notarized documents and public registries | Notarized Documents and Public Registries |
| `content/en/news/real-world-web3-use-cases-that-aren-t-just-nfts/page.mdx:32` | Cooperative governance | Cooperative Governance |
| `content/en/news/real-world-web3-use-cases-that-aren-t-just-nfts/page.mdx:36` | Medical data exchange | Medical Data Exchange |
| `content/en/news/real-world-web3-use-cases-that-aren-t-just-nfts/page.mdx:40` | Verifiable credentials in education | Verifiable Credentials in Education |
| `content/en/news/real-world-web3-use-cases-that-aren-t-just-nfts/page.mdx:44` | What these projects have in common | What These Projects Have in Common |
| `content/en/news/smart-contracts-explained-like-you-re-5/page.mdx:4` | Smart contracts explained like you're 5 | Smart Contracts Explained Like You're 5 |
| `content/en/news/smart-contracts-explained-like-you-re-5/page.mdx:20` | What is a smart contract? | What Is a Smart Contract? |
| `content/en/news/smart-contracts-explained-like-you-re-5/page.mdx:28` | Three examples | Three Examples |
| `content/en/news/smart-contracts-explained-like-you-re-5/page.mdx:48` | What smart contracts can replace | What Smart Contracts Can Replace |
| `content/en/news/smart-contracts-explained-like-you-re-5/page.mdx:56` | The uncomfortable parts | The Uncomfortable Parts |
| `content/en/news/smart-contracts-explained-like-you-re-5/page.mdx:72` | Where we stand | Where We Stand |
| `content/en/news/trust-from-open-data-to-mathematical-proof/page.mdx:4` | Trust: from open data to mathematical proof | Trust: From Open Data to Mathematical Proof |
| `content/en/news/trust-from-open-data-to-mathematical-proof/page.mdx:19` | Trust through transparency | Trust through Transparency |
| `content/en/news/trust-from-open-data-to-mathematical-proof/page.mdx:23` | Why privacy matters | Why Privacy Matters |
| `content/en/news/trust-from-open-data-to-mathematical-proof/page.mdx:29` | Three privacy models | Three Privacy Models |
| `content/en/news/trust-from-open-data-to-mathematical-proof/page.mdx:37` | Zero-knowledge proofs | Zero-Knowledge Proofs |
| `content/en/news/trust-from-open-data-to-mathematical-proof/page.mdx:43` | Finding the balance | Finding the Balance |
| `content/en/news/web3-developer-roadmap-and-resources/page.mdx:4` | Web3 developer roadmap and resources | Web3 Developer Roadmap and Resources |
| `content/en/news/web3-developer-roadmap-and-resources/page.mdx:19` | Start with the basics | Start with the Basics |
| `content/en/news/web3-developer-roadmap-and-resources/page.mdx:30` | Smart contracts and tools | Smart Contracts and Tools |
| `content/en/news/web3-developer-roadmap-and-resources/page.mdx:42` | The rest of the stack | The Rest of the Stack |
| `content/en/news/web3-developer-roadmap-and-resources/page.mdx:55` | Keeping up | Keeping Up |
| `content/en/news/web3-revolution-reality/page.mdx:4` | The revolution and reality of Web3: an honest assessment | The Revolution and Reality of Web3: An Honest Assessment |
| `content/en/news/web3-revolution-reality/page.mdx:20` | What Web3 promised | What Web3 Promised |
| `content/en/news/web3-revolution-reality/page.mdx:24` | Where things stand | Where Things Stand |
| `content/en/news/web3-revolution-reality/page.mdx:34` | Where Monark stands | Where Monark Stands |
| `content/en/news/web3-revolution-reality/page.mdx:43` | What comes next | What Comes Next |
| `content/en/news/what-is-web3-really/page.mdx:4` | What is Web3, really? | What Is Web3, Really? |
| `content/en/news/what-is-web3-really/page.mdx:28` | Promise and reality | Promise and Reality |
| `content/en/news/what-is-web3-really/page.mdx:30` | Ownership comes with responsibility | Ownership Comes with Responsibility |
| `content/en/news/what-is-web3-really/page.mdx:34` | Users as stakeholders, in theory | Users as Stakeholders, in Theory |
| `content/en/news/what-is-web3-really/page.mdx:38` | Community governance | Community Governance |
| `content/en/news/what-is-web3-really/page.mdx:42` | Where Web3 delivers | Where Web3 Delivers |
| `content/en/news/what-is-web3-really/page.mdx:52` | How Monark approaches it | How Monark Approaches It |
| `content/en/news/what-monark-is-building-and-why/page.mdx:4` | What Monark is building, and why | What Monark Is Building, and Why |
| `content/en/news/what-monark-is-building-and-why/page.mdx:20` | Working with universities | Working with Universities |
| `content/en/news/what-monark-is-building-and-why/page.mdx:28` | Incubating early projects | Incubating Early Projects |
| `content/en/news/what-monark-is-building-and-why/page.mdx:38` | Projects already running | Projects Already Running |
| `content/en/news/what-monark-is-building-and-why/page.mdx:48` | Join us | Join Us |
| `content/en/news/what-needs-to-happen-before-web3-becomes-everyday-tech/page.mdx:4` | What needs to happen before Web3 becomes everyday tech | What Needs to Happen Before Web3 Becomes Everyday Tech |
| `content/en/news/what-needs-to-happen-before-web3-becomes-everyday-tech/page.mdx:20` | What the early internet teaches us | What the Early Internet Teaches Us |
| `content/en/news/what-needs-to-happen-before-web3-becomes-everyday-tech/page.mdx:26` | What still needs work | What Still Needs Work |
| `content/en/news/what-needs-to-happen-before-web3-becomes-everyday-tech/page.mdx:33` | Web2 and Web3 together | Web2 and Web3 Together |
| `content/en/news/what-needs-to-happen-before-web3-becomes-everyday-tech/page.mdx:37` | A long road | A Long Road |
| `content/en/news/where-blockchain-shines/page.mdx:4` | Where blockchain shines, and where it doesn't | Where Blockchain Shines, and Where It Doesn't |
| `content/en/news/where-blockchain-shines/page.mdx:20` | Smart contracts | Smart Contracts |
| `content/en/news/where-blockchain-shines/page.mdx:26` | Transparency and immutability | Transparency and Immutability |
| `content/en/news/where-blockchain-shines/page.mdx:32` | Digital ownership and provenance | Digital Ownership and Provenance |
| `content/en/news/where-blockchain-shines/page.mdx:38` | When not to use a blockchain | When Not to Use a Blockchain |
| `content/en/news/where-blockchain-shines/page.mdx:48` | Challenges that remain | Challenges That Remain |
| `content/en/news/where-blockchain-shines/page.mdx:56` | How Monark decides | How Monark Decides |
| `content/en/news/who-is-web3-actually-for/page.mdx:4` | Who is Web3 actually for? | Who Is Web3 Actually For? |
| `content/en/news/who-is-web3-actually-for/page.mdx:20` | Beyond the early adopters | Beyond the Early Adopters |
| `content/en/news/who-is-web3-actually-for/page.mdx:24` | Who could benefit | Who Could Benefit |
| `content/en/news/who-is-web3-actually-for/page.mdx:32` | What it will take | What It Will Take |
| `content/en/news/who-is-web3-actually-for/page.mdx:40` | A Web3 for everyone | A Web3 for Everyone |
| `content/en/news/why-decentralization-matters/page.mdx:4` | Why decentralization matters, beyond the hype | Why Decentralization Matters, beyond the Hype |
| `content/en/news/why-decentralization-matters/page.mdx:20` | A reality check | A Reality Check |
| `content/en/news/why-decentralization-matters/page.mdx:44` | Our approach | Our Approach |
| `content/en/news/why-decentralization-matters/page.mdx:50` | What's at stake | What's at Stake |

### French: news articles (0)

| File | Before | After |
| --- | --- | --- |

### English: projects (titles, headings, milestones) (79)

| File | Before | After |
| --- | --- | --- |
| `content/en/project/access-tokens-pay-per-access-contracts/milestones/milestone_A.mdx:2` | User interface and access portal | User Interface and Access Portal |
| `content/en/project/access-tokens-pay-per-access-contracts/milestones/milestone_B.mdx:2` | Smart contract access logic | Smart Contract Access Logic |
| `content/en/project/access-tokens-pay-per-access-contracts/milestones/milestone_C.mdx:2` | Payment and token integration | Payment and Token Integration |
| `content/en/project/access-tokens-pay-per-access-contracts/milestones/milestone_D.mdx:2` | Access gateway and verification layer | Access Gateway and Verification Layer |
| `content/en/project/access-tokens-pay-per-access-contracts/milestones/milestone_E.mdx:2` | Admin dashboard and asset management | Admin Dashboard and Asset Management |
| `content/en/project/access-tokens-pay-per-access-contracts/milestones/milestone_F.mdx:2` | Access logs and analytics | Access Logs and Analytics |
| `content/en/project/access-tokens-pay-per-access-contracts/milestones/milestone_G.mdx:2` | Smart device and broadcast integration | Smart Device and Broadcast Integration |
| `content/en/project/access-tokens-pay-per-access-contracts/page.mdx:3` | Access Tokens (Pay-Per-Access Contracts) | Access Tokens (Pay-per-Access Contracts) |
| `content/en/project/accounting-blockchain-data-extraction/page.mdx:3` | Accounting blockchain data extraction | Accounting Blockchain Data Extraction |
| `content/en/project/address-review-system/milestones/milestone_A.mdx:2` | User interface and review platform | User Interface and Review Platform |
| `content/en/project/address-review-system/milestones/milestone_B.mdx:2` | Wallet authentication and identity layer | Wallet Authentication and Identity Layer |
| `content/en/project/address-review-system/milestones/milestone_C.mdx:2` | Review submission and management system | Review Submission and Management System |
| `content/en/project/address-review-system/milestones/milestone_D.mdx:2` | Smart contract review storage and retrieval | Smart Contract Review Storage and Retrieval |
| `content/en/project/address-review-system/milestones/milestone_E.mdx:2` | Reputation aggregation and scoring | Reputation Aggregation and Scoring |
| `content/en/project/address-review-system/milestones/milestone_F.mdx:2` | DAO moderation and governance layer | DAO Moderation and Governance Layer |
| `content/en/project/address-review-system/milestones/milestone_G.mdx:2` | Sentiment analysis and advanced filtering | Sentiment Analysis and Advanced Filtering |
| `content/en/project/address-review-system/milestones/milestone_H.mdx:2` | Activity history and audit trail | Activity History and Audit Trail |
| `content/en/project/bounty-system/milestones/milestone_A.mdx:2` | User interface and bounty marketplace | User Interface and Bounty Marketplace |
| `content/en/project/bounty-system/milestones/milestone_B.mdx:2` | Wallet authentication and user roles | Wallet Authentication and User Roles |
| `content/en/project/bounty-system/milestones/milestone_C.mdx:2` | Task creation and bounty management | Task Creation and Bounty Management |
| `content/en/project/bounty-system/milestones/milestone_D.mdx:2` | Submission and validation workflow | Submission and Validation Workflow |
| `content/en/project/bounty-system/milestones/milestone_E.mdx:2` | Smart contract bounty and payout logic | Smart Contract Bounty and Payout Logic |
| `content/en/project/bounty-system/milestones/milestone_F.mdx:2` | Contributor profile and reputation system | Contributor Profile and Reputation System |
| `content/en/project/bounty-system/milestones/milestone_G.mdx:2` | Analytics and task tracking dashboard | Analytics and Task Tracking Dashboard |
| `content/en/project/bounty-system/milestones/milestone_H.mdx:2` | Gamification and incentive system (Optionnal) | Gamification and Incentive System (Optional) |
| `content/en/project/dao-voting-platform/milestones/milestone_A.mdx:2` | User interface and governance hub | User Interface and Governance Hub |
| `content/en/project/dao-voting-platform/milestones/milestone_B.mdx:2` | Proposal creation and management | Proposal Creation and Management |
| `content/en/project/dao-voting-platform/milestones/milestone_C.mdx:2` | Voting mechanism and tallying | Voting Mechanism and Tallying |
| `content/en/project/dao-voting-platform/milestones/milestone_D.mdx:2` | Role management and permissions | Role Management and Permissions |
| `content/en/project/dao-voting-platform/milestones/milestone_E.mdx:2` | Smart contract governance logic | Smart Contract Governance Logic |
| `content/en/project/dao-voting-platform/milestones/milestone_F.mdx:2` | Results tracking and analytics | Results Tracking and Analytics |
| `content/en/project/dao-voting-platform/milestones/milestone_G.mdx:2` | Delegation and advanced governance features | Delegation and Advanced Governance Features |
| `content/en/project/emergency-alerts-network/milestones/milestone_A.mdx:2` | Mobile interface and alert hub | Mobile Interface and Alert Hub |
| `content/en/project/emergency-alerts-network/milestones/milestone_B.mdx:2` | Alert creation and geolocation system | Alert Creation and Geolocation System |
| `content/en/project/emergency-alerts-network/milestones/milestone_C.mdx:2` | Responder interaction and verification flow | Responder Interaction and Verification Flow |
| `content/en/project/emergency-alerts-network/milestones/milestone_D.mdx:2` | Smart contract alert and reward logic | Smart Contract Alert and Reward Logic |
| `content/en/project/emergency-alerts-network/milestones/milestone_E.mdx:2` | Reputation and on-chain tracking system | Reputation and On-Chain Tracking System |
| `content/en/project/emergency-alerts-network/milestones/milestone_F.mdx:2` | Admin dashboard and system configuration | Admin Dashboard and System Configuration |
| `content/en/project/emergency-alerts-network/milestones/milestone_G.mdx:2` | Trusted contacts and group coordination | Trusted Contacts and Group Coordination |
| `content/en/project/land-registry-voting/milestones/milestone_A.mdx:2` | User interface and map-based voting hub | User Interface and Map-Based Voting Hub |
| `content/en/project/land-registry-voting/milestones/milestone_B.mdx:2` | Land registry simulation and wallet association | Land Registry Simulation and Wallet Association |
| `content/en/project/land-registry-voting/milestones/milestone_C.mdx:2` | Proposal creation and regional governance | Proposal Creation and Regional Governance |
| `content/en/project/land-registry-voting/milestones/milestone_D.mdx:2` | Voting mechanism and parcel-based logic | Voting Mechanism and Parcel-Based Logic |
| `content/en/project/land-registry-voting/milestones/milestone_E.mdx:2` | Smart contract governance logic | Smart Contract Governance Logic |
| `content/en/project/land-registry-voting/milestones/milestone_F.mdx:2` | Role validation and governance permissions | Role Validation and Governance Permissions |
| `content/en/project/land-registry-voting/milestones/milestone_G.mdx:2` | Voting history and civic transparency | Voting History and Civic Transparency |
| `content/en/project/multichain-portfolio-tracker/milestones/milestone_A.mdx:2` | User dashboard and portfolio overview | User Dashboard and Portfolio Overview |
| `content/en/project/multichain-portfolio-tracker/milestones/milestone_B.mdx:2` | Multi-wallet connection and identity layer | Multi-Wallet Connection and Identity Layer |
| `content/en/project/multichain-portfolio-tracker/milestones/milestone_C.mdx:2` | Data aggregation and normalization engine | Data Aggregation and Normalization Engine |
| `content/en/project/multichain-portfolio-tracker/milestones/milestone_D.mdx:2` | Transaction history and activity tracking | Transaction History and Activity Tracking |
| `content/en/project/multichain-portfolio-tracker/milestones/milestone_E.mdx:2` | Portfolio analytics and visualization | Portfolio Analytics and Visualization |
| `content/en/project/multichain-portfolio-tracker/milestones/milestone_F.mdx:2` | Asset valuation and pricing integration | Asset Valuation and Pricing Integration |
| `content/en/project/multichain-portfolio-tracker/milestones/milestone_G.mdx:2` | Export and reporting system | Export and Reporting System |
| `content/en/project/multichain-portfolio-tracker/milestones/milestone_H.mdx:2` | Performance optimization and scalability | Performance Optimization and Scalability |
| `content/en/project/real-time-royalty-distribution/milestones/milestone_A.mdx:2` | Royalty dashboard and user interface | Royalty Dashboard and User Interface |
| `content/en/project/real-time-royalty-distribution/milestones/milestone_B.mdx:2` | Wallet authentication and identity layer | Wallet Authentication and Identity Layer |
| `content/en/project/real-time-royalty-distribution/milestones/milestone_C.mdx:2` | Core revenue-splitting smart contract | Core Revenue-Splitting Smart Contract |
| `content/en/project/real-time-royalty-distribution/milestones/milestone_D.mdx:2` | Real-time payout and streaming logic | Real-Time Payout and Streaming Logic |
| `content/en/project/real-time-royalty-distribution/milestones/milestone_E.mdx:2` | Split configuration and rule engine | Split Configuration and Rule Engine |
| `content/en/project/real-time-royalty-distribution/milestones/milestone_F.mdx:2` | Revenue simulation and testing environment | Revenue Simulation and Testing Environment |
| `content/en/project/real-time-royalty-distribution/milestones/milestone_G.mdx:2` | Payment history and royalty tracking | Payment History and Royalty Tracking |
| `content/en/project/real-time-royalty-distribution/milestones/milestone_H.mdx:2` | Analytics and performance visualization | Analytics and Performance Visualization |
| `content/en/project/time-locked-contracts/milestones/milestone_A.mdx:2` | User interface and lock management dashboard | User Interface and Lock Management Dashboard |
| `content/en/project/time-locked-contracts/milestones/milestone_B.mdx:2` | Wallet authentication and access control | Wallet Authentication and Access Control |
| `content/en/project/time-locked-contracts/milestones/milestone_C.mdx:2` | Lock schedule creation and configuration | Lock Schedule Creation and Configuration |
| `content/en/project/time-locked-contracts/milestones/milestone_D.mdx:2` | Smart contract time-lock logic | Smart Contract Time-Lock Logic |
| `content/en/project/time-locked-contracts/milestones/milestone_E.mdx:2` | Unlock tracking and countdown system | Unlock Tracking and Countdown System |
| `content/en/project/time-locked-contracts/milestones/milestone_F.mdx:2` | Audit logs and release history | Audit Logs and Release History |
| `content/en/project/time-locked-contracts/milestones/milestone_G.mdx:2` | Recurring release and vesting extensions | Recurring Release and Vesting Extensions |
| `content/en/project/time-locked-contracts/milestones/milestone_H.mdx:2` | Multi-approval and conditional release layer | Multi-Approval and Conditional Release Layer |
| `content/en/project/zk-medical-data-exchange/milestones/milestone_A.mdx:2` | User interfaces and multi-role experience | User Interfaces and Multi-Role Experience |
| `content/en/project/zk-medical-data-exchange/milestones/milestone_B.mdx:2` | Wallet authentication and identity management | Wallet Authentication and Identity Management |
| `content/en/project/zk-medical-data-exchange/milestones/milestone_C.mdx:2` | Medical data vault and encrypted storage | Medical Data Vault and Encrypted Storage |
| `content/en/project/zk-medical-data-exchange/milestones/milestone_D.mdx:2` | ZK-proof engine for eligibility and ownership | ZK-Proof Engine for Eligibility and Ownership |
| `content/en/project/zk-medical-data-exchange/milestones/milestone_E.mdx:2` | Researcher portal and matching engine | Researcher Portal and Matching Engine |
| `content/en/project/zk-medical-data-exchange/milestones/milestone_F.mdx:2` | Consent management and reward system | Consent Management and Reward System |
| `content/en/project/zk-medical-data-exchange/milestones/milestone_G.mdx:2` | Metadata indexing and data standardization | Metadata Indexing and Data Standardization |
| `content/en/project/zk-medical-data-exchange/milestones/milestone_H.mdx:2` | Governance, DAO, and audit layer | Governance, DAO, and Audit Layer |
| `content/en/project/zk-medical-data-exchange/required-resources.mdx:1` | Required Ressources | Required Resources |

### French: projects (titles, headings, milestones) (123)

| File | Before | After |
| --- | --- | --- |
| `content/fr/project/access-tokens-pay-per-access-contracts/page.mdx:3` | Jetons d'accès (Contrats Pay-Per-Access) | Jetons d'accès (contrats pay-per-access) |
| `content/fr/project/accounting-blockchain-data-extraction/milestones/milestone_A.mdx:2` | Authentification & Gestion des Portefeuilles | Authentification & gestion des portefeuilles |
| `content/fr/project/accounting-blockchain-data-extraction/milestones/milestone_B.mdx:2` | Moteur de Récupération & Synchronisation des Transactions | Moteur de récupération & synchronisation des transactions |
| `content/fr/project/accounting-blockchain-data-extraction/milestones/milestone_C.mdx:2` | Enrichissement des Données & Valorisation en Monnaie Fiduciaire | Enrichissement des données & valorisation en monnaie fiduciaire |
| `content/fr/project/accounting-blockchain-data-extraction/milestones/milestone_D.mdx:2` | Moteur de Classification des Transactions | Moteur de classification des transactions |
| `content/fr/project/accounting-blockchain-data-extraction/milestones/milestone_E.mdx:2` | Visualisation & Filtrage des Transactions | Visualisation & filtrage des transactions |
| `content/fr/project/accounting-blockchain-data-extraction/milestones/milestone_F.mdx:2` | Rapports Financiers & Moteur de Calcul des Plus-Values | Rapports financiers & moteur de calcul des plus-values |
| `content/fr/project/accounting-blockchain-data-extraction/milestones/milestone_G.mdx:2` | Export des Données & Intégration Comptable | Export des données & intégration comptable |
| `content/fr/project/accounting-blockchain-data-extraction/milestones/milestone_H.mdx:2` | Classification des Transactions Assistée par IA | Classification des transactions assistée par IA |
| `content/fr/project/accounting-blockchain-data-extraction/milestones/milestone_I.mdx:2` | Intégration Logiciels Comptables (QuickBooks & Sync ERP) | Intégration logiciels comptables (QuickBooks & sync ERP) |
| `content/fr/project/accounting-blockchain-data-extraction/milestones/milestone_J.mdx:2` | Moteur de Lots Fiscaux & Optimisation Avancée des Plus-Values | Moteur de lots fiscaux & optimisation avancée des plus-values |
| `content/fr/project/accounting-blockchain-data-extraction/milestones/milestone_K.mdx:2` | Consolidation Multi-Portefeuilles & Trésorerie DAO | Consolidation multi-portefeuilles & trésorerie DAO |
| `content/fr/project/accounting-blockchain-data-extraction/milestones/milestone_L.mdx:2` | Génération Automatisée des Formulaires Fiscaux | Génération automatisée des formulaires fiscaux |
| `content/fr/project/address-review-system/page.mdx:3` | Système d'avis Décentralisé | Système d'avis décentralisé |
| `content/fr/project/address-review-system/page.mdx:28` | Description Générale | Description générale |
| `content/fr/project/bounty-system/milestones/milestone_H.mdx:2` | Gamification et système d'incitation (Optionnel) | Gamification et système d'incitation (optionnel) |
| `content/fr/project/contact-list/milestones/milestone_A.mdx:2` | Interface Web & Tableau de Bord des Contacts | Interface web & tableau de bord des contacts |
| `content/fr/project/contact-list/milestones/milestone_B.mdx:2` | Authentification par Portefeuille & Liaison d'Identité | Authentification par portefeuille & liaison d'identité |
| `content/fr/project/contact-list/milestones/milestone_C.mdx:2` | Système d'Étiquetage & de Métadonnées | Système d'étiquetage & de métadonnées |
| `content/fr/project/contact-list/milestones/milestone_D.mdx:2` | Architecture de Stockage des Contacts (Local, Chiffré ou Décentralisé) | Architecture de stockage des contacts (local, chiffré ou décentralisé) |
| `content/fr/project/contact-list/milestones/milestone_E.mdx:2` | Couche de Réputation & d'Endorsement | Couche de réputation & d'endorsement |
| `content/fr/project/contact-list/milestones/milestone_F.mdx:2` | Interopérabilité & API d'Intégration dApp | Interopérabilité & API d'intégration dApp |
| `content/fr/project/contact-list/page.mdx:3` | Liste de Contacts | Liste de contacts |
| `content/fr/project/dao-voting-platform/page.mdx:3` | Plateforme de Vote DAO | Plateforme de vote DAO |
| `content/fr/project/defi-borrow/milestones/milestone_A.mdx:2` | Authentification par Portefeuille & Accès Emprunteur | Authentification par portefeuille & accès emprunteur |
| `content/fr/project/defi-borrow/milestones/milestone_B.mdx:2` | Contrat Intelligent de Dépôt de Garantie & Création de Prêt | Contrat intelligent de dépôt de garantie & création de prêt |
| `content/fr/project/defi-borrow/milestones/milestone_C.mdx:2` | Logique de Remboursement & Moteur de Suivi des Dettes | Logique de remboursement & moteur de suivi des dettes |
| `content/fr/project/defi-borrow/milestones/milestone_D.mdx:2` | Calcul du Facteur de Santé & Logique de Liquidation | Calcul du facteur de santé & logique de liquidation |
| `content/fr/project/defi-borrow/milestones/milestone_E.mdx:2` | Tableau de Bord d'Emprunt & Interface de Gestion des Positions | Tableau de bord d'emprunt & interface de gestion des positions |
| `content/fr/project/defi-borrow/milestones/milestone_F.mdx:2` | Modèles d'Intérêts & Simulation de Crédit | Modèles d'intérêts & simulation de crédit |
| `content/fr/project/defi-borrow/page.mdx:3` | DeFi Emprunt | DeFi emprunt |
| `content/fr/project/defi-lending/milestones/milestone_A.mdx:2` | Interface Web & Tableau de Bord des Pools | Interface web & tableau de bord des pools |
| `content/fr/project/defi-lending/milestones/milestone_B.mdx:2` | Authentification par Portefeuille & Compte Utilisateur | Authentification par portefeuille & compte utilisateur |
| `content/fr/project/defi-lending/milestones/milestone_C.mdx:2` | Contrat Intelligent de Pool de Prêt & Jetons de Parts | Contrat intelligent de pool de prêt & jetons de parts |
| `content/fr/project/defi-lending/milestones/milestone_D.mdx:2` | Modèle de Taux d'Intérêt & Logique d'Utilisation | Modèle de taux d'intérêt & logique d'utilisation |
| `content/fr/project/defi-lending/milestones/milestone_E.mdx:2` | Interface de Dépôt, Retrait & Suivi du TAP | Interface de dépôt, retrait & suivi du TAP |
| `content/fr/project/defi-lending/milestones/milestone_F.mdx:2` | Suivi des Gains & Analytique des Positions | Suivi des gains & analytique des positions |
| `content/fr/project/defi-lending/milestones/milestone_G.mdx:2` | Configuration du Protocole & Gouvernance | Configuration du protocole & gouvernance |
| `content/fr/project/defi-loans/milestones/milestone_A.mdx:2` | Interface Web & Tableau de Bord de Prêt | Interface web & tableau de bord de prêt |
| `content/fr/project/defi-loans/milestones/milestone_B.mdx:2` | Authentification par Portefeuille & Session Utilisateur | Authentification par portefeuille & session utilisateur |
| `content/fr/project/defi-loans/milestones/milestone_C.mdx:2` | Contrat Intelligent de Coffre de Garantie | Contrat intelligent de coffre de garantie |
| `content/fr/project/defi-loans/milestones/milestone_D.mdx:2` | Logique d'Emprunt & Calculateur Prêt-sur-Valeur | Logique d'emprunt & calculateur prêt-sur-valeur |
| `content/fr/project/defi-loans/milestones/milestone_E.mdx:2` | Système d'Accumulation des Intérêts & de Remboursement | Système d'accumulation des intérêts & de remboursement |
| `content/fr/project/defi-loans/milestones/milestone_F.mdx:2` | Moteur de Liquidation & Surveillance de la Santé | Moteur de liquidation & surveillance de la santé |
| `content/fr/project/defi-loans/milestones/milestone_G.mdx:2` | Historique des Transactions & Analytique des Coffres | Historique des transactions & analytique des coffres |
| `content/fr/project/defi-loans/milestones/milestone_H.mdx:2` | Garanties Multi-Actifs & Simulation de Gouvernance | Garanties multi-actifs & simulation de gouvernance |
| `content/fr/project/defi-swaps/milestones/milestone_A.mdx:2` | Authentification par Portefeuille & Affichage des Soldes de Jetons | Authentification par portefeuille & affichage des soldes de jetons |
| `content/fr/project/defi-swaps/milestones/milestone_B.mdx:2` | Cœur du Contrat Intelligent AMM | Cœur du contrat intelligent AMM |
| `content/fr/project/defi-swaps/milestones/milestone_C.mdx:2` | Jeton de Fournisseur de Liquidité & Gestion des Pools | Jeton de fournisseur de liquidité & gestion des pools |
| `content/fr/project/defi-swaps/milestones/milestone_D.mdx:2` | Interface d'Échange & Flux de Transaction | Interface d'échange & flux de transaction |
| `content/fr/project/defi-swaps/milestones/milestone_E.mdx:2` | Moteur d'Impact sur les Prix & de Glissement | Moteur d'impact sur les prix & de glissement |
| `content/fr/project/defi-swaps/milestones/milestone_F.mdx:2` | Historique des Transactions & Tableau de Bord Analytique | Historique des transactions & tableau de bord analytique |
| `content/fr/project/defi-swaps/milestones/milestone_G.mdx:2` | Mécanismes de Frais & Simulation de Gouvernance | Mécanismes de frais & simulation de gouvernance |
| `content/fr/project/digital-will/milestones/milestone_A.mdx:2` | Contrat Intelligent de Testament & Configuration du Membre Principal | Contrat intelligent de testament & configuration du membre principal |
| `content/fr/project/digital-will/milestones/milestone_B.mdx:2` | Confirmation du Décès & Mécanisme de Délai Dynamique | Confirmation du décès & mécanisme de délai dynamique |
| `content/fr/project/digital-will/milestones/milestone_C.mdx:2` | Période de Protection & Annulation par Preuve de Vie | Période de protection & annulation par preuve de vie |
| `content/fr/project/digital-will/milestones/milestone_D.mdx:2` | Instantané des Actifs & Registre Successoral | Instantané des actifs & registre successoral |
| `content/fr/project/digital-will/milestones/milestone_E.mdx:2` | Échange Automatisé & Verrouillage en Stablecoin | Échange automatisé & verrouillage en stablecoin |
| `content/fr/project/digital-will/milestones/milestone_F.mdx:2` | Liaison du Compte Bancaire & Pré-autorisation | Liaison du compte bancaire & pré-autorisation |
| `content/fr/project/digital-will/milestones/milestone_G.mdx:2` | Moteur de Conversion Stablecoin vers Fiat | Moteur de conversion stablecoin vers fiat |
| `content/fr/project/digital-will/milestones/milestone_H.mdx:2` | Moteur de Virement Fiat Automatisé | Moteur de virement fiat automatisé |
| `content/fr/project/digital-will/milestones/milestone_I.mdx:2` | Couche de Conformité & Validation Réglementaire | Couche de conformité & validation réglementaire |
| `content/fr/project/digital-will/page.mdx:3` | Testament Numérique | Testament numérique |
| `content/fr/project/fee-distribution-system/milestones/milestone_A.mdx:2` | Interface Web & Tableau de Bord des Revenus | Interface web & tableau de bord des revenus |
| `content/fr/project/fee-distribution-system/milestones/milestone_B.mdx:2` | Authentification par Portefeuille & Propriété des Contrats | Authentification par portefeuille & propriété des contrats |
| `content/fr/project/fee-distribution-system/milestones/milestone_C.mdx:2` | Contrat Intelligent Principal de Répartition des Revenus | Contrat intelligent principal de répartition des revenus |
| `content/fr/project/fee-distribution-system/milestones/milestone_D.mdx:2` | Suivi des Distributions en Temps Réel & Journal d'Audit | Suivi des distributions en temps réel & journal d'audit |
| `content/fr/project/fee-distribution-system/milestones/milestone_E.mdx:2` | Support des Paiements Récurrents & en Flux Continu | Support des paiements récurrents & en flux continu |
| `content/fr/project/fee-distribution-system/milestones/milestone_F.mdx:2` | Approbation Multi-Parties & Mécanisme de Gel des Fonds | Approbation multi-parties & mécanisme de gel des fonds |
| `content/fr/project/fee-distribution-system/page.mdx:3` | Système de Distribution des Frais | Système de distribution des frais |
| `content/fr/project/inventory-and-sales-for-farm-goods/milestones/milestone_B.mdx:2` | Authentification par portefeuille et rôles utilisateur (Acheteur / Agriculteur) | Authentification par portefeuille et rôles utilisateur (acheteur / agriculteur) |
| `content/fr/project/land-registry-voting/page.mdx:3` | Vote du Registre foncier | Vote du registre foncier |
| `content/fr/project/milestone-based-smart-contracts-and-escrow/milestones/milestone_A.mdx:2` | Authentification par Portefeuille & Gestion des Rôles | Authentification par portefeuille & gestion des rôles |
| `content/fr/project/milestone-based-smart-contracts-and-escrow/milestones/milestone_B.mdx:2` | Cœur du Contrat Intelligent de Verrouillage des Fonds | Cœur du contrat intelligent de verrouillage des fonds |
| `content/fr/project/milestone-based-smart-contracts-and-escrow/milestones/milestone_C.mdx:2` | Moteur de Définition & Configuration des Phases | Moteur de définition & configuration des phases |
| `content/fr/project/milestone-based-smart-contracts-and-escrow/milestones/milestone_D.mdx:2` | Validation des Phases & Flux d'Approbation | Validation des phases & flux d'approbation |
| `content/fr/project/milestone-based-smart-contracts-and-escrow/milestones/milestone_E.mdx:2` | Multi-Signature & Logique d'Approbation Avancée | Multi-signature & logique d'approbation avancée |
| `content/fr/project/milestone-based-smart-contracts-and-escrow/milestones/milestone_F.mdx:2` | Visualisation de la Progression & Tableau de Bord de Suivi des Contrats | Visualisation de la progression & tableau de bord de suivi des contrats |
| `content/fr/project/milestone-based-smart-contracts-and-escrow/milestones/milestone_G.mdx:2` | Notifications & Logique Temporelle | Notifications & logique temporelle |
| `content/fr/project/milestone-based-smart-contracts-and-escrow/page.mdx:3` | Contrats intelligents basés sur des phases et Escrow | Contrats intelligents basés sur des phases et escrow |
| `content/fr/project/multichain-portfolio-tracker/page.mdx:3` | Suivi de Portfolio Multichain | Suivi de portfolio multichain |
| `content/fr/project/nft-ticketing-platform/milestones/milestone_A.mdx:2` | Authentification par Portefeuille & Accès par Rôle | Authentification par portefeuille & accès par rôle |
| `content/fr/project/nft-ticketing-platform/milestones/milestone_B.mdx:2` | Cœur du Contrat Intelligent de Billets NFT | Cœur du contrat intelligent de billets NFT |
| `content/fr/project/nft-ticketing-platform/milestones/milestone_C.mdx:2` | Tableau de Bord de Création pour les Organisateurs | Tableau de bord de création pour les organisateurs |
| `content/fr/project/nft-ticketing-platform/milestones/milestone_D.mdx:2` | Achat de Billets & Flux de Gestion du Portefeuille | Achat de billets & flux de gestion du portefeuille |
| `content/fr/project/nft-ticketing-platform/milestones/milestone_E.mdx:2` | Vérification des Billets & Système d'Enregistrement | Vérification des billets & système d'enregistrement |
| `content/fr/project/nft-ticketing-platform/milestones/milestone_F.mdx:2` | Règles de Revente, Royalties & Logique Anti-Spéculation | Règles de revente, royalties & logique anti-spéculation |
| `content/fr/project/nft-ticketing-platform/milestones/milestone_G.mdx:2` | NFTs Commémoratifs & Couche de Contenu Dynamique | NFTs commémoratifs & couche de contenu dynamique |
| `content/fr/project/real-time-royalty-distribution/page.mdx:3` | Distribution de Royautés en Temps Réel | Distribution de royautés en temps réel |
| `content/fr/project/referral-system/milestones/milestone_A.mdx:2` | Authentification par Portefeuille & Inscription des Utilisateurs | Authentification par portefeuille & inscription des utilisateurs |
| `content/fr/project/referral-system/milestones/milestone_B.mdx:2` | Génération de Liens de Parrainage & Système de Partage | Génération de liens de parrainage & système de partage |
| `content/fr/project/referral-system/milestones/milestone_C.mdx:2` | Cœur du Parrainage via Contrat Intelligent | Cœur du parrainage via contrat intelligent |
| `content/fr/project/referral-system/milestones/milestone_D.mdx:2` | Score de Confiance & Système de Détection des Abus | Score de confiance & système de détection des abus |
| `content/fr/project/referral-system/milestones/milestone_E.mdx:2` | Moteur de Récompenses & Déclenchement des Phases | Moteur de récompenses & déclenchement des phases |
| `content/fr/project/referral-system/milestones/milestone_F.mdx:2` | Système de Points & Suivi du Statut de Parrainage | Système de points & suivi du statut de parrainage |
| `content/fr/project/referral-system/milestones/milestone_G.mdx:2` | Tableau de Bord Utilisateur & Analytique de Parrainage | Tableau de bord utilisateur & analytique de parrainage |
| `content/fr/project/referral-system/page.mdx:3` | Système de Parrainage | Système de parrainage |
| `content/fr/project/supply-chain-tracking/milestones/milestone_A.mdx:2` | Interface Web & Gestion des Produits | Interface web & gestion des produits |
| `content/fr/project/supply-chain-tracking/milestones/milestone_B.mdx:2` | Authentification & Gestion des Rôles | Authentification & gestion des rôles |
| `content/fr/project/supply-chain-tracking/milestones/milestone_C.mdx:2` | Traçabilité & Piste d'Audit (Couche Contrat Intelligent) | Traçabilité & piste d'audit (couche contrat intelligent) |
| `content/fr/project/supply-chain-tracking/milestones/milestone_D.mdx:2` | Lecture QR & Affichage du Parcours pour l'Utilisateur Final | Lecture QR & affichage du parcours pour l'utilisateur final |
| `content/fr/project/supply-chain-tracking/milestones/milestone_E.mdx:2` | Module de Capteur Embarqué (Surveillance Continue) | Module de capteur embarqué (surveillance continue) |
| `content/fr/project/supply-chain-tracking/milestones/milestone_F.mdx:2` | Optimisation des Événements de Contrat Intelligent | Optimisation des événements de contrat intelligent |
| `content/fr/project/supply-chain-tracking/milestones/milestone_G.mdx:2` | Tableau de Bord Entreprise & Plateforme d'Analytique | Tableau de bord entreprise & plateforme d'analytique |
| `content/fr/project/supply-chain-tracking/milestones/milestone_H.mdx:2` | Module de Capteur Fixe (Capture de Données Ponctuelles) | Module de capteur fixe (capture de données ponctuelles) |
| `content/fr/project/systems-for-co-ops/page.mdx:3` | Systèmes pour Coopératives | Systèmes pour coopératives |
| `content/fr/project/transaction-gas/milestones/milestone_A.mdx:2` | Interface Web & Démonstration de Transactions Sans Frais | Interface web & démonstration de transactions Sans frais |
| `content/fr/project/transaction-gas/milestones/milestone_B.mdx:2` | Authentification par Portefeuille & Gestion des Sessions | Authentification par portefeuille & gestion des sessions |
| `content/fr/project/transaction-gas/milestones/milestone_C.mdx:2` | Contrat Intelligent de Gaz Parrainé (Modèle Paymaster) | Contrat intelligent de gaz parrainé (modèle paymaster) |
| `content/fr/project/transaction-gas/milestones/milestone_D.mdx:2` | Système de Paiement du Gaz en Multi-Jetons | Système de paiement du gaz en multi-jetons |
| `content/fr/project/transaction-gas/milestones/milestone_E.mdx:2` | Moteur de Relayage & Regroupement de Transactions | Moteur de relayage & regroupement de transactions |
| `content/fr/project/transaction-gas/milestones/milestone_F.mdx:2` | Mesures de Sécurité & Prévention des Abus | Mesures de sécurité & prévention des abus |
| `content/fr/project/transaction-gas/milestones/milestone_G.mdx:2` | Déploiement sur Testnet & Support Multi-Chaînes | Déploiement sur testnet & support multi-chaînes |
| `content/fr/project/transaction-gas/page.mdx:3` | Gas de Transaction | Gas de transaction |
| `content/fr/project/transaction-gas/page.mdx:27` | Description Générale | Description générale |
| `content/fr/project/web3-signatures/milestones/milestone_A.mdx:2` | Authentification par Portefeuille & Inscription des Utilisateurs | Authentification par portefeuille & inscription des utilisateurs |
| `content/fr/project/web3-signatures/milestones/milestone_B.mdx:2` | Téléversement de Documents & Moteur de Génération de Hachages | Téléversement de documents & moteur de génération de hachages |
| `content/fr/project/web3-signatures/milestones/milestone_C.mdx:2` | Contrat Intelligent d'Engagement de Hachage Sur Chaîne | Contrat intelligent d'engagement de hachage sur chaîne |
| `content/fr/project/web3-signatures/milestones/milestone_D.mdx:2` | Intégration IPFS & Couche de Stockage Décentralisé | Intégration IPFS & couche de stockage décentralisé |
| `content/fr/project/web3-signatures/milestones/milestone_E.mdx:2` | Flux Multi-Signataires & Registre d'Horodatage | Flux multi-signataires & registre d'horodatage |
| `content/fr/project/web3-signatures/milestones/milestone_F.mdx:2` | Interface de Vérification des Documents & d'Audit | Interface de vérification des documents & d'audit |
| `content/fr/project/zk-medical-data-exchange/page.mdx:3` | Échange de Données Médicales à Preuve Zéro-Connaissance | Échange de données médicales à preuve zéro-connaissance |
| `content/fr/project/zk-medical-data-exchange/page.mdx:32` | Description Générale | Description générale |
