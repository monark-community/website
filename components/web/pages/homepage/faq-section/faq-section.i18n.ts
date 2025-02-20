export interface I18n {
  faq: {
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
          making open data accessible, governance decentralized, and innovation modular. Our approach blends decentralized governance with practical tools for developers, businesses, and communities.</p>
        `,
      },
      {
        question: "What does Monark's butterfly symbol represent?",
        answer: `
          <p>A butterfly <strong>symbolizes freedom</strong>, breaking free from societal constraints to chart its own path. In Jackson Wang's <i>Butterfly</i>, he likens himself to a butterfly, <strong>independent and self-directed</strong>. Similarly, in Denise Williams's <i>Black Butterfly</i>, the butterfly represents <strong>liberation from oppression</strong>.</p>
          <p>Across cultures, butterflies symbolize <strong>life, the soul, and transformation</strong>. In Christianity, they represent <strong>resurrection, while universally, they embody endurance, change, hope, and renewal</strong>.</p>`,
      },
      {
        question: "How does Monark's open-data system work?",
        answer: `
        <p>Monark enables
        <strong>transparent and permissionless data sharing</strong>
        by providing a modular infrastructure for decentralized applications. Developers can access verified, structured data while users retain control over their information.</p>
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
        question: "Who controls Monark?",
        answer: `
        <p><strong>Monark is a nascent project, the governance structure is still being developed.</strong> We aim for Monark to be governed by a
        <strong>decentralized community</strong>
        where decisions are made through transparent voting mechanisms. Our reputation system will ensure meaningful participation from trusted contributors.</p>
        `,
      },
      {
        question: "How can I get involved?",
        answer: `
        <p>There are many ways to contribute to Monark! You can;</p>
        <ul>
          <li>Join our community on <strong>Discord and Twitter</strong></li>
          <li>Contribute to our open-source repositories on <strong><a href="https://github.com/monark-community" target="_blank">GitHub</a></strong></li>
          <li><strong>Share your ideas and feedback</strong> with the team</li>
          <li>Participate in our <strong>hackathons and bounties</strong></li>
        </ul>
        <p>We welcome developers, designers, writers, and anyone passionate about blockchain and decentralization!</p>
        `,
      },
    ],
    roadmap_card: {
      title: "ROADMAP",
      content:
        "Take a look at our roadmap to get a clearer picture of our current progress and future direction.",
      action: "Access Roadmap",
    },
  },
};

export const fr: I18n = {
  faq: {
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
        question:
          "Comment fonctionne le système de données ouvertes de Monark?",
        answer: `
        <p>Monark permet
        <strong>le partage transparent et sans permission de données</strong>
        en fournissant une infrastructure modulaire pour les applications décentralisées. Les développeurs peuvent accéder à des données vérifiées et structurées tandis que les utilisateurs conservent le contrôle sur leurs informations.</p>
        `,
      },
      {
        question: "Quels sont les modules réutilisables de Monark?",
        answer: `
        <p>Il s'agit de
        <strong>composants de contrat intelligent pré-construits et open-source</strong>
        que les développeurs peuvent brancher dans leurs applications pour gagner du temps et garantir la sécurité. Les modules couvrent la gouvernance, l'identité, la réputation et l'accès aux données.</p>
        `,
      },
      {
        question: "Qui contrôle Monark?",
        answer: `
        <p><strong>Monark est un projet naissant, la structure de gouvernance est encore en cours de développement.</strong> Nous visons à ce que Monark soit gouverné par une
        <strong>communauté décentralisée</strong>
        où les décisions sont prises à travers des mécanismes de vote transparents. Notre système de réputation garantit une participation significative de contributeurs de confiance.</p>
        `,
      },
      {
        question: "Comment puis-je m'impliquer?",
        answer: `
        <p>Il existe de nombreuses façons de contribuer à Monark! Vous pouvez;</p>
        <ul>
          <li>Rejoignez notre communauté sur <strong>Discord et Twitter</strong></li>
          <li>Contribuez à nos dépôts open-source sur <strong><a href="https://github.com/monark-community" target="_blank">GitHub</a></strong></li>
          <li><strong>Partagez vos idées et vos retours</strong> avec l'équipe</li>
          <li>Participez à nos <strong>hackathons et bounties</strong></li>
        </ul>
        <p>Nous accueillons les développeurs, les designers, les écrivains et toute
        personne passionnée par la blockchain et la décentralisation!</p>
        `,
      },
    ],
    roadmap_card: {
      title: "FEUILLE DE ROUTE",
      content:
        "Consultez notre feuille de route pour avoir une idée plus claire de notre progression actuelle et de notre direction future.",
      action: "Accéder à la feuille de route",
    },
  },
};
