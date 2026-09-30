export interface I18n {
  copyrights: {
    all_rights_reserved: string;
    /** Credit for the site's photographs (free Unsplash License). */
    photos_credit: string;
  };
}

export const en: I18n = {
  copyrights: {
    all_rights_reserved: "All rights reserved",
    photos_credit: "Photos: Unsplash",
  },
};

export const fr: I18n = {
  copyrights: {
    all_rights_reserved: "Tous droits réservés",
    photos_credit: "Photos : Unsplash",
  },
};
