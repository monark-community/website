export interface I18n {
  faq: {
    soon: string;
    flavor: string;
    title: string;
    items: {
      question: string;
      answer: string;
    }[];
    roadmap_card: {
      title: string;
      content: string;
      action: string;
    };
  };
}

export const en: I18n = {
  faq: {
    soon: "Coming Soon",
    flavor: "FAQ",
    title: "Nectar for the Curious Mind",
    items: [
      {
        question: "What is Monark?",
        answer: `
          <p>Monark is a blockchain ecosystem designed to
          <strong>bridge the digital and physical worlds through open data, decentralized governance, and reusable modules for dApps.</strong>
          We empower developers, students, and local communities to build with transparency, efficiency, and autonomy.</p>
        `,
      },
      {
        question: "How is Monark different from other blockchain projects?",
        answer: `
          <p>Monark prioritizes
          <strong>real-world applications</strong>,
          making open data accessible, governance decentralized, and innovation modular. Our approach combines decentralized governance with practical tools for developers, businesses, and communities.</p>
        `,
      },
      {
        question: "What does Monark's butterfly symbol represent?",
        answer: `
          <p>A butterfly <strong>symbolizes freedom</strong>, breaking free from societal constraints to chart its own course. In Jackson Wang's <i>Butterfly</i>, he compares himself to a butterfly, <strong>independent and autonomous</strong>. Similarly, in Denise Williams' <i>Black Butterfly</i>, the butterfly represents <strong>liberation from oppression</strong>.</p>
          <p>Across cultures, butterflies symbolize <strong>life, soul, and transformation</strong>. In Christianity, they represent <strong>resurrection, while universally, they embody endurance, change, hope, and renewal</strong>.</
        `,
      },
      {
        question: "Is Monark an open-source platform?",
        answer: `
        <p>Yes! Monark is an open-source platform. We believe in transparency, collaboration, and accessibility. Our code is available on <strong><a href="https://github.com/monark-community" target="_blank">Github</a></strong> for everyone to contribute and use.</p>
        `,
      },
      {
        question: "How is Monark funded?",
        answer: `
        <p>Monark is funded through various sources, both short and long-term.</p>
        <p><strong>Short-term funding:</strong></p>
        <ul>
            <li><strong>Web3 Foundations:</strong> Grants for platform development and ecosystem expansion.</li>
            <li><strong>Government Grants:</strong> Public programs supporting blockchain innovation.</li>
        </ul>
        <p><strong>Long-term funding:</strong></p>
        <ul>
            <li><strong>Platform Fees:</strong> Revenue from transactions and services.</li>
            <li><strong>Government Loans and Grants:</strong> Funding for expansion and municipal integration.</li>
            <li><strong>Web3 Foundation Partnerships:</strong> Ongoing support for research and security.</li>
            <li><strong>Local Partnerships:</strong> Collaboration with cities and communities for co-funding.</li>
            <li><strong>Investment in Modules and Projects:</strong> Developing blockchain solutions generating sustainable revenue.</li>
        </ul>
        `,
      },
      // {
      //   question: "How are platform revenues redistributed?",
      //   answer: `
      //  <p>From the image you shared, Monark platform revenues are redistributed as follows:</p>
      // <ul>
      //   <li><strong>Monark Token Holders:</strong> A portion of fees is allocated to individuals investing in and supporting the platform ecosystem.</li>
      //   <li><strong>Module Token Holders:</strong> Developers and contributors creating and maintaining modules on the platform receive a share of fees, encouraging ongoing innovation.</li>
      //   <li><strong>Local DAOs:</strong> A percentage is distributed to local Decentralized Autonomous Organizations, enabling cities to manage and allocate resources according to their specific needs.</li>
      //   <li><strong>Referral System:</strong> Users contributing to growth through referrals receive a share of fees, incentivizing community expansion.</li>
      //   <li><strong>Yield Rewards:</strong> 5% is directed towards yield-generating activities, such as staking rewards or liquidity incentives within the Monark ecosystem.</li>
      //   <li><strong>Token Burn:</strong> 5% of collected fees are permanently destroyed (burned), reducing the overall supply and potentially increasing token value over time.</li>
      // </ul>
      // <p>This structure aims to ensure a fair and sustainable ecosystem, rewarding contributors while maintaining the platform's economic integrity.</p>
      //   `,
      // },
      {
        question: "How does Monark work with universities?",
        answer: `
        <p>From the images shared, Monark collaborates with universities and educational institutions in several ways:</p>
        <p><strong>Educational Partnerships:</strong></p>
        <ul>
          <li>Creation of blockchain-focused courses</li>
          <li>Establishment of research programs</li>
          <li>Development of student projects</li>
        </ul>
        <p><strong>Hands-On Engagement:</strong></p>
        <ul>
          <li>Allows students to interact with real Web3 applications</li>
          <li>Offers students the opportunity to contribute to real-world solutions</li>
          <li>Provides high-impact innovative projects that help students develop skills and enrich their portfolios</li>
        </ul>
        <p><strong>Institutional Collaboration:</strong></p>
        <ul>
          <li>Participation in the University Blockchain Alliance</li>
          <li>Sharing best practices and resources between institutions</li>
          <li>Leveraging academic expertise and cutting-edge research</li>
        </ul>
        <p><strong>Events and Activities:</strong></p>
        <ul>
          <li>Hosting hackathons</li>
          <li>Conducting workshops</li>
          <li>Running competitions to drive blockchain innovation on campuses</li>
        </ul>
        <p><strong>Ecosystem Development:</strong></p>
        <ul>
          <li>Creating a talent pool familiar with the Monark ecosystem</li>
          <li>Building a loyal community of future developers and contributors</li>
          <li>Benefiting from students' perspectives, creativity, and energy to drive Web3 innovation</li>
        </ul>
        <p>These initiatives enable Monark to stay at the forefront of Web3 innovation through the theoretical knowledge and practical skills of students and academic researchers.</p>
        `,
      },
      {
        question: "What are Monark's reusable modules?",
        answer: `
        <p>These are 
        <strong>pre-built, open-source smart contract components</strong>
        that developers can plug into their applications to save time and ensure security. Modules cover governance, identity, reputation, and data access.</p>
        `,
      },
      {
        question: "What are the core modules developed by Monark?",
        answer: `
        <p>Monark offers modules for governance, profit distribution, and data access. These modules are designed to be reusable, open-source, and secure. These modules include;</p>
        <ul>
          <li><strong>Trust Contacts Module</strong> - for secure interactions;</li>
          <li><strong>Payments Module</strong> - to simplify transactions;</li>
          <li><strong>Safe Module</strong> - for fund security;</li>
          <li><strong>Timesheet Module</strong> - for contribution evaluation;</li>
          <li><strong>Governance Module</strong> - for collective decision-making;</li>
          <li><strong>Bounty Module</strong> - to direct participation.</li>
          <li><strong>Geolocation Module</strong> - for community identification.</li>
          <li><strong>And many more modules suggested by the community!</strong></li>
        </ul>
        <p>Developers can use these modules to accelerate the development of their applications and ensure the security of their users.</p>
          `,
      },
      {
        question: "How can I get involved?",
        answer: `
        <p>There are multiple ways to contribute to Monark! You can:</p>
        <ul>
          <li>Join our community on <strong><a href="https://discord.gg/TvhrbFCp8T" target="_blank">Discord</a></strong> and <strong><a href="https://x.com/monark_io" target="_blank">Twitter</a></strong></li>
          <li>Contribute to our open-source repositories on <strong><a href="https://github.com/monark-community" target="_blank">GitHub</a></strong></li>
          <li><strong><a href="https://forms.gle/vXfkpPhCfYXWQum48">Share your ideas and feedback</a></strong> with the team</li>
        </ul>
        <p>We warmly welcome students, universities, developers, entrepreneurs, designers, writers, and anyone passionate about blockchain and decentralization!</p>
        `,
      },
    ],
    roadmap_card: {
      title: "Roadmap",
      content:
        "Take a look at our roadmap to get a clearer picture of our current progress and future direction.",
      action: "Access Roadmap",
    },
  },
};

export const fr: I18n = {
  faq: {
    soon: "Bientôt disponible",
    flavor: "Questions fréquentes",
    title: "Nectar pour l'esprit curieux",
    items: [
      {
        question: "Qu'est-ce que Monark?",
        answer: `
          <p>Monark est un écosystème blockchain conçu pour
          <strong>relier les mondes numérique et physique à travers des données ouvertes, une gouvernance décentralisée et des modules réutilisables pour les dApps.</strong>
          Nous permettons aux développeurs, aux étudiants et aux communautés locales de construire avec transparence, efficacité et autonomie.</p>
        `,
      },
      {
        question:
          "En quoi Monark est-il différent des autres projets blockchain?",
        answer: `
          <p>Monark privilégie
          <strong>les applications du monde réel</strong>,
          rendant les données ouvertes accessibles, la gouvernance décentralisée et l'innovation modulaire. Notre approche allie une gouvernance décentralisée à des outils pratiques pour les développeurs, les entreprises et les communautés.</p>
        `,
      },
      {
        question: "Que représente le symbole du papillon de Monark?",
        answer: `
          <p>Un papillon <strong>symbolise la liberté</strong>, se libérant des contraintes sociétales pour tracer son propre chemin. Dans <i>Butterfly</i> de Jackson Wang, il se compare à un papillon, <strong>indépendant et autonome</strong>. De même, dans <i>Black Butterfly</i> de Denise Williams, le papillon représente <strong>la libération de l'oppression</strong>.</p>
          <p>À travers les cultures, les papillons symbolisent <strong>la vie, l'âme et la transformation</strong>. Dans le christianisme, ils représentent <strong>la résurrection, tandis qu'universellement, ils incarnent l'endurance, le changement, l'espoir et le renouveau</strong>.</
        `,
      },
      {
        question: "Est-ce que Monark est une plateforme open-source?",
        answer: `
        <p>Oui! Monark est une plateforme open-source. Nous croyons en la transparence, la collaboration et l'accessibilité. Notre code est disponible sur <strong><a href="https://github.com/monark-community" target="_blank">GitHub</a></strong> pour que tout le monde puisse contribuer et l'utiliser.</p>
        `,
      },
      {
        question: "Comment Monark est-il financé?",
        answer: `
        <p>Monark est financé à travers différentes sources, à court et à long terme.</p>
        <p><strong>Financement à court terme :</strong></p>
        <ul>
            <li><strong>Fondations Web3 :</strong> Subventions pour le développement de la plateforme et l'expansion de l'écosystème.</li>
            <li><strong>Subventions gouvernementales :</strong> Programmes publics soutenant l'innovation blockchain.</li>
        </ul>
        <p><strong>Financement à long terme :</strong></p>
        <ul>
            <li><strong>Frais de plateforme :</strong> Revenus provenant des transactions et services.</li>
            <li><strong>Prêts et subventions gouvernementaux :</strong> Financement pour l'expansion et l'intégration municipale.</li>
            <li><strong>Partenariats avec des fondations Web3 :</strong> Soutien continu pour la recherche et la sécurité.</li>
            <li><strong>Partenariats locaux :</strong> Collaboration avec villes et communautés pour le co-financement.</li>
            <li><strong>Investissement dans des modules et projets :</strong> Développement de solutions blockchain générant des revenus durables.</li>
        </ul>
        `,
      },
      // {
      //   question: "Comment les revenus de la plateforme sont-ils redistribués?",
      //   answer: `
      //  <p>D'après l'image que vous avez partagée, les revenus de la plateforme Monark sont redistribués comme suit :</p>
      // <ul>
      //   <li><strong>Détenteurs de tokens Monark</strong> : Une partie des frais est allouée aux personnes qui investissent et soutiennent l'écosystème de la plateforme.</li>
      //   <li><strong>Détenteurs de tokens Module</strong> : Les développeurs et contributeurs qui créent et maintiennent des modules sur la plateforme reçoivent une part des frais, encourageant ainsi l'innovation continue.</li>
      //   <li><strong>DAOs des villes locales</strong> : Un pourcentage est distribué aux Organisations Autonomes Décentralisées locales, permettant aux villes de gérer et d'allouer des ressources selon leurs besoins spécifiques.</li>
      //   <li><strong>Système de parrainage</strong> : Les utilisateurs qui contribuent à la croissance via des parrainages reçoivent une part des frais, ce qui incite à l'expansion communautaire.</li>
      //   <li><strong>Récompenses de rendement</strong> : 5% est dirigée vers des activités génératrices de rendement, comme les récompenses de staking ou les incitations de liquidité dans l'écosystème Monark.</li>
      //   <li><strong>Destruction de tokens</strong> : 5% des frais collectés sont définitivement détruits (burn), réduisant l'offre globale et augmentant potentiellement la valeur des tokens au fil du temps.</li>
      // </ul>
      // <p>Cette structure vise à assurer un écosystème équitable et durable, récompensant les contributeurs tout en maintenant l'intégrité économique de la plateforme.</p>
      //   `,
      // },
      {
        question: "Comment Monark travaille-t-il avec les universités?",
        answer: `
        <p>D'après les images partagées, Monark collabore avec les universités et les institutions éducatives de plusieurs façons:</p>
        <p><strong>Partenariats éducatifs:</strong></p>
        <ul>
          <li>Création de cours axés sur la blockchain</li>
          <li>Mise en place de programmes de recherche</li>
          <li>Développement de projets étudiants</li>
        </ul>
        <p><strong>Engagement pratique:</strong></p>
        <ul>
          <li>Permet aux étudiants d'interagir avec des applications Web3 réelles</li>
          <li>Offre aux étudiants l'opportunité de contribuer à des solutions concrètes</li>
          <li>Propose des projets innovants à fort impact qui aident les étudiants à développer leurs compétences et enrichir leurs portfolios</li>
        </ul>
        <p><strong>Collaboration institutionnelle:</strong></p>
        <ul>
          <li>Participation à l'University Blockchain Alliance</li>
          <li>Partage de meilleures pratiques et de ressources entre institutions</li>
          <li>Exploitation de l'expertise académique et de la recherche de pointe</li>
        </ul>
        <p><strong>Événements et activités:</strong></p>
        <ul>
          <li>Organisation de hackathons</li>
          <li>Mise en place d'ateliers</li>
          <li>Tenue de compétitions pour stimuler l'innovation blockchain sur les campus</li>
        </ul>
        <p><strong>Développement d'un écosystème:</strong></p>
        <ul>
          <li>Création d'un vivier de talents familiers avec l'écosystème Monark</li>
          <li>Établissement d'une communauté fidèle de futurs développeurs et contributeurs</li>
          <li>Bénéficie des perspectives, de la créativité et de l'énergie des étudiants pour stimuler l'innovation dans le Web3</li>
        </ul>
        <p>Ces initiatives permettent à Monark de rester à la pointe de l'innovation Web3 grâce aux connaissances théoriques et aux compétences pratiques des étudiants et des chercheurs universitaires.</p>
        `,
      },
      {
        question: "Que sont les modules réutilisables de Monark?",
        answer: `
        <p>Il s'agit de
        <strong>composants de contrat intelligent pré-construits et open-source</strong>
        que les développeurs peuvent brancher dans leurs applications pour gagner du temps et garantir la sécurité. Les modules couvrent la gouvernance, l'identité, la réputation et l'accès aux données.</p>
        `,
      },
      // {
      //   question: "Quels sont les modules principaux développés par Monark?",
      //   answer: `
      //   <p>Monark propose des modules pour la gouvernance, la distribution des bénéfices et l'accès aux données. Ces modules sont conçus pour être réutilisables, open-source et sécurisés. Ces modules incluent;</p>
      //   <ul>
      //     <li><strong>Module de contacts de confiance</strong> - pour des interactions sécurisées;</li>
      //     <li><strong>Module de paiements</strong> - pour simplifier les transactions;</li>
      //     <li><strong>Module de coffre-fort</strong> - pour la sécurité des fonds;</li>
      //     <li><strong>Module de feuilles de temps</strong> - pour l'évaluation des contributions;</li>
      //     <li><strong>Module de gouvernance</strong> - pour la prise de décision collective;</li>
      //     <li><strong>Module de primes</strong> - pour diriger la participation.</li>
      //     <li><strong>Module de géolocalisation</strong> - pour l'identification communautaire.</li>
      //     <li><strong>Et bien d'autres modules suggérés par la communauté!</strong></li>
      //   </ul>
      //   <p>Les développeurs peuvent utiliser ces modules pour accélérer le développement de leurs applications et garantir la sécurité de leurs utilisateurs.</p>
      //     `,
      // },
      {
        question: "Comment puis-je m'impliquer?",
        answer: `
        <p>De multiples façons de contribuer à Monark s'offrent à vous! Vous pouvez:</p>
        <ul>
          <li>Rejoindre notre communauté sur <strong><a href="https://discord.gg/TvhrbFCp8T" target="_blank">Discord</a></strong> et <strong><a href="https://x.com/monark_io" target="_blank">Twitter</a></strong></li>
          <li>Contribuer à nos dépôts open-source sur <strong><a href="https://github.com/monark-community" target="_blank">GitHub</a></strong></li>
          <li><strong><a href="https://forms.gle/vXfkpPhCfYXWQum48">Partager vos idées et vos retours</a></strong> avec l'équipe</li>
        </ul>
        <p>Nous accueillons chaleureusement les étudiants, universités, développeurs, entrepreneurs, designers, rédacteurs et toute personne passionnée par la blockchain et la décentralisation!</p>
        `,
      },
    ],
    roadmap_card: {
      title: "Feuille de route",
      content:
        "Consultez notre feuille de route pour avoir une idée plus claire de notre progression actuelle et de notre direction future.",
      action: "Accéder à la feuille de route",
    },
  },
};
